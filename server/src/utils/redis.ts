import { createClient } from "redis";

const client = createClient({
  url: "redis://localhost:6379",
});

client.on("error", (err) => console.log("Redis Client Error", err));

export async function connectRedis() {
  if (!client.isOpen) {
    await client.connect();
    console.log("Redis connected");
  }
  return client;
}

export default client;

// Graceful shutdown helpers
process.on("SIGINT", async () => {
  try {
    if (client.isOpen) await client.disconnect();
  } finally {
    process.exit(0);
  }
});
