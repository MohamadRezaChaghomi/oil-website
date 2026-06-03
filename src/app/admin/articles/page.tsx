// src/app/admin/articles/page.tsx
import { dbConnect } from "@/lib/db";
import Article from "@/lib/models/Article";
import Category from "@/lib/models/Category";
import { ArticlesTable } from "@/components/admin/articles/ArticlesTable";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Add } from "@mui/icons-material";

async function getArticles() {
  await dbConnect();
  const articles = await Article.find({})
    .populate("category", "name")
    .sort({ createdAt: -1 })
    .lean();
  return articles.map((article: any) => ({
    _id: article._id.toString(),
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt,
    author: article.author,
    isPublished: article.isPublished,
    publishedAt: article.publishedAt ? new Date(article.publishedAt) : undefined,
    viewCount: article.viewCount,
    categoryName: article.category?.name || "بدون دسته",
  }));
}

export default async function AdminArticlesPage() {
  const articles = await getArticles();

  return (
    <div>
      {/* هدر صفحه با استایل جدید */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground relative inline-block">
              مدیریت مقالات
              <span className="absolute -bottom-2 right-0 w-12 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></span>
            </h1>
            <p className="text-muted-foreground mt-2">لیست تمام مقالات منتشر شده و پیش‌نویس‌ها</p>
          </div>
          <Link href="/admin/articles/new">
            <Button className="gap-2">
              <Add className="h-4 w-4" />
              مقاله جدید
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-card/60 backdrop-blur-sm rounded-2xl border border-border/50 p-4 shadow-sm">
        <ArticlesTable articles={articles} />
      </div>
    </div>
  );
}