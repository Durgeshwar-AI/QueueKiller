import { Request, Response, NextFunction } from "express";
import { getTokenFromHeader, verifyUserToken } from "../utils/token";

export const userAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = getTokenFromHeader(req);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const decoded = verifyUserToken(token);

  if (!decoded) {
    return res.status(401).json({ message: "Invalid token" });
  }

  req.body.user = {
    id: decoded.id,
    email: decoded.email,
  };

  next();
};
