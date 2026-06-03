// src/app/(public)/privacy/page.tsx
import { Metadata } from "next";
import { PrivacyHero } from "@/components/sections/privacy/PrivacyHero";
import { PrivacyContent } from "@/components/sections/privacy/PrivacyContent";

export const metadata: Metadata = {
  title: "حریم خصوصی | شرکت نفت و گاز",
  description:
    "سیاست‌های حفظ حریم خصوصی و نحوه جمع‌آوری، استفاده و محافظت از اطلاعات شما در وب‌سایت شرکت نفت و گاز.",
};

export default function PrivacyPage() {
  return (
    <main className="relative overflow-hidden">
      <PrivacyHero />
      <section className="py-12 bg-gradient-to-b from-background to-card/20">
        <div className="container mx-auto px-4">
          <PrivacyContent />
        </div>
      </section>
    </main>
  );
}