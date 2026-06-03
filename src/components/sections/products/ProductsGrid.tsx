// src/components/sections/products/ProductsGrid.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Package, ArrowLeft } from "lucide-react";

interface Product {
  _id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  image?: string;
  category: string;
  categoryName: string;
  isActive: boolean;
}

interface ProductsGridProps {
  products: Product[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function ProductsGrid({ products }: ProductsGridProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {products.map((product) => (
        <motion.div key={product._id} variants={cardVariants}>
          <Link href={`/products/${product.slug}`}>
            <div className="group relative bg-card/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-border/50 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              {/* Image container */}
              <div className="relative h-56 w-full bg-muted/30 overflow-hidden">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
                    <Package className="h-12 w-12 mb-2" />
                    <span className="text-sm">بدون تصویر</span>
                  </div>
                )}
                {/* Category badge */}
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full shadow-md">
                  {product.categoryName}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-xl font-bold text-foreground line-clamp-1 mb-2 group-hover:text-primary transition-colors">
                  {product.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2">
                  {product.shortDescription || product.description}
                </p>
                {/* Improved button: orange with icon animation */}
                <div className="mt-5 flex items-center gap-2 text-orange-600 dark:text-orange-400 font-medium text-sm group/btn">
                  <span>مشاهده جزئیات</span>
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover/btn:-translate-x-1" />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}