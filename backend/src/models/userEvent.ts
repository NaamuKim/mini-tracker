import { connection } from "../config/db";
import { PageTransitionEvent } from "../types/userEvent";
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
    await connection.rollback();
    console.error(err);
    throw err;
  }
};
