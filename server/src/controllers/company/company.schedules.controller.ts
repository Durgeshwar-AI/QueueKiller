import { Request, Response } from "express";
import prisma from "../../utils/client";
import { statusTypes } from "../../generated/enums";
import { enqueueScheduleProcessing } from "../../utils/queue";
import { checkRedis } from "../../utils/redis";

export const getScheduleByDepartmentId = async (
  req: Request<{ departmentID: string }>,
  res: Response,
) => {
  try {
    const { departmentID } = req.params;
    const { company } = req.body;

    if (!company || !company.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Verify department belongs to company
    const department = await prisma.department.findFirst({
      where: {
        id: parseInt(departmentID),
        companyId: company.id,
      },
    });

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    // Enqueue background processing for this department (deduped per department)
    try {
      await enqueueScheduleProcessing(parseInt(departmentID));
    } catch (e) {
      console.error("Failed to enqueue schedule processing job (company):", e);
    }

    // Return schedules from last 30 days to future and include Expired
    const lookbackCutoff = new Date();
    lookbackCutoff.setDate(lookbackCutoff.getDate() - 30);

    const schedules = await prisma.schedules.findMany({
      where: {
        departmentId: parseInt(departmentID),
        date: {
          gte: lookbackCutoff,
        },
        status: { in: ["Available", "Locked", "Booked", "Expired"] },
      },
      include: {
        booked: {
          select: {
            id: true,
            userId: true,
            status: true,
          },
        },
      },
      orderBy: { startTime: "asc" },
    });

    // Map statuses by checking Redis locks and startTime
    const now = new Date();
    const schedulesWithStatus = await Promise.all(
      schedules.map(async (s) => {
        const lock = await checkRedis(`schedule_lock:${s.id}`);
        let status = lock ? "Locked" : s.status;
        if (s.startTime && s.startTime < now && status !== "Booked")
          status = "Expired";
        return { ...s, status };
      }),
    );

    res.status(200).json({
      message: "Schedules retrieved successfully",
      schedules: schedulesWithStatus,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const createSchedule = async (req: Request, res: Response) => {
  try {
    const { departmentId, date, startTime, endTime } = req.body;
    const { company } = req.body;

    if (!company || !company.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!departmentId || !date || !startTime || !endTime) {
      return res.status(400).json({
        message: "departmentId, date, startTime, and endTime are required",
      });
    }

    // Verify department belongs to company
    const department = await prisma.department.findFirst({
      where: {
        id: departmentId,
        companyId: company.id,
      },
    });

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    const parsedDate = new Date(date);
    const parsedStart = new Date(startTime);
    const parsedEnd = new Date(endTime);

    if (
      Number.isNaN(parsedDate.getTime()) ||
      Number.isNaN(parsedStart.getTime()) ||
      Number.isNaN(parsedEnd.getTime())
    ) {
      return res
        .status(400)
        .json({ message: "Invalid date or time format provided" });
    }

    const schedule = await prisma.schedules.create({
      data: {
        departmentId,
        date: parsedDate,
        startTime: parsedStart,
        endTime: parsedEnd,
        status: "Available",
      },
      include: {
        booked: {
          select: {
            id: true,
            userId: true,
            status: true,
          },
        },
      },
    });

    res.status(201).json({
      message: "Schedule created successfully",
      schedule,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateSchedule = async (req: Request, res: Response) => {
  try {
    const { id, departmentId, date, startTime, endTime, status } = req.body;
    const { company } = req.body;

    if (!company || !company.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!id) {
      return res.status(400).json({ message: "Schedule ID is required" });
    }

    // Verify schedule belongs to company's department
    const schedule = await prisma.schedules.findFirst({
      where: {
        id,
        department: {
          companyId: company.id,
        },
      },
    });

    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    const updateData: Partial<{
      departmentId: number;
      date: Date;
      startTime: Date;
      endTime: Date;
      status: statusTypes;
    }> = {};
    if (departmentId) updateData.departmentId = departmentId;
    if (date) updateData.date = new Date(date);
    if (startTime) updateData.startTime = new Date(startTime);
    if (endTime) updateData.endTime = new Date(endTime);
    if (status) updateData.status = status;

    const updatedSchedule = await prisma.schedules.update({
      where: { id },
      data: updateData,
      include: {
        booked: {
          select: {
            id: true,
            userId: true,
            status: true,
          },
        },
      },
    });

    res.status(200).json({
      message: "Schedule updated successfully",
      schedule: updatedSchedule,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteSchedule = async (
  req: Request<{ schedulesID: string }>,
  res: Response,
) => {
  try {
    const { schedulesID } = req.params;
    const { company } = req.body;

    if (!company || !company.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Verify schedule belongs to company's department
    const schedule = await prisma.schedules.findFirst({
      where: {
        id: parseInt(schedulesID),
        department: {
          companyId: company.id,
        },
      },
    });

    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    // Don't allow deletion if there are bookings
    const bookingsCount = await prisma.booked.count({
      where: {
        schedulesId: parseInt(schedulesID),
      },
    });

    if (bookingsCount > 0) {
      return res.status(409).json({
        message: "Cannot delete schedule with existing bookings",
      });
    }

    await prisma.schedules.delete({
      where: { id: parseInt(schedulesID) },
    });

    res.status(200).json({
      message: "Schedule deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
