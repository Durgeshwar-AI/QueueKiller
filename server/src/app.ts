import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { config } from "dotenv";
import scheduleRoutes from "./routes/schedule.route";
import rateLimitMiddleware from "./middlewares/rateLimiter";
import mongoSanitize from "express-mongo-sanitize";

const app = express();
config();

// Middleware
app.disable("x-powered-by");
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use((req, res, next) => {
  mongoSanitize.sanitize(req.body);
  mongoSanitize.sanitize(req.params);
  mongoSanitize.sanitize(req.query);
  next();
});
app.use(morgan("dev"));
app.use(rateLimitMiddleware);

app.use("/api/schedule", scheduleRoutes);

export default app;
