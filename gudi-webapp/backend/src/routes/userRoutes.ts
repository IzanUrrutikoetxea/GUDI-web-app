import { Router } from "express";
import { createUserHandler, getUsers } from "../controllers/userController";

const router = Router();

router.get("/", getUsers);
router.post("/", createUserHandler);

export default router;