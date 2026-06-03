// src/components/sections/products/ProductInfo.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, Inventory, Phone } from "@mui/icons-material";
import { Button } from "@/components/ui/Button";

interface Product {
  _id: string;
  title: string;
  description: string;
  image?: string;
  categoryName: string;
}

interface ProductInfoProps {
  product: Product;
}

const features = [
  "دوام بالا و مقاومت در برابر خوردگی",
  "تأیید شده بر اساس استانداردهای بین‌المللی",
  "قابل ارسال به سراسر جهان",
  "پشتیبانی فنی ۲۴ ساعته",
];

export function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Image container */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="relative h-96 lg:h-[450px] rounded-2xl overflow-hidden bg-muted/30 border border-border/50 shadow-lg"
      >
        {product.image ? (
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
            <Inventory className="h-16 w-16 mb-2" />
            <span className="text-sm">تصویری موجود نیست</span>
          </div>
        )}
      </motion.div>

      {/* Product details */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="space-y-6"
      >
        <div>
          <span className="text-sm font-medium text-secondary uppercase tracking-wide">
            {product.categoryName || "محصول"}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
            {product.title}
          </h1>
        </div>

        <p className="text-muted-foreground text-lg leading-relaxed">
          {product.description}
        </p>

        {/* Key Features */}
        <div className="border-t border-border pt-6">
          <h3 className="text-lg font-semibold text-foreground mb-3">ویژگی‌های کلیدی</h3>
          <ul className="space-y-2">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-4 pt-4">
          <Link href="/contact">
            <Button size="lg" className="gap-2 bg-orange-600 hover:bg-orange-700 text-white">
              <Phone className="h-4 w-4" />
              درخواست قیمت
            </Button>
          </Link>
          <Link href="/products">
            <Button variant="outline" size="lg">
              مشاهده محصولات دیگر
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}