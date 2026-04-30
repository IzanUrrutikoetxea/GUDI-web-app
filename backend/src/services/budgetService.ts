import prisma from "../config/prisma";
import { BudgetStatus } from "@prisma/client";

type BudgetItemInput = {
  description: string;
  quantity: number;
  unitPrice: number;
};

type CreateBudgetInput = {
  title: string;
  clientName: string;
  taxRate?: number;
  items: BudgetItemInput[];
  userId: number;
};

type UpdateBudgetInput = {
  title?: string;
  clientName?: string;
  taxRate?: number;
  status?: BudgetStatus;
  items?: BudgetItemInput[];
};

export type BudgetTotals = {
  subtotal: number;
  taxAmount: number;
  total: number;
};

export const calculateTotals = (
  items: BudgetItemInput[],
  taxRate: number
): BudgetTotals => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );
  const taxAmount = parseFloat((subtotal * (taxRate / 100)).toFixed(2));
  const total = parseFloat((subtotal + taxAmount).toFixed(2));

  return { subtotal: parseFloat(subtotal.toFixed(2)), taxAmount, total };
};

export const createBudget = async (data: CreateBudgetInput) => {
  return prisma.budget.create({
    data: {
      title: data.title,
      clientName: data.clientName,
      taxRate: data.taxRate ?? 0,
      userId: data.userId,
      items: {
        create: data.items,
      },
    },
    include: { items: true },
  });
};

export const getBudgetsByUser = async (userId: number) => {
  return prisma.budget.findMany({
    where: { userId },
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });
};

export const getBudgetById = async (id: number, userId: number) => {
  const budget = await prisma.budget.findUnique({
    where: { id },
    include: { items: true },
  });

  if (!budget) {
    throw new Error("Budget not found");
  }

  if (budget.userId !== userId) {
    throw new Error("Forbidden");
  }

  return budget;
};

export const updateBudget = async (
  id: number,
  userId: number,
  data: UpdateBudgetInput
) => {
  await getBudgetById(id, userId);

  return prisma.budget.update({
    where: { id },
    data: {
      title: data.title,
      clientName: data.clientName,
      taxRate: data.taxRate,
      status: data.status,
      ...(data.items && {
        items: {
          deleteMany: {},
          create: data.items,
        },
      }),
    },
    include: { items: true },
  });
};

export const deleteBudget = async (id: number, userId: number) => {
  await getBudgetById(id, userId);

  return prisma.budget.delete({ where: { id } });
};

export const generateBudgetDocument = async (id: number, userId: number) => {
  const budget = await getBudgetById(id, userId);
  const { subtotal, taxAmount, total } = calculateTotals(budget.items, budget.taxRate);

  return {
    id: budget.id,
    title: budget.title,
    clientName: budget.clientName,
    status: budget.status,
    createdAt: budget.createdAt,
    items: budget.items.map((item) => ({
      description: item.description,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      lineTotal: parseFloat((item.quantity * item.unitPrice).toFixed(2)),
    })),
    subtotal,
    taxRate: budget.taxRate,
    taxAmount,
    total,
  };
};
