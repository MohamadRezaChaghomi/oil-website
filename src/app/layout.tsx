// src/app/layout.tsx
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "شرکت نفت و گاز | پیشرو در صنعت انرژی",
    template: "%s | شرکت نفت و گاز",
  },
  description: "ارائه خدمات تخصصی و محصولات باکیفیت در صنایع نفت، گاز و پتروشیمی",
  icons: {
    icon: [
      { url: "/images/favicon.ico", sizes: "any" },
      { url: "/images/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/logo.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/images/apple-touch-icon.png", sizes: "180x180", type: "image/png" }, // در صورت نداشتن فایل، این خط را حذف کنید
    ],
  },
  openGraph: {
    title: "شرکت نفت و گاز | پیشرو در صنعت انرژی",
    description: "ارائه خدمات تخصصی و محصولات باکیفیت در صنایع نفت، گاز و پتروشیمی",
    url: siteUrl,
    siteName: "شرکت نفت و گاز",
    locale: "fa_IR",
    type: "website",
    images: [
      {
        url: "/images/og-image.png", // توصیه می‌شود یک تصویر 1200x630 در این مسیر قرار دهید
        width: 1200,
        height: 630,
        alt: "شرکت نفت و گاز",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "شرکت نفت و گاز | پیشرو در صنعت انرژی",
    description: "ارائه خدمات تخصصی و محصولات باکیفیت در صنایع نفت، گاز و پتروشیمی",
    images: ["/images/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className="antialiased flex min-h-screen flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}