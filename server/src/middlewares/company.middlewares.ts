import { Request, Response, NextFunction } from "express";
import { getTokenFromHeader, verifyCompanyToken } from "../utils/token";

export const companyAuthMiddleware = (
  req: Request,
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

  req.body.company = {
    id: decoded.id,
    key: decoded.key,
  };

  next();
};
