import {
  bookSchedule,
  createSchedule,
  deleteSchedule,
  getSchedule,
} from "../../controllers/schedule.controller";
import Schedule from "../../models/schedule.model";

// mock the Schedule model before importing the controller so imports receive the mock
jest.mock("../../models/schedule.model", () => ({
  default: {
    findOne: jest.fn(),
    create: jest.fn(),
    deleteOne: jest.fn(),
  },
}));

// ensure the imported Schedule has jest mock functions (some runners return real module)
const MockSchedule = Schedule as unknown as any;
MockSchedule.findOne = MockSchedule.findOne || jest.fn();
MockSchedule.create = MockSchedule.create || jest.fn();
MockSchedule.deleteOne = MockSchedule.deleteOne || jest.fn();

describe("createSchedule controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("createSchedule creates a new schedule when none exists for the date", async () => {
    (MockSchedule.findOne as jest.Mock).mockResolvedValue(null);
    (MockSchedule.create as jest.Mock).mockResolvedValue({
      _id: "fakeid",
      company: "ABC",
      date: "2024-10-10",
      start: "10:00",
      end: "11:00",
    });

    const req = {
      body: { company: "ABC", date: "2024-10-10", start: "10:00", end: "11:00" },
    } as unknown as any;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as any;
    try {
      await createSchedule(req, res);
    } catch (err) {
      console.error("createSchedule threw", err);
      throw err;
    }
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Schedule created successfully",
      }),
    );
  });
});

describe("Get Schedule controller", () => {
  test("getSchedule to get all the schedules", async () => {
    const req = {
      query: { company: "ABC", department: "General", date: "2024-10-10" },
    } as unknown as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as any;

    (MockSchedule.findOne as jest.Mock).mockResolvedValue({
      schedules: [{ id: "1", start: "10:00", end: "11:00" }],
    });

    try {
      await getSchedule(req, res);
    } catch (err) {
      console.error("getSchedule threw", err);
      throw err;
    }

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        schedule: expect.any(Array),
      }),
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
    } as unknown as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as any;
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
    (MockSchedule.findOne as jest.Mock).mockResolvedValue(mockScheduleDoc);
    try {
      await bookSchedule(req, res);
    } catch (err) {
      console.error("bookSchedule threw", err);
      throw err;
    }
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Booked successfully",
      }),
    );
  });
});

describe("Delete Schedule controller", () => {
  test("Testing for deleting a schedule", async () => {
    const req = {
      params: { date: "2024-10-10", id: "c-001" },
    } as unknown as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as any;
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
    (MockSchedule.findOne as jest.Mock).mockResolvedValue(mockScheduleDoc);
    try {
      await deleteSchedule(req, res);
    } catch (err) {
      console.error("deleteSchedule threw", err);
      throw err;
    }
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Delete Successful",
      }),
    );
  });
});
