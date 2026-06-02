import { NextRequest } from "next/server";
import { createArticle } from "@/lib/services/articleService";
import { createArticleSchema } from "@/lib/validations/articleSchema";
import { apiSuccess, apiError, apiValidationError } from "@/lib/utils/apiResponse";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = createArticleSchema.parse(body);
    const article = await createArticle(validated);
    return apiSuccess(article);
  } catch (error) {
    if (error instanceof ZodError) {
      return apiValidationError(error.flatten().fieldErrors);
    }
    const message = error instanceof Error ? error.message : "Failed to create article";
    return apiError(message, 500);
  }
}