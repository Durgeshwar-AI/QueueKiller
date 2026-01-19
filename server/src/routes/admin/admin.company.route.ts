import { Router } from "express";
import {
  getAllCompanies,
  getCompany,
  registerCompany,
} from "../../controllers/admin/admin.company.controller";
import { adminAuthMiddleware } from "../../middlewares/admin.middlewares";

const router = Router();

router.post("/register", adminAuthMiddleware, registerCompany);
router.get("/:id", adminAuthMiddleware, getCompany);
router.get("/", adminAuthMiddleware, getAllCompanies);

export default router;
