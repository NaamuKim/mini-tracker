import express from "express";
import mysql, { MysqlError } from "mysql";
import cookieParser from "cookie-parser";
import crypto from "crypto";
import { mySqlConfig } from "./config/db";
import cors from "cors";
import { pipeMiddlewares } from "./module/fn";
const app = express();
const port = 8080;

pipeMiddlewares(app, [
  express.json(),
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
  cookieParser(),
  express.urlencoded({ extended: true }),
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

app.post("/login", (req, res) => {
  if (!req.body.userId || !req.body.password) {
    res.send("userId and password are required");
    return;
  }
  const userId = req.body.userId as string;
  const password = req.body.password as string;

  const hash = crypto.createHash("sha256");
  hash.update(userId + password);
  const hashedValue = hash.digest("hex");

  res.cookie("mini-tracker-cookie", hashedValue, {
    maxAge: 900000,
    httpOnly: true,
  });

  res.json({ message: "Logged in and hash cookie set!" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
