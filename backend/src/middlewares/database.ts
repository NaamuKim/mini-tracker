import { Request, Response, NextFunction } from "express";
import { pool } from "../config/db";

export const connectionMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const connection = await pool.getConnection();
  req.dbConnection = connection;

  next();

  connection.release();
};
