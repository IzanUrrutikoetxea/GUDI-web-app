import { Router } from "express";
import userRoutes from "./userRoutes";
import authRoutes from "./authRoutes";
import dashboardRoutes from "./dashboardRoutes";
import appointmentRoutes from "./appointmentRoutes";
import budgetRoutes from "./budgetRoutes";
import messageRoutes from "./messageRoutes";

const router = Router();

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/appointments", appointmentRoutes);
router.use("/budgets", budgetRoutes);
router.use("/messages", messageRoutes);

export default router;
