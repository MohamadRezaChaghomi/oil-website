// src/app/admin/products/new/page.tsx
import { dbConnect } from "@/lib/db";
import Category from "@/lib/models/Category";
import { ProductForm } from "@/components/admin/products/ProductForm";
import { AdminFormLayout } from "@/components/admin/shared/AdminFormLayout";

async function getCategories() {
  await dbConnect();
  const categories = await Category.find({ type: "product", isActive: true }).lean();
  return categories.map((c) => ({ _id: c._id.toString(), name: c.name }));
}

export default async function NewProductPage() {
  const categories = await getCategories();
  return (
    <AdminFormLayout title="ایجاد محصول جدید" description="فرم زیر را تکمیل کنید تا محصول جدید اضافه شود">
      <ProductForm categories={categories} />
    </AdminFormLayout>
  );
}