import winston from "winston";

const { combine, timestamp, json, colorize, simple } = winston.format;

const isDev = process.env.NODE_ENV !== "production";

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  defaultMeta: { service: "gudi-backend" },
  format: combine(timestamp(), json()),
  transports: [
    // stdout — Logstash/Docker picks this up
    new winston.transports.Console({
      format: isDev ? combine(colorize(), simple()) : combine(timestamp(), json()),
    }),
  ],
});
