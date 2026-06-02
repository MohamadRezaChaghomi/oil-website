// src/components/sections/about/AboutMissionVision.tsx
"use client";

import { motion } from "framer-motion";
import { Rocket, Visibility } from "@mui/icons-material";

export function AboutMissionVision() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="group relative bg-card/40 backdrop-blur-sm rounded-2xl p-8 border border-border/50 shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                  <Rocket className="h-7 w-7 text-primary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">ماموریت ما</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                ارائه مسئولانه راه‌حل‌های انرژی قابل اعتماد که پیشرفت را تسریع می‌کند، در حالی که ارزش پایدار برای ذی‌نفعان ما ایجاد کرده و از محیط زیست محافظت می‌کند.
              </p>
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="group relative bg-card/40 backdrop-blur-sm rounded-2xl p-8 border border-border/50 shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-secondary/20 flex items-center justify-center group-hover:bg-secondary/30 transition-colors">
                  <Visibility className="h-7 w-7 text-secondary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">چشم‌انداز ما</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                تبدیل شدن به معیار جهانی برای تعالی، نوآوری و پایداری در صنعت نفت و گاز.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}