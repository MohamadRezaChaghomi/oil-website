// src/components/admin/AdminStatsCards.tsx
"use client";

import { motion } from "framer-motion";
import {
  Article,
  Inventory,
  Email,
  Subscriptions,
  Category,
} from "@mui/icons-material";

interface Stats {
  articlesCount: number;
  productsCount: number;
  messagesCount: number;
  subscribersCount: number;
  categoriesCount: number;
}

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  color: string;
  delay: number;
}

const statCards: Omit<StatCardProps, "value" | "delay">[] = [
  { title: "مقالات", icon: Article, color: "from-blue-500 to-blue-400" },
  { title: "محصولات", icon: Inventory, color: "from-orange-500 to-orange-400" },
  { title: "پیام‌ها", icon: Email, color: "from-green-500 to-green-400" },
  { title: "مشترکین", icon: Subscriptions, color: "from-purple-500 to-purple-400" },
  { title: "دسته‌بندی‌ها", icon: Category, color: "from-rose-500 to-rose-400" },
];

function StatCard({ title, value, icon: Icon, color, delay }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="bg-card/60 backdrop-blur-sm rounded-2xl border border-border/50 p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} bg-opacity-20 flex items-center justify-center`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
          {title}
        </span>
      </div>
      <div className="text-3xl font-bold text-foreground">{value.toLocaleString("fa-IR")}</div>
      <p className="text-sm text-muted-foreground mt-1">کل</p>
    </motion.div>
  );
}

interface AdminStatsCardsProps {
  stats: Stats;
}

export function AdminStatsCards({ stats }: AdminStatsCardsProps) {
  const statsArray = [
    { ...statCards[0], value: stats.articlesCount, delay: 0 },
    { ...statCards[1], value: stats.productsCount, delay: 0.05 },
    { ...statCards[2], value: stats.messagesCount, delay: 0.1 },
    { ...statCards[3], value: stats.subscribersCount, delay: 0.15 },
    { ...statCards[4], value: stats.categoriesCount, delay: 0.2 },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
      {statsArray.map((card) => (
        <StatCard key={card.title} {...card} />
      ))}
    </div>
  );
}