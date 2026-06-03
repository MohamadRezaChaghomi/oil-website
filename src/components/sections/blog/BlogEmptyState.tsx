// src/components/sections/blog/BlogEmptyState.tsx
"use client";

import { BookOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function BlogEmptyState() {
  return (
    <div className="text-center py-16 bg-card/40 backdrop-blur-sm rounded-2xl border border-border/50">
      <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-foreground mb-2">مقاله‌ای یافت نشد</h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        با فیلترهای انتخاب شده مقاله‌ای وجود ندارد. لطفاً فیلترهای دیگری را امتحان کنید.
      </p>
      <Link href="/blog">
        <Button variant="outline">مشاهده همه مقالات</Button>
      </Link>
    </div>
  );
}