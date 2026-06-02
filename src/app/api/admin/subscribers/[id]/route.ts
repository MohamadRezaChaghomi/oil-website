import { NextRequest } from "next/server";
import { deleteSubscriber } from "@/lib/services/subscriberService";
import { apiSuccess, apiError } from "@/lib/utils/apiResponse";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const subscriber = await deleteSubscriber(params.id);
    if (!subscriber) return apiError("Subscriber not found", 404);
    return apiSuccess({ message: "Subscriber deleted successfully", id: subscriber._id });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete subscriber";
    return apiError(message, 500);
  }
}