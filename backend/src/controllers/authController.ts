import { Request, Response } from "express";
import { getCurrentUser, loginUser, registerUser } from "../services/authService";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    const result = await registerUser({ name, email, password });

    return res.status(201).json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Registration failed";

    return res.status(400).json({ message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const result = await loginUser({ email, password });

    return res.status(200).json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Login failed";

    return res.status(401).json({ message });
  }
};

export const me = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const user = await getCurrentUser(userId);

    return res.status(200).json(user);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch user";

    return res.status(400).json({ message });
  }
};