import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import Schedule from "../../models/schedule.model";
import app from "../../app";

const BASE = process.env.TEST_BASE_PATH || "/api/schedule"; // adjust if needed

describe("Schedule integration tests", () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    // 1️⃣ Start in-memory MongoDB server
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    process.env.MONGO_URI = uri;

    // 2️⃣ Disconnect if an existing connection is active
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }

    // 3️⃣ Connect to the in-memory test DB
    await mongoose.connect(uri, { dbName: "test" });
  });

  afterAll(async () => {
    // 4️⃣ Cleanly disconnect & stop the in-memory DB
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    // 5️⃣ Clear all documents before each test
    await Schedule.deleteMany({});
  });

  test("create -> get -> book -> delete flow", async () => {
    const company = "acme";
    const department = "sales";
    const date = "2025-10-23";
    const start = "09:00";
    const end = "10:00";

    // Create schedule (no existing doc → 201)
    const createRes = await request(app)
      .post(`${BASE}/create`)
      .send({ company, department, date, start, end })
      .expect(201);
    expect(createRes.body.message).toBe("Schedule created successfully");

    // Fetch schedule (200)
    const getRes = await request(app)
      .get(`${BASE}`)
      .query({ company, department, date })
      .expect(200);
    expect(Array.isArray(getRes.body.schedule)).toBe(true);
    expect(getRes.body.schedule.length).toBe(1);
    const slot = getRes.body.schedule[0];
    expect(slot.start).toBe(start);
    expect(slot.end).toBe(end);

    // Read parent doc to get schedulesId
    const doc = await Schedule.findOne({ company, department, date }).lean();
    expect(doc).toBeTruthy();
    const schedulesId = (doc! as any)._id.toString();
    const slotId = (doc! as any).schedules[0].id;

    // Book the slot (200)
    const cid = new mongoose.Types.ObjectId().toHexString();
    const bookRes = await request(app)
      .put(`${BASE}/book`)
      .send({ schedulesId, id: slotId, cid })
      .expect(200);
    expect(bookRes.body.message).toBe("Booked successfully");

    // Booking again should fail (400)
    await request(app)
      .put(`${BASE}/book`)
      .send({
        schedulesId,
        id: slotId,
        cid: new mongoose.Types.ObjectId().toHexString(),
      })
      .expect(400);

    // Delete booked slot → should be rejected (400)
    await request(app).delete(`${BASE}/delete/${slotId}`).expect(400);

    // Create another slot then delete it when unbooked
    const createRes2 = await request(app)
      .post(`${BASE}/create`)
      .send({ company, department, date, start: "10:00", end: "11:00" })
      .expect(200); // updated existing doc
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
