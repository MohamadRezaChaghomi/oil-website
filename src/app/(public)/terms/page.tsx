// src/app/(public)/terms/page.tsx
import { Metadata } from "next";
import { TermsHero } from "@/components/sections/terms/TermsHero";
import { TermsContent } from "@/components/sections/terms/TermsContent";

export const metadata: Metadata = {
  title: "شرایط استفاده | شرکت نفت و گاز",
  description:
    "شرایط و ضوابط استفاده از وب‌سایت شرکت نفت و گاز - قوانین، مسئولیت‌ها و مالکیت فکری",
};

export default function TermsPage() {
  return (
    <main className="relative overflow-hidden">
      <TermsHero />
      <section className="py-12 bg-gradient-to-b from-background to-card/20">
        <div className="container mx-auto px-4">
          <TermsContent />
        </div>
      </section>
    </main>
  );
}