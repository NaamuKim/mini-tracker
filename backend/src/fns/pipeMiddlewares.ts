import { Application, RequestHandler } from "express";

export const pipeMiddlewares = (
  app: Application,
  middlewares: RequestHandler[],
) => {
  middlewares.forEach((middleware) => {
    app.use(middleware);
  });
};
