// src/components/admin/AdminHeader.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Logout, Person, AdminPanelSettings } from "@mui/icons-material";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function AdminHeader() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    router.push("/?logout=true");
    setTimeout(() => router.refresh(), 100);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 h-16 border-b border-border transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-lg shadow-sm"
          : "bg-background"
      }`}
    >
      <div className="flex h-full items-center justify-between px-4 md:px-6">
        {/* لوگو و عنوان */}
        <div className="flex items-center gap-3">
          <Link href="/admin" className="flex items-center gap-2">
            <Image
              src="/images/logo.svg"
              alt="شرکت نفت و گاز"
              width={32}
              height={32}
              className="h-8 w-auto drop-shadow-sm"
              priority
            />
            <span className="hidden sm:inline-block text-lg font-bold text-foreground">
              پنل مدیریت
            </span>
          </Link>
        </div>

        {/* بخش راست */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground bg-accent/30 px-3 py-1.5 rounded-full">
            <Person className="h-4 w-4" />
            <span>{process.env.NEXT_PUBLIC_ADMIN_USERNAME || "مدیر سیستم"}</span>
          </div>
          <ThemeToggle isScrolled={true} />
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all"
          >
            <Logout className="h-4 w-4" />
            <span className="hidden sm:inline">خروج</span>
          </Button>
        </div>
      </div>
    </header>
  );
}