import "./config/env.config";
import express from "express";
import type { Application, Request, Response } from "express";
import connectDB from "./config/db.config";
import { SetRoutes } from "./routes/routes";

const app: Application = express();

app.use(express.json());

connectDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome!");
});

app.get("/test", (req: Request, res: Response) => {
  res.send("Testing!");
});

SetRoutes(app)

export default app;
