// src/components/sections/services/ServicesCTA.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowForward, SupportAgent } from "@mui/icons-material";

export function ServicesCTA() {
  return (
    <section className="py-16 mb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary/10 to-secondary/10 p-8 md:p-12 text-center border border-primary/20"
        >
          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/20 text-secondary mb-6"
            >
              <SupportAgent className="h-8 w-8" />
            </motion.div>
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
              نیاز به راه‌حل سفارشی دارید؟
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-lg">
              بیایید در مورد چگونگی برآورده کردن نیازهای خاص شما با تخصص ما صحبت کنیم.
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-all shadow-lg hover:shadow-xl text-lg font-semibold"
              >
                درخواست مشاوره
                <ArrowForward className="h-5 w-5" />
              </motion.button>
            </Link>
          </div>
          <div className="absolute top-0 left-0 w-40 h-40 bg-secondary/20 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-primary/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
        </motion.div>
      </div>
    </section>
  );
}