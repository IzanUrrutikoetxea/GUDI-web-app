import { Request, Response } from "express";
import { getDashboardStats } from "../services/dashboardService";

export const getStats = async (req: Request, res: Response) => {
  try {
    const stats = await getDashboardStats();
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving dashboard stats" });
  }
};
