// src/app/admin/articles/page.tsx
import { dbConnect } from "@/lib/db";
import Article from "@/lib/models/Article";
import Category from "@/lib/models/Category";
import { ArticlesTable } from "@/components/admin/articles/ArticlesTable";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
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
    author: article.author,
    isPublished: article.isPublished,
    viewCount: article.viewCount,
    categoryName: article.category?.name || "بدون دسته",
  }));
}

export default async function AdminArticlesPage() {
  const articles = await getArticles();

  const actionButton = (
    <Link href="/admin/articles/new">
      <Button className="gap-2 bg-orange-600 hover:bg-orange-700 text-white">
        <Add className="h-4 w-4" />
        مقاله جدید
      </Button>
    </Link>
  );

  return (
    <div>
      <AdminPageHeader
        title="مدیریت مقالات"
        description="لیست تمام مقالات منتشر شده و پیش‌نویس‌ها"
        action={actionButton}
      />
      <div className="bg-card/60 backdrop-blur-sm rounded-2xl border border-border/50 p-4 shadow-sm">
        <ArticlesTable articles={articles} />
      </div>
    </div>
  );
}