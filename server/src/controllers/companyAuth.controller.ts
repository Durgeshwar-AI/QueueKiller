import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { generateCompanyToken } from "../utils/token";
import { AuthenticatedRequest } from "../middlewares/auth.middleware";
import prisma from "../utils/client";
import { generateKey } from "../services/company.service";
import { department } from "../types/department";
import * as Enums from "../generated/enums";

export const registerCompany = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const adminMail = req.body.user?.email;
    const { name, departments, password } = req.body;
    const admin = prisma.admin.findUnique({
      where: { email: adminMail },
    });
    if (!admin) {
      return res
        .status(401)
        .json({ message: "Only admins can register company" });
    }
    const key = generateKey(name);
    const hashedPassword = await bcrypt.hash(password, 10);
    const company = await prisma.company.create({
      data: { name, key, password: hashedPassword },
    });

    departments.map(async (department: department) => {
      const key = (
        department.type ? department.type.toUpperCase() : "GENERAL"
      ) as keyof typeof Enums.DepartmentType;
      const deptType = Enums.DepartmentType[key];
      await prisma.department.create({
        data: {
          name: department.name,
          companyId: company.id,
          type: deptType,
        },
      });
    });

    res.status(201).json({
      message: "Company registered successfully",
      company: {
        id: company.id,
        name: company.name,
        key: company.key,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const companyLogin = async (req: Request, res: Response) => {
  try {
    const { key, password } = req.body;
    const company = await prisma.company.findUnique({ where: { key } });
    if (!company) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = generateCompanyToken(company.key, 20);
    res.status(200).json({
      message: "Login successful",
      token,
      company: {
        id: company.id,
        name: company.name,
        email: company.key,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
