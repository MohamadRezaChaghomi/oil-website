// src/components/admin/categories/CategoryForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCategorySchema } from "@/lib/validations/categorySchema";
import type { z } from "zod";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";
import { Select } from "@/components/ui/Select";
import { AdminFormActions } from "@/components/admin/shared/AdminFormActions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type CategoryFormData = z.infer<typeof createCategorySchema>;

interface CategoryOption {
  _id: string;
  name: string;
}

interface CategoryFormProps {
  initialData?: Partial<CategoryFormData> & { _id?: string };
  categories?: CategoryOption[]; // برای انتخاب والد (اختیاری)
  isEditing?: boolean;
}

export function CategoryForm({ initialData, categories = [], isEditing = false }: CategoryFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues: CategoryFormData = {
    name: "",
    slug: "",
    description: "",
    type: "product",
    parentId: null,
    order: 0,
    isActive: true,
    ...initialData,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(createCategorySchema),
    defaultValues,
  });

  const onSubmit = async (data: CategoryFormData) => {
    setIsSubmitting(true);
    try {
      const url = isEditing ? `/api/admin/categories/${initialData?._id}` : "/api/admin/categories";
      const method = isEditing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        toast.success(isEditing ? "دسته‌بندی با موفقیت به‌روزرسانی شد" : "دسته‌بندی با موفقیت ایجاد شد");
        router.push("/admin/categories");
        router.refresh();
      } else {
        const err = await res.json();
        toast.error(err.error || "خطا در ذخیره دسته‌بندی");
      }
    } catch {
      toast.error("خطا در ارتباط با سرور");
    } finally {
      setIsSubmitting(false);
    }
  };

  const typeOptions = [
    { value: "product", label: "محصول" },
    { value: "article", label: "مقاله" },
  ];

  const parentOptions = [
    { value: "", label: "ندارد (ریشه)" },
    ...categories.map((cat) => ({ value: cat._id, label: cat.name })),
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="name">
            نام دسته‌بندی <span className="text-orange-500">*</span>
          </Label>
          <Input id="name" {...register("name")} error={errors.name?.message} />
        </div>
        <div>
          <Label htmlFor="slug">
            اسلاگ (آدرس یکتا) <span className="text-orange-500">*</span>
          </Label>
          <Input id="slug" {...register("slug")} error={errors.slug?.message} />
        </div>
      </div>

      <div>
        <Label htmlFor="description">توضیحات (اختیاری)</Label>
        <Textarea id="description" rows={2} {...register("description")} error={errors.description?.message} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="type">
            نوع <span className="text-orange-500">*</span>
          </Label>
          <Select id="type" options={typeOptions} error={errors.type?.message} {...register("type")} />
        </div>
        <div>
          <Label htmlFor="parentId">دسته والد (اختیاری)</Label>
          <Select
            id="parentId"
            options={parentOptions}
            error={errors.parentId?.message}
            {...register("parentId")}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="order">ترتیب (عدد)</Label>
          <Input id="order" type="number" {...register("order", { valueAsNumber: true })} error={errors.order?.message} />
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

      <AdminFormActions isSubmitting={isSubmitting} submitLabel={isEditing ? "به‌روزرسانی" : "ایجاد دسته‌بندی"} />
    </form>
  );
}