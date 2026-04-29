import crypto from "crypto";
import { Request, Response } from "express";

var mockRazorpayCtor: any;

jest.mock("razorpay", () => {
  mockRazorpayCtor = jest.fn(function () {});
  mockRazorpayCtor.prototype.orders = {
    create: jest.fn(),
  };

  return {
    __esModule: true,
    default: mockRazorpayCtor,
  };
});

jest.mock("../../utils/client", () => ({
  __esModule: true,
  default: {
    schedules: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    booked: {
      create: jest.fn(),
    },
  },
}));

import prisma from "../../utils/client";
import Razorpay from "razorpay";
import {
  createOrder,
  verifyPayment,
} from "../../controllers/user/user.payments.controller";

const getRazorpayOrderCreateMock = () => {
  return mockRazorpayCtor.prototype.orders.create as any;
};

describe("Payments Controller", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseObject: Record<string, unknown>;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => undefined);
    process.env.RAZORPAY_KEY_SECRET = "test_secret";

    mockRequest = {};
    responseObject = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockImplementation((result: unknown) => {
        responseObject = result as Record<string, unknown>;
      }),
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should create a Razorpay order successfully", async () => {
    mockRequest.body = { scheduleId: 1, user: { id: 1 } };
    (prisma.schedules.findUnique as any).mockResolvedValue({
      id: 1,
      status: "Locked",
    });
    const createOrderMock = getRazorpayOrderCreateMock();
    createOrderMock.mockResolvedValue({
      id: "order_123",
      amount: 10000,
      currency: "INR",
    });

    await createOrder(mockRequest as Request, mockResponse as Response);

    expect(prisma.schedules.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(createOrderMock).toHaveBeenCalledWith({
      amount: 10000,
      currency: "INR",
      receipt: "receipt_sche_1",
    });
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(responseObject).toMatchObject({
      message: "Order created successfully",
      orderId: "order_123",
      amount: 10000,
      currency: "INR",
    });
  });

  it("should return 400 when schedule is not locked", async () => {
    mockRequest.body = { scheduleId: 1 };
    (prisma.schedules.findUnique as any).mockResolvedValue({
      id: 1,
      status: "Available",
    });

    await createOrder(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(responseObject).toMatchObject({
      message: "Invalid schedule or slot not locked",
    });
  });

  it("should return 500 when createOrder throws", async () => {
    mockRequest.body = { scheduleId: 1 };
    (prisma.schedules.findUnique as any).mockRejectedValue(
      new Error("db down"),
    );

    await createOrder(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(responseObject).toMatchObject({
      message: "Failed to create Razorpay order",
    });
  });

  it("should verify payment and create booking", async () => {
    const scheduleId = 8;
    const userId = 42;
    const razorpay_order_id = "order_A";
    const razorpay_payment_id = "pay_B";
    const razorpay_signature = crypto
      .createHmac("sha256", "test_secret")
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    mockRequest.body = {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      scheduleId,
      user: { id: userId },
    };

    (prisma.schedules.update as any).mockResolvedValue({});
    (prisma.booked.create as any).mockResolvedValue({
      id: 10,
      schedulesId: scheduleId,
      userId,
      status: "Upcoming",
      qrCode: "BK-...",
    });

    await verifyPayment(mockRequest as Request, mockResponse as Response);

    expect(prisma.schedules.update).toHaveBeenCalledWith({
      where: { id: scheduleId },
      data: { status: "Booked" },
    });
    expect(prisma.booked.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        userId,
        schedulesId: scheduleId,
        status: "Upcoming",
        qrCode: expect.stringContaining(`BK-${scheduleId}-${userId}-`),
      }),
    });
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(responseObject).toMatchObject({
      message: "Payment verified and booking confirmed",
    });
  });

  it("should return 400 for invalid payment signature", async () => {
    mockRequest.body = {
      razorpay_order_id: "order_A",
      razorpay_payment_id: "pay_B",
      razorpay_signature: "invalid",
      scheduleId: 1,
      user: { id: 2 },
    };

    await verifyPayment(mockRequest as Request, mockResponse as Response);

    expect(prisma.schedules.update).not.toHaveBeenCalled();
    expect(prisma.booked.create).not.toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(responseObject).toMatchObject({
      message: "Invalid payment signature",
    });
  });

  it("should return 500 when booking creation fails after signature verification", async () => {
    const scheduleId = 11;
    const userId = 3;
    const razorpay_order_id = "order_X";
    const razorpay_payment_id = "pay_Y";
    const razorpay_signature = crypto
      .createHmac("sha256", "test_secret")
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    mockRequest.body = {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      scheduleId,
      user: { id: userId },
    };

    (prisma.schedules.update as any).mockResolvedValue({});
    (prisma.booked.create as any).mockRejectedValue(new Error("insert failed"));

    await verifyPayment(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(responseObject).toMatchObject({
      message: "Payment verified but failed to create booking",
    });
  });
});
