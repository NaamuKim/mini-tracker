import {
  JoinedPageTransitionEvent,
  PageTransitionEvent,
} from "../types/userEvent";
import { ResultSetHeader } from "mysql2";
import { PoolConnection } from "mysql2/promise";

export const createUserEvent = async (
  connection: PoolConnection,
  {
    previous_page,
    current_page,
    user_id,
    session_id,
    event_type,
    url,
    referrer_url,
    scrollY,
    scrollX,
  }: PageTransitionEvent,
) => {
  try {
    await connection.beginTransaction();

    let sql = `
            INSERT INTO UserEvents(user_id, session_id, event_type, url, referrer_url)
            VALUES (?, ?, ?, ?, ?)
        `;
    let params: (string | number | undefined)[] = [
      user_id,
      session_id,
      event_type,
      url,
      referrer_url,
    ];
    const [result] = await connection.query<ResultSetHeader>(sql, params);
    const user_event_id = result.insertId;

    sql = `
            INSERT INTO PageTransitionEvents(user_event_id, current_page, previous_page, scrollY, scrollX)
            VALUES (?, ?, ?, ?, ?)
        `;
    params = [user_event_id, current_page, previous_page, scrollY, scrollX];
    await connection.query(sql, params);
    await connection.commit();
  } catch (err) {
    console.log(err);
    await connection.rollback();
    throw err;
  }
};

export const getPageTransitionEvents = async (connection: PoolConnection) => {
  const [result] = await connection.query<JoinedPageTransitionEvent[]>(
    `SELECT
      PageTransitionEvents.current_page,
        PageTransitionEvents.previous_page,
      COUNT(*) as transition_count
      FROM
      PageTransitionEvents
      INNER JOIN
      userEvents
      ON
      PageTransitionEvents.user_event_id = userEvents.id
      GROUP BY
      PageTransitionEvents.current_page,
        PageTransitionEvents.previous_page
      ORDER BY
      transition_count DESC
      LIMIT 5;
    `,
  );
  return result;
};
