import { Router, RequestHandler } from "express";
import {
  bookSchedule,
  createSchedule,
  deleteSchedule,
  getSchedule,
} from "../controllers/schedule.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", getSchedule);
router.post("/create", createSchedule as RequestHandler);
router.put("/book", authenticate, bookSchedule as RequestHandler);
router.delete("/delete/:id", deleteSchedule);

export default router;
