import { Request, Response } from "express";
import prisma from "../../utils/client";

export const verifyBooking = async (req: Request, res: Response) => {
  try {
    const { qrCode } = req.body;

    if (!qrCode) {
      return res.status(400).json({ message: "QR code is required" });
    }

    const booking = await prisma.booked.findFirst({
      where: {
        qrCode,
        status: "Upcoming",
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        schedules: {
          include: {
            department: true,
          },
        },
      },
    });

    if (!booking) {
      return res
        .status(404)
        .json({ message: "Booking not found or already verified" });
    }

    // Update booking status to Attended
    const updatedBooking = await prisma.booked.update({
      where: { id: booking.id },
      data: {
        status: "Attended",
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        schedules: {
          include: {
            department: true,
          },
        },
      },
    });

    res.status(200).json({
      message: "Booking verified successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
