import { Router } from "express";
import {
  getScheduleByDepartmentId,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} from "../../controllers/company/company.schedules.controller";
import { companyAuthMiddleware } from "../../middlewares/company.middlewares";

const router = Router();

router.get("/:departmentID", companyAuthMiddleware, getScheduleByDepartmentId);
router.post("/", companyAuthMiddleware, createSchedule);
router.put("/", companyAuthMiddleware, updateSchedule);
router.delete("/:schedulesID", companyAuthMiddleware, deleteSchedule);

export default router;
