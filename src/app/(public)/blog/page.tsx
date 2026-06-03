// src/app/(public)/blog/page.tsx
import { BlogHero } from "@/components/sections/blog/BlogHero";
import { BlogFilter } from "@/components/sections/blog/BlogFilter";
import { BlogGrid } from "@/components/sections/blog/BlogGrid";
import { BlogPagination } from "@/components/sections/blog/BlogPagination";
import { BlogEmptyState } from "@/components/sections/blog/BlogEmptyState";
import { getArticles } from "@/lib/services/articleService";
import { dbConnect } from "@/lib/db";
import Category from "@/lib/models/Category";
import { Metadata } from "next";

interface BlogPageProps {
  searchParams: Promise<{
    page?: string;
    category?: string;
    search?: string;
  }>;
}

export const metadata: Metadata = {
  title: "وبلاگ | شرکت نفت و گاز",
  description: "آخرین اخبار، مقالات تخصصی و تحلیلی صنعت نفت و گاز",
};

function buildArticleQuery(params: {
  page: number;
  category?: string;
  search?: string;
}) {
  return {
    page: params.page,
    limit: 9,
    category: params.category,
    search: params.search,
    isPublished: true, // ✅ now boolean (handled by preprocessor in schema)
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || "1", 10);
  const categorySlug = params.category || undefined;
  const search = params.search || undefined;

  await dbConnect();
  const allCategories = await Category.find({ type: "article", isActive: true })
    .select("name slug")
    .lean();

  let categoryId: string | undefined;
  if (categorySlug) {
    const selectedCat = allCategories.find((c) => c.slug === categorySlug);
    if (selectedCat) categoryId = selectedCat._id.toString();
  }

  const query = buildArticleQuery({ page, category: categoryId, search });
  const articlesResult = await getArticles(query);

  const categoriesForFilter = allCategories.map((cat) => ({
    _id: cat._id.toString(),
    name: cat.name,
    slug: cat.slug,
  }));

  const hasArticles = articlesResult.data.length > 0;

  return (
    <main className="relative overflow-hidden">
      <BlogHero />
      <section className="py-16 bg-gradient-to-b from-background to-card/20">
        <div className="container mx-auto px-4">
          <BlogFilter
            categories={categoriesForFilter}
            currentCategory={categorySlug}
            currentSearch={search}
          />
          {hasArticles ? (
            <>
              <BlogGrid articles={articlesResult.data} />
              <BlogPagination
                currentPage={articlesResult.pagination.page}
                totalPages={articlesResult.pagination.totalPages}
                category={categorySlug}
                search={search}
              />
            </>
          ) : (
            <BlogEmptyState />
          )}
        </div>
      </section>
    </main>
  );
}