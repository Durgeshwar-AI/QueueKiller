import app from "./app";
import { job } from "./middlewares/rateLimiter";
import { connectDB } from "./utils/db";
import { connectRedis } from "./utils/redis";

const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
  try {
    await connectDB();
    await connectRedis();
    job.start();
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error("Failed to start server:", error);
  }
});
