import { Router } from "express";
import { create, getAll, getOne, remove, stats, updateStatus } from "../controllers/messageController";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authenticate, getAll);
router.post("/", authenticate, create);
router.get("/stats", authenticate, stats);
router.get("/:id", authenticate, getOne);
router.patch("/:id/status", authenticate, updateStatus);
router.delete("/:id", authenticate, remove);

export default router;
