import { Router } from "express";
import { getAllDepartments } from "../controllers/departments.controller";

const router = Router();

router.get("/all", getAllDepartments);

export default router;
