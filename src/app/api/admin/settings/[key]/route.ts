import { NextRequest } from "next/server";
import { getSettingByKey, upsertSetting, deleteSetting } from "@/lib/services/settingService";
import { settingSchema } from "@/lib/validations/settingSchema";
import { apiSuccess, apiError, apiValidationError } from "@/lib/utils/apiResponse";
import { ZodError } from "zod";

export async function GET(
  req: NextRequest,
  { params }: { params: { key: string } }
) {
  try {
    const setting = await getSettingByKey(params.key);
    if (!setting) return apiError("Setting not found", 404);
    return apiSuccess(setting);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch setting";
    return apiError(message, 500);
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { key: string } }
) {
  try {
    const body = await req.json();
    const validated = settingSchema.parse({ ...body, key: params.key });
    const setting = await upsertSetting(validated);
    return apiSuccess(setting);
  } catch (error) {
    if (error instanceof ZodError) {
      return apiValidationError(error.flatten().fieldErrors);
    }
    const message = error instanceof Error ? error.message : "Failed to update setting";
    return apiError(message, 500);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { key: string } }
) {
  try {
    const setting = await deleteSetting(params.key);
    if (!setting) return apiError("Setting not found", 404);
    return apiSuccess({ message: "Setting deleted successfully", key: params.key });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete setting";
    return apiError(message, 500);
  }
}