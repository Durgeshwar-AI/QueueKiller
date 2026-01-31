import { Router } from "express";
import {
  getScheduleByDepartmentId,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} from "../../controllers/company/company.schedules.controller";

const router = Router();

router.get("/:departmentID", getScheduleByDepartmentId);
router.post("/", createSchedule);
router.put("/", updateSchedule);
router.delete("/:schedulesID", deleteSchedule);

export default router;
