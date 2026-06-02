// src/lib/cache.ts
import { redis } from "./redis";

/**
 * Cache service with generic type support
 * Automatically handles JSON serialization/deserialization
 */

/**
 * Retrieves a cached value by key
 * @param key - Cache key
 * @returns Parsed value or null if not found / error
 */
export async function getCache<T>(key: string): Promise<T | null> {
  try {
    const data = await redis.get(key);
    if (!data) return null;
    return JSON.parse(data) as T;
  } catch (error) {
    console.error(`Cache get error for key "${key}":`, error);
    return null; // Fail gracefully: treat as cache miss
  }
}

/**
 * Stores a value in cache with TTL
 * @param key - Cache key
 * @param value - Any serializable value
 * @param ttlSeconds - Time to live in seconds (default: 60)
 */
export async function setCache(
  key: string,
  value: unknown,
  ttlSeconds: number = 60
): Promise<void> {
  try {
    const serialized = JSON.stringify(value);
    await redis.set(key, serialized, "EX", ttlSeconds);
  } catch (error) {
    console.error(`Cache set error for key "${key}":`, error);
    // No rethrow to avoid breaking the app; cache is non-critical
  }
}

/**
 * Deletes a single cache entry
 * @param key - Cache key
 */
export async function deleteCache(key: string): Promise<void> {
  try {
    await redis.del(key);
  } catch (error) {
    console.error(`Cache delete error for key "${key}":`, error);
  }
}

/**
 * Deletes all cache entries matching a glob pattern
 * @param pattern - Glob pattern (e.g., "user:*")
 * @warning Use with caution on large datasets
 */
export async function deleteCachePattern(pattern: string): Promise<void> {
  try {
    const keys = await redis.keys(pattern);
    if (keys.length) {
      await redis.del(...keys);
    }
  } catch (error) {
    console.error(`Cache pattern delete error for pattern "${pattern}":`, error);
  }
}

/**
 * Checks if a key exists in cache
 * @param key - Cache key
 */
export async function hasCache(key: string): Promise<boolean> {
  try {
    const exists = await redis.exists(key);
    return exists === 1;
  } catch {
    return false;
  }
}

/**
 * Increments a numeric value in cache (atomic)
 * @param key - Cache key
 * @param increment - Amount to add (default: 1)
 * @returns New value after increment
 */
export async function incrementCache(key: string, increment: number = 1): Promise<number | null> {
  try {
    return await redis.incrby(key, increment);
  } catch (error) {
    console.error(`Cache increment error for key "${key}":`, error);
    return null;
  }
}