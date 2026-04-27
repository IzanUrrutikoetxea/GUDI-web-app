import { Request, Response } from "express";
import { getDashboardStats } from "../services/dashboardService";

export const stats = async (req: Request, res: Response) => {
    try {
        // Logging de acceso (muy importante según la corrección)
        console.log({
            event: "dashboard_stats_access",
            userId: req.user?.userId,
            ip: req.ip,
            timestamp: new Date().toISOString(),
        });

        const data = await getDashboardStats();

        return res.status(200).json(data);

    } catch (error) {
        // Log interno (no mostrar al cliente)
        console.error("Dashboard stats error:", error);

        return res.status(500).json({
            message: "Failed to fetch dashboard stats",
        });
    }
};