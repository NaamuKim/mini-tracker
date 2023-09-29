import express from "express";
import { setupMiddleware } from "@/middlewares/setup";
import { dashboardRouter } from "@/routes/dashboard";
import { sdkRouter } from "@/routes/sdk";

const app = express();

setupMiddleware(app);

// SDK Routes
app.use("/page-view", sdkRouter.pageViewRouter);

// Dashboard Routes
app.use("/dashboard/login", dashboardRouter.loginRouter);
app.use("/dashboard/overview", dashboardRouter.overviewRouter);
app.use("/dashboard/search", dashboardRouter.searchRouter);

export default app;
