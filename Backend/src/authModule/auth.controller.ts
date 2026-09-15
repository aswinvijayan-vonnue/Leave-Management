import type { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service";

const authService = new AuthService();

class AuthController {
  async login(request: Request, response: Response, next: NextFunction) {
    try {
      const res = await authService.login(request.body);
      return response.status(200).json({
        status: "success",
        payload: res,
      });
    } catch (err: unknown) {
      next(err);
    }
  }

  async signup(request: Request, response: Response, next: NextFunction) {
    try {
      const res = await authService.signup(request.body);
      return response.status(201).json({ status: "success", payload: res });
    } catch (err: unknown) {
      next(err);
    }
  }

  async getInfo(request: Request, response: Response, next: NextFunction) {
    try {
      const id = 200;
      const res = await authService.getInfo(id);
      return response.status(201).json({ status: "success", payload: res });
    } catch (err: unknown) {
      next(err);
    }
  }
}

export const authController = new AuthController();
