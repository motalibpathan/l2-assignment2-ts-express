import express from "express";
import { userControllers } from "./user.controller";

const router = express.Router();

router.post("/", userControllers.createUser);

router.get("/", userControllers.getAllUsers);

router.get("/:userId", userControllers.getUserById);

router.put("/:userId", userControllers.updateUser);

router.delete("/:userId", userControllers.deleteUser);

router.get("/:userId/orders", userControllers.getUserOrders);

router.put("/:userId/orders", userControllers.addNewOrder);

export const userRoutes = router;
