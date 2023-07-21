"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pipeMiddlewares = void 0;
const pipeMiddlewares = (app, middlewares) => {
    middlewares.forEach((middleware) => {
        app.use(middleware);
    });
};
exports.pipeMiddlewares = pipeMiddlewares;
