// src/components/admin/shared/AdminFormLayout.tsx
import { ReactNode } from "react";

interface AdminFormLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
}

/**
 * Wrapper for admin form pages with consistent styling (glassmorphic card).
 */
export function AdminFormLayout({ children, title, description }: AdminFormLayoutProps) {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground relative inline-block">
          {title}
          <span className="absolute -bottom-2 right-0 w-12 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></span>
        </h1>
        {description && <p className="text-muted-foreground mt-2">{description}</p>}
      </div>
      <div className="bg-card/60 backdrop-blur-sm rounded-2xl border border-border/50 p-6 shadow-sm">
        {children}
      </div>
    </div>
  );
}