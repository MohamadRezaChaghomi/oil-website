"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils/cn";
import { Menu, Close } from "@mui/icons-material";

const navItems = [
  { name: "خانه", href: "/" },
  { name: "درباره ما", href: "/about" },
  { name: "محصولات", href: "/products" },
  { name: "خدمات", href: "/services" },
  { name: "وبلاگ", href: "/blog" },
  { name: "تماس با ما", href: "/contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // پیدا کردن هیرو سکشن (با کلاس یا آی‌دی)
    const heroElement = document.querySelector("section.hero-section");
    if (heroElement) {
      heroRef.current = heroElement as HTMLElement;
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroBottom = heroRef.current.offsetTop + heroRef.current.offsetHeight;
        const scrolledPastHero = window.scrollY > heroBottom - 100; // 100px مارجین
        setIsScrolled(scrolledPastHero);
      } else {
        // اگر هیرویی نبود (مثل صفحات داخلی)، بلافاصله اسکرولد شود
        setIsScrolled(window.scrollY > 20);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // اجرای اولیه
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isDrawerOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isDrawerOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-300",
          isScrolled
            ? "bg-background/80 backdrop-blur-lg border-b border-border shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span
              className={cn(
                "text-xl font-bold transition-all",
                isScrolled
                  ? "text-foreground" // به جای گرادینت، رنگ ساده foreground که در هر تم خواناست
                  : "text-white"
              )}
            >
              شرکت نفت و گاز
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isScrolled ? "text-foreground/80" : "text-white"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle isScrolled={isScrolled} />
            <Button
              variant="ghost"
              size="icon"
              className={cn("md:hidden", isScrolled ? "text-foreground" : "text-white")}
              onClick={() => setIsDrawerOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (بدون تغییر) */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden"
              onClick={() => setIsDrawerOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 z-50 h-full w-64 bg-card shadow-xl border-l border-border md:hidden"
            >
              <div className="flex justify-end p-4">
                <Button variant="ghost" size="icon" onClick={() => setIsDrawerOpen(false)}>
                  <Close className="h-5 w-5" />
                </Button>
              </div>
              <nav className="flex flex-col gap-4 px-6 py-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsDrawerOpen(false)}
                    className="text-lg font-medium py-2 text-foreground hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}