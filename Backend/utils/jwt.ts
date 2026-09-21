import jwt, { SignOptions } from "jsonwebtoken";
import type { Role } from "../src/types/types";

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN ||
  "1h") as SignOptions["expiresIn"];

export interface JwtPayload {
  userId: number;
  role: Role;
}

export const generateToken = (payload: JwtPayload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const verifyToken = (token: string) => {
  const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
  return {
    userId: decoded.userId,
    role: decoded.role,
  };
};
