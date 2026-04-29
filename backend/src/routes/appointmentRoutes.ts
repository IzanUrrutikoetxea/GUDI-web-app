import { Router } from "express";
import { create, getAll, getOne, remove, update } from "../controllers/appointmentController";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authenticate, getAll);
router.post("/", authenticate, create);
router.get("/:id", authenticate, getOne);
router.put("/:id", authenticate, update);
router.delete("/:id", authenticate, remove);

export default router;
