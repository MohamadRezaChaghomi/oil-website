// src/app/admin/categories/[id]/edit/page.tsx
import { notFound } from "next/navigation";
import { dbConnect } from "@/lib/db";
import Category from "@/lib/models/Category";
import { CategoryForm } from "@/components/admin/categories/CategoryForm";
import { AdminFormLayout } from "@/components/admin/shared/AdminFormLayout";
import mongoose from "mongoose";

interface Props {
  params: Promise<{ id: string }>;
}

async function getCategory(id: string) {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  await dbConnect();
  const cat = await Category.findById(id).lean();
  if (!cat) return null;
  return {
    _id: cat._id.toString(),
    name: cat.name,
    slug: cat.slug,
    description: cat.description || "",
    type: cat.type,
    parentId: cat.parentId ? cat.parentId.toString() : null,
    order: cat.order,
    isActive: cat.isActive,
  };
}

async function getParentCategories(exceptId?: string) {
  await dbConnect();
  const filter: any = {};
  if (exceptId) filter._id = { $ne: exceptId };
  const categories = await Category.find(filter).sort({ name: 1 }).lean();
  return categories.map((cat) => ({ _id: cat._id.toString(), name: cat.name }));
}

export default async function EditCategoryPage({ params }: Props) {
  const { id } = await params;
  const category = await getCategory(id);
  if (!category) notFound();
  const parentCategories = await getParentCategories(id);
  return (
    <AdminFormLayout title="ویرایش دسته‌بندی" description="تغییرات مورد نظر را اعمال کنید">
      <CategoryForm initialData={category} categories={parentCategories} isEditing />
    </AdminFormLayout>
  );
}