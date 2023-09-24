import express from "express";
import { hashLoginInfo, LoginInfo } from "@/models/dashboard/login";

const router = express.Router();

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
