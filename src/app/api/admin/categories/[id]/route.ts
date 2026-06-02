import { NextRequest } from "next/server";
import { getCategoryById, updateCategory, deleteCategory } from "@/lib/services/categoryService";
import { updateCategorySchema } from "@/lib/validations/categorySchema";
import { apiSuccess, apiError, apiValidationError } from "@/lib/utils/apiResponse";
import { ZodError } from "zod";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const category = await getCategoryById(params.id);
    if (!category) return apiError("Category not found", 404);
    return apiSuccess(category);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch category";
    return apiError(message, 500);
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const validated = updateCategorySchema.parse(body);
    const category = await updateCategory(params.id, validated);
    if (!category) return apiError("Category not found", 404);
    return apiSuccess(category);
  } catch (error) {
    if (error instanceof ZodError) {
      return apiValidationError(error.flatten().fieldErrors);
    }
    const message = error instanceof Error ? error.message : "Failed to update category";
    return apiError(message, 500);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const category = await deleteCategory(params.id);
    if (!category) return apiError("Category not found", 404);
    return apiSuccess({ message: "Category deleted successfully", id: category._id });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete category";
    return apiError(message, 500);
  }
}