// src/app/api/admin/settings/route.ts
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Setting from "@/lib/models/Settings";

// GET: دریافت تمام تنظیمات (با قابلیت فیلتر بر اساس گروه)
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const group = searchParams.get("group");

    const filter: any = {};
    if (group) filter.group = group;

    const settings = await Setting.find(filter).sort({ group: 1, key: 1 }).lean();
    const result = settings.map((s: any) => ({
      ...s,
      _id: s._id.toString(),
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json({ error: "خطا در دریافت تنظیمات" }, { status: 500 });
  }
}

// POST: ایجاد تنظیمات جدید (upsert بر اساس key)
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const { key, value, group, description, isPublic } = body;

    if (!key || value === undefined) {
      return NextResponse.json({ error: "کلید و مقدار الزامی هستند" }, { status: 400 });
    }

    // بررسی تکراری نبودن کلید
    const existing = await Setting.findOne({ key });
    if (existing) {
      return NextResponse.json({ error: "تنظیماتی با این کلید قبلاً وجود دارد" }, { status: 409 });
    }

    const setting = await Setting.create({
      key,
      value,
      group: group || "general",
      description: description || "",
      isPublic: isPublic ?? false,
    });

    return NextResponse.json({ ...setting.toObject(), _id: setting._id.toString() }, { status: 201 });
  } catch (error) {
    console.error("Error creating setting:", error);
    return NextResponse.json({ error: "خطا در ایجاد تنظیمات" }, { status: 500 });
  }
}