import { Request, Response, NextFunction } from "express";

// Errors
import { AppError } from "@/utils/appError";
import { ZodError } from "zod";

export function errorHandling(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  if (error instanceof ZodError) {
    return res.status(400).json({
      message: "validation error",
      issues: error.issues,
    });
  }

  return res.status(400).json(`Error: ${error}`);
}
