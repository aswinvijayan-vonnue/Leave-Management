import express from "express";
import cors from "cors";
import { ErrorHandler, NotFoundHandler } from "./middleware/error.middleware";
import authRouter from "./modules/authModule/auth.router";
import employeeRoutes from "./modules/employeeModule/employeeLeave.router";
import managerRoutes from "./modules/managerModule/manager.routes";
const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ success: true, msg: "OK" });
});

app.use("/api/auth", authRouter);
app.use("/employee", employeeRoutes);
app.use("/manager", managerRoutes);

app.use(NotFoundHandler);
app.use(ErrorHandler);

export default app;
