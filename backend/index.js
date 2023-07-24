"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mysql_1 = __importDefault(require("mysql"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const crypto_1 = __importDefault(require("crypto"));
const db_1 = require("./config/db");
const cors_1 = __importDefault(require("cors"));
const fn_1 = require("./module/fn");
const app = (0, express_1.default)();
const port = 8080;
(0, fn_1.pipeMiddlewares)(app, [
    express_1.default.json(),
    (0, cors_1.default)({
        origin: "http://localhost:3000",
        credentials: true,
    }),
    (0, cookie_parser_1.default)(),
    express_1.default.urlencoded({ extended: true }),
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
app.post("/login", (req, res) => {
    if (!req.body.userId || !req.body.password) {
        res.send("userId and password are required");
        return;
    }
    const userId = req.body.userId;
    const password = req.body.password;
    const hash = crypto_1.default.createHash("sha256");
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
