// src/components/admin/settings/SettingsTable.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Edit, Delete, Add } from "@mui/icons-material";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Modal } from "@/components/ui/Modal";
import { toast } from "react-toastify";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";

interface Setting {
  _id: string;
  key: string;
  value: any;
  group: string;
  description?: string;
  isPublic: boolean;
}

interface SettingsTableProps {
  settings: Setting[];
  groups: string[];
}

export function SettingsTable({ settings, groups }: SettingsTableProps) {
  const router = useRouter();
  const [editingSetting, setEditingSetting] = useState<Setting | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    key: "",
    value: "",
    group: "general",
    description: "",
    isPublic: false,
  });
  const [deletingKey, setDeletingKey] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  // Edit handler
  const handleEdit = (setting: Setting) => {
    setEditingSetting(setting);
    setFormData({
      key: setting.key,
      value: typeof setting.value === "object" ? JSON.stringify(setting.value) : String(setting.value),
      group: setting.group,
      description: setting.description || "",
      isPublic: setting.isPublic,
    });
    setIsModalOpen(true);
  };

  // Create handler
  const handleCreate = () => {
    setEditingSetting(null);
    setFormData({
      key: "",
      value: "",
      group: "general",
      description: "",
      isPublic: false,
    });
    setIsModalOpen(true);
  };

  // Save (create or update)
  const handleSave = async () => {
    try {
      let parsedValue: any = formData.value;
      // Try to parse JSON if it looks like object/array
      if (formData.value.startsWith("{") || formData.value.startsWith("[")) {
        try {
          parsedValue = JSON.parse(formData.value);
        } catch {
          // keep string
        }
      }

      const payload = {
        key: formData.key,
        value: parsedValue,
        group: formData.group,
        description: formData.description,
        isPublic: formData.isPublic,
      };

      const url = editingSetting
        ? `/api/admin/settings/${editingSetting.key}`
        : "/api/admin/settings";
      const method = editingSetting ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success(editingSetting ? "تنظیمات به‌روز شد" : "تنظیمات جدید ایجاد شد");
        router.refresh();
        setIsModalOpen(false);
      } else {
        const err = await res.json();
        toast.error(err.error || "خطا در ذخیره تنظیمات");
      }
    } catch {
      toast.error("خطا در ارتباط با سرور");
    }
  };

  // Delete handlers
  const handleDeleteClick = (key: string) => {
    setSelectedKey(key);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedKey) return;
    setDeletingKey(selectedKey);
    try {
      const res = await fetch(`/api/admin/settings/${selectedKey}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("تنظیمات با موفقیت حذف شد");
        router.refresh();
      } else {
        const err = await res.json();
        toast.error(err.error || "خطا در حذف تنظیمات");
      }
    } catch {
      toast.error("خطا در ارتباط با سرور");
    } finally {
      setDeletingKey(null);
      setDeleteModalOpen(false);
      setSelectedKey(null);
    }
  };

  // Options for group select
  const groupOptions = [
    { value: "general", label: "عمومی" },
    { value: "contact", label: "اطلاعات تماس" },
    { value: "seo", label: "SEO" },
    { value: "social", label: "شبکه‌های اجتماعی" },
  ];

  return (
    <>
      <AdminPageHeader
        title="تنظیمات سایت"
        description="مدیریت متغیرهای عمومی، اطلاعات تماس و تنظیمات SEO"
        action={
          <Button
            onClick={handleCreate}
            className="gap-2 bg-orange-600 hover:bg-orange-700 text-white"
          >
            <Add className="h-4 w-4" />
            تنظیم جدید
          </Button>
        }
      />

      <div className="bg-card/60 backdrop-blur-sm rounded-2xl border border-border/50 p-4 shadow-sm">
        {groups.map((group) => {
          const groupSettings = settings.filter((s) => s.group === group);
          if (groupSettings.length === 0) return null;
          return (
            <div key={group} className="mb-8 last:mb-0">
              <h2 className="text-xl font-semibold text-foreground mb-3 border-b border-border pb-2">
                {group === "general"
                  ? "عمومی"
                  : group === "contact"
                  ? "اطلاعات تماس"
                  : group === "seo"
                  ? "SEO"
                  : group}
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-border">
                  <thead className="bg-muted/30">
                    <tr>
                      <th className="px-4 py-2 text-right text-sm font-medium text-foreground">
                        کلید
                      </th>
                      <th className="px-4 py-2 text-right text-sm font-medium text-foreground">
                        مقدار
                      </th>
                      <th className="px-4 py-2 text-right text-sm font-medium text-foreground">
                        توضیحات
                      </th>
                      <th className="px-4 py-2 text-right text-sm font-medium text-foreground">
                        عمومی
                      </th>
                      <th className="px-4 py-2 text-right text-sm font-medium text-foreground">
                        عملیات
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {groupSettings.map((setting) => (
                      <tr key={setting._id} className="hover:bg-accent/50">
                        <td className="px-4 py-2 text-sm font-mono text-foreground">
                          {setting.key}
                        </td>
                        <td className="px-4 py-2 text-sm text-muted-foreground truncate max-w-xs">
                          {typeof setting.value === "object"
                            ? JSON.stringify(setting.value)
                            : String(setting.value)}
                        </td>
                        <td className="px-4 py-2 text-sm text-muted-foreground">
                          {setting.description || "-"}
                        </td>
                        <td className="px-4 py-2 text-sm">
                          {setting.isPublic ? (
                            <span className="text-green-600 dark:text-green-400">✔️</span>
                          ) : (
                            <span className="text-red-600 dark:text-red-400">❌</span>
                          )}
                        </td>
                        <td className="px-4 py-2 text-sm">
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => handleEdit(setting)}
                              className="p-1 rounded-md text-primary hover:bg-primary/10 transition-colors"
                              aria-label="ویرایش"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteClick(setting.key)}
                              disabled={deletingKey === setting.key}
                              className="p-1 rounded-md text-red-500 hover:bg-red-500/10 transition-colors"
                              aria-label="حذف"
                            >
                              <Delete className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal for create/edit */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleSave}
        title={editingSetting ? "ویرایش تنظیمات" : "تنظیمات جدید"}
        message=""
        confirmText="ذخیره"
        cancelText="انصراف"
        showConfirm={true}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              کلید *
            </label>
            <Input
              value={formData.key}
              onChange={(e) => setFormData({ ...formData, key: e.target.value })}
              disabled={!!editingSetting}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              مقدار *
            </label>
            <Textarea
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              گروه
            </label>
            <Select
              options={groupOptions}
              value={formData.group}
              onChange={(val) => setFormData({ ...formData, group: val })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              توضیحات
            </label>
            <Input
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isPublic"
              checked={formData.isPublic}
              onChange={(e) =>
                setFormData({ ...formData, isPublic: e.target.checked })
              }
              className="h-4 w-4 rounded border-border"
            />
            <label htmlFor="isPublic" className="text-sm text-foreground">
              قابل نمایش در API عمومی
            </label>
          </div>
        </div>
      </Modal>

      {/* Delete confirmation modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="حذف تنظیمات"
        message="آیا از حذف این تنظیمات اطمینان دارید؟ این عمل غیرقابل بازگشت است."
        confirmText="حذف"
        cancelText="انصراف"
      />
    </>
  );
}