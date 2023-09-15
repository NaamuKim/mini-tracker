import express from "express";
import { setupMiddleware } from "@/middlewares/setup";
import routes from "@/routes";
import userEventRoutes from "@/routes/event";
import pageViewRoutes from "@/routes/pageView";

const app = express();

setupMiddleware(app);

app.use("/", routes);
app.use("/event", userEventRoutes);
app.use("/page-view", pageViewRoutes);

export default app;
