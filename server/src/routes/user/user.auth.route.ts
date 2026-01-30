import { Router } from "express";
import {
  userLogin,
  userRegister,
  userLogout,
  userPing,
} from "../../controllers/user/user.auth.controller";
import {
  userLoginValidation,
  userRegisterValidation,
} from "../../validators/user.validator";
import { userAuthMiddleware } from "../../middlewares/user.middlewares";

const router = Router();

router.post("/login", userLoginValidation, userLogin);
router.post("/register", userRegisterValidation, userRegister);
router.get("/ping", userAuthMiddleware, userPing);
router.post("/logout", userLogout);

export default router;
