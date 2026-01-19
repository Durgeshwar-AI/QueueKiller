import { Request, Response, NextFunction } from "express";
import { getTokenFromHeader, verifyAdminToken } from "../utils/token";
import prisma from "../utils/client";

export interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
    role: string;
  };
}

export const adminAuthMiddleware = async (
  req: AuthRequest,
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

    // 🔒 Role check
    if (decoded.role.toUpperCase() !== "ADMIN") {
      return res.status(403).json({ message: "Admin access required" });
    }

    // 🔍 DB validation (email + id)
    const admin = await prisma.admin.findUnique({
      where: {
        id: decoded.id,
        email: decoded.email,
      },
      select: {
        id: true,
        email: true,
      },
    });

    if (!admin) {
      return res.status(401).json({ message: "Admin not found" });
    }

    if (admin.email !== decoded.email) {
      return res.status(401).json({ message: "Token mismatch detected" });
    }

    // ✅ Attach verified admin to request
    req.user = {
      id: admin.id,
      email: admin.email,
      role: "admin",
    };

    next();
  } catch (error) {
    console.error("Admin auth error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
