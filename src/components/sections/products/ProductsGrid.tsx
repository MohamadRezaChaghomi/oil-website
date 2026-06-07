// src/components/sections/products/ProductGrid.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Package, Heart, ArrowLeft, Tag } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export type ProductBadge = "new" | "hot" | "sale" | null;

interface ProductSpec {
  label: string;
}

interface Product {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  categoryName: string;
  price?: number;
  badge?: ProductBadge;
  specs?: ProductSpec[];
  inStock?: boolean;
}

interface ProductGridProps {
  products: Product[];
}

const formatPrice = (n: number) =>
  new Intl.NumberFormat("fa-IR").format(n) + " تومان";

const BADGE_CONFIG: Record<
  NonNullable<ProductBadge>,
  { label: string; colorClass: string }
> = {
  new: { label: "جدید", colorClass: "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400" },
  hot: { label: "پرفروش", colorClass: "bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400" },
  sale: { label: "تخفیف", colorClass: "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400" },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function ProductCard({ product }: { product: Product }) {
  const badge = product.badge ? BADGE_CONFIG[product.badge] : null;
  const outOfStock = product.inStock === false;

  return (
    <motion.div variants={cardVariants}>
      <div
        className={cn(
          "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg",
          outOfStock && "opacity-70"
        )}
      >
        <div className="relative h-48 w-full flex-shrink-0 overflow-hidden bg-muted/30">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground/60">
              <Package className="h-9 w-9 stroke-[1.2]" />
              <span className="text-xs">تصویر ندارد</span>
            </div>
          )}

          {badge && (
            <span
              className={cn(
                "absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-xs font-bold",
                badge.colorClass
              )}
            >
              {badge.label}
            </span>
          )}

          {outOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-sm font-semibold tracking-wide text-white backdrop-blur-[2px]">
              ناموجود
            </div>
          )}

          <button
            className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-background/80 text-muted-foreground opacity-0 transition-opacity duration-200 hover:bg-background hover:text-red-500 group-hover:opacity-100"
            aria-label="افزودن به علاقه‌مندی"
          >
            <Heart className="h-3.5 w-3.5 stroke-[1.8]" />
          </button>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <div className="mb-1 flex items-center gap-1 text-xs font-medium text-foreground/80">
            <Tag className="h-3 w-3" />
            {product.categoryName}
          </div>
          <h3 className="line-clamp-2 text-sm font-bold text-foreground transition-colors group-hover:text-primary">
            {product.name}
          </h3>
          {product.description && (
            <p className="mt-1 line-clamp-2 text-xs text-foreground/70">
              {product.description}
            </p>
          )}
          {product.specs && product.specs.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {product.specs.slice(0, 3).map((spec, idx) => (
                <span
                  key={idx}
                  className="rounded-md border border-border/60 bg-muted/30 px-2 py-0.5 text-[10px] text-foreground/70"
                >
                  {spec.label}
                </span>
              ))}
            </div>
          )}
          <div className="mt-3 flex items-center justify-between border-t border-border/50 pt-3">
            {product.price ? (
              <span className="text-sm font-bold text-foreground">
                {formatPrice(product.price)}
              </span>
            ) : (
              <span className="text-xs font-semibold text-foreground/70">تماس بگیرید</span>
            )}
            <Link
              href={outOfStock ? "#" : `/products/${product.slug}`}
              className={cn(
                "inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all",
                outOfStock
                  ? "cursor-not-allowed bg-muted text-muted-foreground"
                  : "bg-primary text-primary-foreground hover:bg-primary/90 hover:gap-2"
              )}
              tabIndex={outOfStock ? -1 : undefined}
              aria-disabled={outOfStock}
            >
              {outOfStock ? "ناموجود" : "مشاهده"}
              {!outOfStock && <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" />}
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ProductGrid({ products }: ProductGridProps) {
  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-border/50 bg-card/40 py-16 text-center backdrop-blur-sm">
        <Package className="mx-auto h-12 w-12 text-muted-foreground/50" />
        <h3 className="mt-3 text-lg font-semibold text-foreground">محصولی یافت نشد</h3>
        <p className="mt-1 text-sm text-muted-foreground">لطفاً فیلترهای دیگری را امتحان کنید.</p>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
    >
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </motion.div>
  );
}

export default ProductGrid;