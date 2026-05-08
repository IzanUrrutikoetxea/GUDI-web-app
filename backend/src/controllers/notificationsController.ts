import { Request, Response } from "express";
import { sendNotification, getNotificationStats } from "../config/grpcClient";

export const send = async (req: Request, res: Response) => {
  try {
    const { recipient, content, channel } = req.body;

    if (!recipient || !content || !channel) {
      return res.status(400).json({ message: "recipient, content and channel are required" });
    }

    const result = await sendNotification(recipient, content, channel);
    return res.status(200).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to send notification";
    return res.status(500).json({ message });
  }
};

export const stats = async (_req: Request, res: Response) => {
  try {
    const result = await getNotificationStats();
    return res.status(200).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to get notification stats";
    return res.status(500).json({ message });
  }
};
