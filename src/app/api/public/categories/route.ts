import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Category from "@/lib/models/Category";
import Product from "@/lib/models/Product";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type"); // 'product' یا 'article'
    const includeProducts = searchParams.get("includeProducts") === "true";

    // شرط فیلتر
    const filter: any = { isActive: true };
    if (type) filter.type = type;

    // دریافت دسته‌بندی‌ها
    const categories = await Category.find(filter).sort({ order: 1 }).lean();

    // اگر نیاز به محصولات باشد، برای هر دسته، محصولات مرتبط را دریافت کن
    let result = categories.map((cat) => ({
      ...cat,
      _id: cat._id.toString(),
    }));

    if (includeProducts) {
      const categoriesWithProducts = await Promise.all(
        result.map(async (cat) => {
          const products = await Product.find({ category: cat._id, isActive: true })
            .select("title slug")
            .lean();
          return {
            ...cat,
            products: products.map((p) => ({
              _id: p._id.toString(),
              name: p.title,
              slug: p.slug,
            })),
          };
        })
      );
      result = categoriesWithProducts;
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ error: "خطا در دریافت دسته‌بندی‌ها" }, { status: 500 });
  }
}