import express from "express";
import { setupMiddleware } from "@/middlewares/setup";
import routes from "@/routes";
import pageViewRoutes from "@/routes/pageView";

const app = express();

setupMiddleware(app);

app.use("/", routes);
app.use("/page-view", pageViewRoutes);

export default app;
