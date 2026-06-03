// src/app/(public)/contact/page.tsx
"use client";

import { ContactHero } from "@/components/sections/contact/ContactHero";
import { ContactInfo } from "@/components/sections/contact/ContactInfo";
import { ContactForm } from "@/components/sections/contact/ContactForm";

export default function ContactPage() {
  return (
    <main className="relative overflow-hidden">
      <ContactHero />
      <section className="py-20 bg-gradient-to-b from-background to-card/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <ContactInfo />
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}