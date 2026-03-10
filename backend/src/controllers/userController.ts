import { Request, Response } from "express";
import { createUser, getAllUsers } from "../services/userService";

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
};

export const createUserHandler = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        error: "Name and email are required"
      });
    }

    const user = await createUser(name, email);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ error: "Error creating user" });
  }
};