import { Router } from "express";
import { companyLoginValidation } from "../validators/company.validator";
import { companyLogin } from "../controllers/companyAuth.controller";

const router = Router();

router.post("/login", companyLoginValidation, companyLogin);

export default router;
