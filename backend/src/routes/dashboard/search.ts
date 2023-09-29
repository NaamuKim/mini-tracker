import express from "express";
import { retrieveWordIncludedApp } from "@/services/dashboard/search";

const router = express.Router();

router.get("/app", async (req, res) => {
  const { word } = req.query;
  try {
    const apps = await retrieveWordIncludedApp(word as string);
    return res.status(200).json({
      message: "Apps with baseurl retrieved",
      success: true,
      data: {
        apps,
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
