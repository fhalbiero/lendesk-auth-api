import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import request from "supertest";
import { buildApp } from "@/app";
import Redis from "ioredis";
import { ApiErrorCode, errorMessages } from "@/errors/api.error";

describe("POST /v1/auth", async () => {
  const app = await buildApp();
  const redis = new Redis(`${process.env.REDIS_HOST || "redis://localhost"}:${process.env.REDIS_PORT || "6379"}`);

  beforeAll(async () => {
    await app.ready();
  });

  beforeEach(async () => {
    await redis.flushdb();
  });

  afterAll(async () => {
    await redis.quit();
    await app.close();
  });

  it("should authenticate successfully with correct credentials", async () => {
    // Create user first
    await request(app.server).post("/v1/users").send({
      username: "fabio",
      password: "StrongPassword123!",
    });

    const response = await request(app.server).post("/v1/auth").send({
      username: "fabio",
      password: "StrongPassword123!",
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ ok: true });
  });

  it("should return 401 for wrong password", async () => {
    await request(app.server).post("/v1/users").send({
      username: "fabio",
      password: "StrongPassword123!",
    });

    const response = await request(app.server).post("/v1/auth").send({
      username: "fabio",
      password: "WrongPassword123!",
    });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      error: { 
        code: "INVALID_CREDENTIALS" as ApiErrorCode, 
        message: errorMessages.INVALID_CREDENTIALS 
      },
    });
  });

  it("should return 401 for unknown username (same response as wrong password)", async () => {
    const response = await request(app.server).post("/v1/auth").send({
      username: "unknown",
      password: "SomePassword123!",
    });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      error: { 
        code: "INVALID_CREDENTIALS" as ApiErrorCode, 
        message: errorMessages.INVALID_CREDENTIALS 
      },
    });
  });

});
