import { Router } from "express";
import { companyLoginValidation } from "../../validators/company.validator";
import {
  companyLogin,
  companyLogout,
  companyPing,
} from "../../controllers/company/company.auth.controller";
import { companyAuthMiddleware } from "../../middlewares/company.middlewares";

const router = Router();

router.get("/ping", companyAuthMiddleware, companyPing);
router.post("/login", companyLoginValidation, companyLogin);
router.post("/logout", companyLogout);

export default router;
