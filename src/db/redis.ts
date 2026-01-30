import Redis from "ioredis";

let redis: Redis | null = null;

export function getRedis() {
  if (!redis) {
    const url = `${process.env.REDIS_HOST || "redis://localhost"}:${process.env.REDIS_PORT || "6379"}`;
    redis = new Redis(url, {
      maxRetriesPerRequest: 2,
      enableReadyCheck: true,
      lazyConnect: true,
    });

    redis.on("error", (err) => {
      console.error("Redis error:", err);
    });
  }

  return redis;
}

export async function closeRedis() {
  if (redis) {
    await redis.quit();
    redis = null;
  }
}
