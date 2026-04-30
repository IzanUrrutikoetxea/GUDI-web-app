import prisma from "../config/prisma";

type CreateAppointmentInput = {
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  userId: number;
};

type UpdateAppointmentInput = {
  title?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
};

const validateDates = (startDate: Date, endDate: Date) => {
  if (endDate <= startDate) {
    throw new Error("End date must be after start date");
  }
};

export const createAppointment = async (data: CreateAppointmentInput) => {
  validateDates(data.startDate, data.endDate);

  return prisma.appointment.create({
    data: {
      title: data.title,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
      userId: data.userId,
    },
  });
};

export const getAppointmentsByUser = async (userId: number) => {
  return prisma.appointment.findMany({
    where: { userId },
    orderBy: { startDate: "asc" },
  });
};

export const getAppointmentById = async (id: number, userId: number) => {
  const appointment = await prisma.appointment.findUnique({
    where: { id },
  });

  if (!appointment) {
    throw new Error("Appointment not found");
  }

  if (appointment.userId !== userId) {
    throw new Error("Forbidden");
  }

  return appointment;
};

export const updateAppointment = async (
  id: number,
  userId: number,
  data: UpdateAppointmentInput
) => {
  const existing = await getAppointmentById(id, userId);

  const startDate = data.startDate ?? existing.startDate;
  const endDate = data.endDate ?? existing.endDate;

  validateDates(startDate, endDate);

  return prisma.appointment.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
    },
  });
};

export const deleteAppointment = async (id: number, userId: number) => {
  await getAppointmentById(id, userId);

  return prisma.appointment.delete({
    where: { id },
  });
};
