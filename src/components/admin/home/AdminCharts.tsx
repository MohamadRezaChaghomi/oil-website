// src/components/admin/AdminCharts.tsx
"use client";

import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useTheme } from "next-themes";

interface ChartsData {
  monthlyArticles: Array<{ month: string; count: number }>;
  monthlyProducts: Array<{ month: string; count: number }>;
  messageStatus: Array<{ name: string; value: number }>;
}

interface AdminChartsProps {
  charts: ChartsData;
}

const COLORS = ["#2C3E2B", "#E67E22", "#3b82f6"];

export function AdminCharts({ charts }: AdminChartsProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const axisColor = isDark ? "#94a3b8" : "#64748b";
  const gridColor = isDark ? "#334155" : "#e2e8f0";

  return (
    <>
      {/* نمودار میله‌ای – مقالات و محصولات ماهانه */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="bg-card/60 backdrop-blur-sm rounded-2xl border border-border/50 p-6 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">مقالات ماهانه</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={charts.monthlyArticles}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="month" stroke={axisColor} />
              <YAxis stroke={axisColor} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "#1e293b" : "#ffffff",
                  borderColor: isDark ? "#334155" : "#e2e8f0",
                  color: isDark ? "#f1f5f9" : "#0f172a",
                }}
              />
              <Legend />
              <Bar dataKey="count" name="تعداد مقالات" fill="#2C3E2B" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="bg-card/60 backdrop-blur-sm rounded-2xl border border-border/50 p-6 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">محصولات ماهانه</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={charts.monthlyProducts}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="month" stroke={axisColor} />
              <YAxis stroke={axisColor} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "#1e293b" : "#ffffff",
                  borderColor: isDark ? "#334155" : "#e2e8f0",
                  color: isDark ? "#f1f5f9" : "#0f172a",
                }}
              />
              <Legend />
              <Bar dataKey="count" name="تعداد محصولات" fill="#E67E22" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* نمودار دایره‌ای – وضعیت پیام‌ها */}
      {charts.messageStatus.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="bg-card/60 backdrop-blur-sm rounded-2xl border border-border/50 p-6 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">وضعیت پیام‌ها</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={charts.messageStatus}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
              >
                {charts.messageStatus.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "#1e293b" : "#ffffff",
                  borderColor: isDark ? "#334155" : "#e2e8f0",
                  color: isDark ? "#f1f5f9" : "#0f172a",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      )}
    </>
  );
}