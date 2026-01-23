import { Request, Response } from "express";
import prisma from "../../utils/client";
import { createRedis, deleteRedis } from "../../utils/redis";

export const bookSchedule = async (req: Request, res: Response) => {
  const { id, user } = req.body;
  const redisKey = `schedule_lock:${id}`;

  // 1️⃣ Check DB first (hard check)
  const schedule = await prisma.schedules.findUnique({
    where: { id },
  });

  if (!schedule || schedule.status !== "Available") {
    return res.status(409).json({
      message: "This slot is not available",
    });
  }

  // 2️⃣ Soft lock using Redis
  await createRedis(redisKey, user.id, 5 * 60);

  try {
    // 3️⃣ Lock in DB (real lock)
    await prisma.schedules.update({
      where: { id },
      data: {
        status: "Locked",
      },
    });

    return res.status(200).json({
      message: "Slot locked. Proceed to payment.",
      expiresIn: 300,
    });
  } catch (err) {
    console.log(err);
    await deleteRedis(redisKey);

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
