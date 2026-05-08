import { api } from "./api";
import { Message, MessageChannel, MessageStatus } from "../types";

type MessageInput = {
  subject?: string;
  body: string;
  channel: MessageChannel;
  senderName: string;
  senderContact: string;
};

export interface InboxStats {
  total: number;
  unread: number;
  byChannel: Record<MessageChannel, number>;
}

export const messageService = {
  getAll: (filters?: { channel?: MessageChannel; status?: MessageStatus }) => {
    const params = new URLSearchParams();
    if (filters?.channel) params.set("channel", filters.channel);
    if (filters?.status) params.set("status", filters.status);
    const query = params.toString();
    return api.get<Message[]>(`/messages${query ? `?${query}` : ""}`);
  },
  getOne: (id: number) => api.get<Message>(`/messages/${id}`),
  create: (data: MessageInput) => api.post<Message>("/messages", data),
  updateStatus: (id: number, status: MessageStatus) =>
    api.patch<Message>(`/messages/${id}/status`, { status }),
  remove: (id: number) => api.delete<void>(`/messages/${id}`),
  stats: () => api.get<InboxStats>("/messages/stats"),
};
