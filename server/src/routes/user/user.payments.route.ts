import { Router } from "express";
import {
  createOrder,
  verifyPayment,
  testRazorpayCredentials,
} from "../../controllers/user/user.payments.controller";
import { userAuthMiddleware } from "../../middlewares/user.middlewares";

const router = Router();

router.post("/create-order", userAuthMiddleware, createOrder);
router.post("/verify-payment", userAuthMiddleware, verifyPayment);
router.get("/test-razorpay", testRazorpayCredentials);

export default router;
