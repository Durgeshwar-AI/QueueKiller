import { Request, Response } from "express";

jest.mock("../../utils/client", () => ({
  __esModule: true,
  default: {
    department: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
  },
}));

import prisma from "../../utils/client";
import {
  getAllSchedules,
  getSchedule,
} from "../../controllers/user/user.schedules.controller";

describe("User Schedules Controller", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseObject: Record<string, unknown>;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "log").mockImplementation(() => undefined);
    jest.spyOn(console, "error").mockImplementation(() => undefined);
    mockRequest = { params: {} };
    responseObject = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockImplementation((result) => {
        responseObject = result as Record<string, unknown>;
      }),
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("getAllSchedules", () => {
    it("should return departments list", async () => {
      const departments = [{ id: 1, name: "Sales" }];
      (prisma.department.findMany as jest.Mock).mockResolvedValue(departments);

      await getAllSchedules(mockRequest as Request, mockResponse as Response);

      expect(prisma.department.findMany).toHaveBeenCalledWith({
        include: {
          company: {
            select: {
              name: true,
              logo: true,
            },
          },
        },
      });
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(responseObject).toEqual({ departments });
    });

    it("should return 500 when repository throws", async () => {
      (prisma.department.findMany as jest.Mock).mockRejectedValue(
        new Error("db error"),
      );

      await getAllSchedules(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseObject).toEqual({ message: "Internal server error" });
    });
  });

  describe("getSchedule", () => {
    it("should return 400 when departmentId is missing", async () => {
      mockRequest.params = {};

      await getSchedule(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(responseObject).toEqual({ message: "Department ID is required" });
      expect(prisma.department.findUnique).not.toHaveBeenCalled();
    });

    it("should return 404 when department does not exist", async () => {
      mockRequest.params = { departmentId: "10" };
      (prisma.department.findUnique as jest.Mock).mockResolvedValue(null);

      await getSchedule(mockRequest as Request, mockResponse as Response);

      expect(prisma.department.findUnique).toHaveBeenCalledWith({
        where: {
          id: 10,
        },
        include: {
          schedules: true,
        },
      });
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(responseObject).toEqual({ message: "Department not found" });
    });

    it("should return schedules for a valid department", async () => {
      mockRequest.params = { departmentId: "5" };
      (prisma.department.findUnique as jest.Mock).mockResolvedValue({
        id: 5,
        schedules: [{ id: 1, status: "Available" }],
      });

      await getSchedule(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(responseObject).toEqual({
        schedules: [{ id: 1, status: "Available" }],
      });
    });

    it("should return 500 when department query throws", async () => {
      mockRequest.params = { departmentId: "2" };
      (prisma.department.findUnique as jest.Mock).mockRejectedValue(
        new Error("boom"),
      );

      await getSchedule(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseObject).toEqual({ message: "Internal server error" });
    });
  });
});
