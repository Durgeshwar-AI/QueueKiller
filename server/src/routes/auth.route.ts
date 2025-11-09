import { Router } from "express";
import { registerUser, userLogin } from "../controllers/auth.controller";
import {
  companyLogin,
  registerCompany,
} from "../controllers/companyAuth.controller";
import {
  loginValidation,
  registerValidation,
} from "../validators/user.validator";
import {
  companyLoginValidation,
  companyRegisterValidation,
} from "../validators/company.validator";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.post("/login", loginValidation, userLogin);
router.post("/register", registerValidation, registerUser);

router.post(
  "/company/register",
  companyRegisterValidation,
  authenticate,
  registerCompany,
);
router.post("/company/login", companyLoginValidation, companyLogin);

export default router;
