import { type Application, Router } from "express";
import UserRoutes from "./user.route";
import OrderRoutes from "./order.route";  
import ProductRoutes from "./product.route";

export function SetRoutes(app: Application): void {
  const router = Router();

  app.use("/api", router);

  new UserRoutes(router);
  new ProductRoutes(router);

  new OrderRoutes(router);

  app.use((req, res) => {
    res.status(404).json({
      message: "API not found",
      path: req.originalUrl,
    });
  });
}