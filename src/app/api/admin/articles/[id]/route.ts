import { NextRequest } from "next/server";
import { getArticleById, updateArticle, deleteArticle } from "@/lib/services/articleService";
import { updateArticleSchema } from "@/lib/validations/articleSchema";
import { apiSuccess, apiError, apiValidationError } from "@/lib/utils/apiResponse";
import { ZodError } from "zod";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const article = await getArticleById(params.id);
    if (!article) return apiError("Article not found", 404);
    return apiSuccess(article);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch article";
    return apiError(message, 500);
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const validated = updateArticleSchema.parse(body);
    const article = await updateArticle(params.id, validated);
    return apiSuccess(article);
  } catch (error) {
    if (error instanceof ZodError) {
      return apiValidationError(error.flatten().fieldErrors);
    }
    const message = error instanceof Error ? error.message : "Failed to update article";
    return apiError(message, 500);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const article = await deleteArticle(params.id);
    return apiSuccess({ message: "Article deleted successfully", id: article?._id });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete article";
    return apiError(message, 500);
  }
}