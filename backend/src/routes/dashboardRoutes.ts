import { Router } from "express";
import { stats } from "../controllers/dashboardController";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware";

const rateLimit = require("express-rate-limit");

const router = Router();

const dashboardStatsLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 30,
    message: {
        message: "Too many requests",
    },
});

router.get(
    "/stats",
    dashboardStatsLimiter,
    authenticate,
    authorizeAdmin,
    stats
);

export default router;
