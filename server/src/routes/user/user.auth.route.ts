import { Router } from "express";
import {
  userLogin,
  userRegister,
} from "../../controllers/user/user.auth.controller";
import {
  userLoginValidation,
  userRegisterValidation,
} from "../../validators/user.validator";

const router = Router();

router.post("/login", userLoginValidation, userLogin);
router.post("/register", userRegisterValidation, userRegister);
router.post("/logout");

export default router;
