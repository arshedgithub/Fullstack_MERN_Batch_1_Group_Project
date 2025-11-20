import { type Application, Router } from "express";
import UserRoutes from "./user.route";

export function SetRoutes(app: Application): void {
  const router = Router();

  app.use("/api", router);

  new UserRoutes(router);

  app.use((req, res) => {
    res.status(404).json({
      message: "API not found",
      path: req.originalUrl,
    });
  });
}