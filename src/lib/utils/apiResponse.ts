// src/lib/utils/apiResponse.ts
import { NextResponse } from "next/server";

/**
 * Standard API response helper.
 * Usage: return apiSuccess({ data: ... });
 */
export function apiSuccess<T>(data: T, status: number = 200): NextResponse {
  return NextResponse.json({ success: true, data }, { status });
}

export function apiError(message: string, status: number = 400, details?: unknown): NextResponse {
  return NextResponse.json({ success: false, error: message, details }, { status });
}

export function apiValidationError(errors: unknown): NextResponse {
  return NextResponse.json({ success: false, error: "Validation failed", errors }, { status: 422 });
}