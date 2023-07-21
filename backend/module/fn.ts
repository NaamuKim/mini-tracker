import { Express, RequestHandler } from "express";

export const pipeMiddlewares = (
  app: Express,
  middlewares: RequestHandler[],
) => {
  middlewares.forEach((middleware) => {
    app.use(middleware);
  });
};
