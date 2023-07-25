import express from "express";
import { MysqlError } from "mysql";
import { createUserEvent } from "../models/userEvent";
import { hashLoginInfo, LoginInfo } from "../models/login";
import { UserEvent } from "../types/userEvent";

const router = express.Router();

router.post("/", async (req, res) => {
  const userEvents: UserEvent = req.body;

  try {
    await createUserEvent(userEvents);
    res.send("success");
  } catch (err) {
    console.error(err);
    res.send((err as MysqlError)?.sqlMessage || "DataBase Error");
  }
});

router.post("/login", (req, res) => {
  const loginInfo: LoginInfo = req.body;

  if (!loginInfo.userId || !loginInfo.password) {
    res.status(400).send("userId and password are required");
    return;
  }

  const hashedValue = hashLoginInfo(loginInfo);

  res.cookie("mini-tracker-cookie", hashedValue, {
    maxAge: 900000,
    httpOnly: true,
  });

  res.json({ message: "Logged in and hash cookie set!" });
});

export default router;
