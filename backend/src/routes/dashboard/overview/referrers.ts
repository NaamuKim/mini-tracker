import express from "express";

const router = express.Router();
router.get("/referrers", (req, res) => {
  try {
    res.status(200).json({
      message: "Referrers retrieved",
      success: true,
      data: {
        referrers: [
          {
            name: "Google",
            count: 100,
          },
          {
            name: "Facebook",
            count: 50,
          },
          {
            name: "Twitter",
            count: 20,
          },
        ],
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
