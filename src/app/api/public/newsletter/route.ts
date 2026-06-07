// src/app/api/public/newsletter/route.ts
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Subscriber from "@/lib/models/Subscriber";
import { subscribeSchema } from "@/lib/validations/subscriberSchema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = subscribeSchema.parse(body);

    await dbConnect();
    const existingSubscriber = await Subscriber.findOne({ email });

    if (existingSubscriber) {
      if (!existingSubscriber.isActive) {
        existingSubscriber.isActive = true;
        await existingSubscriber.save();
        return NextResponse.json({
          success: true,
          message: "اشتراک شما مجدداً فعال شد.",
        });
      }
      return NextResponse.json(
        { success: false, error: "این ایمیل قبلاً ثبت‌نام کرده است." },
        { status: 400 }
      );
    }

    const subscriber = await Subscriber.create({ email, isActive: true });
    return NextResponse.json(
      { success: true, message: "اشتراک شما با موفقیت ثبت شد.", data: subscriber },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "خطای سرور" },
      { status: 500 }
    );
  }
}