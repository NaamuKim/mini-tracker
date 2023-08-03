import express from "express";
import { setupMiddleware } from "./middlewares/setup";
import routes from "./routes";
import userEventRoutes from "./routes/event";

const app = express();

setupMiddleware(app);

app.use("/", routes);
app.use("/event", userEventRoutes);

export default app;
