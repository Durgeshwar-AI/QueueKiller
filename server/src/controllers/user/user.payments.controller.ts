import { Request, Response } from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import prisma from "../../utils/client";
import { deleteRedis } from "../../utils/redis";

// Initialize Razorpay with validation
const initializeRazorpay = () => {
  const keyId = process.env.RAZORPAY_KEY_ID?.trim();
  const keySecret = process.env.RAZORPAY_KEY_SECRET?.trim();

  console.log("🔐 Razorpay Initialization:");
  console.log("   KEY_ID exists:", !!keyId);
  console.log("   KEY_ID length:", keyId?.length);
  console.log("   KEY_ID first 20 chars:", keyId?.substring(0, 20));
  console.log("   KEY_SECRET exists:", !!keySecret);
  console.log("   KEY_SECRET length:", keySecret?.length);

  if (!keyId || !keySecret) {
    console.error("❌ RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET not set in .env");
    throw new Error("Missing Razorpay credentials");
  }

  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });
};

const razorpay = initializeRazorpay();

// Calculate platform fee: 5% of booking price, capped at maximum 100 INR
const calculatePlatformFee = (bookingPrice: number): number => {
  const fivePercent = Math.ceil(bookingPrice * 0.05);
  return Math.min(fivePercent, 100); // 5% but maximum 100 INR
};

export const createOrder = async (req: Request, res: Response) => {
  const { scheduleId, user } = req.body;
  const userId = user?.id;

  if (!userId) {
    return res
      .status(401)
      .json({ message: "Unauthorized - User ID not found" });
  }

  if (!scheduleId) {
    return res.status(400).json({ message: "Schedule ID is required" });
  }

  try {
    // Get schedule with department info
    const schedule = await prisma.schedules.findUnique({
      where: { id: scheduleId },
      include: {
        department: {
          select: {
            id: true,
            name: true,
            type: true,
            companyId: true,
            price: true,
          },
        },
      },
    });

    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    if (schedule.status !== "Available" && schedule.status !== "Locked") {
      return res.status(400).json({
        message: "This slot is not available for booking",
        currentStatus: schedule.status,
      });
    }

    // Get booking price from department
    const bookingPrice = schedule.department.price; // Price in INR
    const platformFee = calculatePlatformFee(bookingPrice);
    const totalAmount = bookingPrice + platformFee;

    // Convert to paise (1 INR = 100 paise)
    const amountInPaise = totalAmount * 100;

    console.log("Creating order:", {
      scheduleId,
      bookingPrice,
      platformFee,
      totalAmount,
      amountInPaise,
    });

    const options = {
      amount: amountInPaise,
      currency: "INR",
      receipt: `receipt_sche_${scheduleId}`,
      notes: {
        scheduleId: scheduleId.toString(),
        bookingPrice: bookingPrice.toString(),
        platformFee: platformFee.toString(),
      },
    };

    console.log("Razorpay options:", options);
    const order = await razorpay.orders.create(options);

    res.status(200).json({
      message: "Order created successfully",
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      bookingPrice,
      platformFee,
      totalAmount,
    });
  } catch (err) {
    console.error("Create order error:", err);
    if (err instanceof Error) {
      console.error("Error message:", err.message);
    }
    if (typeof err === "object" && err !== null) {
      console.error("Error details:", JSON.stringify(err, null, 2));
    }
    res.status(500).json({
      message: "Failed to create Razorpay order",
      error: String(err),
    });
  }
};

export const verifyPayment = async (req: Request, res: Response) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    scheduleId,
    bookingPrice,
    platformFee,
    totalAmount,
    user,
  } = req.body;

  const userId = user?.id;

  if (!userId) {
    return res
      .status(401)
      .json({ message: "Unauthorized - User ID not found" });
  }

  if (!scheduleId) {
    return res.status(400).json({ message: "Schedule ID is required" });
  }

  try {
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res
        .status(400)
        .json({ message: "Payment verification failed - Invalid signature" });
    }

    // Verify payment actually succeeded with Razorpay
    const payment = await razorpay.payments.fetch(razorpay_payment_id);

    if (payment.status !== "captured") {
      return res.status(400).json({
        message: "Payment was not captured",
        paymentStatus: payment.status,
      });
    }

    console.log("Payment verified successfully:", {
      scheduleId,
      bookingPrice,
      platformFee,
      totalAmount,
    });

    // Update schedule status to Booked
    await prisma.schedules.update({
      where: { id: scheduleId },
      data: { status: "Booked" },
    });

    // Create booking with payment info
    const qrCodeData = `BK-${scheduleId}-${userId}-${Date.now()}`;
    const booking = await prisma.booked.create({
      data: {
        userId,
        schedulesId: scheduleId,
        qrCode: qrCodeData,
        status: "Upcoming",
        bookingPrice,
        platformFee,
        totalAmount,
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
      },
      include: {
        schedules: true,
        user: true,
      },
    });

    // 🔓 Unlock the schedule in Redis (remove the 5-minute lock)
    const redisKey = `schedule_lock:${scheduleId}`;
    await deleteRedis(redisKey);
    console.log("Schedule unlocked in Redis after successful payment");

    res.status(200).json({
      message: "Booking confirmed successfully",
      booking: {
        id: booking.id,
        qrCode: booking.qrCode,
        status: booking.status,
        bookingPrice: booking.bookingPrice,
        platformFee: booking.platformFee,
        totalAmount: booking.totalAmount,
        createdAt: booking.createdAt,
      },
    });
  } catch (err) {
    console.error("Verify payment error:", err);
    res.status(500).json({
      message: "Failed to verify payment",
      error: String(err),
    });
  }
};

// Test endpoint to verify Razorpay credentials
export const testRazorpayCredentials = async (req: Request, res: Response) => {
  try {
    console.log("🧪 Testing Razorpay Credentials...");

    // Try to create a test order with minimal details
    const testOptions = {
      amount: 1000, // ₹10
      currency: "INR",
      receipt: `test_receipt_${Date.now()}`,
      notes: {
        test: "true",
        timestamp: new Date().toISOString(),
      },
    };

    console.log("📤 Sending request to Razorpay:", testOptions);
    const order = await razorpay.orders.create(testOptions);

    console.log("✅ Razorpay Credentials are VALID!");

    res.status(200).json({
      success: true,
      message: "Razorpay credentials are valid",
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err) {
    console.error("❌ Razorpay Credentials Test FAILED!");
    console.error("Error:", err);

    res.status(400).json({
      success: false,
      message: "Razorpay credentials are INVALID",
      error: String(err),
      errorDetails:
        typeof err === "object" && err !== null ? JSON.stringify(err) : err,
    });
  }
};
