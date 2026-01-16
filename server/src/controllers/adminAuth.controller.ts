import { Request, Response } from "express";
import { User } from "../models/user.model";
import { generateToken } from "../utils/token";
import bcrypt from "bcrypt";

export const registerAdmin = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body as {
      name: string;
      email: string;
      password: string;
    };

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email, and password are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "admin",
    });

    const token = generateToken(user.email, 30);

    return res.status(201).json({
      message: "Admin registered successfully",
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: unknown) {
    let errorMessage = "Unknown error";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    console.error("Register Admin Error:", errorMessage);

    return res.status(500).json({
      message: "Server error",
      error: errorMessage,
    });
  }
};
