// src/components/admin/categories/CategoriesTable.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AdminStatusBadge } from "@/components/admin/shared/AdminStatusBadge";
import { AdminTableActions } from "@/components/admin/shared/AdminTableActions";
import { Modal } from "@/components/ui/Modal";
import { useState } from "react";
import { toast } from "react-toastify";

interface Category {
  _id: string;
  name: string;
  slug: string;
  type: "product" | "article";
  parentId?: string | null;
  order: number;
  isActive: boolean;
}

interface CategoriesTableProps {
  categories: Category[];
}

export function CategoriesTable({ categories }: CategoriesTableProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    setSelectedId(id);
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedId) return;
    setDeletingId(selectedId);
    try {
      const res = await fetch(`/api/admin/categories/${selectedId}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("دسته‌بندی با موفقیت حذف شد");
        router.refresh();
      } else {
        const data = await res.json();
        toast.error(data.error || "خطا در حذف دسته‌بندی");
      }
    } catch {
      toast.error("خطا در ارتباط با سرور");
    } finally {
      setDeletingId(null);
      setModalOpen(false);
      setSelectedId(null);
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted/30">
            <tr>
              <th className="px-4 py-3 text-right text-sm font-medium text-foreground">نام</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-foreground">اسلاگ</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-foreground">نوع</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-foreground">والد</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-foreground">ترتیب</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-foreground">وضعیت</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-foreground">عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {categories.map((category) => (
              <tr key={category._id} className="hover:bg-accent/50 transition-colors">
                <td className="px-4 py-3 text-sm text-foreground">{category.name}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{category.slug}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {category.type === "product" ? "محصول" : "مقاله"}
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{category.parentId || "-"}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{category.order}</td>
                <td className="px-4 py-3 text-sm">
                  <AdminStatusBadge isActive={category.isActive} />
                </td>
                <td className="px-4 py-3 text-sm">
                  <AdminTableActions
                    editHref={`/admin/categories/${category._id}/edit`}
                    onDelete={() => handleDeleteClick(category._id)}
                    isDeleting={deletingId === category._id}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmDelete}
        title="حذف دسته‌بندی"
        message="آیا از حذف این دسته‌بندی اطمینان دارید؟ اگر دسته‌بندی دارای زیردسته یا محتوای مرتبط باشد، حذف آن ممکن است با خطا مواجه شود."
        confirmText="حذف"
        cancelText="انصراف"
      />
    </>
  );
}