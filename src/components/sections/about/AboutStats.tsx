// src/components/sections/about/AboutStats.tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { EmojiEvents, Public, People, Schedule } from "@mui/icons-material";

const stats = [
  { label: "سال تجربه", value: 25, suffix: "+", icon: EmojiEvents, color: "from-orange-500 to-orange-300" },
  { label: "پروژه جهانی", value: 150, suffix: "+", icon: Public, color: "from-green-600 to-green-400" },
  { label: "تیم متخصص", value: 500, suffix: "+", icon: People, color: "from-blue-600 to-blue-400" },
  { label: "رضایت مشتری", value: 98, suffix: "%", icon: Schedule, color: "from-purple-600 to-purple-400" },
];

/**
 * Stats section with counter animation and glass cards
 */
export function AboutStats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative -mt-16 z-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="group bg-card/80 backdrop-blur-md rounded-2xl p-6 text-center border border-border/50 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br ${stat.color} text-white mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="h-7 w-7" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                  {isInView ? (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: idx * 0.15 }}
                    >
                      {stat.value}
                      {stat.suffix}
                    </motion.span>
                  ) : (
                    "0"
                  )}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}