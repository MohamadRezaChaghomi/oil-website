// src/lib/cors.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const allowedOrigins: string[] = process.env.ALLOWED_ORIGINS?.split(",") ?? ["http://localhost:3000"];

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

export function handleCorsPreflight(request: NextRequest): NextResponse | null {
  const origin = request.headers.get("origin");
  const headers = corsHeaders(origin);
  if (!headers) return null;
  return new NextResponse(null, { status: 204, headers });
}

type ApiHandler = (req: NextRequest, ...args: unknown[]) => Promise<NextResponse> | NextResponse;

export function withCors<T extends ApiHandler>(handler: T): T {
  return (async (req: NextRequest, ...args: unknown[]) => {
    const preflightResponse = handleCorsPreflight(req);
    if (preflightResponse) return preflightResponse;

    const response = await handler(req, ...args);
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