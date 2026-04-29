import { Router } from "express";
import { create, document, getAll, getOne, remove, update } from "../controllers/budgetController";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authenticate, getAll);
router.post("/", authenticate, create);
router.get("/:id", authenticate, getOne);
router.put("/:id", authenticate, update);
router.delete("/:id", authenticate, remove);
router.get("/:id/document", authenticate, document);

export default router;
