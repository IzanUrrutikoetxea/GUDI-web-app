import prisma from "../config/prisma";

export const getAllUsers = async () => {
  return prisma.user.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });
};

export const createUser = async (name: string, email: string) => {
  return prisma.user.create({
    data: {
      name,
      email
    }
  });
};