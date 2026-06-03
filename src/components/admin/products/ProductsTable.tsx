// src/components/admin/products/ProductsTable.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AdminStatusBadge } from "@/components/admin/shared/AdminStatusBadge";
import { AdminTableActions } from "@/components/admin/shared/AdminTableActions";
import { Modal } from "@/components/ui/Modal";
import { useState } from "react";
import { toast } from "react-toastify";

interface Product {
  _id: string;
  title: string;
  slug: string;
  categoryName: string;
  isActive: boolean;
  createdAt: Date;
}

interface ProductsTableProps {
  products: Product[];
}

export function ProductsTable({ products }: ProductsTableProps) {
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
      const res = await fetch(`/api/admin/products/${selectedId}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("محصول با موفقیت حذف شد");
        router.refresh();
      } else {
        toast.error("خطا در حذف محصول");
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
              <th className="px-4 py-3 text-right text-sm font-medium text-foreground">وضعیت</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-foreground">تاریخ ایجاد</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-foreground">عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-accent/50 transition-colors">
                <td className="px-4 py-3 text-sm text-foreground">
                  <Link href={`/products/${product.slug}`} target="_blank" className="hover:text-primary">
                    {product.title}
                  </Link>
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{product.categoryName}</td>
                <td className="px-4 py-3 text-sm">
                  <AdminStatusBadge
                    isActive={product.isActive}
                    activeLabel="فعال"
                    inactiveLabel="غیرفعال"
                  />
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {new Date(product.createdAt).toLocaleDateString("fa-IR")}
                </td>
                <td className="px-4 py-3 text-sm">
                  <AdminTableActions
                    editHref={`/admin/products/${product._id}/edit`}
                    onDelete={() => handleDeleteClick(product._id)}
                    isDeleting={deletingId === product._id}
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
        title="حذف محصول"
        message="آیا از حذف این محصول اطمینان دارید؟ این عمل غیرقابل بازگشت است."
        confirmText="حذف"
        cancelText="انصراف"
      />
    </>
  );
}