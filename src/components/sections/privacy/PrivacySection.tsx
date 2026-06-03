// src/components/sections/privacy/PrivacySection.tsx
"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface PrivacySectionProps {
  title: string;
  icon: ReactNode;
  content: string[];
  index: number;
}

/**
 * Single privacy section with icon, title and paragraphs
 */
export function PrivacySection({ title, icon, content, index }: PrivacySectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="space-y-3"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
          {icon}
        </div>
        <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      </div>
      <div className="space-y-2 pr-4">
        {content.map((paragraph, idx) => (
          <p key={idx} className="text-sm text-muted-foreground leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </motion.div>
  );
}