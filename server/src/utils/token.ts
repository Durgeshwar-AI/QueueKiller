import jwt, { JwtPayload } from "jsonwebtoken";
import { Request } from "express";
import { userTokenPayload } from "../interfaces/user.interfaces";
import { companyTokenPayload } from "../interfaces/company.interfaces";
import { adminTokenPayload } from "../interfaces/admin.interfaces";

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

export const generateUserToken = (email: string, id: number): string => {
  const payload: userTokenPayload = { email, id };
  return jwt.sign(payload, getJwtSecret(), { expiresIn: "7d" });
};

export const generateCompanyToken = (key: string, id: number): string => {
  const payload: companyTokenPayload = { key, id };
  return jwt.sign(payload, getJwtSecret(), { expiresIn: "7d" });
};

export const generateAdminToken = (
  id: number,
  email: string,
  role: string,
): string => {
  const payload: adminTokenPayload = { id, email, role };
  return jwt.sign(payload, getJwtSecret(), { expiresIn: "7d" });
};

//---------------------------------------------------------------------------------
//----------------------------Token Verification-----------------------------------
//---------------------------------------------------------------------------------

export const verifyUserToken = (
  token: string,
): (userTokenPayload & JwtPayload) | null => {
  try {
    return jwt.verify(token, getJwtSecret()) as userTokenPayload & JwtPayload;
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

export const verifyAdminToken = (
  token: string,
): (adminTokenPayload & JwtPayload) | null => {
  try {
    return jwt.verify(token, getJwtSecret()) as adminTokenPayload & JwtPayload;
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
