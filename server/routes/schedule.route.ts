import { Router } from "express";
import { bookSchedule, createSchedule, deleteSchedule, getSchedule } from "../controllers/schedule.controller";

const router = Router();

router.get('/',getSchedule)
router.post('/create',createSchedule)
router.put('/book',bookSchedule)
router.delete('/delete/:id', deleteSchedule)

export default router;
