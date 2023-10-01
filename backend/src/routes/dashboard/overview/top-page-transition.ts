import express from "express";
import { retrieveTopPageTransitions } from "@/services/dashboard/overview/topPageTransition";

const router = express.Router();

router.get("/top-page-transitions", async (req, res) => {
  try {
    const topPageTransitions = await retrieveTopPageTransitions();
    res.status(200).json({
      message: "Top page transitions retrieved",
      success: true,
      data: {
        topPageTransitions,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: (err as Error)?.message || "Internal server error",
      success: false,
    });
  }
});

export default router;
