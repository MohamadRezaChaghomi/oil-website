import { NextRequest } from "next/server";
import { getArticles } from "@/lib/services/articleService";
import { articleQuerySchema } from "@/lib/validations/articleSchema";
import { apiSuccess, apiError, apiValidationError } from "@/lib/utils/apiResponse";
import { withCors } from "@/lib/cors";
import { defaultRateLimiter, getClientIdentifier } from "@/lib/rate-limit";
import { ZodError } from "zod";

export const GET = withCors(async (req: NextRequest) => {
  const identifier = getClientIdentifier(req);
  const rateResult = defaultRateLimiter(identifier);
  if (!rateResult.success) {
    return apiError("Too many requests. Please try again later.", 429);
  }

  try {
    const url = new URL(req.url);
    const rawParams = Object.fromEntries(url.searchParams.entries());
    const validatedQuery = articleQuerySchema.parse(rawParams);
    const result = await getArticles(validatedQuery);
    return apiSuccess(result);
  } catch (error) {
    if (error instanceof ZodError) {
      return apiValidationError(error.flatten().fieldErrors);
    }
    const message = error instanceof Error ? error.message : "Failed to fetch articles";
    return apiError(message, 500);
  }
});