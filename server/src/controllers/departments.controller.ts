import { Request, Response } from "express";
import { Company } from "../models/company.model";

export const getAllDepartments = async (req: Request, res: Response) => {
  try {
    const companies = await Company.find().lean();

    const result = companies.flatMap((company) =>
      company.departments.map((dept) => ({
        companyId: company._id,
        companyName: company.name,
        department: dept,
      })),
    );

    return res.status(200).json({
      success: true,
      departments: result,
    });
  } catch (error: unknown) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "An error occurred",
    });
  }
};
