import express from "express";
import { setupMiddleware } from "./middlewares/middleware";
import routes from "./routes";

const app = express();

setupMiddleware(app);
app.use("/", routes);

export default app;
