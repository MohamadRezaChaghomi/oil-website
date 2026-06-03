// src/app/admin/articles/new/page.tsx
import { dbConnect } from "@/lib/db";
import Category from "@/lib/models/Category";
import { ArticleForm } from "@/components/admin/articles/ArticleForm";
import { AdminFormLayout } from "@/components/admin/shared/AdminFormLayout";

async function getCategories() {
  await dbConnect();
  const categories = await Category.find({ type: "article", isActive: true }).lean();
  return categories.map((c) => ({ _id: c._id.toString(), name: c.name }));
}

export default async function NewArticlePage() {
  const categories = await getCategories();
  return (
    <AdminFormLayout title="ایجاد مقاله جدید" description="فرم زیر را تکمیل کنید تا مقاله جدید منتشر شود">
      <ArticleForm categories={categories} />
    </AdminFormLayout>
  );
}