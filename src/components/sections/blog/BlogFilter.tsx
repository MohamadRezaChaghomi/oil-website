// src/components/sections/blog/BlogFilter.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface CategoryItem {
  _id: string;
  name: string;
  slug: string;
}

interface BlogFilterProps {
  categories: CategoryItem[];
  currentCategory?: string;
  currentSearch?: string;
}

export function BlogFilter({
  categories,
  currentCategory,
  currentSearch,
}: BlogFilterProps) {
  const [searchValue, setSearchValue] = useState(currentSearch || "");
  const router = useRouter();

  useEffect(() => {
    setSearchValue(currentSearch || "");
  }, [currentSearch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchValue.trim()) params.set("search", searchValue.trim());
    if (currentCategory && !searchValue) params.set("category", currentCategory);
    params.set("page", "1");
    router.push(`/blog?${params.toString()}`);
  };

  const clearFilters = () => {
    setSearchValue("");
    router.push("/blog");
  };

  const hasActiveFilters = currentCategory || currentSearch;

  return (
    <div className="mb-10 space-y-4">
      {/* دسته‌بندی‌ها */}
      <div className="flex flex-wrap gap-2">
        <Link
          href="/blog"
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            !currentCategory
              ? "bg-primary text-primary-foreground shadow-md"
              : "bg-card/50 border border-border text-muted-foreground hover:bg-primary/10"
          }`}
        >
          همه
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat._id}
            href={`/blog?category=${encodeURIComponent(cat.slug)}`}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              currentCategory === cat.slug
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-card/50 border border-border text-muted-foreground hover:bg-primary/10"
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {/* جستجو و حذف فیلترها */}
      <div className="flex flex-col sm:flex-row gap-3">
        <form onSubmit={handleSearch} className="flex flex-1 gap-2">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="جستجوی مقالات..."
              className="w-full pr-10 pl-4 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>
          <Button type="submit" size="sm" className="gap-1">
            <Search className="h-4 w-4" />
            جستجو
          </Button>
        </form>
        {hasActiveFilters && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={clearFilters}
            className="gap-1"
          >
            <X className="h-4 w-4" />
            حذف فیلترها
          </Button>
        )}
      </div>
    </div>
  );
}