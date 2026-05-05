import { config } from "dotenv";
import app from "./app";
import { fillBucket, job } from "./middlewares/rateLimiter";
import { connectRedis } from "./utils/redis";
import prisma from "./utils/client";
import { registerAdmin } from "./services/admin.service";
config();
const PORT = process.env.PORT || 5000;
async function startServer() {
  try {
    try {
      await connectRedis();
    } catch (err) {
      console.log("Redis connection failed", err);
    }
    try {
      await fillBucket();
    } catch (err) {
      console.log("Bucket refill failed", err);
    }
    try {
      await prisma.$connect();
      console.log("Prisma connected to database");
    } catch (err) {
      console.log("Prisma connection failed", err);
    }
    try {
      job.start();
    } catch (err) {
      console.log("Job failed to start", err);
    }
    await registerAdmin();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}
startServer();
process.on("SIGINT", async () => {
  await prisma.$disconnect();
});
