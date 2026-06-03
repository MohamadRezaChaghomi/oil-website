// src/app/admin/categories/new/page.tsx
import { dbConnect } from "@/lib/db";
import Category from "@/lib/models/Category";
import { CategoryForm } from "@/components/admin/categories/CategoryForm";
import { AdminFormLayout } from "@/components/admin/shared/AdminFormLayout";

async function getParentCategories() {
  await dbConnect();
  const categories = await Category.find({}).sort({ name: 1 }).lean();
  return categories.map((cat) => ({ _id: cat._id.toString(), name: cat.name }));
}

export default async function NewCategoryPage() {
  const parentCategories = await getParentCategories();
  return (
    <AdminFormLayout title="ایجاد دسته‌بندی جدید" description="فرم زیر را تکمیل کنید تا دسته‌بندی جدید اضافه شود">
      <CategoryForm categories={parentCategories} />
    </AdminFormLayout>
  );
}