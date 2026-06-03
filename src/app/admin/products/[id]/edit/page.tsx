// src/app/admin/products/[id]/edit/page.tsx
import { notFound } from "next/navigation";
import { dbConnect } from "@/lib/db";
import Product from "@/lib/models/Product";
import Category from "@/lib/models/Category";
import { ProductForm } from "@/components/admin/products/ProductForm";
import { AdminFormLayout } from "@/components/admin/shared/AdminFormLayout";
import mongoose from "mongoose";

interface Props {
  params: Promise<{ id: string }>;
}

async function getProduct(id: string) {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  await dbConnect();
  const product = await Product.findById(id).lean();
  if (!product) return null;
  return {
    _id: product._id.toString(),
    title: product.title,
    slug: product.slug,
    description: product.description,
    shortDescription: product.shortDescription || "",
    image: product.image,
    category: product.category.toString(),
    isActive: product.isActive,
  };
}

async function getCategories() {
  await dbConnect();
  const categories = await Category.find({ type: "product", isActive: true }).lean();
  return categories.map((c) => ({ _id: c._id.toString(), name: c.name }));
}

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();
  const categories = await getCategories();
  return (
    <AdminFormLayout title="ویرایش محصول" description="تغییرات مورد نظر را اعمال کنید">
      <ProductForm initialData={product} categories={categories} isEditing />
    </AdminFormLayout>
  );
}