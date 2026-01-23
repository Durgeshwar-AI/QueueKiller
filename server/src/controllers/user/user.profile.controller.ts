import { Request, Response } from "express";
import prisma from "../../utils/client";

export const getProfile = async (req: Request, res: Response) => {
  try {
    const { user } = req.body; // from JWT middleware

    const profile = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        dob: true,
        image: true,
        location: true,
        createdAt: true,
      },
    });

    return res.status(200).json({ profile });
  } catch {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { user, name, dob, image, location } = req.body;

    if (!user || !user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const updatedProfile = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        name,
        dob,
        image,
        location,
      },
      select: {
        id: true,
        name: true,
        email: true,
        dob: true,
        image: true,
        location: true,
        createdAt: true,
      },
    });

    return res.status(200).json({
      message: "Profile updated successfully",
      profile: updatedProfile,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
