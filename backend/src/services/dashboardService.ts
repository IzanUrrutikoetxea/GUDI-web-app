import prisma from "../config/prisma";

export const getDashboardStats = async () => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [totalUsers, adminCount, newUsersThisMonth, recentUsers] =
    await Promise.all([
      prisma.user.count(),

      prisma.user.count({
        where: { role: "ADMIN" },
      }),

      prisma.user.count({
        where: {
          createdAt: { gte: startOfMonth },
        },
      }),

      prisma.user.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
        },
      }),
    ]);

  return {
    users: {
      total: totalUsers,
      admins: adminCount,
      regular: totalUsers - adminCount,
      newThisMonth: newUsersThisMonth,
    },
    recentActivity: recentUsers,
  };
};
