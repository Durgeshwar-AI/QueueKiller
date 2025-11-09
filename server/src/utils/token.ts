import jwt, { JwtPayload } from "jsonwebtoken";
import { Request } from "express";

type Role = string;

interface TokenPayload {
  email: string;
  role: Role;
  _id: string;
}

const JWT_SECRET = process.env.JWT_SECRET || "change-me-in-production";

export const generateToken = (
  email: string,
  role: Role,
  _id: string,
): string => {
  const payload: TokenPayload = { email, role, _id };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7D" });
};

export const verifyToken = (
  token: string,
): (TokenPayload & JwtPayload) | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload & JwtPayload;
  } catch {
    return null;
  }
};

export const getTokenFromHeader = (req: Request): string | null => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return null;

  const parts = authHeader.split(" ");
  if (parts.length === 2 && parts[0] === "Bearer") {
    return parts[1];
  }

  return null;
};
