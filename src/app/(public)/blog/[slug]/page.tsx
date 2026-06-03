// src/app/(public)/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getPublishedArticleBySlug } from "@/lib/services/articleService";
import { BlogDetailHero } from "@/components/sections/blog/BlogDetailHero";
import { BlogContent } from "@/components/sections/blog/BlogContent";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPublishedArticleBySlug(slug);

  if (!article) {
    return {
      title: "مقاله یافت نشد",
      description: "مقاله درخواستی پیدا نشد.",
    };
  }

  return {
    title: `${article.title} | وبلاگ | شرکت نفت و گاز`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: article.image ? [article.image] : [],
      type: "article",
      publishedTime: article.publishedAt?.toISOString(),
      authors: article.author ? [article.author] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: article.image ? [article.image] : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const article = await getPublishedArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  // Structured data for SEO (Article schema)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: article.image || undefined,
    author: {
      "@type": "Person",
      name: article.author || "Admin",
    },
    datePublished: article.publishedAt?.toISOString(),
    dateModified: article.updatedAt?.toISOString(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${article.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="relative overflow-hidden">
        <BlogDetailHero article={article} />
        <section className="py-16 bg-gradient-to-b from-background to-card/20">
          <div className="container mx-auto px-4">
            <BlogContent article={article} />
          </div>
        </section>
      </main>
    </>
  );
}