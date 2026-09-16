import express from "express";
import { ErrorHandler, NotFoundHandler } from "./middleware/error.middleware";
import authRouter from "./modules/authModule/auth.router";
const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ success: true, msg: "OK" });
});

app.use("/api/auth",authRouter);

app.use(NotFoundHandler);
app.use(ErrorHandler);

export default app;
