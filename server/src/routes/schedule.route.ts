import { Router, RequestHandler } from "express";
import {
  bookSchedule,
  createSchedule,
  deleteSchedule,
  getSchedule,
} from "../controllers/schedule.controller";

const router = Router();

router.get("/", getSchedule);
router.post("/create", createSchedule as RequestHandler);
router.put("/book", bookSchedule as RequestHandler);
router.delete("/delete/:id", deleteSchedule);

export default router;
