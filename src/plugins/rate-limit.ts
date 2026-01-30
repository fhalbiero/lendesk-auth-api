import rateLimit from "@fastify/rate-limit";
import { FastifyInstance } from "fastify";

export async function registerRateLimit(app: FastifyInstance) {
  app.register(rateLimit, {
    global: false,
    hook: "onRequest",
    keyGenerator: (req) => {
      const xff = req.headers["x-forwarded-for"];
      if (typeof xff === "string" && xff.length > 0) return xff.split(",")[0].trim();
      return req.ip;
    },
  });
}
