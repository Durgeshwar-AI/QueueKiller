import { Request, Response, NextFunction } from "express";
import { getTokenFromHeader, verifyAdminToken } from "../utils/token";
import prisma from "../utils/client";

export interface AuthenticatedRequest extends Request {
  admin?: {
    id: number;
    email: string;
    role: string;
  };
}

export const adminAuthMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = getTokenFromHeader(req);

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = verifyAdminToken(token);

    if (!decoded) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    if (decoded.role?.toUpperCase() !== "ADMIN") {
      return res.status(403).json({ message: "Admin access required" });
    }

    const admin = await prisma.admin.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true },
    });

    if (!admin) {
      return res.status(401).json({ message: "Admin not found" });
    }

    // ✅ attach to req directly
    req.admin = {
      id: admin.id,
      email: admin.email,
      role: "Admin",
    };

    next();
  } catch (error) {
    console.error("Admin auth error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
