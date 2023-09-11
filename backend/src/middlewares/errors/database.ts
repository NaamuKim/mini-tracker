import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";

export const errorHandler: (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
) => void = (error, req, res, next) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      res.status(409).json({ error: "Duplicate data exists" });
      return;
    }
    res.status(400).json({ error: error.message });
  } else if (error instanceof Prisma.PrismaClientInitializationError) {
    res.status(500).json({ error: "Database initialization failed" });
  } else {
    res.status(500).json({ error: "An unknown error occurred" });
  }
};
