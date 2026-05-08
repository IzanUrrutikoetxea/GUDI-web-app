import { Router } from "express";
import { send, stats } from "../controllers/notificationsController";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router();

router.post("/send", authenticate, send);
router.get("/stats", authenticate, stats);

export default router;
