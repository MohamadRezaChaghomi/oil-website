import { NextRequest } from "next/server";
import { createSubscriber } from "@/lib/services/subscriberService";
import { subscribeSchema } from "@/lib/validations/subscriberSchema";
import { apiSuccess, apiError, apiValidationError } from "@/lib/utils/apiResponse";
import { withCors } from "@/lib/cors";
import { strictRateLimiter, getClientIdentifier } from "@/lib/rate-limit";
import { ZodError } from "zod";

export const POST = withCors(async (req: NextRequest) => {
  const identifier = getClientIdentifier(req);
  const rateResult = strictRateLimiter(identifier);
  if (!rateResult.success) {
    return apiError("Too many subscription attempts. Please try again later.", 429);
  }

  try {
    const body = await req.json();
    const validated = subscribeSchema.parse(body);
    const subscriber = await createSubscriber(validated);
    return apiSuccess({ message: "Subscribed successfully", email: subscriber?.email });
  } catch (error) {
    if (error instanceof ZodError) {
      return apiValidationError(error.flatten().fieldErrors);
    }
    if (error instanceof Error && error.message === "This email is already subscribed") {
      return apiError(error.message, 400);
    }
    const message = error instanceof Error ? error.message : "Failed to subscribe";
    return apiError(message, 500);
  }
});