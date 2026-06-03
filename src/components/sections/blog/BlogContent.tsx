// src/components/sections/blog/BlogContent.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface Article {
  title: string;
  content: string;
  image?: string;
}

interface BlogContentProps {
  article: Article;
}

export function BlogContent({ article }: BlogContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="max-w-4xl mx-auto"
    >
      {/* Featured Image */}
      {article.image && (
        <div className="relative h-80 md:h-96 w-full rounded-2xl overflow-hidden mb-8 bg-muted/30 border border-border/50 shadow-md">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Article Content */}
      <div
        className="prose prose-lg dark:prose-invert max-w-none text-right
          prose-headings:text-foreground prose-headings:font-bold prose-headings:mt-8 prose-headings:mb-4
          prose-p:text-muted-foreground prose-p:leading-relaxed
          prose-a:text-secondary prose-a:no-underline hover:prose-a:underline
          prose-strong:text-primary prose-code:text-secondary
          prose-pre:bg-card prose-pre:text-foreground prose-pre:border prose-pre:border-border
          prose-img:rounded-lg prose-img:shadow-md
          prose-blockquote:border-r-4 prose-blockquote:border-primary prose-blockquote:bg-accent/30 prose-blockquote:p-4 prose-blockquote:rounded-lg
          prose-li:text-muted-foreground"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {/* Optional: Share buttons or extra info could be added here */}
    </motion.div>
  );
}