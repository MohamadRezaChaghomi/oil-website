// src/components/layout/Footer.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  LocationOn,
  Phone,
  Email,
  Send,
  Twitter,
  Instagram,
  Telegram,
  WhatsApp,
} from "@mui/icons-material";
import { Button } from "@/components/ui/Button";
import { useState, useEffect } from "react";

const footerLinks = {
  company: [
    { name: "درباره ما", href: "/about" },
    { name: "تماس با ما", href: "/contact" },
    { name: "وبلاگ", href: "/blog" },
  ],
  services: [
    { name: "مشاوره صنعتی", href: "/services/consulting" },
    { name: "تامین تجهیزات", href: "/services/equipment" },
    { name: "پشتیبانی فنی", href: "/services/support" },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(email));
  }, [email]);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmailValid || status === "loading") return;
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
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
        setMessage(data.error || "خطا در ثبت‌نام");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch {
      setStatus("error");
      setMessage("خطا در ارتباط با سرور");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <footer className="relative bg-card border-t border-border mt-auto overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="footer-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M20 20 L80 20 M20 50 L80 50 M20 80 L80 80" stroke="#E67E22" strokeWidth="1" strokeDasharray="6 6" fill="none" opacity="0.3"/>
              <circle cx="50" cy="35" r="3" fill="#E67E22" opacity="0.4"/>
              <circle cx="30" cy="65" r="2" fill="#2C3E2B" opacity="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-pattern)" />
        </svg>
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand & Newsletter */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/logo.svg"
                alt="شرکت نفت و گاز"
                width={40}
                height={40}
                className="h-10 w-auto object-contain drop-shadow-sm"
              />
              <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-secondary drop-shadow-sm">
                شرکت نفت و گاز
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              ارائه خدمات تخصصی و محصولات باکیفیت در صنایع نفت، گاز و پتروشیمی با تکیه بر فناوری روز و کادربا تجربه.
            </p>
            <div className="pt-4">
              <h4 className="font-semibold text-foreground mb-2">خبرنامه</h4>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="ایمیل شما"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    disabled={status === "loading"}
                  />
                  <Button
                    type="submit"
                    size="sm"
                    className="gap-1"
                    disabled={!isEmailValid || status === "loading"}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                {status !== "idle" && (
                  <p className={`text-xs ${status === "success" ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400"}`}>
                    {message}
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-foreground">شرکت</h4>
            <ul className="space-y-2 text-sm">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-foreground">خدمات</h4>
            <ul className="space-y-2 text-sm">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-foreground">تماس با ما</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <LocationOn className="h-4 w-4 text-muted-foreground" />
                <span>تهران، خیابان ولیعصر، پلاک ۱۲۳</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span dir="ltr">+98 21 1234 5678</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Email className="h-4 w-4 text-muted-foreground" />
                <a href="mailto:info@oilgasco.com" className="hover:text-primary transition-colors">
                  info@oilgasco.com
                </a>
              </li>
            </ul>
            <div className="flex flex-wrap gap-4 mt-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://x.com/yourcompany"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (توئیتر)"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://instagram.com/yourcompany"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="اینستاگرام"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://t.me/yourcompany"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="تلگرام"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Telegram className="h-5 w-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://wa.me/989123456789"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="واتساپ"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <WhatsApp className="h-5 w-5" />
              </motion.a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-muted-foreground">
          <span>© {currentYear} شرکت نفت و گاز. تمام حقوق محفوظ است.</span>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-primary transition-colors">حریم خصوصی</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">شرایط استفاده</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}