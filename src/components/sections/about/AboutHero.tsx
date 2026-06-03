// src/components/sections/about/AboutHero.tsx
"use client";

import { motion } from "framer-motion";

export function AboutHero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pt-16 hero-section">
      <div className="absolute inset-0 opacity-20">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="about-hero-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M20 20 L80 20 M20 50 L80 50 M20 80 L80 80" stroke="#E67E22" strokeWidth="1" strokeDasharray="6 6" fill="none" opacity="0.4"/>
              <circle cx="50" cy="35" r="3" fill="#E67E22" opacity="0.5"/>
              <circle cx="30" cy="65" r="2" fill="#2C3E2B" opacity="0.6"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#about-hero-pattern)" />
        </svg>
        <motion.div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl" animate={{ x: [0, 30, -20, 0], y: [0, -20, 10, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute bottom-20 right-10 w-80 h-80 bg-green-500/20 rounded-full blur-3xl" animate={{ x: [0, -30, 20, 0], y: [0, 20, -10, 0] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} />
      </div>

      <div className="container mx-auto px-4 py-16 text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }} className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-orange-300 text-sm font-medium mb-6">
            ۲۵ سال افتخار
          </motion.div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent leading-tight whitespace-normal break-words">
            درباره ما
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            پیشرو در ارائه راهکارهای نوین صنعت نفت، گاز و پتروشیمی با تعهد به توسعه پایدار و فناوری‌های پیشرفته.
          </p>
        </motion.div>

      </div>
    </section>
  );
}