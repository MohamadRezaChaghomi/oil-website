// src/components/sections/blog/BlogGrid.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, User, Eye, BookOpen, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface Article {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  image?: string;
  author?: string;
  categoryName: string;
  publishedAt?: Date;
  viewCount: number;
}

interface BlogGridProps {
  articles: Article[];
}

const formatDate = (date?: Date) => {
  if (!date) return "";
  try {
    return new Date(date).toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "";
  }
};

const formatViews = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n));

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function BlogCard({ article }: { article: Article }) {
  return (
    <motion.div variants={cardVariants}>
      <Link
        href={`/blog/${article.slug}`}
        className="group block h-full transition-all duration-200 hover:-translate-y-1"
      >
        <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-shadow duration-200 hover:shadow-lg">
          <div className="relative h-48 w-full flex-shrink-0 overflow-hidden bg-muted/30">
            {article.image ? (
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground/60">
                <BookOpen className="h-9 w-9 stroke-[1.2]" />
                <span className="text-xs">بدون تصویر</span>
              </div>
            )}
            <span className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              {article.categoryName}
            </span>
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-card to-transparent" />
          </div>

          <div className="flex flex-1 flex-col p-4">
            <h3 className="line-clamp-2 text-sm font-bold text-foreground transition-colors group-hover:text-primary">
              {article.title}
            </h3>
            <p className="mt-2 line-clamp-2 text-xs text-foreground/70">
              {article.excerpt}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-foreground/60">
              {article.author && (
                <span className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {article.author}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDate(article.publishedAt)}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {formatViews(article.viewCount)}
              </span>
            </div>

            <div className="mt-4 border-t border-border/50 pt-3">
              <span className="inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:gap-2">
                مطالعه مقاله
                <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" />
              </span>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}

export function BlogGrid({ articles }: BlogGridProps) {
  if (!articles.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-border/50 bg-card/40 py-16 text-center backdrop-blur-sm">
        <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/50" />
        <h3 className="mt-3 text-lg font-semibold text-foreground">مقاله‌ای یافت نشد</h3>
        <p className="mt-1 text-sm text-muted-foreground">لطفاً فیلترهای دیگری را امتحان کنید.</p>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
    >
      {articles.map((article) => (
        <BlogCard key={article._id} article={article} />
      ))}
    </motion.div>
  );
}