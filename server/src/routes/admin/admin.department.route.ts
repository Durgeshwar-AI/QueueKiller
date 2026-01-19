import { Router } from "express";
import { adminAuthMiddleware } from "../../middlewares/admin.middlewares";
import {
  addDepartment,
  getAllDepartments,
} from "../../controllers/admin/admin.department.controller";

const router = Router();

router.get("/", adminAuthMiddleware, getAllDepartments);
router.post("/register", adminAuthMiddleware, addDepartment);

export default router;
