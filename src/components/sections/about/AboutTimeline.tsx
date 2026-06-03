// src/components/sections/about/AboutTimeline.tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Engineering,
  Factory,
  Public,
  Biotech,
  Timeline,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";

const milestones = [
  {
    year: "۱۹۹۸",
    title: "تاسیس شرکت",
    description:
      "شروع فعالیت با تمرکز بر خدمات مشاوره‌ای و مهندسی در صنعت نفت و گاز.",
    icon: Engineering,
    color: "text-blue-600 dark:text-white",
    bg: "bg-blue-100 dark:bg-blue-500/20",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    year: "۲۰۰۵",
    title: "ورود به حوزه پتروشیمی",
    description:
      "توسعه سبد خدمات و محصولات با ورود به صنایع پتروشیمی و پالایشگاهی.",
    icon: Factory,
    color: "text-orange-600 dark:text-white",
    bg: "bg-orange-100 dark:bg-orange-500/20",
    gradient: "from-orange-500 to-red-400",
  },
  {
    year: "۲۰۱۲",
    title: "گسترش بین‌المللی",
    description: "انجام پروژه‌های فرامرزی و کسب جایگاه در بازارهای منطقه.",
    icon: Public,
    color: "text-green-600 dark:text-white",
    bg: "bg-green-100 dark:bg-green-500/20",
    gradient: "from-green-500 to-emerald-400",
  },
  {
    year: "۲۰۲۰",
    title: "تأسیس مرکز تحقیق و توسعه",
    description:
      "تمرکز بر فناوری‌های نوین و توسعه راهکارهای پایدار برای آینده انرژی.",
    icon: Biotech,
    color: "text-purple-600 dark:text-white",
    bg: "bg-purple-100 dark:bg-purple-500/20",
    gradient: "from-purple-500 to-pink-400",
  },
];

export function AboutTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: mobileLineProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const mobileLineHeight = useTransform(mobileLineProgress, [0, 1], ["0%", "100%"]);

  const { scrollXProgress } = useScroll({
    container: scrollContainerRef,
    offset: ["start end", "end start"],
  });
  const railWidth = useTransform(scrollXProgress, [0, 1], ["0%", "100%"]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <style jsx>{`
        /* استایل اسکرول بار افقی */
        .horizontal-scroll {
          overflow-x: auto;
          scrollbar-width: thin;
          scrollbar-color: var(--secondary) var(--border);
        }
        .horizontal-scroll::-webkit-scrollbar {
          height: 6px;
        }
        .horizontal-scroll::-webkit-scrollbar-track {
          background: var(--border);
          border-radius: 10px;
        }
        .horizontal-scroll::-webkit-scrollbar-thumb {
          background: var(--secondary);
          border-radius: 10px;
        }
        .horizontal-scroll::-webkit-scrollbar-thumb:hover {
          background: var(--primary);
        }
      `}</style>

      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-card/20 overflow-hidden">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Timeline className="h-4 w-4" />
              <span>تاریخچه</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              نشانه‌های موفقیت
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-6 mb-6 rounded-full" />
            <p className="text-muted-foreground text-lg">
              مروری بر دستاوردهای مهم شرکت در طول سال‌های فعالیت
            </p>
          </div>

          {/* ========== DESKTOP VERSION (Horizontal Rail) ========== */}
          <div className="hidden md:block relative group">
            {/* نوار ریل افقی و انیمیشن پیشرفت */}
            <div className="relative w-full mb-12">
              <div className="h-1.5 bg-border/50 rounded-full w-full" />
              <motion.div
                className="absolute top-0 left-0 h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full"
                style={{ width: railWidth }}
              />
              {milestones.map((_, idx) => (
                <div
                  key={idx}
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-secondary shadow-md ring-2 ring-secondary/30"
                  style={{
                    left: `${(idx + 1) * (100 / (milestones.length + 1))}%`,
                  }}
                />
              ))}
            </div>

            {/* دکمه‌های اسکرول با aria-label */}
            <button
              onClick={() => scroll("left")}
              aria-label="اسکرول به چپ"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card border border-border shadow-md flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="اسکرول به راست"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card border border-border shadow-md flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div
              ref={scrollContainerRef}
              className="horizontal-scroll flex gap-6 pb-8 scroll-smooth snap-x snap-mandatory"
            >
              {milestones.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.year}
                    className="flex-shrink-0 w-[320px] snap-start group/card"
                  >
                    <div className="relative bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <div
                        className={`absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl bg-gradient-to-r ${item.gradient}`}
                      />
                      <div className="relative z-10 pt-2">
                        <div className="text-4xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
                          {item.year}
                        </div>
                        <div
                          className={`w-14 h-14 rounded-xl ${item.bg} flex items-center justify-center mb-4 group-hover/card:scale-110 transition-transform`}
                        >
                          <Icon className={`h-7 w-7 ${item.color}`} />
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {item.description}
                        </p>
                        <div className="mt-4 w-12 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full group-hover/card:w-20 transition-all" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ========== MOBILE VERSION (Vertical Timeline) ========== */}
          <div className="md:hidden relative max-w-lg mx-auto" ref={containerRef}>
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border/50 rounded-full">
              <motion.div
                className="absolute top-0 left-0 right-0 bg-gradient-to-b from-primary to-secondary rounded-full"
                style={{ height: mobileLineHeight }}
              />
            </div>

            <div className="space-y-8">
              {milestones.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.4 }}
                    viewport={{ once: true }}
                    className="relative mr-12"
                  >
                    <div className="absolute -right-12 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-secondary ring-4 ring-secondary/30 z-10 shadow-md" />
                    <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-5 border border-border/50 shadow-md hover:shadow-lg transition-all">
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center`}
                        >
                          <Icon className={`h-5 w-5 ${item.color}`} />
                        </div>
                        <div className="text-2xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                          {item.year}
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-1">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}