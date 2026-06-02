// src/lib/cors.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const allowedOrigins: string[] = process.env.ALLOWED_ORIGINS?.split(",") ?? ["http://localhost:3000"];

/**
 * Returns CORS headers as a plain object (Record<string, string>)
 * which is compatible with NextResponse headers.
 */
export function corsHeaders(requestOrigin: string | null): Record<string, string> | null {
  if (!requestOrigin) return null;
  const isAllowed = allowedOrigins.includes(requestOrigin);
  if (!isAllowed) return null;

  return {
    "Access-Control-Allow-Origin": requestOrigin,
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Max-Age": "86400",
  };
}

/**
 * Handles OPTIONS preflight request.
 */
export function handleCorsPreflight(request: NextRequest): NextResponse | null {
  const origin = request.headers.get("origin");
  const headers = corsHeaders(origin);
  if (!headers) return null;
  return new NextResponse(null, { status: 204, headers });
}

// Type for API handlers (no 'any' allowed)
type ApiHandler = (req: NextRequest, ...args: unknown[]) => Promise<NextResponse> | NextResponse;

/**
 * Wraps an API route handler with CORS support.
 * Automatically handles preflight and adds CORS headers to response.
 */
export function withCors<T extends ApiHandler>(handler: T): T {
  return (async (req: NextRequest, ...args: unknown[]) => {
    // Handle preflight
    const preflightResponse = handleCorsPreflight(req);
    if (preflightResponse) return preflightResponse;

    // Call original handler
    const response = await handler(req, ...args);

    // Add CORS headers to response if origin allowed
    const origin = req.headers.get("origin");
    const headers = corsHeaders(origin);
    if (headers && response instanceof NextResponse) {
      Object.entries(headers).forEach(([key, value]) => {
        response.headers.set(key, value);
      });
    }
    return response;
  }) as T;
}