import jwt, { JwtPayload } from "jsonwebtoken";
import { Request } from "express";

export interface TokenPayload {
  email: string;
  id: number;
}

const getJwtSecret = () => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not defined");
  }
  return process.env.JWT_SECRET;
};

export const generateToken = (email: string, id: number): string => {
  const payload: TokenPayload = { email, id };
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
