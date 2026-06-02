// src/components/sections/HeroSection.tsx
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowForward, OilBarrel, Factory, TrendingUp } from "@mui/icons-material";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pt-16 hero-section">
      {/* Animated background - pipelines and oil drops */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-40 h-40 border-4 border-orange-500/30 rounded-full animate-pulse" />
        <div className="absolute bottom-20 right-20 w-64 h-64 border-4 border-orange-500/20 rounded-full animate-ping" />
        <div className="absolute top-1/3 left-1/2 w-96 h-96 bg-gradient-to-r from-orange-500/10 to-transparent rounded-full blur-3xl animate-float" />
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="pipeline" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M20 20 L60 20 M20 40 L60 40 M20 60 L60 60" stroke="#f97316" strokeWidth="1.5" strokeDasharray="4 4" fill="none" opacity="0.2"/>
              <circle cx="40" cy="70" r="4" fill="#f97316" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pipeline)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">
                انرژی برای فردا
              </span>
            </h1>
            <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
              پیشرو در ارائه راهکارهای نوین صنعت نفت، گاز و پتروشیمی با تعهد به توسعه پایدار و فناوری‌های پیشرفته.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" className="gap-2 bg-orange-600 hover:bg-orange-700 text-white">
                  محصولات ما
                  <ArrowForward className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  مشاوره رایگان
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Key stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-20"
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
              <OilBarrel className="h-8 w-8 text-orange-400 mx-auto" />
              <div className="text-2xl font-bold mt-2">+۱۰۰</div>
              <div className="text-sm text-gray-300">پروژه موفق</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
              <Factory className="h-8 w-8 text-orange-400 mx-auto" />
              <div className="text-2xl font-bold mt-2">+۵۰</div>
              <div className="text-sm text-gray-300">همکار صنعتی</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
              <TrendingUp className="h-8 w-8 text-orange-400 mx-auto" />
              <div className="text-2xl font-bold mt-2">۲۰ سال</div>
              <div className="text-sm text-gray-300">تجربه</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-orange-400 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-orange-400 rounded-full mt-2 animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
}