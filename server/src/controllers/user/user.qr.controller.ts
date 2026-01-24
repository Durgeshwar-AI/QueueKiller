import { Request, Response } from "express";
import prisma from "../../utils/client";

export const getQr = async (req: Request, res: Response) => {
  const { user } = req.body;
  const { bookingID } = req.params;
  try {
    const qr = await prisma.booked.findUnique({
      where: {
        userId: user.id,
        schedulesId: Number(bookingID),
      },
    });
    if (!qr) {
      return res
        .status(400)
        .json({ message: "No valid qr found for the booking" });
    }
    res.status(200).json({ message: "Success", qr });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
