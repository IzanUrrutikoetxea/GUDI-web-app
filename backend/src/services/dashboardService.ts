import prisma from "../config/prisma";

export const getDashboardStats = async () => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const [
        totalUsers,
        totalAdmins,
        regularUsers,
        usersCreatedLast7Days,
        recentUsers,
    ] = await prisma.$transaction([
        prisma.user.count(),
        prisma.user.count({ where: { role: "ADMIN" } }),
        prisma.user.count({ where: { role: "USER" } }),
        prisma.user.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
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
        summary: {
            totalUsers,
            totalAdmins,
            regularUsers,
            usersCreatedLast7Days,
        },
        activity: recentUsers,
        system: {
            generatedAt: new Date().toISOString(),
            status: "operational", // ← CORREGIDO
        },
    };
};