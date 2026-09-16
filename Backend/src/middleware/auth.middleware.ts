import type { Request, Response, NextFunction } from "express";
import { Unauthorized } from "../error/errors";
import { verifyToken } from "../../utils/jwt";
import type { AuthenticatedRequest } from "../types/types";

export function requireAuth(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const auth = request.headers.authorization;
  if (!auth || !auth.startsWith("Bearer"))
    return response
        .status(400)
        .json({ status: "error", message: "Unauthorized access" });

  const token = auth!.replace("Bearer ", "");
  const res = verifyToken(token);
  console.log(res);
  (request as AuthenticatedRequest).user = res;
  next();
}

export function authroize(...allowedRoles: string[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user)
      return res
        .status(400)
        .json({ status: "error", message: "Unauthorized access" });
    if (allowedRoles.includes(req.user.role))
      return res
        .status(403)
        .json({
          status: "error",
          message: "You dont have access to this endpoint",
        });
  };
}
