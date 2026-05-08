import { Request, Response } from "express";
import prisma from "../../utils/client";
import { checkRedis } from "../../utils/redis";
import { enqueueScheduleProcessing } from "../../utils/queue";

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
    const { date, debug } = req.query;

    if (!departmentId) {
      return res.status(400).json({ message: "Department ID is required" });
    }

    console.log("=== GET SCHEDULES REQUEST ===");
    console.log("departmentId:", departmentId, "type:", typeof departmentId);
    console.log("date param:", date, "type:", typeof date);

    // First, let's see what schedules exist for this department
    const allSchedulesForDept = await prisma.schedules.findMany({
      where: {
        departmentId: Number(departmentId),
      },
      select: {
        id: true,
        departmentId: true,
        date: true,
        startTime: true,
        endTime: true,
        status: true,
      },
    });

    console.log("All schedules in department:", {
      departmentId: Number(departmentId),
      count: allSchedulesForDept.length,
      schedules: allSchedulesForDept.map((s) => ({
        id: s.id,
        date: s.date?.toISOString(),
        startTime: s.startTime?.toISOString(),
        endTime: s.endTime?.toISOString(),
        status: s.status,
      })),
    });

    // If debug flag is set, return all schedules
    if (debug) {
      return res.status(200).json({
        debug: true,
        allSchedulesCount: allSchedulesForDept.length,
        allSchedules: allSchedulesForDept.map((s) => ({
          id: s.id,
          date: s.date?.toISOString(),
          startTime: s.startTime?.toISOString(),
          endTime: s.endTime?.toISOString(),
          status: s.status,
        })),
        message: "Debug mode - showing all schedules for department",
      });
    }

    // If no date provided, return schedules only from cutoff (30 days back) to future
    const lookbackCutoff = new Date();
    lookbackCutoff.setDate(lookbackCutoff.getDate() - 30);
    if (!date) {
      console.log("No date filter - returning schedules from cutoff to future");
      const recentSchedules = allSchedulesForDept.filter((s) => {
        return s.date && s.date >= lookbackCutoff;
      });

      // Include Expired as well so frontend can mark them accordingly
      const allBookable = recentSchedules.filter((s) =>
        ["Available", "Locked", "Booked", "Expired"].includes(s.status),
      );

      return res.status(200).json({
        schedules: allBookable.map((s) => ({
          id: s.id,
          departmentId: s.departmentId,
          date: s.date,
          startTime: s.startTime,
          endTime: s.endTime,
          status: s.status,
        })),
      });
    }

    // Date filter: Find all schedules matching the date (format: YYYY-MM-DD)
    // Include Available, Locked, and Booked so users can see all slots
    console.log("\n=== DATE FILTERING ===");
    console.log("Looking for schedules on date:", date);

    // Parse the date string to compare
    const targetDate = new Date(`${date}T00:00:00.000Z`);
    console.log("Parsed target date (UTC):", targetDate.toISOString());

    // Enforce 30-day lookback limit
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 30);
    if (targetDate < cutoffDate) {
      return res.status(200).json({
        schedules: [],
        message: "Requested date is older than 30 days and not returned",
      });
    }

    // Include all statuses: Available (can book), Locked (in progress), Booked (already taken)
    // Also include Expired so frontend can display expired slots
    const filteredSchedules = await prisma.schedules.findMany({
      where: {
        departmentId: Number(departmentId),
        status: {
          in: ["Available", "Locked", "Booked", "Expired"],
        },
        date: {
          gte: targetDate,
          lt: new Date(
            new Date(targetDate).setUTCDate(targetDate.getUTCDate() + 1),
          ),
        },
      },
      orderBy: {
        startTime: "asc",
      },
      select: {
        id: true,
        departmentId: true,
        date: true,
        startTime: true,
        endTime: true,
        status: true,
      },
    });

    console.log("Filtered schedules found:", {
      count: filteredSchedules.length,
      targetDate: targetDate.toISOString(),
      matching: filteredSchedules.map((s) => ({
        id: s.id,
        date: s.date?.toISOString(),
        status: s.status,
      })),
    });

    // Enqueue background job to mark expired and delete old schedules (deduped per department)
    try {
      await enqueueScheduleProcessing(Number(departmentId));
    } catch (e) {
      console.error("Failed to enqueue schedule processing job:", e);
    }

    // Check Redis locks and update status accordingly.
    // Also, if startTime has passed and schedule is not Booked, expose as Expired
    const now = new Date();
    const schedulesWithLockStatus = await Promise.all(
      filteredSchedules.map(async (schedule) => {
        const redisKey = `schedule_lock:${schedule.id}`;
        const lock = await checkRedis(redisKey);

        // If locked in Redis, show as "Locked"
        let status = lock ? "Locked" : schedule.status;

        // If startTime has passed and not booked, present as Expired
        if (
          schedule.startTime &&
          schedule.startTime < now &&
          status !== "Booked"
        ) {
          status = "Expired";
        }

        return {
          ...schedule,
          status,
        };
      }),
    );

    const department = await prisma.department.findUnique({
      where: {
        id: Number(departmentId),
      },
    });

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    console.log("=== RESPONSE ===");
    console.log("Returning", schedulesWithLockStatus.length, "schedules\n");

    return res.status(200).json({
      schedules: schedulesWithLockStatus.map((s) => ({
        id: s.id,
        departmentId: s.departmentId,
        date: s.date,
        startTime: s.startTime,
        endTime: s.endTime,
        status: s.status,
      })),
    });
  } catch (error) {
    console.error("Get schedule error:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: String(error),
    });
  }
};
