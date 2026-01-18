import { Router } from "express";
import {
  userLogin,
  userRegister,
} from "../../controllers/user/user.auth.controller";
import {
  loginValidation,
  registerValidation,
} from "../../validators/user.validator";

const router = Router();

router.post("/login", loginValidation, userLogin);
router.post("/register", registerValidation, userRegister);
router.post("/logout");

export default router;
