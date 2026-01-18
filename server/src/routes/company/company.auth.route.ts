import { Router } from "express";
import { companyLoginValidation } from "../../validators/company.validator";

const router = Router();

router.post("/login", companyLoginValidation);
router.post("/logout");

export default router;
