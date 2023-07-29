import express from "express";
import { PageTransitionEvent } from "../types/userEvent";
import { createUserEvent } from "../models/userEvent";

const router = express.Router();

router.post("/page-transition", async (req, res) => {
  const userEvents: PageTransitionEvent = req.body;

  try {
    await createUserEvent(userEvents);
    res.send("success");
  } catch (err) {
    console.error(err);
    res.status(500).send("DataBase Error");
  }
});

export default router;
