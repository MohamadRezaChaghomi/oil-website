// src/components/sections/blog/BlogPagination.tsx
"use client";

import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  category?: string;
  search?: string;
}

export function BlogPagination({
  currentPage,
  totalPages,
  category,
  search,
}: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  const buildUrl = (page: number) => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (search) params.set("search", search);
    params.set("page", page.toString());
    return `/blog?${params.toString()}`;
  };

  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const left = Math.max(2, currentPage - delta);
    const right = Math.min(totalPages - 1, currentPage + delta);

    range.push(1);
    if (left > 2) range.push("...");
    for (let i = left; i <= right; i++) range.push(i);
    if (right < totalPages - 1) range.push("...");
    if (totalPages > 1) range.push(totalPages);
    return range;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-12">
      {currentPage > 1 && (
        <Link
          href={buildUrl(currentPage - 1)}
          className="w-10 h-10 flex items-center justify-center rounded-lg border border-border bg-card hover:bg-primary hover:text-primary-foreground transition-all"
          aria-label="صفحه قبل"
        >
          <ChevronRight className="h-5 w-5" />
        </Link>
      )}
      {getPageNumbers().map((page, idx) =>
        page === "..." ? (
          <span key={`dots-${idx}`} className="w-10 text-center text-muted-foreground">
            ...
          </span>
        ) : (
          <Link
            key={page}
            href={buildUrl(page as number)}
            className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all ${
              currentPage === page
                ? "bg-primary text-primary-foreground shadow-md"
                : "border border-border bg-card hover:bg-primary/10 text-foreground"
            }`}
          >
            {page}
          </Link>
        )
      )}
      {currentPage < totalPages && (
        <Link
          href={buildUrl(currentPage + 1)}
          className="w-10 h-10 flex items-center justify-center rounded-lg border border-border bg-card hover:bg-primary hover:text-primary-foreground transition-all"
          aria-label="صفحه بعد"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
      )}
    </div>
  );
}