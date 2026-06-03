// src/lib/redis.ts
import Redis from "ioredis";

let redisClient: Redis | null = null;
let connectionAttempted = false;

const REDIS_URL = process.env.REDIS_URL;

/**
 * Returns a Redis client only if already connected.
 * No automatic connection attempts.
 */
export function getRedis(): Redis | null {
  return redisClient;
}

/**
 * Attempts to connect to Redis once. Call this manually if needed.
 */
export async function initRedis(): Promise<void> {
  if (!REDIS_URL || connectionAttempted) return;
  connectionAttempted = true;

  try {
    const client = new Redis(REDIS_URL, {
      maxRetriesPerRequest: 0,
      retryStrategy: () => null,
      lazyConnect: true,
      connectTimeout: 2000,
    });

    // Ignore all errors silently
    client.on("error", () => {});

    await client.connect();
    console.log("✅ Redis connected");
    redisClient = client;
  } catch {
    // Silently ignore connection failures
  }
}

// Optional: auto-init on first import (but without blocking)
if (process.env.NODE_ENV === "production") {
  initRedis().catch(() => {});
}