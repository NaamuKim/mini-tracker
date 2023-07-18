const express = require("express");
const mysql = require("mysql");
const mysqlConfig = require("./config/db");
const app = express();
const port = 3500;

const connection = mysql.createConnection(mysqlConfig);

connection.connect();

connection.query("SELECT * from UserEvents", (error, rows, fields) => {
  if (error) throw error;
  console.log("Routings info is: ", rows);
});

connection.end();
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
