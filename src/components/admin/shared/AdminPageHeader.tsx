// src/components/admin/shared/AdminPageHeader.tsx
import { ReactNode } from "react";

interface AdminPageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode; // دکمه یا لینک اقدام (مثلاً «مقاله جدید»)
}

/**
 * Reusable header for admin pages with title, description, and optional action button.
 * Includes a gradient underline under the title.
 */
export function AdminPageHeader({ title, description, action }: AdminPageHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground relative inline-block">
            {title}
            <span className="absolute -bottom-2 right-0 w-12 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></span>
          </h1>
          {description && <p className="text-muted-foreground mt-2">{description}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>
    </div>
  );
}