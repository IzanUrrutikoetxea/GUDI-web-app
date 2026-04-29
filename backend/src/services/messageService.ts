import prisma from "../config/prisma";
import { MessageChannel, MessageStatus } from "@prisma/client";

type CreateMessageInput = {
  subject?: string;
  body: string;
  channel: MessageChannel;
  senderName: string;
  senderContact: string;
  userId: number;
};

type GetMessagesFilter = {
  channel?: MessageChannel;
  status?: MessageStatus;
};

export const createMessage = async (data: CreateMessageInput) => {
  return prisma.message.create({ data });
};

export const getMessagesByUser = async (
  userId: number,
  filter: GetMessagesFilter = {}
) => {
  return prisma.message.findMany({
    where: {
      userId,
      ...(filter.channel && { channel: filter.channel }),
      ...(filter.status && { status: filter.status }),
    },
    orderBy: { createdAt: "desc" },
  });
};

export const getMessageById = async (id: number, userId: number) => {
  const message = await prisma.message.findUnique({ where: { id } });

  if (!message) {
    throw new Error("Message not found");
  }

  if (message.userId !== userId) {
    throw new Error("Forbidden");
  }

  return message;
};

export const updateMessageStatus = async (
  id: number,
  userId: number,
  status: MessageStatus
) => {
  await getMessageById(id, userId);

  return prisma.message.update({
    where: { id },
    data: { status },
  });
};

export const deleteMessage = async (id: number, userId: number) => {
  await getMessageById(id, userId);

  return prisma.message.delete({ where: { id } });
};

export const getInboxStats = async (userId: number) => {
  const counts = await prisma.message.groupBy({
    by: ["channel"],
    where: { userId, status: MessageStatus.UNREAD },
    _count: { id: true },
  });

  const stats: Record<string, number> = {
    EMAIL: 0,
    WHATSAPP: 0,
    INTERNAL: 0,
  };

  for (const row of counts) {
    stats[row.channel] = row._count.id;
  }

  stats.total = stats.EMAIL + stats.WHATSAPP + stats.INTERNAL;

  return stats;
};
