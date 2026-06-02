// src/lib/rate-limit.ts
type RateLimitStore = Map<string, { count: number; resetTime: number }>;
const store: RateLimitStore = new Map();

interface RateLimitOptions {
  limit: number;
  windowMs: number;
}

interface RateLimitResult {
  success: boolean;
  remaining?: number;
  resetTime?: number;
  limit?: number;
}

export function createRateLimiter(options: RateLimitOptions) {
  const { limit, windowMs } = options;

  return (identifier: string): RateLimitResult => {
    const now = Date.now();
    const record = store.get(identifier);

    if (!record) {
      store.set(identifier, { count: 1, resetTime: now + windowMs });
      return { success: true, remaining: limit - 1, resetTime: now + windowMs, limit };
    }

    if (now > record.resetTime) {
      store.set(identifier, { count: 1, resetTime: now + windowMs });
      return { success: true, remaining: limit - 1, resetTime: now + windowMs, limit };
    }

    if (record.count >= limit) {
      return { success: false, remaining: 0, resetTime: record.resetTime, limit };
    }

    record.count += 1;
    store.set(identifier, record);
    return { success: true, remaining: limit - record.count, resetTime: record.resetTime, limit };
  };
}

export const defaultRateLimiter = createRateLimiter({ limit: 100, windowMs: 60 * 1000 });
export const strictRateLimiter = createRateLimiter({ limit: 10, windowMs: 5 * 60 * 1000 });

export function getClientIdentifier(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "127.0.0.1";
}