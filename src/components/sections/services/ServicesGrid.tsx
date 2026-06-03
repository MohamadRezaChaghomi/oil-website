// src/components/sections/services/ServicesGrid.tsx
"use client";

import { motion } from "framer-motion";
import {
  Droplets,
  Factory,
  ShieldCheck,
  Globe,
  Truck,
  FlaskRound,
  Users,
  Package,
  Wrench,
} from "lucide-react";

const services = [
  {
    title: "اکتشاف نفت و گاز",
    description:
      "مطالعات زمین‌شناسی پیشرفته و تکنیک‌های اکتشاف برای شناسایی و ارزیابی ذخایر جدید هیدروکربنی با حداقل اثرات زیست‌محیطی.",
    icon: Droplets,
    features: [
      "جمع‌آوری و پردازش داده‌های لرزه‌ای",
      "مدل‌سازی و شبیه‌سازی مخازن",
      "برنامه‌ریزی چاه و بهینه‌سازی حفاری",
    ],
    color: "from-blue-500 to-cyan-400",
  },
  {
    title: "پالایش و فرآوری",
    description:
      "تاسیسات پالایشگاهی پیشرفته با تولید محصولات نفتی با کیفیت بالا مطابق با استانداردهای بین‌المللی.",
    icon: Factory,
    features: [
      "تقطیر و فرآوری نفت خام",
      "کنترل کیفیت و صدور گواهینامه محصولات",
      "نگهداری و ارتقای پالایشگاه",
    ],
    color: "from-orange-500 to-red-400",
  },
  {
    title: "ایمنی و انطباق",
    description:
      "پروتکل‌های پیشرو در صنعت ایمنی و خدمات انطباق مقررات برای تضمین عملیات مسئولانه.",
    icon: ShieldCheck,
    features: [
      "سیستم‌های مدیریت HSE",
      "ارزیابی اثرات زیست‌محیطی",
      "بازرسی‌های انطباق مقررات",
    ],
    color: "from-green-500 to-emerald-400",
  },
  {
    title: "لجستیک جهانی",
    description:
      "زنجیره تأمین کارآمد و شبکه توزیع متصل‌کننده تولیدکنندگان به بازارهای جهانی.",
    icon: Globe,
    features: [
      "حمل‌ونقل دریایی و زمینی",
      "مدیریت انبار و پایانه",
      "ترخیص گمرکی و مستندسازی",
    ],
    color: "from-purple-500 to-pink-400",
  },
  {
    title: "پتروشیمی",
    description:
      "تولید و تأمین محصولات پتروشیمی برای کاربردهای مختلف صنعتی.",
    icon: FlaskRound,
    features: [
      "تولید پلیمر و مواد شیمیایی",
      "فرمولاسیون مواد شیمیایی تخصصی",
      "تحویل فله و بسته‌بندی",
    ],
    color: "from-rose-500 to-red-400",
  },
  {
    title: "خدمات فنی",
    description:
      "پشتیبانی فنی تخصصی و خدمات مشاوره در سراسر چرخه عمر پروژه.",
    icon: Truck,
    features: [
      "بازرسی و آزمایش میدانی",
      "نگهداری و تعمیر تجهیزات",
      "آموزش و انتقال دانش",
    ],
    color: "from-slate-500 to-gray-400",
  },
  {
    title: "مشاوره صنعتی",
    description:
      "ارائه مشاوره تخصصی در زمینه بهینه‌سازی فرآیندها، مدیریت پروژه و کاهش هزینه‌ها در صنعت نفت و گاز.",
    icon: Users,
    features: [
      "مطالعات امکان‌سنجی و بهره‌وری",
      "مدیریت ریسک و ارزیابی فنی",
      "بهبود فرآیندهای تولید",
    ],
    color: "from-indigo-500 to-blue-400",
  },
  {
    title: "تامین تجهیزات",
    description:
      "تامین و توزیع تجهیزات صنعتی استاندارد شامل لوله، اتصالات، شیرآلات و ماشین‌آلات حفاری.",
    icon: Package,
    features: [
      "تجهیزات حفاری و دکل‌های نفتی",
      "لوله و اتصالات صنعتی",
      "قطعات یدکی و ابزارآلات تخصصی",
    ],
    color: "from-teal-500 to-cyan-400",
  },
  {
    title: "پشتیبانی فنی",
    description:
      "ارائه خدمات پشتیبانی ۲۴ ساعته، نگهداری و تعمیرات تجهیزات و آموزش پرسنل فنی.",
    icon: Wrench,
    features: [
      "نگهداری و تعمیرات پیشگیرانه",
      "عیب‌یابی و رفع خرابی",
      "آموزش تخصصی اپراتورها",
    ],
    color: "from-yellow-600 to-orange-500",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function ServicesGrid() {
  return (
    <div className="container mx-auto px-4 max-w-7xl">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
      >
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.title}
              variants={cardVariants}
              className="group relative bg-card/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-border/50 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
            >
              {/* Colored top bar */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${service.color}`} />
              
              <div className="relative z-10 p-6 flex flex-col flex-1">
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} bg-opacity-20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="h-7 w-7 text-white" />
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2">
                  {service.title}
                </h3>
                
                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                  {service.description}
                </p>
                
                {/* Features list */}
                <ul className="space-y-2 mt-auto">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="text-secondary text-base shrink-0">✓</span>
                      <span className="line-clamp-1">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}