// src/components/sections/ProductsShowcase.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ArrowForward, Inventory } from "@mui/icons-material";

interface Product {
  _id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  image?: string;
  isActive: boolean;
}

interface ProductsShowcaseProps {
  products: Product[];
}

export function ProductsShowcase({ products }: ProductsShowcaseProps) {
  if (!products.length) {
    return (
      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <Inventory className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground">محصولی یافت نشد</h3>
          <p className="text-muted-foreground mt-2">به زودی محصولات جدید اضافه خواهند شد.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-background to-card/50">
      {/* Animated background dots */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-40 h-40 bg-secondary/10 rounded-full blur-2xl" />
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-foreground"
          >
            محصولات برجسته
          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 mb-6 rounded-full" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-muted-foreground text-lg"
          >
            مجموعه‌ای از پیشرفته‌ترین تجهیزات و مواد مصرفی صنعت نفت و گاز.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, idx) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              viewport={{ once: true }}
              className="group relative bg-card rounded-2xl overflow-hidden border border-border/50 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-56 bg-muted/30 overflow-hidden">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    <Inventory className="h-12 w-12" />
                  </div>
                )}
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold line-clamp-1 text-foreground">{product.title}</h3>
                <p className="mt-2 text-muted-foreground text-sm line-clamp-2">
                  {product.shortDescription || product.description}
                </p>
                <Link href={`/products/${product.slug}`}>
                  <Button variant="ghost" className="mt-4 gap-1 p-0 h-auto hover:bg-transparent group/btn text-primary">
                    مشاهده جزئیات
                    <ArrowForward className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/products">
            <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
              مشاهده همه محصولات
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}