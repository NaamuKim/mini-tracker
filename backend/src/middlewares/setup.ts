import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { pipeMiddlewares } from "../fns/pipeMiddlewares";
import { errorHandler } from "./errors/database";

export const setupMiddleware = (app: express.Application) => {
  pipeMiddlewares(
    app,
    [
      express.json(),
      cors({
        origin: "http://localhost:3000",
        credentials: true,
      }),
      cookieParser(),
      express.urlencoded({ extended: true }),
    ],
    [errorHandler],
  );
};
