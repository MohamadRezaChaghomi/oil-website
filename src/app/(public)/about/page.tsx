// src/app/(public)/about/page.tsx
import { AboutHero } from "@/components/sections/about/AboutHero";
import { AboutStats } from "@/components/sections/about/AboutStats";
import { AboutMissionVision } from "@/components/sections/about/AboutMissionVision";
import { AboutCoreValues } from "@/components/sections/about/AboutCoreValues";
import { AboutTimeline } from "@/components/sections/about/AboutTimeline";
import { AboutCTA } from "@/components/sections/about/AboutCTA";

export const metadata = {
  title: "درباره ما | شرکت نفت و گاز",
  description: "با تاریخچه، ماموریت، ارزش‌ها و تعهد شرکت ما به تعالی در صنعت نفت و گاز آشنا شوید.",
};

export default function AboutPage() {
  return (
    <main className="relative overflow-hidden">
      <AboutHero />
      <AboutStats />
      <AboutMissionVision />
      <AboutCoreValues />
      <AboutTimeline />
      <AboutCTA />
    </main>
  );
}