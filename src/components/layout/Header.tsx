"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
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
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const heroElement = document.querySelector("section.hero-section");
    if (heroElement) heroRef.current = heroElement as HTMLElement;
    else heroRef.current = null;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroBottom = heroRef.current.offsetTop + heroRef.current.offsetHeight;
        setIsScrolled(window.scrollY > heroBottom - 80);
      } else {
        setIsScrolled(window.scrollY > 20);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isDrawerOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isDrawerOpen]);

  const getLogoSrc = () => {
    if (!mounted) return "/images/logo.svg";
    return "/images/logo.svg";
  };

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
          {/* Logo + Company Name - همیشه سفید در هیرو */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image
              src={getLogoSrc()}
              alt="شرکت نفت و گاز"
              width={40}
              height={40}
              className={cn(
                "h-10 w-auto object-contain transition-all duration-200",
                isScrolled ? "drop-shadow-md" : "drop-shadow-lg"
              )}
              priority
            />
            <span
              className={cn(
                "text-xl font-bold transition-all",
                isScrolled
                  ? "text-foreground"
                  : "text-white drop-shadow-md"
              )}
            >
              شرکت نفت و گاز
            </span>
          </Link>

          {/* Desktop Navigation - لینک‌ها در هیرو سفید */}
          <nav className="hidden md:flex flex-1 items-center justify-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-base font-medium transition-colors duration-200",
                  isScrolled
                    ? "text-foreground/80 hover:text-primary"
                    : "text-white hover:text-orange-200 drop-shadow-sm"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions - دکمه تم و منوی موبایل در هیرو سفید */}
          <div className="flex items-center gap-2">
            <ThemeToggle isScrolled={isScrolled} />
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "md:hidden transition-all",
                isScrolled ? "text-foreground" : "text-white drop-shadow-sm"
              )}
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