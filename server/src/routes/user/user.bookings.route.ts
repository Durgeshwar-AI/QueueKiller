import { Router } from "express";

const router = Router();

router.post("/book");
router.get("/");

export default router;

// router.get("/", getSchedule);
// router.put("/book", authMiddleware, bookSchedule as RequestHandler);
