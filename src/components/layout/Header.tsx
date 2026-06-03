// src/components/layout/Header.tsx
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import {
  Menu,
  Close,
  KeyboardArrowDown,
  Inventory2Outlined,
  CategoryOutlined,
  OpenInNew,
} from "@mui/icons-material";

// ─────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────
interface ProductItem {
  _id: string;
  name: string;
  slug: string;
}

interface CategoryItem {
  _id: string;
  name: string;
  slug: string;
  products: ProductItem[];
}

// ─────────────────────────────────────────────────────────────────
// MegaMenu Component
// ─────────────────────────────────────────────────────────────────
interface MegaMenuProps {
  categories: CategoryItem[];
  loading: boolean;
  onClose: () => void;
}

function MegaMenu({ categories, loading, onClose }: MegaMenuProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryItem | null>(
    categories?.length ? categories[0] : null
  );

  useEffect(() => {
    if (categories?.length && !activeCategory) {
      setActiveCategory(categories[0]);
    }
  }, [categories, activeCategory]);

  if (loading) {
    return (
      <div className="absolute top-full right-1/2 translate-x-1/2 w-[860px] max-w-[96vw] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl p-5">
        <div className="flex gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-10 flex-1 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (!categories?.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute top-full right-1/2 translate-x-1/2 w-[860px] max-w-[96vw] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl overflow-hidden z-50"
      onMouseLeave={onClose}
    >
      {/* Header section */}
      <div className="flex items-center gap-2 px-5 py-3 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-orange-50 to-transparent dark:from-orange-950/20">
        <Inventory2Outlined className="h-4 w-4 text-orange-600 dark:text-orange-400" />
        <span className="text-sm font-semibold text-orange-600 dark:text-orange-400">همه محصولات</span>
        <Link
          href="/products"
          className="mr-auto flex items-center gap-1 text-xs text-orange-600/80 dark:text-orange-400/80 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
          onClick={onClose}
        >
          مشاهده همه
          <OpenInNew className="h-3 w-3" />
        </Link>
      </div>

      {/* Main content */}
      <div className="flex min-h-[280px]">
        {/* Categories sidebar */}
        <ul className="w-[210px] shrink-0 list-none m-0 p-2 border-l border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
          {categories.map((cat) => (
            <li key={cat._id}>
              <button
                type="button"
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-right",
                  activeCategory?._id === cat._id
                    ? "bg-orange-100 dark:bg-orange-950/30 text-orange-700 dark:text-orange-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
                onMouseEnter={() => setActiveCategory(cat)}
                onClick={() => setActiveCategory(cat)}
              >
                <CategoryOutlined className="h-5 w-5 text-orange-500" />
                <span className="flex-1 text-sm font-medium">{cat.name}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded-full">
                  {cat.products?.length ?? 0}
                </span>
              </button>
            </li>
          ))}
        </ul>

        {/* Products grid */}
        <AnimatePresence mode="wait">
          {activeCategory && (
            <motion.div
              key={activeCategory._id}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex-1 p-4 overflow-y-auto"
            >
              <h4 className="text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400 mb-3">
                {activeCategory.name}
              </h4>
              <ul className="grid grid-cols-2 gap-1">
                {(activeCategory.products || []).map((product) => (
                  <li key={product._id}>
                    <Link
                      href={`/products/${product.slug}`}
                      className="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950/20 transition-colors"
                      onClick={onClose}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500 opacity-60" />
                      {product.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={`/products?category=${activeCategory.slug}`}
                className="inline-flex items-center gap-1 mt-3 text-xs text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800 rounded-md px-3 py-1 hover:bg-orange-50 dark:hover:bg-orange-950/20 transition-colors"
                onClick={onClose}
              >
                همه محصولات {activeCategory.name}
                <OpenInNew className="h-3 w-3" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Fetch categories with products from API
// ─────────────────────────────────────────────────────────────────
async function fetchCategoriesWithProducts(): Promise<CategoryItem[]> {
  try {
    const res = await fetch("/api/public/categories?type=product&includeProducts=true");
    if (!res.ok) throw new Error("Failed to fetch categories");
    const data = await res.json();
    // API can return array directly or { data: [...] }
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.data)) return data.data;
    return [];
  } catch (error) {
    console.error("Error fetching mega menu categories:", error);
    return [];
  }
}

// ─────────────────────────────────────────────────────────────────
// Main Header Component
// ─────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { name: "خانه", href: "/" },
  { name: "درباره ما", href: "/about" },
  { name: "محصولات", href: "/products", hasMega: true },
  { name: "خدمات", href: "/services" },
  { name: "وبلاگ", href: "/blog" },
  { name: "تماس با ما", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [catLoading, setCatLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const megaLeaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => setMounted(true), []);

  // Detect scroll for header background
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("section.hero-section");
    const handleScroll = () => {
      if (hero) {
        const heroBottom = hero.offsetTop + hero.offsetHeight;
        setIsScrolled(window.scrollY > heroBottom - 80);
      } else {
        setIsScrolled(window.scrollY > 20);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  // Open mega menu and fetch data once
  const openMega = useCallback(async () => {
    if (megaLeaveTimer.current) clearTimeout(megaLeaveTimer.current);
    setIsMegaOpen(true);
    if (categories.length === 0) {
      setCatLoading(true);
      try {
        const data = await fetchCategoriesWithProducts();
        setCategories(data);
      } finally {
        setCatLoading(false);
      }
    }
  }, [categories.length]);

  const closeMegaDelayed = useCallback(() => {
    megaLeaveTimer.current = setTimeout(() => setIsMegaOpen(false), 120);
  }, []);

  const cancelClose = useCallback(() => {
    if (megaLeaveTimer.current) clearTimeout(megaLeaveTimer.current);
  }, []);

  const isActive = (href: string) => pathname === href;

  if (!mounted) return null;

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
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image
              src="/images/logo.svg"
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
                isScrolled ? "text-foreground" : "text-white drop-shadow-md"
              )}
            >
              شرکت نفت و گاز
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex flex-1 items-center justify-center gap-1">
            {NAV_ITEMS.map((item) => {
              if (item.hasMega) {
                return (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={openMega}
                    onMouseLeave={closeMegaDelayed}
                  >
                    <button
                      type="button"
                      className={cn(
                        "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                        isScrolled
                          ? isActive(item.href)
                            ? "text-primary"
                            : "text-foreground/80 hover:text-foreground hover:bg-accent"
                          : isActive(item.href)
                            ? "text-primary-foreground/90"
                            : "text-white/90 hover:text-white hover:bg-white/10"
                      )}
                      aria-haspopup="true"
                      aria-expanded={isMegaOpen ? "true" : "false"}
                    >
                      {item.name}
                      <KeyboardArrowDown
                        className={cn(
                          "h-4 w-4 transition-transform duration-200",
                          isMegaOpen && "rotate-180"
                        )}
                      />
                    </button>
                    <AnimatePresence>
                      {isMegaOpen && (
                        <div
                          onMouseEnter={cancelClose}
                          onMouseLeave={closeMegaDelayed}
                        >
                          <MegaMenu
                            categories={categories}
                            loading={catLoading}
                            onClose={() => setIsMegaOpen(false)}
                          />
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    isScrolled
                      ? isActive(item.href)
                        ? "text-primary"
                        : "text-foreground/80 hover:text-foreground hover:bg-accent"
                      : isActive(item.href)
                        ? "text-primary-foreground/90"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle isScrolled={isScrolled} />
            <Button
              variant="ghost"
              size="icon"
              className={cn("md:hidden", isScrolled ? "text-foreground" : "text-white")}
              onClick={() => setIsDrawerOpen(true)}
              aria-label="باز کردن منو"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden"
              onClick={() => setIsDrawerOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 z-50 h-full w-72 bg-card shadow-2xl border-l border-border md:hidden flex flex-col"
            >
              <div className="flex justify-between items-center p-4 border-b border-border">
                <span className="text-sm font-medium text-muted-foreground">منو</span>
                <Button variant="ghost" size="icon" onClick={() => setIsDrawerOpen(false)}>
                  <Close className="h-5 w-5" />
                </Button>
              </div>
              <nav className="flex flex-col flex-1 overflow-y-auto">
                {NAV_ITEMS.map((item) => (
                  <div key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setIsDrawerOpen(false)}
                      className={cn(
                        "flex items-center px-5 py-3.5 text-base font-medium border-b border-border/50 transition-colors",
                        pathname === item.href
                          ? "text-primary"
                          : "text-foreground hover:text-primary hover:bg-accent"
                      )}
                    >
                      {item.name}
                    </Link>
                    {/* Inline categories in drawer for "محصولات" */}
                    {item.hasMega && categories.length > 0 && (
                      <div className="bg-accent/30">
                        {categories.map((cat) => (
                          <div key={cat._id} className="border-b border-border/30">
                            <div className="flex items-center gap-2 px-6 py-2.5">
                              <CategoryOutlined className="h-4 w-4 text-primary" />
                              <span className="text-sm font-semibold text-foreground/80">
                                {cat.name}
                              </span>
                            </div>
                            <div className="pb-2">
                              {cat.products.map((prod) => (
                                <Link
                                  key={prod._id}
                                  href={`/products/${prod.slug}`}
                                  onClick={() => setIsDrawerOpen(false)}
                                  className="flex items-center gap-2 px-8 py-2 text-sm text-foreground/70 hover:text-primary transition-colors"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-60" />
                                  {prod.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}