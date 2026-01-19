import { body } from "express-validator";

export const adminLoginValidation = [
  body("email").trim().isEmail().withMessage("Must be a valid email"),
  body("password").trim().notEmpty().withMessage("Password is required"),
];
