import { NextRequest } from "next/server";
import { getCategories, getCategoryTree } from "@/lib/services/categoryService";
import { apiSuccess, apiError } from "@/lib/utils/apiResponse";
import { withCors } from "@/lib/cors";
import { z } from "zod";

const querySchema = z.object({
  type: z.enum(["product", "article"]).optional(),
  tree: z.enum(["true", "false"]).optional().transform(v => v === "true"),
});

export const GET = withCors(async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const rawParams = Object.fromEntries(url.searchParams.entries());
    const { type, tree } = querySchema.parse(rawParams);
    const result = tree ? await getCategoryTree(type) : await getCategories(type);
    return apiSuccess(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch categories";
    return apiError(message, 500);
  }
});