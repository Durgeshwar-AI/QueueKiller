import jwt, { JwtPayload } from "jsonwebtoken";
import { Request } from "express";

//---------------------------------------------------------------------------------
//------------------------Interfaces for type safety-------------------------------
//---------------------------------------------------------------------------------

export interface TokenPayload {
  email: string;
  id: number;
}

export interface companyTokenPayload {
  key: string;
  id: number;
}

//---------------------------------------------------------------------------------
//-----------------JWT secret abstraction(useful for testing)----------------------
//---------------------------------------------------------------------------------

const getJwtSecret = () => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not defined");
  }
  return process.env.JWT_SECRET;
};

//---------------------------------------------------------------------------------
//-----------------------------Token Generation------------------------------------
//---------------------------------------------------------------------------------

export const generateToken = (email: string, id: number): string => {
  const payload: TokenPayload = { email, id };
  return jwt.sign(payload, getJwtSecret(), { expiresIn: "7d" });
};

export const generateCompanyToken = (key: string, id: number): string => {
  const payload: companyTokenPayload = { key, id };
  return jwt.sign(payload, getJwtSecret(), { expiresIn: "7d" });
};

//---------------------------------------------------------------------------------
//----------------------------Token Verification-----------------------------------
//---------------------------------------------------------------------------------

export const verifyToken = (
  token: string,
): (TokenPayload & JwtPayload) | null => {
  try {
    return jwt.verify(token, getJwtSecret()) as TokenPayload & JwtPayload;
  } catch {
    return null;
  }
};

export const verifyCompanyToken = (
  token: string,
): (companyTokenPayload & JwtPayload) | null => {
  try {
    return jwt.verify(token, getJwtSecret()) as companyTokenPayload &
      JwtPayload;
  } catch {
    return null;
  }
};

//---------------------------------------------------------------------------------
//-----------------------------Token Extraction------------------------------------
//---------------------------------------------------------------------------------

export const getTokenFromHeader = (req: Request): string | null => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;

  const [scheme, token] = authHeader.split(" ");
  if (scheme === "Bearer" && token) return token;

  return null;
};
