import { Router } from "express";
import userRoutes from "./userRoutes";
import authRoutes from "./authRoutes";
import dashboardRoutes from "./dashboardRoutes";
import appointmentRoutes from "./appointmentRoutes";

const router = Router();

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/appointments", appointmentRoutes);

export default router;
