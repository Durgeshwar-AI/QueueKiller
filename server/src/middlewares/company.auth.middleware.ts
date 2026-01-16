import { Request, Response, NextFunction } from "express";
import { getTokenFromHeader, verifyCompanyToken } from "../utils/token";

export interface AuthRequest extends Request {
  user?: {
    id: number;
    key: string;
  };
}

export interface AuthenticatedRequest extends Request {
  user?: {
    key: string;
    id: number;
    iat?: number;
    exp?: number;
  };
}

export const companyAuthMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = getTokenFromHeader(req);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const decoded = verifyCompanyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: "Invalid token" });
  }

  req.user = {
    id: decoded.id,
    key: decoded.key,
  };

  next();
};
