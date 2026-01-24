import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { generateUserToken } from "../../utils/token";
import prisma from "../../utils/client";

export const userRegister = async (
  req: Request<{}, {}, { name: string; email: string; password: string }>,
  res: Response<{
    message: string;
    token?: string;
    user?: { id: number; name: string; email: string };
  }>,
) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const token = generateUserToken(user.email, user.id);

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const userLogin = async (
  req: Request<{}, {}, { email: string; password: string }>,
  res: Response<{
    message: string;
    token?: string;
    user?: { id: number; name: string; email: string };
  }>,
) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = generateUserToken(user.email, user.id);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const userLogout = async (req: Request, res: Response) => {
  res.status(200).json({ message: "Logout" });
};

// export const pingUser = async (req: Request, res: Response) => {
//   const userId = req.body.user?.id;

//   try {
//     const user = await prisma.user.findUnique({
//       where: { id: userId },
//     });

//     if (!user) {
//       return res.status(401).json({ message: "No user found" });
//     }

//     const token = generateToken(user.email, user.id);

//     res.status(200).json({
//       token,
//       name: user.name,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
