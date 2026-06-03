// src/components/admin/subscribers/SubscribersTable.tsx
"use client";

import { useRouter } from "next/navigation";
import { AdminTableActions } from "@/components/admin/shared/AdminTableActions";
import { Modal } from "@/components/ui/Modal";
import { useState } from "react";
import { toast } from "react-toastify";
import { Block, Download, CheckCircle } from "@mui/icons-material";

interface Subscriber {
  _id: string;
  email: string;
  isActive: boolean;
  createdAt: Date;
}

interface SubscribersTableProps {
  subscribers: Subscriber[];
}

export function SubscribersTable({ subscribers }: SubscribersTableProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [actionType, setActionType] = useState<"delete" | "unsubscribe">("delete");

  const handleDeleteClick = (id: string) => {
    setSelectedId(id);
    setActionType("delete");
    setModalOpen(true);
  };

  const handleUnsubscribeClick = (id: string) => {
    setSelectedId(id);
    setActionType("unsubscribe");
    setModalOpen(true);
  };

  const confirmAction = async () => {
    if (!selectedId) return;
    setDeletingId(selectedId);
    try {
      let url = "";
      let method = "";
      let successMsg = "";
      if (actionType === "delete") {
        url = `/api/admin/subscribers/${selectedId}`;
        method = "DELETE";
        successMsg = "مشترک با موفقیت حذف شد";
      } else {
        // غیرفعال کردن (لغو اشتراک) – از API عمومی یا ادمین استفاده می‌کنیم
        url = `/api/admin/subscribers/${selectedId}/unsubscribe`;
        method = "PUT";
        successMsg = "لغو اشتراک با موفقیت انجام شد";
      }
      const res = await fetch(url, { method });
      if (res.ok) {
        toast.success(successMsg);
        router.refresh();
      } else {
        const data = await res.json();
        toast.error(data.error || "خطا در عملیات");
      }
    } catch {
      toast.error("خطا در ارتباط با سرور");
    } finally {
      setDeletingId(null);
      setModalOpen(false);
      setSelectedId(null);
    }
  };

  const exportCSV = () => {
    const activeEmails = subscribers.filter(s => s.isActive).map(s => s.email);
    const csvContent = "ایمیل\n" + activeEmails.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute("download", "subscribers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("لیست ایمیل‌ها با موفقیت ذخیره شد");
  };

  return (
    <>
      <div className="mb-4 flex justify-end">
        <button
          type="button"
          onClick={exportCSV}
          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
        >
          <Download className="h-4 w-4" />
          خروجی CSV (ایمیل‌های فعال)
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted/30">
            <tr>
              <th className="px-4 py-3 text-right text-sm font-medium text-foreground">ایمیل</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-foreground">وضعیت</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-foreground">تاریخ عضویت</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-foreground">عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {subscribers.map((sub) => (
              <tr key={sub._id} className="hover:bg-accent/50 transition-colors">
                <td className="px-4 py-3 text-sm text-foreground">{sub.email}</td>
                <td className="px-4 py-3 text-sm">
                  {sub.isActive ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                      فعال
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                      لغو اشتراک
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {new Date(sub.createdAt).toLocaleDateString("fa-IR")}
                </td>
                <td className="px-4 py-3 text-sm">
                  <div className="flex items-center gap-2">
                    {sub.isActive && (
                      <button
                        type="button"
                        aria-label="لغو اشتراک"
                        onClick={() => handleUnsubscribeClick(sub._id)}
                        className="p-1 rounded-md text-yellow-600 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors"
                      >
                        <Block className="h-4 w-4" />
                      </button>
                    )}
                    <AdminTableActions
                      editHref="#" // مشترکین قابل ویرایش نیستند
                      onDelete={() => handleDeleteClick(sub._id)}
                      isDeleting={deletingId === sub._id}
                    />
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
        onConfirm={confirmAction}
        title={actionType === "delete" ? "حذف مشترک" : "لغو اشتراک"}
        message={
          actionType === "delete"
            ? "آیا از حذف این مشترک اطمینان دارید؟ این عمل غیرقابل بازگشت است."
            : "آیا از لغو اشتراک این ایمیل اطمینان دارید؟ کاربر دیگر خبرنامه دریافت نخواهد کرد."
        }
        confirmText={actionType === "delete" ? "حذف" : "لغو اشتراک"}
        cancelText="انصراف"
      />
    </>
  );
}