import express from "express";
import { retrieveReferrers } from "@/services/dashboard/overview/referrers";

const router = express.Router();
router.get("/referrers", async (req, res) => {
  try {
    const { queriedUrl } = req.query;
    const referrers = await retrieveReferrers({
      queriedUrl: queriedUrl as string,
    });

    res.status(200).json({
      message: "Referrers retrieved",
      success: true,
      data: {
        referrers,
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
