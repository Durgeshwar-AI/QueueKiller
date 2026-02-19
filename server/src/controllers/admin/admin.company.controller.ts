import { Request, Response } from "express";
import { generateKey } from "../../services/company.service";
import prisma from "../../utils/client";
import bcrypt from "bcrypt";

export const registerCompany = async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const { name, password, logo, departments } = req.body;

    // ✅ Validation
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Generate key
    const key = generateKey(name);

    // ✅ Create company
    const company = await prisma.company.create({
      data: {
        name,
        key,
        password: hashedPassword,
        logo,
      },
    });

    // ✅ Create departments (if provided)
    if (Array.isArray(departments) && departments.length > 0) {
      await prisma.department.createMany({
        data: departments.map((department) => ({
          companyId: company.id,
          name: department.name,
          ...(department.type && { type: department.type }),
        })),
      });
    }

    return res.status(201).json({
      message: "Company registered successfully",
      companyId: company.id,
      key,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getCompany = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Company id is required" });
    }

    const company = await prisma.company.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        name: true,
        key: true,
        logo: true,
        departments: true,
      },
    });

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    return res.status(200).json(company);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllCompanies = async (req: Request, res: Response) => {
  try {
    const companies = await prisma.company.findMany({
      select: {
        id: true,
        name: true,
        key: true,
        logo: true,
      },
    });

    return res.status(200).json(companies);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
