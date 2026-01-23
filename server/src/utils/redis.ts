import { config } from "dotenv";
import { createClient, RedisClientType } from "redis";
import { RedisMemoryServer } from "redis-memory-server";

config();

let client: RedisClientType;
let redisServer: RedisMemoryServer;
const isTest = process.env.NODE_ENV === "test";

export async function connectRedis(): Promise<RedisClientType> {
  if (!client) {
    if (isTest) {
      if (!redisServer) redisServer = await RedisMemoryServer.create();
      const port = await redisServer.getPort();
      const uri = `redis://localhost:${port}`;
      client = createClient({ url: uri });
    } else {
      client = createClient({ url: process.env.REDIS_URL });
    }

    await client.connect();
    client.on("error", (err) => console.log("Redis Client Error", err));

    console.log(isTest ? "In-memory Redis connected" : "Redis connected");
  }
  return client;
}

export async function stopRedis() {
  if (client?.isOpen) await client.disconnect();
  if (redisServer) await redisServer.stop();
}

export const createRedis = async (
  key: string,
  value: string,
  duration: number, // seconds
): Promise<void> => {
  const client = await connectRedis();

  await client.set(key, value, {
    EX: duration,
  });
};

export const checkRedis = async (key: string): Promise<boolean> => {
  const client = await connectRedis();

  const data = await client.get(key);
  return data !== null;
};

export const deleteRedis = async (key: string): Promise<void> => {
  const client = await connectRedis();

  await client.del(key);
};
