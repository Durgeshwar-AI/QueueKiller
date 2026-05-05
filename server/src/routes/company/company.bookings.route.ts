import { Router } from "express";
import {
  getAllBookings,
  verifyBooking,
} from "../../controllers/company/company.bookings.controller";
import { companyAuthMiddleware } from "../../middlewares/company.middlewares";

const router = Router();

router.get("/all", companyAuthMiddleware, getAllBookings);
router.post("/verify", verifyBooking);

export default router;
