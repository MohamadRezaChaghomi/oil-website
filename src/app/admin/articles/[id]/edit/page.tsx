// src/app/admin/articles/[id]/edit/page.tsx
import { notFound } from "next/navigation";
import { dbConnect } from "@/lib/db";
import Article from "@/lib/models/Article";
import Category from "@/lib/models/Category";
import { ArticleForm } from "@/components/admin/articles/ArticleForm";
import { AdminFormLayout } from "@/components/admin/shared/AdminFormLayout";
import mongoose from "mongoose";

interface Props {
  params: Promise<{ id: string }>;
}

async function getArticle(id: string) {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  await dbConnect();
  const article = await Article.findById(id).lean();
  if (!article) return null;
  return {
    _id: article._id.toString(),
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt,
    content: article.content,
    author: article.author || "",
    category: article.category.toString(),
    isPublished: article.isPublished,
  };
}

async function getCategories() {
  await dbConnect();
  const categories = await Category.find({ type: "article", isActive: true }).lean();
  return categories.map((c) => ({ _id: c._id.toString(), name: c.name }));
}

export default async function EditArticlePage({ params }: Props) {
  const { id } = await params;
  const article = await getArticle(id);
  if (!article) notFound();
  const categories = await getCategories();
  return (
    <AdminFormLayout title="ویرایش مقاله" description="تغییرات مورد نظر را اعمال کنید">
      <ArticleForm initialData={article} categories={categories} isEditing />
    </AdminFormLayout>
  );
}