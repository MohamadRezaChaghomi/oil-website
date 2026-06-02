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
  description: "ارائه خدمات تخصصی و محصولات باکیفیت در صنایع نفت، گاز و پتروشیمی با تکیه بر فناوری روز و کادربا تجربه",
  keywords: ["نفت", "گاز", "پتروشیمی", "انرژی", "حفاری", "پالایشگاه", "مشاوره صنعتی"],
  authors: [{ name: "شرکت نفت و گاز" }],
  openGraph: {
    title: "شرکت نفت و گاز | پیشرو در صنعت انرژی",
    description: "خدمات تخصصی نفت، گاز و پتروشیمی",
    url: siteUrl,
    siteName: "شرکت نفت و گاز",
    locale: "fa_IR",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "شرکت نفت و گاز" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "شرکت نفت و گاز",
    description: "خدمات تخصصی نفت، گاز و پتروشیمی",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large" },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
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