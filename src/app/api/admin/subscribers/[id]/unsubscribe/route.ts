// src/app/api/admin/subscribers/[id]/unsubscribe/route.ts
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Subscriber from "@/lib/models/Subscriber";
import mongoose from "mongoose";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "شناسه نامعتبر" }, { status: 400 });
    }
    await dbConnect();
    const subscriber = await Subscriber.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );
    if (!subscriber) {
      return NextResponse.json({ error: "مشترک یافت نشد" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: subscriber });
  } catch (error) {
    return NextResponse.json({ error: "خطا در لغو اشتراک" }, { status: 500 });
  }
}