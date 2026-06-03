// src/components/admin/products/ProductForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProductSchema } from "@/lib/validations/productSchema";
import type { z } from "zod";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";
import { Select } from "@/components/ui/Select";
import { AdminFormActions } from "@/components/admin/shared/AdminFormActions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type ProductFormData = z.infer<typeof createProductSchema>;

interface Category {
  _id: string;
  name: string;
}

interface ProductFormProps {
  initialData?: Partial<ProductFormData> & { _id?: string };
  categories: Category[];
  isEditing?: boolean;
}

export function ProductForm({ initialData, categories, isEditing = false }: ProductFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues: ProductFormData = {
    title: "",
    slug: "",
    description: "",
    shortDescription: "",
    image: "/images/placeholder-product.jpg",
    category: "",
    isActive: true,
    ...initialData,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(createProductSchema),
    defaultValues,
  });

  const onSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true);
    try {
      const url = isEditing ? `/api/admin/products/${initialData?._id}` : "/api/admin/products";
      const method = isEditing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        toast.success(isEditing ? "محصول با موفقیت به‌روزرسانی شد" : "محصول با موفقیت ایجاد شد");
        router.push("/admin/products");
        router.refresh();
      } else {
        const err = await res.json();
        toast.error(err.error || "خطا در ذخیره محصول");
      }
    } catch {
      toast.error("خطا در ارتباط با سرور");
    } finally {
      setIsSubmitting(false);
    }
  };

  const categoryOptions = categories.map((cat) => ({
    value: cat._id,
    label: cat.name,
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="title">
            عنوان محصول <span className="text-orange-500">*</span>
          </Label>
          <Input id="title" {...register("title")} error={errors.title?.message} />
        </div>
        <div>
          <Label htmlFor="slug">
            اسلاگ (آدرس یکتا) <span className="text-orange-500">*</span>
          </Label>
          <Input id="slug" {...register("slug")} error={errors.slug?.message} />
        </div>
      </div>

      <div>
        <Label htmlFor="shortDescription">توضیح کوتاه</Label>
        <Textarea id="shortDescription" rows={2} {...register("shortDescription")} error={errors.shortDescription?.message} />
      </div>

      <div>
        <Label htmlFor="description">
          توضیحات کامل <span className="text-orange-500">*</span>
        </Label>
        <Textarea id="description" rows={6} {...register("description")} error={errors.description?.message} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="category">
            دسته‌بندی <span className="text-orange-500">*</span>
          </Label>
          <Select
            id="category"
            options={categoryOptions}
            error={errors.category?.message}
            {...register("category")}
          />
        </div>
        <div className="flex items-center gap-2 pt-2">
          <input
            type="checkbox"
            id="isActive"
            {...register("isActive")}
            className="h-4 w-4 rounded border-border"
          />
          <Label htmlFor="isActive">فعال (نمایش در سایت)</Label>
        </div>
      </div>

      <div>
        <Label htmlFor="image">تصویر شاخص (آدرس URL)</Label>
        <Input id="image" {...register("image")} error={errors.image?.message} placeholder="/images/placeholder-product.jpg" />
      </div>

      <AdminFormActions isSubmitting={isSubmitting} submitLabel={isEditing ? "به‌روزرسانی" : "ایجاد محصول"} />
    </form>
  );
}