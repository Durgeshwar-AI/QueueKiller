import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { generateAdminToken } from "../../utils/token";
import prisma from "../../utils/client";

export const adminLogin = async (
  req: Request<{}, {}, { email: string; password: string }>,
  res: Response<{
    message: string;
    token?: string;
    user?: { id: number; email: string; role: string };
  }>,
) => {
  try {
    const { email, password } = req.body;

    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = generateAdminToken(admin.id, admin.email, "admin");

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: admin.id,
        email: admin.email,
        role: "admin",
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const adminLogout = async () => {};
