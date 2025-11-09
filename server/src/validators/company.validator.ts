import { body } from "express-validator";

export const companyRegisterValidation = [
  body("name")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Name must contain only alphabets and spaces"),

  body("departments")
    .isArray({ min: 1 })
    .withMessage("Departments must be a non-empty array")
    .custom((departments) =>
      departments.every(
        (d: string) => typeof d === "string" && d.trim() !== "",
      ),
    )
    .withMessage("Each department must be a non-empty string"),

  body("email").trim().isEmail().withMessage("Must be a valid email address"),

  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

export const companyLoginValidation = [
  body("email").trim().isEmail().withMessage("Must be a valid email"),
  body("password").trim().notEmpty().withMessage("Password is required"),
];
