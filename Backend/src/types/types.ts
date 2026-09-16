import type { Request } from "express";
import type { JwtPayload } from "../../utils/jwt";
export type ResponseType = {
  status: "error" | "success";
  payload: Record<string, unknown>;
};

export type Role = "employee" | "manager";

export type AuthenticatedRequest = Request & {
  user?: JwtPayload;
};
