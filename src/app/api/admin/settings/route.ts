import { NextRequest } from "next/server";
import { getSettingsMap, batchUpdateSettings } from "@/lib/services/settingService";
import { settingsBatchSchema } from "@/lib/validations/settingSchema";
import { apiSuccess, apiError, apiValidationError } from "@/lib/utils/apiResponse";
import { ZodError } from "zod";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const group = url.searchParams.get("group") || undefined;
    const settings = await getSettingsMap(group);
    return apiSuccess(settings);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch settings";
    return apiError(message, 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = settingsBatchSchema.parse(body);
    const group = body._group || "general";
    const updated = await batchUpdateSettings(validated, group);
    return apiSuccess(updated);
  } catch (error) {
    if (error instanceof ZodError) {
      return apiValidationError(error.flatten().fieldErrors);
    }
    const message = error instanceof Error ? error.message : "Failed to update settings";
    return apiError(message, 500);
  }
}