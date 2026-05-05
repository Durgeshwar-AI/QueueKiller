import { Request, Response } from "express";
import prisma from "../../utils/client";

export const getAllBookings = async (req: Request, res: Response) => {
  try {
    const companyId = req.body.company?.id;

    if (!companyId) {
      return res.status(400).json({ message: "Company ID is required" });
    }

    // Get all departments for this company
    const departments = await prisma.department.findMany({
      where: { companyId },
    });

    const departmentIds = departments.map((d) => d.id);

    // Get all bookings for these departments
    const bookings = await prisma.booked.findMany({
      where: {
        schedules: {
          departmentId: {
            in: departmentIds,
          },
        },
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
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      bookings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

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
