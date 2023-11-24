import express from "express";
import { userControllers } from "./user.controller";

const router = express.Router();

router.post("/api/users", userControllers.createUser);

export default router;
