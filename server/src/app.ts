import "./config/env.config";
import express from "express";
import type { Application, Request, Response } from "express";
import cors from "cors";
import connectDB from "./config/db.config";
import { SetRoutes } from "./routes/routes";

const app: Application = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

connectDB();

app.get("/test", (req: Request, res: Response) => {
  res.send("Testing!");
});

SetRoutes(app)

export default app;
