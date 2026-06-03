// src/app/(public)/services/page.tsx
import { ServicesHero } from "@/components/sections/services/ServicesHero";
import { ServicesGrid } from "@/components/sections/services/ServicesGrid";
import { ServicesCTA } from "@/components/sections/services/ServicesCTA";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "خدمات | شرکت نفت و گاز",
  description:
    "مشاهده طیف کاملی از خدمات نفت و گاز شامل اکتشاف، پالایش، لجستیک، پتروشیمی و خدمات فنی.",
};

export default function ServicesPage() {
  return (
    <main className="relative overflow-hidden">
      <ServicesHero />
      <ServicesGrid />
      <ServicesCTA />
    </main>
  );
}