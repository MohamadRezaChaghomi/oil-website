// src/components/admin/shared/AdminStatusBadge.tsx
interface AdminStatusBadgeProps {
  isActive: boolean;        // true = فعال/منتشر شده، false = غیرفعال/پیش‌نویس
  activeLabel?: string;
  inactiveLabel?: string;
}

/**
 * Status badge for published/draft or active/inactive items.
 * Light mode: green background with dark green text for active,
 * yellow background with dark yellow text for inactive.
 * Dark mode: semi-transparent versions.
 */
export function AdminStatusBadge({
  isActive,
  activeLabel = "منتشر شده",
  inactiveLabel = "پیش‌نویس",
}: AdminStatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
        isActive
          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
      }`}
    >
      {isActive ? activeLabel : inactiveLabel}
    </span>
  );
}