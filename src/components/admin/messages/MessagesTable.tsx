// src/components/admin/messages/MessagesTable.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AdminTableActions } from "@/components/admin/shared/AdminTableActions";
import { Modal } from "@/components/ui/Modal";
import { useState } from "react";
import { toast } from "react-toastify";
import { Visibility, CheckCircle, Reply } from "@mui/icons-material";

interface Message {
  _id: string;
  name: string;
  email: string;
  subject?: string;
  status: "pending" | "read" | "replied";
  createdAt: Date;
}

interface MessagesTableProps {
  messages: Message[];
}

const statusConfig = {
  pending: { label: "در انتظار", className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300" },
  read: { label: "خوانده شده", className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" },
  replied: { label: "پاسخ داده شده", className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" },
};

export function MessagesTable({ messages }: MessagesTableProps) {
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
      const res = await fetch(`/api/admin/messages/${selectedId}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("پیام با موفقیت حذف شد");
        router.refresh();
      } else {
        toast.error("خطا در حذف پیام");
      }
    } catch {
      toast.error("خطا در ارتباط با سرور");
    } finally {
      setDeletingId(null);
      setModalOpen(false);
      setSelectedId(null);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        toast.success("وضعیت پیام به‌روز شد");
        router.refresh();
      } else {
        toast.error("خطا در به‌روزرسانی وضعیت");
      }
    } catch {
      toast.error("خطا در ارتباط با سرور");
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted/30">
            <tr>
              <th className="px-4 py-3 text-right text-sm font-medium text-foreground">نام</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-foreground">ایمیل</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-foreground">موضوع</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-foreground">وضعیت</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-foreground">تاریخ</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-foreground">عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {messages.map((message) => {
              const status = statusConfig[message.status];
              return (
                <tr key={message._id} className="hover:bg-accent/50 transition-colors">
                  <td className="px-4 py-3 text-sm text-foreground">{message.name}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{message.email}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{message.subject || "-"}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${status.className}`}>
                      {status.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {new Date(message.createdAt).toLocaleDateString("fa-IR")}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex items-center gap-2">
                      {/* دکمه مشاهده جزئیات - با type و aria-label */}
                      <Link href={`/admin/messages/${message._id}`}>
                        <button
                          type="button"
                          aria-label="مشاهده جزئیات پیام"
                          className="p-1 rounded-md text-primary hover:bg-primary/10 transition-colors"
                        >
                          <Visibility className="h-4 w-4" />
                        </button>
                      </Link>

                      {/* دکمه علامت خوانده شده */}
                      {message.status !== "read" && (
                        <button
                          type="button"
                          aria-label="علامت خوانده شده"
                          onClick={() => handleStatusChange(message._id, "read")}
                          className="p-1 rounded-md text-blue-500 hover:bg-blue-500/10 transition-colors"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </button>
                      )}

                      {/* دکمه پاسخ داده شده */}
                      {message.status !== "replied" && (
                        <button
                          type="button"
                          aria-label="پاسخ داده شده"
                          onClick={() => handleStatusChange(message._id, "replied")}
                          className="p-1 rounded-md text-green-500 hover:bg-green-500/10 transition-colors"
                        >
                          <Reply className="h-4 w-4" />
                        </button>
                      )}

                      {/* دکمه حذف (از AdminTableActions) */}
                      <AdminTableActions
                        editHref="#"  // پیام‌ها قابلیت ویرایش ندارند، فقط حذف
                        onDelete={() => handleDeleteClick(message._id)}
                        isDeleting={deletingId === message._id}
                      />
                    </div>
                  </td>
              </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmDelete}
        title="حذف پیام"
        message="آیا از حذف این پیام اطمینان دارید؟ این عمل غیرقابل بازگشت است."
        confirmText="حذف"
        cancelText="انصراف"
      />
    </>
  );
}