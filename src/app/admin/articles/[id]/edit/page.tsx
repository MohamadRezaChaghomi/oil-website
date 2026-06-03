// src/app/admin/articles/[id]/edit/page.tsx
import { notFound } from "next/navigation";
import { dbConnect } from "@/lib/db";
import Article from "@/lib/models/Article";
import Category from "@/lib/models/Category";
import { ArticleForm } from "@/components/admin/articles/ArticleForm";
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
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground relative inline-block">
          ویرایش مقاله
          <span className="absolute -bottom-2 right-0 w-12 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></span>
        </h1>
        <p className="text-muted-foreground mt-2">تغییرات مورد نظر را اعمال کنید</p>
      </div>
      <div className="bg-card/60 backdrop-blur-sm rounded-2xl border border-border/50 p-6 shadow-sm">
        <ArticleForm initialData={article} categories={categories} isEditing />
      </div>
    </div>
  );
}