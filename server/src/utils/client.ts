import { PrismaClient } from "../generated/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required");
}

const { hostname } = new URL(databaseUrl);
const isNeonDatabase = hostname.endsWith(".neon.tech");

const pool = new Pool({
  connectionString: databaseUrl,
  ssl: isNeonDatabase ? { rejectUnauthorized: false } : undefined,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export default prisma;
