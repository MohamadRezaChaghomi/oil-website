// src/components/sections/blog/BlogGrid.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, User, Eye, BookOpen } from "lucide-react";

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

const formatDate = (date: Date | undefined) => {
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function BlogGrid({ articles }: BlogGridProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {articles.map((article) => (
        <motion.div key={article._id} variants={cardVariants}>
          <Link href={`/blog/${article.slug}`}>
            <div className="group relative bg-card/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-border/50 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative h-48 w-full bg-muted/30 overflow-hidden">
                {article.image ? (
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
                    <BookOpen className="h-12 w-12 mb-2" />
                    <span className="text-sm">بدون تصویر</span>
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full shadow-md">
                  {article.categoryName}
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-foreground line-clamp-1 mb-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                  {article.excerpt}
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-3">
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
                    {article.viewCount}
                  </span>
                </div>
                <div className="flex items-center text-orange-600 dark:text-orange-400 text-sm font-medium">
                  مطالعه مقاله
                  <span className="mr-1 group-hover:mr-2 transition-all">←</span>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}