// src/components/admin/shared/AdminTableActions.tsx
"use client";

import Link from "next/link";
import { Edit, Delete } from "@mui/icons-material";
import { Button } from "@/components/ui/Button";

interface AdminTableActionsProps {
  editHref: string;
  onDelete: () => void;
  isDeleting?: boolean;
}

/**
 * Action buttons (edit, delete) for admin tables.
 */
export function AdminTableActions({ editHref, onDelete, isDeleting }: AdminTableActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <Link href={editHref}>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-primary">
          <Edit className="h-4 w-4" />
        </Button>
      </Link>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-red-500"
        onClick={onDelete}
        disabled={isDeleting}
      >
        <Delete className="h-4 w-4" />
      </Button>
    </div>
  );
}