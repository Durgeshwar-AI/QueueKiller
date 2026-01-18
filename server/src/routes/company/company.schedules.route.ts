import { Router } from "express";

const router = Router();

router.get("/departmentID");
router.post("/");
router.put("/");
router.delete("/:schedulesID");

export default router;

// router.post("/create", createSchedule as RequestHandler);
// router.delete("/delete/:id", deleteSchedule);
