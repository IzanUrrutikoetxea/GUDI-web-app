import { Request, Response, NextFunction } from "express";
import {
  httpRequestsTotal,
  httpRequestDuration,
  httpActiveRequests,
} from "../config/metrics";

export function metricsMiddleware(req: Request, res: Response, next: NextFunction) {
  const start = process.hrtime();
  httpActiveRequests.inc();

  res.on("finish", () => {
    const [sec, ns] = process.hrtime(start);
    const duration = sec + ns / 1e9;

    // Normalize route: use matched route or path, strip IDs
    const route = req.route?.path
      ? `${req.baseUrl}${req.route.path}`
      : req.path.replace(/\/\d+/g, "/:id");

    const labels = {
      method: req.method,
      route,
      status_code: String(res.statusCode),
    };

    httpRequestsTotal.inc(labels);
    httpRequestDuration.observe(labels, duration);
    httpActiveRequests.dec();
  });

  next();
}
