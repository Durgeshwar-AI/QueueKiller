import express, { NextFunction, Request, Response } from "express";
import request from "supertest";

jest.mock("../../middlewares/user.middlewares", () => ({
  userAuthMiddleware: jest.fn(
    (req: Request, _res: Response, next: NextFunction) => {
      if (!req.body) {
        req.body = {};
      }
      req.body.user = { id: 1, email: "user@test.com" };
      next();
    },
  ),
}));

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
import { userAuthMiddleware } from "../../middlewares/user.middlewares";
import schedulesRouter from "../../routes/user/user.schedules.route";

describe("User Schedules Route Integration", () => {
  const app = express();
  app.use(express.json());
  app.use("/api/user/schedules", schedulesRouter);

  beforeEach(() => {
    jest.clearAllMocks();
    (userAuthMiddleware as jest.Mock).mockImplementation(
      (req: Request, _res: Response, next: NextFunction) => {
        if (!req.body) {
          req.body = {};
        }
        req.body.user = { id: 1, email: "user@test.com" };
        next();
      },
    );
  });

  it("GET /api/user/schedules should return departments", async () => {
    (prisma.department.findMany as jest.Mock).mockResolvedValue([
      {
        id: 3,
        name: "Support",
        company: { name: "Acme", logo: "logo.png" },
      },
    ]);

    const response = await request(app).get("/api/user/schedules");

    expect(response.status).toBe(200);
    expect(response.body.departments).toHaveLength(1);
    expect(userAuthMiddleware).toHaveBeenCalled();
  });

  it("GET /api/user/schedules/:departmentId should return schedule list", async () => {
    (prisma.department.findUnique as jest.Mock).mockResolvedValue({
      id: 5,
      schedules: [{ id: 11, status: "Available" }],
    });

    const response = await request(app).get("/api/user/schedules/5");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      schedules: [{ id: 11, status: "Available" }],
    });
  });

  it("GET /api/user/schedules/:departmentId should return 404 when department missing", async () => {
    (prisma.department.findUnique as jest.Mock).mockResolvedValue(null);

    const response = await request(app).get("/api/user/schedules/999");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Department not found" });
  });

  it("should return 401 when auth middleware blocks request", async () => {
    (userAuthMiddleware as jest.Mock).mockImplementationOnce(
      (_req: Request, res: Response) => {
        res.status(401).json({ message: "Unauthorized" });
      },
    );

    const response = await request(app).get("/api/user/schedules");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: "Unauthorized" });
  });
});
