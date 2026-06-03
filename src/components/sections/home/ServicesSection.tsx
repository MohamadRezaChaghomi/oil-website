// src/components/sections/ServicesSection.tsx
"use client";

import { motion } from "framer-motion";
import {
  Engineering,
  OilBarrel,
  Factory,
  Handshake,
  Security,
  TrendingUp,
} from "@mui/icons-material";

const services = [
  {
    title: "مشاوره صنعتی",
    description: "ارائه راهکارهای تخصصی برای بهینه‌سازی فرآیندهای صنعتی",
    icon: Engineering,
  },
  {
    title: "تامین تجهیزات",
    description: "تامین و توزیع تجهیزات پیشرفته نفت و گاز",
    icon: OilBarrel,
  },
  {
    title: "پالایش و پتروشیمی",
    description: "خدمات تخصصی در حوزه پالایشگاه‌ها و مجتمع‌های پتروشیمی",
    icon: Factory,
  },
  {
    title: "پشتیبانی فنی",
    description: "خدمات نگهداری، تعمیرات و پشتیبانی ۲۴ ساعته",
    icon: Handshake,
  },
  {
    title: "مدیریت ریسک",
    description: "ارزیابی و کاهش ریسک در پروژه‌های صنعتی",
    icon: Security,
  },
  {
    title: "مطالعات بازار",
    description: "تحلیل بازار و فرصت‌های سرمایه‌گذاری در صنعت انرژی",
    icon: TrendingUp,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function ServicesSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background pattern similar to hero */}
      <div className="absolute inset-0 opacity-30">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="service-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="2" fill="#E67E22" opacity="0.3" />
              <path d="M0 30 L60 30 M30 0 L30 60" stroke="#E67E22" strokeWidth="0.5" opacity="0.1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#service-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-foreground"
          >
            خدمات ما
          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 mb-6 rounded-full" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-muted-foreground text-lg"
          >
            با تکیه بر دانش فنی روز و تجربه بین‌المللی، طیف وسیعی از خدمات را به صنعت نفت و گاز ارائه می‌دهیم.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                className="group relative bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}