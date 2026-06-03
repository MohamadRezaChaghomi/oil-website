// src/components/admin/ArticleForm.tsx
"use client";

/**
 * Reusable form for creating/editing articles
 * Uses react-hook-form with zod validation and toast notifications
 */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createArticleSchema } from "@/lib/validations/articleSchema";
import type { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type ArticleFormData = z.infer<typeof createArticleSchema>;

interface Category {
  _id: string;
  name: string;
}

interface ArticleFormProps {
  initialData?: Partial<ArticleFormData> & { _id?: string };
  categories: Category[];
  isEditing?: boolean;
}

export function ArticleForm({ initialData, categories, isEditing = false }: ArticleFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues: ArticleFormData = {
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    image: "/images/placeholder-article.jpg",
    author: "Admin",
    category: "",
    publishedAt: undefined,
    isPublished: false,
    viewCount: 0,
    ...initialData,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ArticleFormData>({
    resolver: zodResolver(createArticleSchema),
    defaultValues,
  });

  const onSubmit = async (data: ArticleFormData) => {
    setIsSubmitting(true);
    try {
      const url = isEditing ? `/api/admin/articles/${initialData?._id}` : "/api/admin/articles";
      const method = isEditing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        toast.success(isEditing ? "مقاله با موفقیت به‌روزرسانی شد" : "مقاله با موفقیت ایجاد شد");
        router.push("/admin/articles");
        router.refresh();
      } else {
        const err = await res.json();
        toast.error(err.error || "خطا در ذخیره مقاله");
      }
    } catch {
      toast.error("خطا در ارتباط با سرور");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="title">عنوان مقاله *</Label>
          <Input id="title" {...register("title")} error={errors.title?.message} />
        </div>
        <div>
          <Label htmlFor="slug">اسلاگ (آدرس یکتا) *</Label>
          <Input id="slug" {...register("slug")} error={errors.slug?.message} />
        </div>
      </div>

      <div>
        <Label htmlFor="excerpt">خلاصه *</Label>
        <Textarea id="excerpt" rows={2} {...register("excerpt")} error={errors.excerpt?.message} />
      </div>

      <div>
        <Label htmlFor="content">متن مقاله *</Label>
        <Textarea id="content" rows={10} {...register("content")} error={errors.content?.message} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="author">نویسنده</Label>
          <Input id="author" {...register("author")} error={errors.author?.message} />
        </div>
        <div>
          <Label htmlFor="category">دسته‌بندی *</Label>
          <select
            id="category"
            {...register("category")}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">انتخاب کنید</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="image">تصویر شاخص (آدرس URL)</Label>
          <Input id="image" {...register("image")} error={errors.image?.message} placeholder="/images/placeholder-article.jpg" />
        </div>
        <div className="flex items-center gap-2 pt-2">
          <input
            type="checkbox"
            id="isPublished"
            {...register("isPublished")}
            className="h-4 w-4 rounded border-border"
          />
          <Label htmlFor="isPublished">انتشار فوری</Label>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          انصراف
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "در حال ذخیره..." : isEditing ? "به‌روزرسانی" : "ایجاد مقاله"}
        </Button>
      </div>
    </form>
  );
}