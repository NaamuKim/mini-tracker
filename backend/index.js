"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mysql_1 = __importDefault(require("mysql"));
const db_1 = require("./config/db");
const app = (0, express_1.default)();
const port = 3500;
const connection = mysql_1.default.createConnection(db_1.mySqlConfig);
connection.connect();
connection.query("SELECT * from UserEvents", (error, rows, fields) => {
    if (error)
        throw error;
    console.log("Routings info is: ", rows);
});
connection.end();
app.post("/", ({ body }, res) => {
    try {
        connection.query("INSERT INTO UserEvents SET ?", body, (error, rows, fields) => {
            if (error)
                throw error;
        });
    }
    catch (err) {
        console.error(err);
    }
    res.send("Hello World!");
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
