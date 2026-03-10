import { Router } from "express";
import userRoutes from "./userRoutes";

const router = Router();

router.get("/health", (_req, res) => {
  res.status(200).json({
    message: "GUDI API is running correctly"
  });
});

router.use("/users", userRoutes);

export default router;