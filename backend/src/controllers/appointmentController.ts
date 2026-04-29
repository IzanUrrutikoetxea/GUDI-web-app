import { Request, Response } from "express";
import {
  createAppointment,
  deleteAppointment,
  getAppointmentById,
  getAppointmentsByUser,
  updateAppointment,
} from "../services/appointmentService";

export const create = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { title, description, startDate, endDate } = req.body;

    if (!title || !startDate || !endDate) {
      return res.status(400).json({ message: "Title, startDate and endDate are required" });
    }

    const appointment = await createAppointment({
      title,
      description,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      userId,
    });

    return res.status(201).json(appointment);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create appointment";
    return res.status(400).json({ message });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const appointments = await getAppointmentsByUser(userId);

    return res.status(200).json(appointments);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch appointments";
    return res.status(500).json({ message });
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const id = parseInt(req.params.id as string, 10);

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid appointment id" });
    }

    const appointment = await getAppointmentById(id, userId);

    return res.status(200).json(appointment);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch appointment";
    const status = message === "Appointment not found" ? 404 : message === "Forbidden" ? 403 : 400;
    return res.status(status).json({ message });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const id = parseInt(req.params.id as string, 10);

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid appointment id" });
    }

    const { title, description, startDate, endDate } = req.body;

    const appointment = await updateAppointment(id, userId, {
      title,
      description,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
    });

    return res.status(200).json(appointment);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update appointment";
    const status = message === "Appointment not found" ? 404 : message === "Forbidden" ? 403 : 400;
    return res.status(status).json({ message });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const id = parseInt(req.params.id as string, 10);

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid appointment id" });
    }

    await deleteAppointment(id, userId);

    return res.status(204).send();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete appointment";
    const status = message === "Appointment not found" ? 404 : message === "Forbidden" ? 403 : 400;
    return res.status(status).json({ message });
  }
};
