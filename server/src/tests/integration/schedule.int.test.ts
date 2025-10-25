// src/tests/integration/schedule.int.test.ts
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import Schedule from "../../models/schedule.model";
import app from "../../app";
import { connectRedis } from "../../utils/redis";
import { fillBucket } from "../../middlewares/rateLimiter";

const BASE = process.env.TEST_BASE_PATH || "/api/schedule";

describe("Schedule integration tests", () => {
  let mongoServer: MongoMemoryServer | undefined;
  let redisClient: any;

  // -------------------
  // Setup
  // -------------------
  beforeAll(async () => {
    // 1️⃣ Start Redis (or mock if you want)
    redisClient = await connectRedis();
    await fillBucket();

    // 2️⃣ Start in-memory MongoDB
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    process.env.MONGO_URI = uri; // ensure your app uses this URI

    // 3️⃣ Disconnect if already connected
    if (mongoose.connection.readyState !== 0) await mongoose.disconnect();

    // 4️⃣ Connect to in-memory DB
    await mongoose.connect(uri, { dbName: "test" });
  });

  // -------------------
  // Teardown
  // -------------------
  afterAll(async () => {
    // 5️⃣ Disconnect MongoDB
    await mongoose.disconnect();
    if (mongoServer) await mongoServer.stop();

    // 6️⃣ Disconnect Redis
    if (redisClient) await redisClient.quit();
  });

  // -------------------
  // Cleanup before each test
  // -------------------
  beforeEach(async () => {
    await Schedule.deleteMany({});
  });

  // -------------------
  // Integration tests
  // -------------------
  test("create -> get -> book -> delete flow", async () => {
    const company = "acme";
    const department = "sales";
    const date = "2025-10-23";
    const start = "09:00";
    const end = "10:00";

    // Create schedule
    const createRes = await request(app)
      .post(`${BASE}/create`)
      .send({ company, department, date, start, end })
      .expect(201);
    expect(createRes.body.message).toBe("Schedule created successfully");

    // Fetch schedule
    const getRes = await request(app)
      .get(`${BASE}`)
      .query({ company, department, date })
      .expect(200);
    expect(Array.isArray(getRes.body.schedule)).toBe(true);
    expect(getRes.body.schedule.length).toBe(1);
    const slot = getRes.body.schedule[0];
    expect(slot.start).toBe(start);
    expect(slot.end).toBe(end);

    // Get parent doc
    const doc = await Schedule.findOne({ company, department, date }).lean();
    expect(doc).toBeTruthy();
    const schedulesId = (doc! as any)._id.toString();
    const slotId = (doc! as any).schedules[0].id;

    // Book the slot
    const cid = new mongoose.Types.ObjectId().toHexString();
    const bookRes = await request(app)
      .put(`${BASE}/book`)
      .send({ schedulesId, id: slotId, cid })
      .expect(200);
    expect(bookRes.body.message).toBe("Booked successfully");

    // Booking again should fail
    await request(app)
      .put(`${BASE}/book`)
      .send({
        schedulesId,
        id: slotId,
        cid: new mongoose.Types.ObjectId().toHexString(),
      })
      .expect(400);

    // Delete booked slot -> should fail
    await request(app).delete(`${BASE}/delete/${slotId}`).expect(400);

    // Create another slot and delete when unbooked
    const createRes2 = await request(app)
      .post(`${BASE}/create`)
      .send({ company, department, date, start: "10:00", end: "11:00" })
      .expect(200);
    expect(createRes2.body.message).toBe("Schedule updated successfully");

    const doc2 = await Schedule.findOne({ company, department, date }).lean();
    const newSlot = (doc2! as any).schedules.find(
      (s: any) => s.start === "10:00",
    );
    expect(newSlot).toBeTruthy();
    await request(app).delete(`${BASE}/delete/${newSlot.id}`).expect(200);
  });

  test("get non-existent schedule returns 204", async () => {
    await request(app)
      .get(`${BASE}`)
      .query({ company: "nope", department: "General", date: "2099-01-01" })
      .expect(204);
  });

  test("delete non-existent slot returns 204", async () => {
    await request(app).delete(`${BASE}/delete/nonexistent-id`).expect(204);
  });
});
