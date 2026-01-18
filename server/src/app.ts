import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { config } from "dotenv";
import rateLimitMiddleware from "./middlewares/rateLimiter";
import mongoSanitize from "express-mongo-sanitize";

// Importing all the admin routes
import adminAuthRoutes from "./routes/admin/admin.auth.route";
import adminCompanyRoutes from "./routes/admin/admin.company.route";
import adminDepartmentRoutes from "./routes/admin/admin.department.route";

// Importing all the user routes
import userAuthRoutes from "./routes/user/user.auth.route";
import userRoutes from "./routes/user/user.profile.route";
import userBookingsRoutes from "./routes/user/user.bookings.route";
import userQrRoutes from "./routes/user/user.qr.route";
import userSchedulesRoutes from "./routes/user/user.schedules.route";
import userPaymentRoutes from "./routes/user/user.payments.route";

// Importing all the company routes
import companyAuthRoutes from "./routes/company/company.auth.route";
import companyDepartmentsRoutes from "./routes/company/company.departments.route";
import companySchedulesRoutes from "./routes/company/company.schedules.route";
import companyBookingsRoutes from "./routes/company/company.bookings.route";

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

// Admin Routes
app.use("/api/admin", adminAuthRoutes);
app.use("/api/admin/company", adminCompanyRoutes);
app.use("/api/admin/department", adminDepartmentRoutes);

// User Routes
app.use("/api/user/auth", userAuthRoutes);
app.use("/api/user/", userRoutes);
app.use("/api/user/bookings", userBookingsRoutes);
app.use("/api/user/qr", userQrRoutes);
app.use("/api/user/schedules", userSchedulesRoutes);
app.use("/api/user/payment", userPaymentRoutes);

// Company Routes
app.use("/api/company/auth", companyAuthRoutes);
app.use("/api/company/departments", companyDepartmentsRoutes);
app.use("/api/company/schedules", companySchedulesRoutes);
app.use("/api/company/bookings", companyBookingsRoutes);

export default app;
