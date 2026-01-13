import { Request, Response, NextFunction } from "express";
import { getTokenFromHeader, verifyToken } from "../utils/token";

export interface AuthRequest extends Request {
  user?: {
    _id: string;
    email: string;
    role: string;
  };
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = getTokenFromHeader(req);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: "Invalid token" });
  }

  req.user = {
    _id: decoded._id,
    email: decoded.email,
    role: decoded.role,
  };

  next();
};
