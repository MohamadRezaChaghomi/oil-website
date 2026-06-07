import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import { createMessage } from "@/lib/services/messageService";
import { createMessageSchema } from "@/lib/validations/messageSchema";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const validated = createMessageSchema.parse(body);
    const message = await createMessage(validated);
    return NextResponse.json({ success: true, data: message }, { status: 201 });
  } catch (error: any) {
    console.error("Contact API error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}