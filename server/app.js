import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import { connectDB } from "./utils/db.js";
import { config } from "dotenv";
import scheduleRoutes from './routes/schedule.route.js'

const app = express();
config();

// Middleware
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));


const PORT = process.env.PORT || 3000;

app.use('/api/schedule',scheduleRoutes)

app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error("Failed to start server:", error);
  }
});
