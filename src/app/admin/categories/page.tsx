// src/app/admin/categories/page.tsx
import { dbConnect } from "@/lib/db";
import Category from "@/lib/models/Category";
import { CategoriesTable } from "@/components/admin/categories/CategoriesTable";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Add } from "@mui/icons-material";

async function getCategories() {
  await dbConnect();
  const categories = await Category.find({}).sort({ order: 1, name: 1 }).lean();
  return categories.map((cat: any) => ({
    _id: cat._id.toString(),
    name: cat.name,
    slug: cat.slug,
    type: cat.type,
    parentId: cat.parentId ? cat.parentId.toString() : null,
    order: cat.order,
    isActive: cat.isActive,
  }));
}

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  const actionButton = (
    <Link href="/admin/categories/new">
      <Button className="gap-2 bg-orange-600 hover:bg-orange-700 text-white">
        <Add className="h-4 w-4" />
        دسته‌بندی جدید
      </Button>
    </Link>
  );

  return (
    <div>
      <AdminPageHeader
        title="مدیریت دسته‌بندی‌ها"
        description="مدیریت دسته‌بندی‌های محصولات و مقالات"
        action={actionButton}
      />
      <div className="bg-card/60 backdrop-blur-sm rounded-2xl border border-border/50 p-4 shadow-sm">
        <CategoriesTable categories={categories} />
      </div>
    </div>
  );
}