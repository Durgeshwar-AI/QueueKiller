import { Request, Response } from "express";
import prisma from "../../utils/client";
import {
  createRedis,
  deleteRedis,
  checkRedis,
  setLockAtomic,
} from "../../utils/redis";

// Helper function to check if a schedule is locked in Redis
const isScheduleLocked = async (scheduleId: number): Promise<boolean> => {
  const redisKey = `schedule_lock:${scheduleId}`;
  return await checkRedis(redisKey);
};

// Helper function to unlock a schedule
const unlockSchedule = async (scheduleId: number): Promise<void> => {
  const redisKey = `schedule_lock:${scheduleId}`;
  await deleteRedis(redisKey);
};

// Helper function to lock a schedule (with 5-minute expiry)
const lockSchedule = async (
  scheduleId: number,
  userId: number,
): Promise<void> => {
  const redisKey = `schedule_lock:${scheduleId}`;
  await createRedis(redisKey, userId.toString(), 5 * 60); // 5 minutes
};

export const bookSchedule = async (req: Request, res: Response) => {
  const { id, user } = req.body;

  // 1️⃣ Check if schedule exists and is Available
  const schedule = await prisma.schedules.findUnique({
    where: { id },
  });

  if (!schedule || schedule.status !== "Available") {
    return res.status(409).json({
      message: "This slot is not available",
    });
  }

  try {
    // 2️⃣ Atomic lock using Redis SET NX (no race condition)
    const lockKey = `schedule_lock:${id}`;
    const lockAcquired = await setLockAtomic(
      lockKey,
      user.id.toString(),
      5 * 60,
    ); // 5 minutes

    if (!lockAcquired) {
      return res.status(409).json({
        message:
          "This slot is being booked by another user. Please try another slot.",
      });
    }

    return res.status(200).json({
      message: "Slot locked. Proceed to payment.",
      expiresIn: 300, // 5 minutes in seconds
      scheduleId: id,
    });
  } catch (err) {
    console.error("Error locking schedule:", err);
    return res.status(500).json({
      message: "Failed to lock schedule",
    });
  }
};

export const getBookings = async (req: Request, res: Response) => {
  const { user } = req.body;

  try {
    const bookings = await prisma.booked.findMany({
      where: {
        userId: user.id,
        user: {
          email: user.email,
        },
      },
    });

    return res.status(200).json({ bookings });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export { isScheduleLocked, unlockSchedule, lockSchedule };
