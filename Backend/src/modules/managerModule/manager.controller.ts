import { ManagerService } from "./manager.service";
import type { Response, NextFunction } from "express";
import type { AuthenticatedRequest } from "../../types/types";

const managerService = new ManagerService();

class ManagerController {
  async updateStatus(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id, status } = req.body;
      console.log(`here with ${id} and ${status}`);
      const data = await managerService.updateStatus(id, status);
      res.status(200).json({ status: "success", payload: { data } });
    } catch (err) {
      next(err);
    }
  }

  async getPendingRequest(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const data = await managerService.getPendingRequest();
      res.status(200).json({ status: "success", payload: { data } });
    } catch (err) {
      next(err);
    }
  }

  async getRequestStat(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const data = await managerService.getRequestStat();
      console.log(data);
      res.status(200).json({ status: "success", payload: { data } });
    } catch (err) {
      next(err);
    }
  }

  async getRequests(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const data = await managerService.getRequests();
      res.status(200).json({ status: "success", payload: { data } });
    } catch (err) {
      next(err);
    }
  }
}

export const managerController = new ManagerController();
