import { Request, Response } from "express";
import prisma from "../../utils/client";
import bcrypt from "bcrypt";
import { generateCompanyToken } from "../../utils/token";

export const companyLogin = async (
  req: Request<{}, {}, { key: string; password: string }>,
  res: Response<{
    message: string;
    token?: string;
    company?: { id: number; name: string };
  }>,
) => {
  try {
    const { key, password } = req.body;

    const company = await prisma.company.findUnique({
      where: { key },
    });

    if (!company) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = generateCompanyToken(company.key, company.id);

    res.status(200).json({
      message: "Login successful",
      token,
      company: {
        id: company.id,
        name: company.name,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const companyLogout = () => {};
