import cors from "cors";
import express, { Application, Request, Response } from "express";
import { userRoutes } from "./app/module/user/user.route";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// application routes
app.use("/api/users", userRoutes);

export default app;
