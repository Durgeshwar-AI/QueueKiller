import { Request, Response, NextFunction } from "express";
import { getTokenFromHeader, verifyToken } from "../utils/token";

export interface AuthenticatedRequest extends Request {
  user?: {
    email: string;
    role: string;
    _id: string;
    iat?: number;
    exp?: number;
  };
}

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = getTokenFromHeader(req);
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  req.user = decoded; // ✅ fully typed
  next();
};
