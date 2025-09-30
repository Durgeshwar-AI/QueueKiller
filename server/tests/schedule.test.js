import {
  bookSchedule,
  createSchedule,
  deleteSchedule,
  getSchedule,
} from "../controllers/schedule.controller";
import Schedule from "../models/schedule.model";

jest.mock("../models/schedule.model");

describe("createSchedule controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("createSchedule creates a new schedule when none exists for the date", async () => {
    Schedule.findOne.mockResolvedValue(null);
    Schedule.create.mockResolvedValue({
      _id: "fakeid",
      date: "2024-10-10",
      start: "10:00",
      end: "11:00",
    });

    const req = {
      body: { date: "2024-10-10", start: "10:00", end: "11:00" },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await createSchedule(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Schedule created successfully",
      })
    );
  });
});

describe("Get Schedule controller", () => {
  test("getSchedule to get all the schedules", async () => {
    const req = { params: { date: "2024-10-10" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Schedule.findOne.mockResolvedValue({
      schedules: [{ id: "1", start: "10:00", end: "11:00" }],
    });

    await getSchedule(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        schedule: expect.any(Array),
      })
    );
  });
});

describe("Book Schedule Controller", () => {
  test("Testing for booking a schedule by the user", async () => {
    const req = {
      body: {
        date: "2024-10-10",
        id: "c-001",
        cid: "507f191e810c19729de860ea",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockScheduleDoc = {
      date: "2024-10-10",
      schedules: [
        {
          id: "c-001",
          start: "10:00",
          end: "11:00",
          booked: false,
          customerId: null,
        },
      ],
      save: jest.fn().mockResolvedValue(true),
    };
    Schedule.findOne.mockResolvedValue(mockScheduleDoc);
    await bookSchedule(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Booked successfully",
      })
    );
  });
});

describe("Delete Schedule controller", () => {
  test("Testing for deleting a schedule", async () => {
    const req = {
      params: {
        date: "2024-10-10",
        id: "c-001",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockScheduleDoc = {
      date: "2024-10-10",
      schedules: [
        {
          id: "c-001",
          start: "10:00",
          end: "11:00",
          booked: false,
          customerId: null,
        },
      ],
      save: jest.fn().mockResolvedValue(true),
    };
    Schedule.findOne.mockResolvedValue(mockScheduleDoc);
    await deleteSchedule(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Delete Successful",
      })
    );
  });
});
