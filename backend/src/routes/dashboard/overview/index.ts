import express from "express";
import visitorsRouter from "./visitors";
import topStayedRouter from "./top-stayed";
import topVisitedRouter from "./top-visited";
import referrersRouter from "./referrers";

const router = express.Router();

router.get("/visitors", visitorsRouter);
router.get("/top-stayed", topStayedRouter);
router.get("/top-visited", topVisitedRouter);
router.get("/referrers", referrersRouter);

export default router;
