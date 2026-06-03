// src/app/admin/articles/new/page.tsx
import { dbConnect } from "@/lib/db";
import Category from "@/lib/models/Category";
import { ArticleForm } from "@/components/admin/articles/ArticleForm";

async function getCategories() {
  await dbConnect();
  const categories = await Category.find({ type: "article", isActive: true }).lean();
  return categories.map((c) => ({ _id: c._id.toString(), name: c.name }));
}

export default async function NewArticlePage() {
  const categories = await getCategories();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground relative inline-block">
          ایجاد مقاله جدید
          <span className="absolute -bottom-2 right-0 w-12 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></span>
        </h1>
        <p className="text-muted-foreground mt-2">فرم زیر را تکمیل کنید تا مقاله جدید منتشر شود</p>
      </div>
      <div className="bg-card/60 backdrop-blur-sm rounded-2xl border border-border/50 p-6 shadow-sm">
        <ArticleForm categories={categories} />
      </div>
    </div>
  );
}