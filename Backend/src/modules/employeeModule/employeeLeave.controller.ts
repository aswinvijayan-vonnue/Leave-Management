import type { Request, Response, NextFunction } from "express";
import type { AuthenticatedRequest } from "../../types/types";
import { EmployeeService } from "./employeeLeave.service";

const employeeService = new EmployeeService();

class EmployeeController {
  async getLeaveStat(req: Request, res: Response, next: NextFunction) {
    try {
      const id = (req as AuthenticatedRequest).user!.userId;
      const result = await employeeService.getLeaveStat(id);
      res.status(200).json({ status: "success", payload: { data: result } });
    } catch (err) {
      next(err);
    }
  }
  async getLeaveHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const id = (req as AuthenticatedRequest).user!.userId;
      const result = await employeeService.getRequestHistory(id);
      res.status(200).json({ status: "success", payload: { data: result } });
    } catch (err) {
      next(err);
    }
  }

  async createNewRequest(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const id = req.user!.userId;
      const result = await employeeService.createRequest(req.body, id);
      res.status(201).json({ status: "success", payload: { result } });
    } catch (err) {
      next(err);
    }
  }
  async getLeaveTypes(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await employeeService.getLeaveTypes();
      res.status(200).json({ status: "success", payload: { data:result } });
    } catch (err) {
      next(err);
    }
  }
}

export const employeeController = new EmployeeController();
