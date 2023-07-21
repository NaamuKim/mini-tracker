import express from "express";
import mysql, { MysqlError } from "mysql";
import { mySqlConfig } from "./config/db";
import cors from "cors";
import { pipeMiddlewares } from "./module/fn";
const app = express();
const port = 8080;

pipeMiddlewares(app, [
  express.json(),
  cors({
    origin: "*",
  }),
]);

const connection = mysql.createConnection(mySqlConfig);

connection.connect();

connection.query("SELECT * from UserEvents", (error, rows, fields) => {
  if (error) throw error;
  console.log("Routings info is: ", rows);
});

app.post("/", ({ body }, res) => {
  try {
    connection.query(
      "INSERT INTO UserEvents SET ?",
      {
        previous_page: body.previousPage,
        next_page: body.currentPage,
        scroll_y: body?.scrollY,
        scroll_x: body?.scrollX,
      },
      (error, rows, fields) => {
        if (error) throw error;
      },
    );
  } catch (err) {
    console.error(err);
    res.send((err as MysqlError)?.sqlMessage || "DataBase Error");
  }

  res.send("success");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
