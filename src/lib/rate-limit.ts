// src/lib/rate-limit.ts
// In-memory rate limiter (for development / single instance)
// For production with multiple instances, use Redis-based limiter.

type RateLimitStore = Map<string, { count: number; resetTime: number }>;
const store: RateLimitStore = new Map();

interface RateLimitOptions {
  limit: number;      // max requests per window
  windowMs: number;   // time window in milliseconds
}

interface RateLimitResult {
  success: boolean;
  remaining?: number;
  resetTime?: number;
  limit?: number;
}

/**
 * Creates a rate limiter function.
 * Returns a function that takes an identifier (e.g., IP or user ID)
 * and returns whether the request is allowed.
 */
export function createRateLimiter(options: RateLimitOptions) {
  const { limit, windowMs } = options;

  return (identifier: string): RateLimitResult => {
    const now = Date.now();
    const record = store.get(identifier);

    // No record: allow and create new window
    if (!record) {
      store.set(identifier, { count: 1, resetTime: now + windowMs });
      return { success: true, remaining: limit - 1, resetTime: now + windowMs, limit };
    }

    // Window expired: reset
    if (now > record.resetTime) {
      store.set(identifier, { count: 1, resetTime: now + windowMs });
      return { success: true, remaining: limit - 1, resetTime: now + windowMs, limit };
    }

    // Within window: check count
    if (record.count >= limit) {
      return { success: false, remaining: 0, resetTime: record.resetTime, limit };
    }

    // Increment
    record.count += 1;
    store.set(identifier, record);
    return {
      success: true,
      remaining: limit - record.count,
      resetTime: record.resetTime,
      limit,
    };
  };
}

// Default limiter for API routes (100 requests per 1 minute)
export const defaultRateLimiter = createRateLimiter({ limit: 100, windowMs: 60 * 1000 });

// Stricter limiter for contact form / auth (10 requests per 5 minutes)
export const strictRateLimiter = createRateLimiter({ limit: 10, windowMs: 5 * 60 * 1000 });

/**
 * Helper to extract client identifier (IP) from request.
 * Falls back to a fixed string for localhost.
 */
export function getClientIdentifier(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "127.0.0.1";
}