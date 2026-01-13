process.env.JWT_SECRET = "change-me-in-production";
process.env.NODE_ENV = "test";

jest.setTimeout(20000);

import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import jwt from "jsonwebtoken";

import app from "../../app";
import Schedule from "../../models/schedule.model";
import { connectRedis, stopRedis } from "../../utils/redis";
import { fillBucket } from "../../middlewares/rateLimiter";

const BASE = process.env.TEST_BASE_PATH || "/api/schedule";

describe("Schedule Integration Tests", () => {
  let mongoServer: MongoMemoryServer;

  // ------------------------
  // SETUP
  // ------------------------
  beforeAll(async () => {
    // Redis (required by rate limiter)
    await connectRedis();
    await fillBucket();

    // MongoDB Memory Server
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    process.env.MONGO_URI = uri;
    process.env.JWT_SECRET = "change-me-in-production";

    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }

    await mongoose.connect(uri, { dbName: "test" });
  });

  // ------------------------
  // TEARDOWN
  // ------------------------
  afterAll(async () => {
    await mongoose.disconnect();
    await stopRedis();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await Schedule.deleteMany({});
  });

  // ------------------------
  // TESTS
  // ------------------------
  test("create → get → book → delete flow", async () => {
    const company = "acme";
    const department = "sales";
    const date = "2025-10-23";

    // ------------------------
    // JWT TOKENS
    // ------------------------
    const userId = new mongoose.Types.ObjectId().toString();
    const token = jwt.sign(
      { _id: userId, email: "user@test.com", role: "user" },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" },
    );

    const anotherUserId = new mongoose.Types.ObjectId().toString();
    const anotherToken = jwt.sign(
      { _id: anotherUserId, email: "other@test.com", role: "user" },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" },
    );

    // ------------------------
    // CREATE SLOT
    // ------------------------
    const createRes = await request(app)
      .post(`${BASE}/create`)
      .send({
        company,
        department,
        date,
        start: "09:00",
        end: "10:00",
      })
      .expect(201);

    expect(createRes.body.message).toBe("Schedule created successfully");

    // ------------------------
    // GET SLOT
    // ------------------------
    const getRes = await request(app)
      .get(BASE)
      .query({ company, department, date })
      .expect(200);

    expect(getRes.body.schedule.length).toBe(1);

    const slot = getRes.body.schedule[0];
    expect(slot.start).toBe("09:00");

    // ------------------------
    // DB CHECK
    // ------------------------
    const doc = await Schedule.findOne({ company, department, date }).lean();
    expect(doc).toBeTruthy();

    const schedulesId = doc!._id.toString();
    const slotId = doc!.schedules[0].id;

    // ------------------------
    // BOOK SLOT
    // ------------------------
    const bookRes = await request(app)
      .put(`${BASE}/book`)
      .set("authorization", `Bearer ${token}`)
      .send({ schedulesId, id: slotId })
      .expect(200);

    expect(bookRes.body.message).toBe("Booked successfully");

    // ------------------------
    // BOOK AGAIN (FAIL)
    // ------------------------
    await request(app)
      .put(`${BASE}/book`)
      .set("authorization", `Bearer ${anotherToken}`)
      .send({ schedulesId, id: slotId })
      .expect(400);

    // ------------------------
    // DELETE BOOKED SLOT (FAIL)
    // ------------------------
    await request(app).delete(`${BASE}/delete/${slotId}`).expect(400);

    // ------------------------
    // CREATE SECOND SLOT
    // ------------------------
    const createRes2 = await request(app)
      .post(`${BASE}/create`)
      .send({
        company,
        department,
        date,
        start: "10:00",
        end: "11:00",
      })
      .expect(200);

    expect(createRes2.body.message).toBe("Schedule updated successfully");

    // ------------------------
    // DELETE UNBOOKED SLOT
    // ------------------------
    const doc2 = await Schedule.findOne({ company, department, date }).lean();
    const newSlot = doc2!.schedules.find((s: any) => s.start === "10:00");

    expect(newSlot).toBeTruthy();

    await request(app).delete(`${BASE}/delete/${newSlot!.id}`).expect(200);
  });

  test("get non-existing schedule returns 204", async () => {
    await request(app)
      .get(BASE)
      .query({
        company: "none",
        department: "none",
        date: "2099-01-01",
      })
      .expect(204);
  });

  test("delete non-existing slot returns 204", async () => {
    await request(app).delete(`${BASE}/delete/non-existent-id`).expect(204);
  });
});
