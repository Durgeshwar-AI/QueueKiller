import { Router } from "express";
import { userAuthMiddleware } from "../../middlewares/user.middlewares";
import {
  bookSchedule,
  getBookings,
} from "../../controllers/user/user.bookings.controller";

const router = Router();

router.post("/book", userAuthMiddleware, bookSchedule);
router.get("/", userAuthMiddleware, getBookings);

export default router;

// router.get("/", getSchedule);
// router.put("/book", authMiddleware, bookSchedule as RequestHandler);
