// src/components/admin/shared/AdminFormActions.tsx
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

interface AdminFormActionsProps {
  isSubmitting: boolean;
  submitLabel: string;
  cancelLabel?: string;
}

/**
 * Save and cancel buttons for admin forms.
 * Cancel button uses router.back().
 */
export function AdminFormActions({
  isSubmitting,
  submitLabel,
  cancelLabel = "انصراف",
}: AdminFormActionsProps) {
  const router = useRouter();
  return (
    <div className="flex justify-end gap-3 pt-4">
      <Button type="button" variant="outline" onClick={() => router.back()}>
        {cancelLabel}
      </Button>
      <Button type="submit" disabled={isSubmitting} className="bg-orange-600 hover:bg-orange-700 text-white">
        {isSubmitting ? "در حال ذخیره..." : submitLabel}
      </Button>
    </div>
  );
}