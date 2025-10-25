import { CronJob } from "cron";
import client from "../utils/redis";
import { NextFunction, Request, Response } from "express";

const RATE_LIMIT = 10;
const PREFIX = process.env.REDISPREFIX || "app:";

const BUCKET_KEY = `${PREFIX}bucket`;

const refillBucket = async () => {
  const len = await client.lLen(BUCKET_KEY);
  if (len < RATE_LIMIT) {
    await client.rPush(BUCKET_KEY, Date.now().toString());
    console.log("Token added to bucket");
  }
};

const rateLimitMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const len = await client.lLen(BUCKET_KEY);

  if (len > 0) {
    const token = await client.lPop(BUCKET_KEY);
    console.log(`Token ${token} consumed`);
    return next();
  } else {
    return res
      .status(429)
      .set("Retry-After", "2")
      .json({ success: false, message: "Too many requests" });
  }
};

export default rateLimitMiddleware;

export const job = new CronJob("*/2 * * * * *", refillBucket);
