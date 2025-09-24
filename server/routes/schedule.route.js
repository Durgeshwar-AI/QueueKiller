import { Router } from "express";
import { bookSchedule, createSchedule, deleteSchedule, getSchedule } from "../controllers/schedule.controller.js";

const router = Router();

router.get('/',getSchedule)
router.post('/create',createSchedule)
router.put('/book',bookSchedule)
router.delete('/delete', deleteSchedule)

export default router;
