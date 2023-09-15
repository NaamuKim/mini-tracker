import { createSession } from "@/models/session";
import { SESSION_COOKIE_KEY } from "@/constant/cookie";
import { handleNewSession } from "@/services/session";
import express from "express";
import { handlePageView } from "@/services/pageView";
import BadRequestError from "../errors/BadRequestError";
import { registerPageTransition } from "@/services/pageTransition";
import { PageTransitionCreateInputWithoutFromTo } from "@/types/pageTransition";

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

    const pageTransitionInfo: PageTransitionCreateInputWithoutFromTo = {
      transitionTime: req.body.transitionTime as Date,
      elementSelector: req.body.elementSelector as string,
    };

    const pageTransition = await registerPageTransition(
      sessionId,
      { ...req.body },
      pageTransitionInfo,
    );

    res.status(200).json({
      message: "Page view created",
      success: true,
      data: {
        pageLocation: req.body.pageLocation,
        baseUrl,
        pageTransition,
      },
    });
  } catch (err) {
    console.error(err);
    if (err instanceof BadRequestError) {
      return res.status(err.errorCode).json({
        message: err.message,
        success: false,
      });
    }
    next(err);
  }
});

export default router;
