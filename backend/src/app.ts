import express from "express";
import { setupMiddleware } from "./middlewares/middleware";
import routes from "./routes";
import userEventRoutes from "./routes/userEvent";

const app = express();

setupMiddleware(app);

app.use("/", routes);
app.use("/event", userEventRoutes);

export default app;
