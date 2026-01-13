import jwt, { JwtPayload } from "jsonwebtoken";
import { Request } from "express";

type Role = string;

export interface TokenPayload {
  email: string;
  role: Role;
  _id: string;
}

const getJwtSecret = () => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not defined");
  }
  return process.env.JWT_SECRET;
};

export const generateToken = (
  email: string,
  role: Role,
  _id: string,
): string => {
  const payload: TokenPayload = { email, role, _id };
  return jwt.sign(payload, getJwtSecret(), { expiresIn: "7d" });
};

export const verifyToken = (
  token: string,
): (TokenPayload & JwtPayload) | null => {
  try {
    return jwt.verify(token, getJwtSecret()) as TokenPayload & JwtPayload;
  } catch {
    return null;
  }
};

export const getTokenFromHeader = (req: Request): string | null => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;

  const [scheme, token] = authHeader.split(" ");
  if (scheme === "Bearer" && token) return token;

  return null;
};
