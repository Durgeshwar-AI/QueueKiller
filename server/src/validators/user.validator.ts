import { body } from "express-validator";

export const userLoginValidation = [
  body("email").trim().isEmail().withMessage("Must be a valid email"),
  body("password").trim().notEmpty().withMessage("Password is required"),
];

export const userRegisterValidation = [
  body("name")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Must be at least 3 characters")
    .isAlpha()
    .withMessage("Must only be alphabets"),
  body("email").trim().isEmail().withMessage("Must be a valid email"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];
