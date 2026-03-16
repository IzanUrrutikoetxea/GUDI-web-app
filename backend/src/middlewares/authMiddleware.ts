import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

type JwtPayload = {
  userId: number;
  role: string;
};

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authorization token missing or invalid",
      });
    }

    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET is not defined");
    }

    const decoded = jwt.verify(token, secret) as JwtPayload;

    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};