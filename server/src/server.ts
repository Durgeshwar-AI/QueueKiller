import { config } from "dotenv";
import app from "./app";
import { fillBucket, job } from "./middlewares/rateLimiter";
import { connectDB } from "./utils/db";
import { connectRedis } from "./utils/redis";
config();
const PORT = process.env.PORT || 5000;
async function startServer() {
  try {
    // 1️⃣ Connect to MongoDB
    await connectDB();
    await connectRedis();
    await fillBucket();
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
