import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma";

type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

type LoginInput = {
  email: string;
  password: string;
};

const generateToken = (userId: number, role: string): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  return jwt.sign(
    { userId, role },
    secret,
    { expiresIn: "7d" }
  );
};

export const registerUser = async ({ name, email, password }: RegisterInput) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const token = generateToken(newUser.id, newUser.role);

  return {
    token,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      createdAt: newUser.createdAt,
    },
  };
};

export const loginUser = async ({ email, password }: LoginInput) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken(user.id, user.role);

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    },
  };
};

export const getCurrentUser = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  };
};