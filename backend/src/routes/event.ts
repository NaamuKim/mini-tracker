import express from "express";
import { PageTransitionEvent } from "../types/userEvent";
import {
  createUserEvent,
  getPageTransitionBest5,
  getPageTransitionEvents,
} from "../models/event";

const router = express.Router();

router.post("/page-transition", async (req, res) => {
  const userEvents: PageTransitionEvent = req.body;

  try {
    await createUserEvent(req.dbConnection, userEvents);
    res.status(201).send("success");
  } catch (err) {
    console.error(err);
    res.status(500).send("DataBase Error");
  }
});

router.get("/page-transitions", async (req, res) => {
  try {
    const pageTransitionEvents = await getPageTransitionEvents(
      req.dbConnection,
    );

    res.json(pageTransitionEvents);
  } catch (err) {
    console.error(err);
    res.status(500).send("DataBase Error");
  }
});

router.get("/page-transition-best", async (req, res) => {
  try {
    const pageTransitionBest5 = await getPageTransitionBest5(req.dbConnection);
    res.json(pageTransitionBest5);
  } catch (err) {
    console.error(err);
    res.status(500).send("DataBase Error");
  }
});

export default router;
