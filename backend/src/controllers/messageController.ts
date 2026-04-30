import { Request, Response } from "express";
import {
  createMessage,
  deleteMessage,
  getInboxStats,
  getMessageById,
  getMessagesByUser,
  updateMessageStatus,
} from "../services/messageService";
import { MessageChannel, MessageStatus } from "@prisma/client";

export const create = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { subject, body, channel, senderName, senderContact } = req.body;

    if (!body || !channel || !senderName || !senderContact) {
      return res.status(400).json({ message: "body, channel, senderName and senderContact are required" });
    }

    if (!Object.values(MessageChannel).includes(channel)) {
      return res.status(400).json({ message: `Invalid channel. Valid values: ${Object.values(MessageChannel).join(", ")}` });
    }

    const message = await createMessage({ subject, body, channel, senderName, senderContact, userId });

    return res.status(201).json(message);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create message";
    return res.status(400).json({ message });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { channel, status } = req.query;

    if (channel && !Object.values(MessageChannel).includes(channel as MessageChannel)) {
      return res.status(400).json({ message: `Invalid channel. Valid values: ${Object.values(MessageChannel).join(", ")}` });
    }

    if (status && !Object.values(MessageStatus).includes(status as MessageStatus)) {
      return res.status(400).json({ message: `Invalid status. Valid values: ${Object.values(MessageStatus).join(", ")}` });
    }

    const messages = await getMessagesByUser(userId, {
      channel: channel as MessageChannel | undefined,
      status: status as MessageStatus | undefined,
    });

    return res.status(200).json(messages);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch messages";
    return res.status(500).json({ message });
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const id = parseInt(req.params.id as string, 10);

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid message id" });
    }

    const message = await getMessageById(id, userId);

    return res.status(200).json(message);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch message";
    const status = message === "Message not found" ? 404 : message === "Forbidden" ? 403 : 400;
    return res.status(status).json({ message });
  }
};

export const updateStatus = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const id = parseInt(req.params.id as string, 10);

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid message id" });
    }

    const { status } = req.body;

    if (!status || !Object.values(MessageStatus).includes(status)) {
      return res.status(400).json({ message: `Invalid status. Valid values: ${Object.values(MessageStatus).join(", ")}` });
    }

    const message = await updateMessageStatus(id, userId, status);

    return res.status(200).json(message);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update message status";
    const status = message === "Message not found" ? 404 : message === "Forbidden" ? 403 : 400;
    return res.status(status).json({ message });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const id = parseInt(req.params.id as string, 10);

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid message id" });
    }

    await deleteMessage(id, userId);

    return res.status(204).send();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete message";
    const status = message === "Message not found" ? 404 : message === "Forbidden" ? 403 : 400;
    return res.status(status).json({ message });
  }
};

export const stats = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const data = await getInboxStats(userId);

    return res.status(200).json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch inbox stats";
    return res.status(500).json({ message });
  }
};
