import { connection } from "../config/db";
import { UserEvent } from "../types/userEvent";

export const createUserEvent = ({
  previousPage,
  currentPage,
  scrollY,
  scrollX,
}: UserEvent) => {
  return new Promise((resolve, reject) => {
    try {
      connection.query(
        "INSERT INTO UserEvents SET ?",
        {
          previous_page: previousPage,
          next_page: currentPage,
          scroll_y: scrollY,
          scroll_x: scrollX,
        },
        (error, rows, fields) => {
          if (error) {
            reject(error);
          } else {
            resolve(rows);
          }
        },
      );
    } catch (err) {
      reject(err);
    }
  });
};
