import { Router } from "express";
import { requireAuth, authorize } from "../../middleware/auth.middleware";
import { managerController } from "./manager.controller";

const managerRoutes = Router();

managerRoutes.patch(
  "/status-update",
  requireAuth,
  authorize("manager"),
  managerController.updateStatus,
);

managerRoutes.get(
  "/pending",
  requireAuth,
  authorize("manager"),
  managerController.getPendingRequest,
);

managerRoutes.get(
  "/requests",
  requireAuth,
  authorize("manager"),
  managerController.getRequests,
);

managerRoutes.get(
  "/stats",
  requireAuth,
  authorize("manager"),
  managerController.getRequestStat,
);


export default managerRoutes;