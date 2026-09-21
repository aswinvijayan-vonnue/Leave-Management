import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { AppError } from "../error/errors";

function formatZodError(error: ZodError) {
  const errors: Record<string, string> = {};
  for (const issue of error.issues) {
    const field = issue.path.join(".");
    if (!errors[field]) errors[field] = issue.message;
  }
  return errors;
}
export function NotFoundHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.status(404).json({ success: false, message: "not found" });
}

export function ErrorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      status: "error",
      message: "validationn failed",
      errors: formatZodError(err),
    });
  } else if (err instanceof AppError) {
    return res.status(err.status).json({
      status: "error",
      message: err.message,
    });
  } else if (err instanceof Error) {
    return res.status(400).json({
      status: "error",
      message: err.message,
    });
  } else {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
}
