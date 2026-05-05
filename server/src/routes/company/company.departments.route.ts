import { Router } from "express";
import {
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
} from "../../controllers/company/company.departments.controller";
import { companyAuthMiddleware } from "../../middlewares/company.middlewares";

const router = Router();

router.get("/", companyAuthMiddleware, getAllDepartments);
router.get("/:departmentID", companyAuthMiddleware, getDepartmentById);
router.put("/", companyAuthMiddleware, updateDepartment);

export default router;
