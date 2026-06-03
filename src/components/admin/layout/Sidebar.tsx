// src/components/admin/Sidebar.tsx
"use client";

/**
 * Admin Sidebar Component
 * Displays navigation menu with collapsible functionality
 * Active route is highlighted with orange text (no background)
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

  // Load saved sidebar state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(SIDEBAR_STORAGE_KEY);
    if (saved !== null) setIsCollapsed(saved === "true");
  }, []);

  // Save sidebar state when changed
  useEffect(() => {
    localStorage.setItem(SIDEBAR_STORAGE_KEY, String(isCollapsed));
  }, [isCollapsed]);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  // Check if the current path matches the item's href
  const isActive = (href: string) => pathname === href;

  return (
    <aside
      className={`sticky top-16 h-[calc(100vh-4rem)] bg-card border-l border-border transition-all duration-300 flex flex-col ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Toggle button */}
      <button
        onClick={toggleSidebar}
        className="absolute -left-3 top-6 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md hover:bg-primary/80 transition-colors z-10"
        aria-label={isCollapsed ? "باز کردن منو" : "بستن منو"}
      >
        {isCollapsed ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </button>

      {/* Sidebar header (logo only) */}
      <div className={`border-b border-border ${isCollapsed ? "py-4" : "p-4"}`}>
        <Link href="/admin" className={`flex items-center ${isCollapsed ? "justify-center" : "justify-start"}`}>
          <Image
            src="/images/logo.svg"
            alt="لوگو"
            width={32}
            height={32}
            className="h-8 w-auto"
          />
        </Link>
      </div>

      {/* Navigation links */}
      <nav className="flex-1 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 mx-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                active
                  ? "text-orange-600 dark:text-orange-400"  // Active: orange text
                  : "text-muted-foreground hover:text-accent-foreground hover:bg-accent"
              } ${isCollapsed ? "justify-center" : "justify-start"}`}
              title={isCollapsed ? item.name : undefined}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Version footer (only when expanded) */}
      {!isCollapsed && (
        <div className="p-4 border-t border-border text-center text-xs text-muted-foreground">
          نسخه 1.0.0
        </div>
      )}
    </aside>
  );
}