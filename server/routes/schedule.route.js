import { Router } from "express";
import { bookSchedule, createSchedule, getSchedule } from "../controllers/schedule.controller.js";

const router = Router();

router.post('/schedule',getSchedule)
router.post('/create',createSchedule)
router.put('/book',bookSchedule)

export default router;
