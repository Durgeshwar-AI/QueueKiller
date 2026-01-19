import { Request, Response } from "express";
import prisma from "../../utils/client";

export const getAllDepartments = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.query;

    if (!companyId) {
      return res.status(400).json({ message: "companyId is required" });
    }

    const departments = await prisma.department.findMany({
      where: {
        companyId: Number(companyId),
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return res.status(200).json(departments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const addDepartment = async (req: Request, res: Response) => {
  try {
    const { companyId, name, type } = req.body;

    if (!companyId) {
      return res.status(400).json({ message: "companyId is required" });
    }

    if (!name) {
      return res.status(400).json({ message: "Department name is required" });
    }

    // 🔍 Check company exists
    const company = await prisma.company.findUnique({
      where: { id: Number(companyId) },
      select: { id: true },
    });

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    // 🔁 Prevent duplicate department
    const existingDepartment = await prisma.department.findFirst({
      where: {
        companyId: Number(companyId),
        name,
      },
    });

    if (existingDepartment) {
      return res
        .status(409)
        .json({ message: "Department already exists for this company" });
    }

    const department = await prisma.department.create({
      data: {
        companyId: Number(companyId),
        name,
        ...(type && { type }),
      },
    });

    return res.status(201).json({
      message: "Department added successfully",
      department,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
