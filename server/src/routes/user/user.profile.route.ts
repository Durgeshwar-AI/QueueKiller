import { Router } from "express";
import { userAuthMiddleware } from "../../middlewares/user.middlewares";
import {
  getProfile,
  updateProfile,
} from "../../controllers/user/user.profile.controller";

const router = Router();

router.get("/", userAuthMiddleware, getProfile);
router.put("/", userAuthMiddleware, updateProfile);

export default router;
