import express from "express";
import { setupMiddleware } from "./middlewares/middleware";
import routes from "./routes";
import userEventRoutes from "./routes/event";

const port = 8081;

const app = express();

setupMiddleware(app);

app.use("/", routes);
app.use("/event", userEventRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

export default app;
