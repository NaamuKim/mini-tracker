import express from "express";
import { createSession } from "@/models/sdk/session";
import { SESSION_COOKIE_KEY } from "@/constant/cookie";
import { PageTransitionCreateInputWithoutFromTo } from "@/types/pageTransition";
import { handleNewSession } from "@/services/sdk/session";
import { handlePageView } from "@/services/sdk/pageView";
import { registerPageTransition } from "@/services/sdk/pageTransition";
import BadRequestError from "@/errors/BadRequestError";

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
