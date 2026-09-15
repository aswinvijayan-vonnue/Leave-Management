import type { Request, Response, NextFunction } from "express";
import type { ZodType } from "zod";
type RequestPart = "body" | "params" | "query";

export const validate =
  (schema: ZodType, part: RequestPart) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.safeParse(req[part]);
      if (!result.success) next(result.error);
      req[part] = result.data;
      next();
    } catch (err) {
      next(err);
    }
  };
