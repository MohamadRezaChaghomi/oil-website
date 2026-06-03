// src/components/sections/terms/TermsContent.tsx
"use client";

import { FileText, Scale, Shield, AlertCircle, Users, ExternalLink } from "lucide-react";
import { TermsSection } from "./TermsSection";

const termsSections = [
  {
    title: "پذیرش شرایط",
    icon: <FileText className="h-5 w-5" />,
    content: [
      "استفاده از وب‌سایت شرکت نفت و گاز به معنای پذیرش کامل این شرایط است. اگر با هر یک از این شرایط موافق نیستید، لطفاً از این وب‌سایت استفاده نکنید.",
      "ما حق داریم این شرایط را در هر زمان بدون اطلاع قبلی تغییر دهیم. ادامه استفاده از سایت پس از اعمال تغییرات به معنای پذیرش آنهاست.",
    ],
  },
  {
    title: "مالکیت فکری",
    icon: <Scale className="h-5 w-5" />,
    content: [
      "تمامی محتواهای این وب‌سایت (متن، تصاویر، لوگوها، آیکون‌ها، نرم‌افزار) متعلق به شرکت نفت و گاز است و توسط قوانین مالکیت فکری محافظت می‌شود.",
      "کپی، بازتولید، توزیع یا استفاده تجاری از محتوا بدون کسب مجوز کتبی ممنوع است.",
    ],
  },
  {
    title: "مسئولیت کاربران",
    icon: <Users className="h-5 w-5" />,
    content: [
      "کاربران مسئول حفظ محرمانه بودن اطلاعات حساب کاربری خود هستند.",
      "هرگونه فعالیتی که از طریق حساب کاربری شما انجام شود، به عهده شماست.",
      "استفاده از سایت برای اهداف غیرقانونی یا نقض حقوق دیگران ممنوع است.",
    ],
  },
  {
    title: "محدودیت مسئولیت",
    icon: <Shield className="h-5 w-5" />,
    content: [
      "شرکت نفت و گاز در قبال خسارات مستقیم، غیرمستقیم، تبعی یا تنبیهی ناشی از استفاده یا عدم توانایی استفاده از سایت مسئول نیست.",
      "ما دقت اطلاعات را تضمین نمی‌کنیم، هرچند تلاش می‌کنیم اطلاعات دقیق و به‌روز ارائه دهیم.",
    ],
  },
  {
    title: "لینک‌های خارجی",
    icon: <ExternalLink className="h-5 w-5" />,
    content: [
      "این سایت ممکن است حاوی لینک به وب‌سایت‌های خارجی باشد. ما مسئولیتی در قبال محتوا یا عملکرد آن سایت‌ها نداریم.",
      "وجود لینک به معنای تأیید محتوای آن سایت توسط ما نیست.",
    ],
  },
  {
    title: "قوانین حاکم",
    icon: <AlertCircle className="h-5 w-5" />,
    content: [
      "این شرایط توسط قوانین جمهوری اسلامی ایران تفسیر و اجرا می‌شود.",
      "هرگونه اختلاف ناشی از این شرایط در دادگاه‌های تهران حل و فصل خواهد شد.",
    ],
  },
];

/**
 * Terms of use content with clean layout, no heavy card border, smaller readable text
 */
export function TermsContent() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Intro without card */}
      <p className="text-base text-muted-foreground leading-relaxed">
        به وب‌سایت شرکت نفت و گاز خوش آمدید. با دسترسی و استفاده از این وب‌سایت، شما موافقت می‌کنید که به شرایط و ضوابط زیر پایبند باشید. لطفاً این شرایط را به دقت مطالعه کنید.
      </p>

      {/* Sections with subtle separation line */}
      {termsSections.map((section, idx) => (
        <div key={section.title}>
          {idx > 0 && <div className="border-t border-border/50 my-6" />}
          <TermsSection
            title={section.title}
            icon={section.icon}
            content={section.content}
            index={idx}
          />
        </div>
      ))}

      {/* Changes clause */}
      <div className="border-t border-border/50 pt-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          تغییرات در شرایط استفاده
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          ما ممکن است این شرایط را به‌روزرسانی کنیم. هرگونه تغییر در این صفحه منتشر خواهد شد و در صورت اهمیت، از طریق ایمیل یا اطلاعیه در وب‌سایت به شما اطلاع داده می‌شود. ادامه استفاده از سایت پس از اعمال تغییرات به معنای پذیرش آنهاست.
        </p>
      </div>

      {/* Contact info */}
      <div className="bg-primary/5 rounded-lg p-4 text-center">
        <p className="text-xs text-muted-foreground">
          اگر سوالی در مورد این شرایط دارید، لطفاً با ما تماس بگیرید:
        </p>
        <a
          href="mailto:legal@oilgasco.com"
          className="text-primary hover:underline font-medium text-sm"
        >
          legal@oilgasco.com
        </a>
      </div>
    </div>
  );
}