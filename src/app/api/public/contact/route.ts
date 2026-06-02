import { NextRequest } from "next/server";
import { createMessage } from "@/lib/services/messageService";
import { createMessageSchema } from "@/lib/validations/messageSchema";
import { sendContactEmail, sendAutoReply } from "@/lib/services/emailService";
import { apiSuccess, apiError, apiValidationError } from "@/lib/utils/apiResponse";
import { withCors } from "@/lib/cors";
import { strictRateLimiter, getClientIdentifier } from "@/lib/rate-limit";
import { ZodError } from "zod";

export const POST = withCors(async (req: NextRequest) => {
  const identifier = getClientIdentifier(req);
  const rateResult = strictRateLimiter(identifier);
  if (!rateResult.success) {
    return apiError("Too many messages. Please try again later.", 429);
  }

  try {
    const body = await req.json();
    const validated = createMessageSchema.parse(body);
    const message = await createMessage(validated);
    // Send emails in background (don't await)
    sendContactEmail(validated).catch(console.error);
    sendAutoReply(validated).catch(console.error);
    return apiSuccess({ message: "Message sent successfully", id: message?._id });
  } catch (error) {
    if (error instanceof ZodError) {
      return apiValidationError(error.flatten().fieldErrors);
    }
    const message = error instanceof Error ? error.message : "Failed to send message";
    return apiError(message, 500);
  }
});