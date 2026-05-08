import client from "prom-client";

// Enable default Node.js metrics (CPU, memory, event loop, etc.)
client.collectDefaultMetrics({ prefix: "gudi_" });

// HTTP request counter
export const httpRequestsTotal = new client.Counter({
  name: "gudi_http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status_code"],
});

// HTTP request duration histogram
export const httpRequestDuration = new client.Histogram({
  name: "gudi_http_request_duration_seconds",
  help: "HTTP request duration in seconds",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5],
});

// Active requests gauge
export const httpActiveRequests = new client.Gauge({
  name: "gudi_http_active_requests",
  help: "Number of active HTTP requests",
});

export const register = client.register;
