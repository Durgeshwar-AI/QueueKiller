import { config } from "dotenv";
import app from "./app";
import { fillBucket, job } from "./middlewares/rateLimiter";
import { connectDB } from "./utils/db";
import { connectRedis } from "./utils/redis";
import prisma from "./utils/client";
config();
const PORT = process.env.PORT || 5000;
async function startServer() {
  try {
    // 1️⃣ Connect to MongoDB
    await connectDB();
    await connectRedis();
    await fillBucket();
    await prisma.$connect();
    console.log("✓ Prisma connected to database");
    job.start();
    console.log("Bucket refill job started");
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
