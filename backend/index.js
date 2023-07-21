"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mysql_1 = __importDefault(require("mysql"));
const db_1 = require("./config/db");
const cors_1 = __importDefault(require("cors"));
const fn_1 = require("./module/fn");
const app = (0, express_1.default)();
const port = 8080;
(0, fn_1.pipeMiddlewares)(app, [
    express_1.default.json(),
    (0, cors_1.default)({
        origin: "*",
    }),
]);
const connection = mysql_1.default.createConnection(db_1.mySqlConfig);
connection.connect();
connection.query("SELECT * from UserEvents", (error, rows, fields) => {
    if (error)
        throw error;
    console.log("Routings info is: ", rows);
});
app.post("/", ({ body }, res) => {
    try {
        connection.query("INSERT INTO UserEvents SET ?", {
            previous_page: body.previousPage,
            next_page: body.currentPage,
            scroll_y: body === null || body === void 0 ? void 0 : body.scrollY,
            scroll_x: body === null || body === void 0 ? void 0 : body.scrollX,
        }, (error, rows, fields) => {
            if (error)
                throw error;
        });
    }
    catch (err) {
        console.error(err);
        res.send((err === null || err === void 0 ? void 0 : err.sqlMessage) || "DataBase Error");
    }
    res.send("success");
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
