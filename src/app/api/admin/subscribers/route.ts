import { NextRequest } from "next/server";
import { getSubscribers } from "@/lib/services/subscriberService";
import { apiSuccess, apiError } from "@/lib/utils/apiResponse";
import { z } from "zod";

const querySchema = z.object({
  page: z.preprocess((val) => Number(val) || 1, z.number().int().positive().default(1)),
  limit: z.preprocess((val) => Number(val) || 20, z.number().int().min(1).max(100).default(20)),
});

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const rawParams = Object.fromEntries(url.searchParams.entries());
    const { page, limit } = querySchema.parse(rawParams);
    const result = await getSubscribers(page, limit);
    return apiSuccess(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch subscribers";
    return apiError(message, 500);
  }
}