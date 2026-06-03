// src/components/admin/ArticlesTable.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useState } from "react";
import { toast } from "react-toastify";

interface Article {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  author?: string;
  isPublished: boolean;
  publishedAt?: Date;
  viewCount: number;
  categoryName: string;
}

interface ArticlesTableProps {
  articles: Article[];
}

export function ArticlesTable({ articles }: ArticlesTableProps) {
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
      const res = await fetch(`/api/admin/articles/${selectedId}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("مقاله با موفقیت حذف شد");
        router.refresh();
      } else {
        toast.error("خطا در حذف مقاله");
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
              <th className="px-4 py-3 text-right text-sm font-medium text-foreground">عنوان</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-foreground">دسته‌بندی</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-foreground">نویسنده</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-foreground">وضعیت</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-foreground">بازدید</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-foreground">عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {articles.map((article) => (
              <tr key={article._id} className="hover:bg-accent/50 transition-colors">
                <td className="px-4 py-3 text-sm text-foreground">
                  <Link href={`/blog/${article.slug}`} target="_blank" className="hover:text-primary flex items-center gap-1">
                    {article.title}
                    <Visibility className="h-3 w-3" />
                  </Link>
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{article.categoryName}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{article.author || "-"}</td>
                {/* اصلاح رنگ بج وضعیت */}
                <td className="px-4 py-3 text-sm">
                  {article.isPublished ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-200 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                      منتشر شده
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                      پیش‌نویس
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{article.viewCount}</td>
                <td className="px-4 py-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/articles/${article._id}/edit`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-primary">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-500"
                      onClick={() => handleDeleteClick(article._id)}
                      disabled={deletingId === article._id}
                    >
                      <Delete className="h-4 w-4" />
                    </Button>
                  </div>
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
        title="حذف مقاله"
        message="آیا از حذف این مقاله اطمینان دارید؟ این عمل غیرقابل بازگشت است."
        confirmText="حذف"
        cancelText="انصراف"
      />
    </>
  );
}