import express from "express";
import mysql from "mysql";
import { mySqlConfig } from "./config/db";
const app = express();
const port = 3500;

const connection = mysql.createConnection(mySqlConfig);

connection.connect();

connection.query("SELECT * from UserEvents", (error, rows, fields) => {
  if (error) throw error;
  console.log("Routings info is: ", rows);
});

connection.end();
app.post("/", ({ body }, res) => {
  try {
    connection.query(
      "INSERT INTO UserEvents SET ?",
      body,
      (error, rows, fields) => {
        if (error) throw error;
      },
    );
  } catch (err) {
    console.error(err);
  }

  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
