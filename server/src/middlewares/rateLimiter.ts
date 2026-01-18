import { CronJob } from "cron";
import { connectRedis } from "../utils/redis";
import { NextFunction, Request, Response } from "express";
import os from "os";

const RATE_LIMIT = 300;
const PREFIX = process.env.REDISPREFIX || "app:";

const INSTANCE_ID = os.hostname() + "-" + process.pid;
const BUCKET_KEY = `${PREFIX}bucket:${INSTANCE_ID}`;

export const fillBucket = async () => {
  let client = await connectRedis();
  const len = await client.lLen(BUCKET_KEY);

  for (let i = len; i < RATE_LIMIT; i++) {
    await client.rPush(BUCKET_KEY, Date.now().toString());
  }

  console.log(
    `Bucket filled. Current tokens: ${await client.lLen(BUCKET_KEY)}`,
  );
};

const refillBucket = async () => {
  let client = await connectRedis();
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
  let client = await connectRedis();
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

export const job = new CronJob("*/1 * * * * *", refillBucket);
