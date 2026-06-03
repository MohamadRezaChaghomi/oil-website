// src/components/sections/privacy/PrivacyContent.tsx
"use client";

import { Database, Eye, Lock, FileText } from "lucide-react";
import { PrivacySection } from "./PrivacySection";

// Data structure for privacy sections
const privacySections = [
  {
    title: "جمع‌آوری اطلاعات",
    icon: <Database className="h-5 w-5" />,
    content: [
      "ما ممکن است اطلاعات شخصی مانند نام، ایمیل، شماره تماس و اطلاعات حرفه‌ای شما را زمانی که فرم‌های تماس، درخواست مشاوره یا ثبت‌نام در خبرنامه را پر می‌کنید، جمع‌آوری کنیم.",
      "همچنین به طور خودکار اطلاعات غیرشخصی مانند نوع مرورگر، سیستم عامل، آدرس IP و صفحات بازدید شده را برای بهبود تجربه کاربری ذخیره می‌کنیم.",
    ],
  },
  {
    title: "استفاده از اطلاعات",
    icon: <Eye className="h-5 w-5" />,
    content: [
      "اطلاعات شما برای پاسخ به درخواست‌ها، ارسال خبرنامه (در صورت تمایل)، بهبود خدمات و تحلیل عملکرد سایت استفاده می‌شود.",
      "ما اطلاعات شما را بدون رضایت شما به اشخاص ثالث نمی‌فروشیم یا اجاره نمی‌دهیم، مگر در موارد قانونی.",
    ],
  },
  {
    title: "حفاظت از اطلاعات",
    icon: <Lock className="h-5 w-5" />,
    content: [
      "ما از پروتکل‌های امنیتی پیشرفته (SSL، رمزنگاری) و روش‌های فیزیکی و الکترونیکی برای محافظت از اطلاعات شما در برابر دسترسی غیرمجاز، تغییر یا افشا استفاده می‌کنیم.",
      "دسترسی به اطلاعات شخصی فقط به کارکنان مجاز که نیاز به دانستن دارند، محدود می‌شود.",
    ],
  },
  {
    title: "کوکی‌ها (Cookies)",
    icon: <FileText className="h-5 w-5" />,
    content: [
      "وب‌سایت ما از کوکی‌ها برای شخصی‌سازی محتوا، به خاطر سپردن تنظیمات و تحلیل ترافیک استفاده می‌کند. شما می‌توانید از طریق تنظیمات مرورگر خود کوکی‌ها را غیرفعال کنید.",
      "غیرفعال کردن کوکی‌ها ممکن است برخی از قابلیت‌های سایت را تحت تأثیر قرار دهد.",
    ],
  },
];

/**
 * Main content component for Privacy page
 * Renders introduction, all sections, and contact info
 */
export function PrivacyContent() {
  return (
    <div className="bg-card/40 backdrop-blur-sm rounded-2xl border border-border/50 shadow-md p-6 md:p-8 space-y-8">
      {/* Introductory paragraph */}
      <p className="text-muted-foreground leading-relaxed">
        شرکت نفت و گاز (در ادامه «ما»، «شرکت» یا «وب‌سایت») به حریم خصوصی کاربران خود احترام می‌گذارد. این سند سیاست حفظ حریم خصوصی توضیح می‌دهد که چه اطلاعاتی جمع‌آوری می‌شود، چگونه از آن استفاده می‌شود و چه گزینه‌هایی در اختیار شماست.
      </p>

      {/* Render each section */}
      {privacySections.map((section, idx) => (
        <PrivacySection
          key={section.title}
          title={section.title}
          icon={section.icon}
          content={section.content}
          index={idx}
        />
      ))}

      {/* Changes and contact */}
      <div className="pt-4 border-t border-border">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          تغییرات در سیاست حریم خصوصی
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          ما ممکن است این سیاست را به‌روزرسانی کنیم. هرگونه تغییر در این صفحه منتشر خواهد شد و در صورت اهمیت، از طریق ایمیل یا اطلاعیه در وب‌سایت به شما اطلاع داده می‌شود.
        </p>
      </div>

      <div className="bg-primary/5 rounded-xl p-4 text-center">
        <p className="text-sm text-muted-foreground">
          اگر سوالی در مورد این سیاست دارید، لطفاً با ما تماس بگیرید:
        </p>
        <a
          href="mailto:privacy@oilgasco.com"
          className="text-primary hover:underline font-medium"
        >
          privacy@oilgasco.com
        </a>
      </div>
    </div>
  );
}