import { Router } from "express";
import { companyLoginValidation } from "../../validators/company.validator";
import {
  companyLogin,
  companyLogout,
} from "../../controllers/company/company.auth.controller";

const router = Router();

router.post("/login", companyLoginValidation, companyLogin);
router.post("/logout", companyLogout);

export default router;
