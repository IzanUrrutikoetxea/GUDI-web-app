import { api } from "./api";
import { Appointment } from "../types";

type AppointmentInput = {
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
};

export const appointmentService = {
  getAll: () => api.get<Appointment[]>("/appointments"),
  getOne: (id: number) => api.get<Appointment>(`/appointments/${id}`),
  create: (data: AppointmentInput) => api.post<Appointment>("/appointments", data),
  update: (id: number, data: Partial<AppointmentInput>) =>
    api.put<Appointment>(`/appointments/${id}`, data),
  remove: (id: number) => api.delete<void>(`/appointments/${id}`),
};
