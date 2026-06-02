import { NextRequest } from "next/server";
import { getMessageById, updateMessageStatus, deleteMessage } from "@/lib/services/messageService";
import { updateMessageStatusSchema } from "@/lib/validations/messageSchema";
import { apiSuccess, apiError, apiValidationError } from "@/lib/utils/apiResponse";
import { ZodError } from "zod";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const message = await getMessageById(params.id);
    if (!message) return apiError("Message not found", 404);
    return apiSuccess(message);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch message";
    return apiError(message, 500);
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const validated = updateMessageStatusSchema.parse(body);
    const message = await updateMessageStatus(params.id, validated);
    if (!message) return apiError("Message not found", 404);
    return apiSuccess(message);
  } catch (error) {
    if (error instanceof ZodError) {
      return apiValidationError(error.flatten().fieldErrors);
    }
    const message = error instanceof Error ? error.message : "Failed to update message status";
    return apiError(message, 500);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const message = await deleteMessage(params.id);
    if (!message) return apiError("Message not found", 404);
    return apiSuccess({ message: "Message deleted successfully", id: message._id });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete message";
    return apiError(message, 500);
  }
}