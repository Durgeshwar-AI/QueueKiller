import { Router } from "express";
import { verifyBooking } from "../../controllers/company/company.bookings.controller";

const router = Router();

router.post("/verify", verifyBooking);

export default router;
