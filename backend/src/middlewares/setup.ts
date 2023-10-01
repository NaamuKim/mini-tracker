import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { pipeMiddlewares } from "@/fns/pipeMiddlewares";
import { errorHandler } from "@/middlewares/errors/database";

export const setupMiddleware = (app: express.Application) => {
  pipeMiddlewares(
    app,
    [
      express.json(),
      cors({
        origin: JSON.parse(process.env.CORS_WHITE_LIST as string),
        credentials: true,
      }),
      cookieParser(),
      express.urlencoded({ extended: true }),
    ],
    [errorHandler],
  );
};
