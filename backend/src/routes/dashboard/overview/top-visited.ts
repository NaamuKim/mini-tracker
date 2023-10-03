import express from "express";
import { retrieveTopVisited } from "@/services/dashboard/overview/topVisited";

const router = express.Router();
router.get("/top-visited", async (req, res) => {
  try {
    const { limit = 5, queriedUrl } = req.query;

    const topVisitedData = await retrieveTopVisited({
      limit: Number(limit),
      queriedUrl: queriedUrl as string,
    });

    return res.status(200).json({
      message: "Top visited retrieved",
      success: true,
      data: {
        topVisited: topVisitedData,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: (err as Error)?.message || "Internal server error",
    });
  }
});

export default router;
