import { NextRequest } from "next/server";
import { createCategory } from "@/lib/services/categoryService";
import { createCategorySchema } from "@/lib/validations/categorySchema";
import { apiSuccess, apiError, apiValidationError } from "@/lib/utils/apiResponse";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // No extra transformation; Zod handles parentId as string|null
    const validated = createCategorySchema.parse(body);
    const category = await createCategory(validated);
    return apiSuccess(category);
  } catch (error) {
    if (error instanceof ZodError) {
      return apiValidationError(error.flatten().fieldErrors);
    }
    const message = error instanceof Error ? error.message : "Failed to create category";
    return apiError(message, 500);
  }
}