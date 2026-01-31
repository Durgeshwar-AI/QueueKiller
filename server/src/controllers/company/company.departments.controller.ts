import { Request, Response } from "express";
import prisma from "../../utils/client";
import { DepartmentType } from "../../generated/enums";

export const getAllDepartments = async (req: Request, res: Response) => {
  try {
    const { company } = req.body;

    if (!company || !company.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const departments = await prisma.department.findMany({
      where: {
        companyId: company.id,
      },
      include: {
        schedules: {
          select: {
            id: true,
            date: true,
            startTime: true,
            endTime: true,
            status: true,
          },
        },
      },
    });

    res.status(200).json({
      message: "Departments retrieved successfully",
      departments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getDepartmentById = async (
  req: Request<{ departmentID: string }>,
  res: Response,
) => {
  try {
    const { departmentID } = req.params;
    const { company } = req.body;

    if (!company || !company.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const department = await prisma.department.findFirst({
      where: {
        id: parseInt(departmentID),
        companyId: company.id,
      },
      include: {
        schedules: {
          select: {
            id: true,
            date: true,
            startTime: true,
            endTime: true,
            status: true,
          },
        },
      },
    });

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.status(200).json({
      message: "Department retrieved successfully",
      department,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateDepartment = async (req: Request, res: Response) => {
  try {
    const { id, name, type } = req.body;
    const { company } = req.body;

    if (!company || !company.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!id) {
      return res.status(400).json({ message: "Department ID is required" });
    }

    // Verify department belongs to company
    const department = await prisma.department.findFirst({
      where: {
        id,
        companyId: company.id,
      },
    });

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    const updateData: Partial<{ name: string; type: DepartmentType }> = {};
    if (name) updateData.name = name;
    if (type) updateData.type = type;

    const updatedDepartment = await prisma.department.update({
      where: { id },
      data: updateData,
      include: {
        schedules: {
          select: {
            id: true,
            date: true,
            startTime: true,
            endTime: true,
            status: true,
          },
        },
      },
    });

    res.status(200).json({
      message: "Department updated successfully",
      department: updatedDepartment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
