// src/components/admin/messages/MessageDetail.tsx
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ArrowBack, CheckCircle, Reply, Delete } from "@mui/icons-material";
import { useState } from "react";
import { toast } from "react-toastify";

interface Message {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: "pending" | "read" | "replied";
  createdAt: Date;
}

interface MessageDetailProps {
  message: Message;
}

export function MessageDetail({ message }: MessageDetailProps) {
  const router = useRouter();
  const [updating, setUpdating] = useState(false);

  const handleStatusUpdate = async (newStatus: string) => {
    setUpdating(true);
    try {
      const res = await fetch(`/api/admin/messages/${message._id}`, {
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
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("آیا از حذف این پیام اطمینان دارید؟")) return;
    try {
      const res = await fetch(`/api/admin/messages/${message._id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("پیام با موفقیت حذف شد");
        router.push("/admin/messages");
      } else {
        toast.error("خطا در حذف پیام");
      }
    } catch {
      toast.error("خطا در ارتباط با سرور");
    }
  };

  const statusConfig = {
    pending: { label: "در انتظار", className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300" },
    read: { label: "خوانده شده", className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" },
    replied: { label: "پاسخ داده شده", className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" },
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <Button variant="outline" onClick={() => router.back()} className="gap-2">
          <ArrowBack className="h-4 w-4" />
          بازگشت
        </Button>
        <div className="flex gap-2">
          {message.status !== "read" && (
            <Button
              variant="outline"
              onClick={() => handleStatusUpdate("read")}
              disabled={updating}
              className="gap-2"
            >
              <CheckCircle className="h-4 w-4" />
              علامت خوانده شده
            </Button>
          )}
          {message.status !== "replied" && (
            <Button
              variant="outline"
              onClick={() => handleStatusUpdate("replied")}
              disabled={updating}
              className="gap-2"
            >
              <Reply className="h-4 w-4" />
              پاسخ داده شد
            </Button>
          )}
          <Button variant="destructive" onClick={handleDelete} className="gap-2">
            <Delete className="h-4 w-4" />
            حذف
          </Button>
        </div>
      </div>

      <div className="bg-card/60 backdrop-blur-sm rounded-2xl border border-border/50 p-6 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground">نام فرستنده</label>
            <p className="text-base text-foreground mt-1">{message.name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground">آدرس ایمیل</label>
            <p className="text-base text-foreground mt-1">
              <a href={`mailto:${message.email}`} className="text-primary hover:underline">
                {message.email}
              </a>
            </p>
          </div>
          {message.phone && (
            <div>
              <label className="block text-sm font-medium text-muted-foreground">شماره تماس</label>
              <p className="text-base text-foreground mt-1">{message.phone}</p>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-muted-foreground">وضعیت</label>
            <div className="mt-1">
              <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${statusConfig[message.status].className}`}>
                {statusConfig[message.status].label}
              </span>
            </div>
          </div>
          {message.subject && (
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-muted-foreground">موضوع</label>
              <p className="text-base text-foreground mt-1">{message.subject}</p>
            </div>
          )}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-muted-foreground">پیام</label>
            <div className="mt-1 p-4 bg-muted/20 rounded-lg text-foreground whitespace-pre-wrap">
              {message.message}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground">تاریخ دریافت</label>
            <p className="text-base text-foreground mt-1">
              {new Date(message.createdAt).toLocaleString("fa-IR")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}