import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import { config } from "dotenv";
import scheduleRoutes from "./routes/schedule.route";
import rateLimitMiddleware from "./middlewares/rateLimiter";

const app = express();
config();

// Middleware
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(rateLimitMiddleware);

app.use("/api/schedule", scheduleRoutes);

export default app;
