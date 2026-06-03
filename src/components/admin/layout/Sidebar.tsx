// src/components/admin/layout/Sidebar.tsx
"use client";

/**
 * Admin Sidebar Component
 * Dark gradient background matching hero sections
 * Glass-morphism effect with site theming (light/dark compatible)
 * Collapsible with localStorage persistence
 * Active route highlighted with orange accent and left border
 */
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Dashboard,
  Article,
  Category,
  Inventory,
  Email,
  Subscriptions,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils/cn";

const navItems = [
  { name: "داشبورد", href: "/admin", icon: Dashboard },
  { name: "مقالات", href: "/admin/articles", icon: Article },
  { name: "دسته‌بندی‌ها", href: "/admin/categories", icon: Category },
  { name: "محصولات", href: "/admin/products", icon: Inventory },
  { name: "پیام‌ها", href: "/admin/messages", icon: Email },
  { name: "مشترکین", href: "/admin/subscribers", icon: Subscriptions },
  { name: "تنظیمات", href: "/admin/settings", icon: Settings },
];

const SIDEBAR_STORAGE_KEY = "admin-sidebar-collapsed";

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(SIDEBAR_STORAGE_KEY);
    if (saved !== null) setIsCollapsed(saved === "true");
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(SIDEBAR_STORAGE_KEY, String(isCollapsed));
    }
  }, [isCollapsed, mounted]);

  const toggleSidebar = () => setIsCollapsed((prev) => !prev);
  const isActive = (href: string) => pathname === href;

  if (!mounted) return null;

  return (
    <aside
      className={cn(
        // Base styles: sticky, full height, flex column, transition
        "sticky top-0 h-screen flex flex-col overflow-hidden transition-all duration-300 ease-out z-40",
        // Dark gradient background matching hero sections (from-gray-900 via-gray-800 to-gray-900)
        "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900",
        // Subtle border and shadow
        "border-l border-white/10 shadow-xl",
        // Width based on collapsed state
        isCollapsed ? "w-[68px]" : "w-64"
      )}
    >
      {/* Toggle button */}
      <button
        onClick={toggleSidebar}
        className={cn(
          "absolute -left-3 top-6 w-6 h-6 rounded-full bg-gray-800 border border-white/20",
          "flex items-center justify-center shadow-md hover:bg-gray-700 transition-colors z-10",
          "text-white/70 hover:text-orange-400"
        )}
        aria-label={isCollapsed ? "باز کردن منو" : "بستن منو"}
      >
        {isCollapsed ? (
          <ChevronLeft className="h-3.5 w-3.5" />
        ) : (
          <ChevronRight className="h-3.5 w-3.5" />
        )}
      </button>

      {/* Header with logo */}
      <div
        className={cn(
          "flex items-center border-b border-white/10 shrink-0",
          isCollapsed ? "justify-center py-5" : "justify-start px-4 py-4 gap-2"
        )}
      >
        <Link href="/admin" className="flex items-center gap-2">
          <Image
            src="/images/logo.svg"
            alt="لوگو"
            width={32}
            height={32}
            className="h-8 w-auto drop-shadow-md"
          />
          {!isCollapsed && (
            <span className="text-sm font-semibold text-white/90 tracking-tight">
              پنل مدیریت
            </span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4">
        {!isCollapsed && (
          <div className="px-4 pb-2 text-[10px] font-semibold uppercase tracking-wider text-white/40">
            منو اصلی
          </div>
        )}
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative flex items-center gap-3 mx-2 px-2 py-2 rounded-lg transition-all duration-200",
                  "hover:bg-white/5",
                  active && "bg-orange-500/10",
                  isCollapsed ? "justify-center" : "justify-start"
                )}
                title={isCollapsed ? item.name : undefined}
              >
                <Icon
                  className={cn(
                    "h-5 w-5 shrink-0 transition-colors",
                    active ? "text-orange-400" : "text-white/50 group-hover:text-white/80"
                  )}
                />
                {!isCollapsed && (
                  <span
                    className={cn(
                      "text-sm font-medium transition-colors",
                      active ? "text-orange-400" : "text-white/60 group-hover:text-white/80"
                    )}
                  >
                    {item.name}
                  </span>
                )}
                {/* Tooltip for collapsed mode */}
                {isCollapsed && (
                  <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 px-2 py-1 rounded-md bg-gray-800 text-white/90 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-md border border-white/10">
                    {item.name}
                  </span>
                )}
                {/* Active indicator bar (right side) */}
                {active && !isCollapsed && (
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 w-0.5 h-6 rounded-full bg-orange-500" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div
        className={cn(
          "border-t border-white/10 py-3 flex items-center shrink-0",
          isCollapsed ? "justify-center" : "justify-start px-4 gap-2"
        )}
      >
        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
        {!isCollapsed && (
          <span className="text-[11px] text-white/40">نسخه ۱.۰.۰ — آنلاین</span>
        )}
      </div>
    </aside>
  );
}