import { Router } from "express";
import { createSchedule, getSchedule } from "../controllers/schedule.controller";

const router = Router();

router.post('/schedule',getSchedule)
router.post('/create',createSchedule)

export default router;
