import cors from "cors";
import express from "express";
import routes from "./routes";
import { errorHandler } from "./middlewares/errorHandler";
import { metricsMiddleware } from "./middlewares/metricsMiddleware";
import { requestLogger } from "./middlewares/requestLogger";
import { register } from "./config/metrics";

const app = express();

app.use(cors());
app.use(express.json());
app.use(metricsMiddleware);
app.use(requestLogger);

// Prometheus scrape endpoint (no auth — only accessible internally)
app.get("/metrics", async (_req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

app.use("/api", routes);

app.use(errorHandler);

export default app;
