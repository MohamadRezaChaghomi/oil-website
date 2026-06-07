// src/components/layout/Footer.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import {
  LocationOn,
  Phone,
  Email,
  Send,
  Instagram,
  Telegram,
  WhatsApp,
  LinkedIn,
  KeyboardArrowLeft,
} from "@mui/icons-material";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";

// ─── Data ──────────────────────────────────────────────────────────────────
const footerLinks = {
  company: [
    { name: "درباره ما", href: "/about" },
    { name: "تماس با ما", href: "/contact" },
    { name: "وبلاگ", href: "/blog" },
    { name: "فرصت‌های شغلی", href: "/careers" },
  ],
  services: [
    { name: "مشاوره صنعتی", href: "/services/consulting" },
    { name: "تامین تجهیزات", href: "/services/supply" },
    { name: "پشتیبانی فنی", href: "/services/support" },
    { name: "بازرسی و کنترل کیفیت", href: "/services/inspection" },
  ],
};

const socialLinks = [
  { icon: Instagram, href: "#", label: "اینستاگرام" },
  { icon: Telegram, href: "#", label: "تلگرام" },
  { icon: WhatsApp, href: "#", label: "واتساپ" },
  { icon: LinkedIn, href: "#", label: "لینکدین" },
];

const stats = [
  { value: "+۲۰", label: "سال تجربه" },
  { value: "+۵۰۰", label: "پروژه موفق" },
  { value: "+۱۲۰", label: "همکار متخصص" },
  { value: "+۸۰", label: "مشتری فعال" },
];

// ─── Newsletter Form Component ─────────────────────────────────────────────
function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail || status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch("/api/public/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage("با موفقیت عضو شدید!");
        setEmail("");
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
        setMessage(data.error || "خطا در ثبت‌نام");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch {
      setStatus("error");
      setMessage("خطا در ارتباط با سرور");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="آدرس ایمیل شما..."
          disabled={status === "loading"}
          required
          className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
        />
        <button
          type="submit"
          disabled={!isValidEmail || status === "loading"}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
        >
          {status === "loading" ? "..." : <Send className="h-4 w-4" />}
          عضویت
        </button>
      </div>
      {status !== "idle" && (
        <p className={cn("text-xs", status === "success" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400")}>
          {message}
        </p>
      )}
    </form>
  );
}

// ─── Footer Link Item ──────────────────────────────────────────────────────
function FooterLink({ href, name }: { href: string; name: string }) {
  return (
    <li>
      <Link
        href={href}
        className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-all hover:gap-2 hover:text-primary"
      >
        <KeyboardArrowLeft className="h-4 w-4 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
        {name}
      </Link>
    </li>
  );
}

// ─── Main Footer ────────────────────────────────────────────────────────────
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-auto border-t border-border bg-card/80 backdrop-blur-sm">
      {/* Gradient top bar */}
      <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

      {/* Stats Banner */}
      <div className="grid grid-cols-2 gap-0 border-b border-border sm:grid-cols-4">
        {stats.map((stat, idx) => (
          <div
            key={stat.label}
            className={cn(
              "px-4 py-5 text-center",
              idx === 0 && "border-l border-border",
              idx === 2 && "border-l border-border border-t sm:border-t-0",
              idx === 3 && "border-t border-border sm:border-t-0 sm:border-l",
              idx === 1 && "border-l border-border",
              idx === 0 && "sm:border-t-0",
              "even:border-r-0"
            )}
          >
            <div className="text-2xl font-bold text-primary">{stat.value}</div>
            <div className="mt-1 text-xs text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Main Footer Grid */}
      <div className="grid grid-cols-1 gap-0 border-b border-border md:grid-cols-2 lg:grid-cols-4">
        {/* Column 1: Brand + Newsletter */}
        <div className="border-b border-border p-6 md:border-b-0 md:border-l md:p-8">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/30 bg-primary/10">
            <Image src="/images/logo.svg" alt="لوگو" width={32} height={32} />
          </div>
          <div className="mt-2 text-xl font-bold text-foreground">شرکت نفت و گاز</div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground/60">OILGASCO — SINCE 2004</div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            ارائه خدمات تخصصی و محصولات باکیفیت در صنایع نفت، گاز و پتروشیمی با تکیه بر فناوری روز و کادر با تجربه.
          </p>
          <div className="mt-5 text-sm font-semibold text-foreground">عضویت در خبرنامه</div>
          <div className="mt-2">
            <NewsletterForm />
          </div>
        </div>

        {/* Column 2: Company Links */}
        <div className="border-b border-border p-6 md:border-b-0 md:border-l md:p-8">
          <div className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-foreground">
            شرکت
            <span className="h-0.5 w-5 bg-primary rounded-full" />
          </div>
          <ul className="space-y-1">
            {footerLinks.company.map((link) => (
              <FooterLink key={link.name} {...link} />
            ))}
          </ul>
        </div>

        {/* Column 3: Services Links */}
        <div className="border-b border-border p-6 md:border-b-0 md:border-l md:p-8">
          <div className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-foreground">
            خدمات
            <span className="h-0.5 w-5 bg-primary rounded-full" />
          </div>
          <ul className="space-y-1">
            {footerLinks.services.map((link) => (
              <FooterLink key={link.name} {...link} />
            ))}
          </ul>
        </div>

        {/* Column 4: Contact Info */}
        <div className="p-6 md:p-8">
          <div className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-foreground">
            تماس با ما
            <span className="h-0.5 w-5 bg-primary rounded-full" />
          </div>
          <div className="space-y-3">
            <div className="flex gap-3 text-sm">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <LocationOn className="h-4 w-4" />
              </div>
              <span className="text-muted-foreground">تهران، خیابان ولیعصر، پلاک ۱۲۳</span>
            </div>
            <div className="flex gap-3 text-sm">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Phone className="h-4 w-4" />
              </div>
              <a
                href="tel:+982112345678"
                className="text-muted-foreground transition-colors hover:text-primary"
                dir="ltr"
              >
                +98 21 1234 5678
              </a>
            </div>
            <div className="flex gap-3 text-sm">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Email className="h-4 w-4" />
              </div>
              <a
                href="mailto:info@oilgasco.com"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                info@oilgasco.com
              </a>
            </div>
          </div>
          <div className="mt-6 flex gap-2">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-muted/20 text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex flex-col justify-between gap-3 px-6 py-4 text-center text-xs text-muted-foreground/70 md:flex-row md:px-8">
        <span>© {currentYear} شرکت نفت و گاز. تمام حقوق محفوظ است.</span>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-primary transition-colors">حریم خصوصی</Link>
          <Link href="/terms" className="hover:text-primary transition-colors">شرایط استفاده</Link>
          <Link href="/sitemap" className="hover:text-primary transition-colors">نقشه سایت</Link>
        </div>
      </div>
    </footer>
  );
}