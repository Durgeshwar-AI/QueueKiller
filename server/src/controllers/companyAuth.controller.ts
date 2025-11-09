import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { Company } from "../models/company.model";
import { generateToken } from "../utils/token";
import { AuthenticatedRequest } from "../middlewares/auth.middleware";

export const registerCompany = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const role = req.user?.role;
    const { name, departments = [], email, password } = req.body;
    if (role !== "admin") {
      return res
        .status(401)
        .json({ message: "Only admins can register company" });
    }
    const existingCompany = await Company.findOne({ email });
    if (existingCompany) {
      return res.status(400).json({ message: "Company already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const company = await Company.create({
      name,
      departments,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Company registered successfully",
      company: {
        id: company._id.toString(),
        name: company.name,
        email: company.email,
        role: company.role,
        departments: company.departments,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const companyLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const company = await Company.findOne({ email });
    if (!company) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = generateToken(
      company.email,
      company.role,
      company._id.toString(),
    );
    res.status(200).json({
      message: "Login successful",
      token,
      company: {
        id: company._id.toString(),
        name: company.name,
        email: company.email,
        role: company.role,
        departments: company.departments,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
