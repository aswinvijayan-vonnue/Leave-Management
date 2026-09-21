import { Router } from "express";
import { employeeController } from "./employeeLeave.controller";
import { requireAuth } from "../../middleware/auth.middleware";
import { createLeaveRequestSchema } from "./employee.schema";
import { validate } from "../../middleware/validation";
const employeeRoutes = Router();

employeeRoutes.get("/stats", requireAuth, employeeController.getLeaveStat);
employeeRoutes.get(
  "/req-history",
  requireAuth,
  employeeController.getLeaveHistory,
);
employeeRoutes.get(
  "/leave",
  requireAuth,
  employeeController.getLeaveTypes,
);
employeeRoutes.post(
  "/request",
  requireAuth,
  validate(createLeaveRequestSchema, "body"),
  employeeController.createNewRequest,
);

export default employeeRoutes;
