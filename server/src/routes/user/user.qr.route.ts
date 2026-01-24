import { Router } from "express";
import { userAuthMiddleware } from "../../middlewares/user.middlewares";
import { getQr } from "../../controllers/user/user.qr.controller";

const router = Router();

router.get("/:bookingID", userAuthMiddleware, getQr);

export default router;
