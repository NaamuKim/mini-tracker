import app from "../app";
import { createSession } from "../models/session";
import { SESSION_COOKIE_KEY } from "../constant/cookie";
import { handleNewSession } from "../services/session";
import express from "express";
import { handlePageView } from "../services/pageView";
import BadRequestError from "../errors/BadRequestError";

const router = express.Router();
router.post("/", async (req, res, next) => {
  try {
    const baseUrl = (req.body.baseUrl ||
      req.headers["x-forwarded-host"] ||
      req.headers.host) as string;

    let sessionId = req.cookies[SESSION_COOKIE_KEY];

    if (!sessionId) {
      sessionId = await handleNewSession({
        createSessionFn: createSession,
        reqBody: req.body,
        baseUrl,
      });
      res.cookie(SESSION_COOKIE_KEY, sessionId);
    }
    const { fromPageLocation } = req.body;

    if (!fromPageLocation) {
      await handlePageView({ ...req.body, sessionId, baseUrl });
    }

    // TODO: transition 정보 저장

    res.status(200).json({
      message: "Page view created",
      success: true,
      data: {
        pageLocation: req.body.pageLocation,
        baseUrl,
      },
    });
  } catch (err) {
    console.error(err);
    if (err instanceof BadRequestError) {
      console.log(err);
      return res.status(err.errorCode).json({
        message: err.message,
        success: false,
      });
    }
    next(err);
  }
});

export default router;
