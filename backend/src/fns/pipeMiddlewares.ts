import { Application, ErrorRequestHandler, RequestHandler } from "express";

export const pipeMiddlewares = (
  app: Application,
  middlewares: RequestHandler[] = [],
  errorMiddlewares: ErrorRequestHandler[] = [],
) => {
  middlewares.forEach((middleware) => {
    app.use(middleware);
  });

  errorMiddlewares.forEach((errorMiddleware) => {
    app.use(errorMiddleware);
  });
};
