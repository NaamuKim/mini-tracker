import mysql from "mysql";
import { mySqlConfig } from "../env/env";

export const connection = mysql.createConnection(mySqlConfig);

connection.connect();

connection.query("SELECT * from UserEvents", (error, rows, fields) => {
  if (error) throw error;
  console.log("Routings info is: ", rows);
});
