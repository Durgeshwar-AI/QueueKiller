import { Router } from "express";
import {
  loginValidation,
  registerValidation,
} from "../validators/user.validator";
import { registerUser, userLogin } from "../controllers/auth.controller";

const router = Router();

router.post("/login", loginValidation, userLogin);
router.post("/register", registerValidation, registerUser);
router.post("/logout");

export default router;
