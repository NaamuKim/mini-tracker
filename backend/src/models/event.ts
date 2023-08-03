import { pool } from "../config/db";
import {
  JoinedPageTransitionEvent,
  PageTransitionEvent,
} from "../types/userEvent";
import { ResultSetHeader } from "mysql2";

export const createUserEvent = async ({
  previous_page,
  current_page,
  user_id,
  session_id,
  event_type,
  url,
  referrer_url,
  scrollY,
  scrollX,
}: PageTransitionEvent) => {
  const connection = await pool.getConnection();
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
    pool.releaseConnection(connection);
  } catch (err) {
    console.log(err);
    await connection.rollback();
    pool.releaseConnection(connection);
    throw err;
  }
};

export const getPageTransitionEvents = async () => {
  const connection = await pool.getConnection();

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
  pool.releaseConnection(connection);
  return result;
};
