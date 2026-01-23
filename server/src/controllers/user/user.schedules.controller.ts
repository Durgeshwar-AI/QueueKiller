import { Request, Response } from "express";
import prisma from "../../utils/client";

export const getAllSchedules = async (req: Request, res: Response) => {
  try {
    const departments = await prisma.department.findMany({
      include: {
        company: {
          select: {
            name: true,
            logo: true,
          },
        },
      },
    });

    return res.status(200).json({ departments });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getSchedule = async (req: Request, res: Response) => {
  try {
    const { departmentId } = req.params;

    const department = await prisma.department.findUnique({
      where: {
        id: Number(departmentId),
      },
      include: {
        schedules: true,
      },
    });

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    return res.status(200).json({ schedules: department.schedules });
  } catch (error) {
    console.error("Get schedule error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
