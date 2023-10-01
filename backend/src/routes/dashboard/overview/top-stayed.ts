import express from "express";
import { retrieveTopStayed } from "@/services/dashboard/overview";

const router = express.Router();
router.get("/top-stayed", async (req, res) => {
  try {
    const { limit = 5 } = req.query;
    const parsedLimit = Number(limit);
    const topStayed = await retrieveTopStayed(parsedLimit);
    res.status(200).json({
      message: "Top visited retrieved",
      success: true,
      data: {
        topStayed,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: (err as Error)?.message || "Internal server error",
    });
  }
});

export default router;
