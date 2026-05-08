import { api } from "./api";
import { Budget, BudgetStatus } from "../types";

type BudgetItemInput = {
  description: string;
  quantity: number;
  unitPrice: number;
};

type BudgetInput = {
  title: string;
  clientName: string;
  taxRate?: number;
  items: BudgetItemInput[];
};

type BudgetUpdate = Partial<BudgetInput> & { status?: BudgetStatus };

export interface BudgetDocument {
  id: number;
  title: string;
  clientName: string;
  status: BudgetStatus;
  createdAt: string;
  items: { description: string; quantity: number; unitPrice: number; lineTotal: number }[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
}

export const budgetService = {
  getAll: () => api.get<Budget[]>("/budgets"),
  getOne: (id: number) => api.get<Budget>(`/budgets/${id}`),
  create: (data: BudgetInput) => api.post<Budget>("/budgets", data),
  update: (id: number, data: BudgetUpdate) => api.put<Budget>(`/budgets/${id}`, data),
  remove: (id: number) => api.delete<void>(`/budgets/${id}`),
  document: (id: number) => api.get<BudgetDocument>(`/budgets/${id}/document`),
};
