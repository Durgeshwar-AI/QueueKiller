import { Router } from "express";
import { userAuthMiddleware } from "../../middlewares/user.middlewares";
import {
  getAllSchedules,
  getSchedule,
} from "../../controllers/user/user.schedules.controller";

const router = Router();

router.get("/", userAuthMiddleware, getAllSchedules);
router.get("/:departmentsID", userAuthMiddleware, getSchedule);

export default router;
