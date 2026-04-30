import { Request, Response } from "express";
import {
  createBudget,
  deleteBudget,
  generateBudgetDocument,
  getBudgetById,
  getBudgetsByUser,
  updateBudget,
} from "../services/budgetService";
import { BudgetStatus } from "@prisma/client";

export const create = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { title, clientName, taxRate, items } = req.body;

    if (!title || !clientName || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Title, clientName and at least one item are required" });
    }

    const budget = await createBudget({ title, clientName, taxRate, items, userId });

    return res.status(201).json(budget);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create budget";
    return res.status(400).json({ message });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const budgets = await getBudgetsByUser(userId);

    return res.status(200).json(budgets);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch budgets";
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
      return res.status(400).json({ message: "Invalid budget id" });
    }

    const budget = await getBudgetById(id, userId);

    return res.status(200).json(budget);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch budget";
    const status = message === "Budget not found" ? 404 : message === "Forbidden" ? 403 : 400;
    return res.status(status).json({ message });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const id = parseInt(req.params.id as string, 10);

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid budget id" });
    }

    const { title, clientName, taxRate, status, items } = req.body;

    if (status && !Object.values(BudgetStatus).includes(status)) {
      return res.status(400).json({ message: `Invalid status. Valid values: ${Object.values(BudgetStatus).join(", ")}` });
    }

    const budget = await updateBudget(id, userId, { title, clientName, taxRate, status, items });

    return res.status(200).json(budget);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update budget";
    const status = message === "Budget not found" ? 404 : message === "Forbidden" ? 403 : 400;
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
      return res.status(400).json({ message: "Invalid budget id" });
    }

    await deleteBudget(id, userId);

    return res.status(204).send();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete budget";
    const status = message === "Budget not found" ? 404 : message === "Forbidden" ? 403 : 400;
    return res.status(status).json({ message });
  }
};

export const document = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const id = parseInt(req.params.id as string, 10);

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid budget id" });
    }

    const doc = await generateBudgetDocument(id, userId);

    return res.status(200).json(doc);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to generate document";
    const status = message === "Budget not found" ? 404 : message === "Forbidden" ? 403 : 400;
    return res.status(status).json({ message });
  }
};
