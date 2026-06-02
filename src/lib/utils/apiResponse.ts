// src/lib/utils/apiResponse.ts
import { NextResponse } from "next/server";

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  error: string;
  details?: unknown;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export function apiSuccess<T>(data: T, status: number = 200): NextResponse<ApiSuccessResponse<T>> {
  return NextResponse.json({ success: true, data }, { status });
}

export function apiError(message: string, status: number = 400, details?: unknown): NextResponse<ApiErrorResponse> {
  return NextResponse.json({ success: false, error: message, details }, { status });
}

export function apiValidationError(errors: unknown): NextResponse<ApiErrorResponse> {
  return NextResponse.json({ success: false, error: "Validation failed", details: errors }, { status: 422 });
}