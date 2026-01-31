import { Router } from "express";
import {
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
} from "../../controllers/company/company.departments.controller";

const router = Router();

router.get("/", getAllDepartments);
router.get("/:departmentID", getDepartmentById);
router.put("/", updateDepartment);

export default router;
