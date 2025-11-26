import { type Application, Router } from "express";
import UserRoutes from "./user.route";
import ProductRoutes from "./product.route";

export function SetRoutes(app: Application): void {
  const router = Router();

  app.use("/api", router);

  new UserRoutes(router);
  new ProductRoutes(router);

  app.use((req, res) => {
    res.status(404).json({
      message: "API not found",
      path: req.originalUrl,
    });
  });
}