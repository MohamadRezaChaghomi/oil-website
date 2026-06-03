// src/components/sections/contact/ContactInfo.tsx
"use client";

import { motion } from "framer-motion";
import { LocationOn, Phone, Email, AccessTime } from "@mui/icons-material";

const contactDetails = [
  {
    icon: LocationOn,
    title: "آدرس",
    description: "تهران، خیابان انرژی، پلاک ۱۲۳، ایران",
    color: "from-blue-500 to-cyan-400",
  },
  {
    icon: Phone,
    title: "تلفن",
    description: "۰۲۱-۱۲۳۴۵۶۷۸",
    color: "from-orange-500 to-red-400",
  },
  {
    icon: Email,
    title: "ایمیل",
    description: "info@oilgasco.com",
    color: "from-green-500 to-emerald-400",
  },
  {
    icon: AccessTime,
    title: "ساعت کاری",
    description: "شنبه تا چهارشنبه: ۹:۰۰ تا ۱۷:۰۰",
    color: "from-purple-500 to-pink-400",
  },
];

/**
 * Contact information cards with glassmorphism and hover effects
 */
export function ContactInfo() {
  return (
    <div className="space-y-6">
      {contactDetails.map((item, idx) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="group bg-card/60 backdrop-blur-sm rounded-2xl p-6 border border-border/50 shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} bg-opacity-20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="text-muted-foreground text-sm mt-1">{item.description}</p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}