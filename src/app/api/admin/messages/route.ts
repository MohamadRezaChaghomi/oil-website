import { NextRequest } from "next/server";
import { getMessages } from "@/lib/services/messageService";
import { messageQuerySchema } from "@/lib/validations/messageSchema";
import { apiSuccess, apiError, apiValidationError } from "@/lib/utils/apiResponse";
import { ZodError } from "zod";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const rawParams = Object.fromEntries(url.searchParams.entries());
    const { page, limit, status } = messageQuerySchema.parse(rawParams);
    const result = await getMessages({ page, limit, status });
    return apiSuccess(result);
  } catch (error) {
    if (error instanceof ZodError) {
      return apiValidationError(error.flatten().fieldErrors);
    }
    const message = error instanceof Error ? error.message : "Failed to fetch messages";
    return apiError(message, 500);
  }
}