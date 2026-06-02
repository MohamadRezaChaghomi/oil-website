// src/lib/redis.ts
import Redis from "ioredis";

const REDIS_URL = process.env.REDIS_URL;

if (!REDIS_URL) {
  throw new Error("❌ Please define REDIS_URL environment variable inside .env.local");
}

/**
 * Global Redis client instance (singleton pattern)
 * Prevents multiple connections in development mode
 */
declare global {
  // eslint-disable-next-line no-var
  var redisClient: Redis | undefined;
}

let redis: Redis;

if (!global.redisClient) {
  redis = new Redis(REDIS_URL, {
    maxRetriesPerRequest: 3,
    retryStrategy: (times: number) => {
      const delay = Math.min(times * 50, 2000);
      console.warn(`⚠️ Redis connection retry ${times} in ${delay}ms`);
      return delay;
    },
    lazyConnect: false,
    enableReadyCheck: true,
  });

  // Event handlers for monitoring
  redis.on("connect", () => {
    console.log("🔌 Redis connecting...");
  });

  redis.on("ready", () => {
    console.log("✅ Redis connected successfully");
  });

  redis.on("error", (error) => {
    console.error("❌ Redis error:", error);
  });

  redis.on("close", () => {
    console.warn("⚠️ Redis connection closed");
  });

  redis.on("reconnecting", () => {
    console.log("🔄 Redis reconnecting...");
  });

  global.redisClient = redis;
} else {
  redis = global.redisClient;
}

export { redis };
export default redis;

// Graceful shutdown
process.on("SIGINT", async () => {
  if (redis) {
    await redis.quit();
    console.log("Redis connection closed due to app termination");
  }
  process.exit(0);
});