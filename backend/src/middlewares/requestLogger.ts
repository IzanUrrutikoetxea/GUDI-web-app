import { Request, Response, NextFunction } from "express";
import { logger } from "../config/logger";

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();

  res.on("finish", () => {
    logger.info("HTTP request", {
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      durationMs: Date.now() - start,
      ip: req.ip,
      userAgent: req.get("user-agent"),
    });
  });

  next();
}
