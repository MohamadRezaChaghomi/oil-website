// src/components/sections/about/AboutCoreValues.tsx
"use client";

import { motion } from "framer-motion";
import { Shield, Lightbulb, Handshake } from "@mui/icons-material";

const values = [
  {
    title: "ایمنی اولویت اول",
    description: "تعهدی بی‌چون و چرا به سلامت و ایمنی کارکنان و محیط زیست.",
    icon: Shield,
    color: "from-red-500 to-orange-500",
  },
  {
    title: "نوآوری مستمر",
    description: "پذیرش مداوم فناوری‌های پیشرفته برای بهبود کارایی و کاهش اثرات زیست‌محیطی.",
    icon: Lightbulb,
    color: "from-yellow-500 to-amber-500",
  },
  {
    title: "شفافیت و اعتماد",
    description: "مدیریت کسب‌وکار با شفافیت، صداقت و مسئولیت اخلاقی.",
    icon: Handshake,
    color: "from-blue-500 to-cyan-500",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/**
 * Core values section with 3 animated cards and gradient icons
 */
export function AboutCoreValues() {
  return (
    <section className="py-20 bg-accent/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">ارزش‌های اصلی ما</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 mb-6 rounded-full" />
          <p className="text-muted-foreground text-lg">
            اصولی که ما را هدایت می‌کند و پایه‌های کسب‌وکار ما را تشکیل می‌دهند.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {values.map((value, idx) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                variants={itemVariants}
                className="group bg-card rounded-2xl p-8 text-center border border-border/50 shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${value.color} text-white mb-5 group-hover:scale-110 transition-transform shadow-lg`}>
                  <Icon className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}