import { Router } from "express";
import {
  adminLogin,
  adminLogout,
} from "../../controllers/admin/admin.auth.controller";
import { adminLoginValidation } from "../../validators/admin.validator";

const router = Router();

router.post("/login", adminLoginValidation, adminLogin);
router.post("/logout", adminLogout);

export default router;
