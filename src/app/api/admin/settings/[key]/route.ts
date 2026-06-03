// src/app/api/admin/settings/[key]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Setting from "@/lib/models/Settings";

// GET: دریافت یک تنظیم با کلید
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  try {
    await dbConnect();
    const { key } = await params;
    const setting = await Setting.findOne({ key }).lean();
    if (!setting) {
      return NextResponse.json({ error: "تنظیمات یافت نشد" }, { status: 404 });
    }
    return NextResponse.json({ ...setting, _id: setting._id.toString() });
  } catch (error) {
    console.error("Error fetching setting:", error);
    return NextResponse.json({ error: "خطا در دریافت تنظیمات" }, { status: 500 });
  }
}

// PUT: ویرایش تنظیمات (upsert)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  try {
    await dbConnect();
    const { key } = await params;
    const body = await req.json();
    const { value, group, description, isPublic } = body;

    const updated = await Setting.findOneAndUpdate(
      { key },
      { value, group, description, isPublic },
      { new: true, runValidators: true, upsert: false } // upsert: false تا کلید جدید ساخته نشود
    );

    if (!updated) {
      return NextResponse.json({ error: "تنظیمات یافت نشد" }, { status: 404 });
    }

    return NextResponse.json({ ...updated.toObject(), _id: updated._id.toString() });
  } catch (error) {
    console.error("Error updating setting:", error);
    return NextResponse.json({ error: "خطا در به‌روزرسانی تنظیمات" }, { status: 500 });
  }
}

// DELETE: حذف تنظیمات با کلید
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  try {
    await dbConnect();
    const { key } = await params;
    const deleted = await Setting.findOneAndDelete({ key });
    if (!deleted) {
      return NextResponse.json({ error: "تنظیمات یافت نشد" }, { status: 404 });
    }
    return NextResponse.json({ message: "تنظیمات با موفقیت حذف شد" });
  } catch (error) {
    console.error("Error deleting setting:", error);
    return NextResponse.json({ error: "خطا در حذف تنظیمات" }, { status: 500 });
  }
}