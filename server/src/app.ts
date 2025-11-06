import express from "express";
import type { Application, Request, Response } from "express";
import connectDB from "./config/db.config";
// import productRoutes from "./routes/productRoutes";

const app: Application = express();

app.use(express.json());

// Connect MongoDB
connectDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome!");
});

app.get("/test", (req: Request, res: Response) => {
  res.send("Testing!");
});

// app.use("/api/products", productRoutes);

export default app;
