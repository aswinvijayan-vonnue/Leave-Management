import Router from "express";
import { authController } from "./auth.controller";
import { validate } from "../middleware/validation";
import { loginSchema, signupSchema } from "./auth.schema";

const authRouter = Router();

authRouter.post("/login", validate(loginSchema, "body"), authController.login);

authRouter.post(
  "/signup",
  validate(signupSchema, "body"),
  authController.signup,
);

export default authRouter;
