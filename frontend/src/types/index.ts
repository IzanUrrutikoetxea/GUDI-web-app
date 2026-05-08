export type UserRole = "ADMIN" | "USER";

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Appointment {
  id: number;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export type BudgetStatus = "DRAFT" | "SENT" | "ACCEPTED" | "REJECTED";
export type MessageChannel = "EMAIL" | "WHATSAPP" | "INTERNAL";
export type MessageStatus = "UNREAD" | "READ" | "ARCHIVED";

export interface BudgetItem {
  id: number;
  description: string;
  quantity: number;
  unitPrice: number;
  budgetId: number;
}

export interface Budget {
  id: number;
  title: string;
  clientName: string;
  taxRate: number;
  status: BudgetStatus;
  userId: number;
  items: BudgetItem[];
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: number;
  subject?: string;
  body: string;
  channel: MessageChannel;
  status: MessageStatus;
  senderName: string;
  senderContact: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalUsers: number;
  totalAppointments: number;
  totalBudgets: number;
  totalMessages: number;
}
