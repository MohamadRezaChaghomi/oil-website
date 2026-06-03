// src/app/admin/page.tsx
import { dbConnect } from "@/lib/db";
import Article from "@/lib/models/Article";
import Product from "@/lib/models/Product";
import Message from "@/lib/models/Message";
import Subscriber from "@/lib/models/Subscriber";
import Category from "@/lib/models/Category";
import { AdminStatsCards } from "@/components/admin/home/AdminStatsCards";
import { AdminCharts } from "@/components/admin/home/AdminCharts";

async function getDashboardData() {
  await dbConnect();

  // دریافت آمار اصلی
  const [articlesCount, productsCount, messagesCount, subscribersCount, categoriesCount] = await Promise.all([
    Article.countDocuments({}),
    Product.countDocuments({ isActive: true }),
    Message.countDocuments({}),
    Subscriber.countDocuments({ isActive: true }),
    Category.countDocuments({ isActive: true }),
  ]);

  // دریافت آمار ماهانه مقالات (برای نمودار)
  const monthlyArticles = await Article.aggregate([
    {
      $match: {
        publishedAt: { $exists: true, $ne: null },
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$publishedAt" },
          month: { $month: "$publishedAt" },
        },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { "_id.year": -1, "_id.month": -1 },
    },
    {
      $limit: 6,
    },
  ]);

  // دریافت آمار ماهانه محصولات
  const monthlyProducts = await Product.aggregate([
    {
      $match: {
        createdAt: { $exists: true, $ne: null },
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { "_id.year": -1, "_id.month": -1 },
    },
    {
      $limit: 6,
    },
  ]);

  // دریافت آمار وضعیت پیام‌ها
  const messageStatus = await Message.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  // تبدیل به فرمت مناسب برای نمودارها
  const monthlyArticlesData = monthlyArticles.reverse().map((item: any) => ({
    month: `${item._id.year}/${item._id.month}`,
    count: item.count,
  }));

  const monthlyProductsData = monthlyProducts.reverse().map((item: any) => ({
    month: `${item._id.year}/${item._id.month}`,
    count: item.count,
  }));

  const messageStatusData = messageStatus.map((item: any) => ({
    name: item._id === "pending" ? "در انتظار" : item._id === "read" ? "خوانده شده" : "پاسخ داده شده",
    value: item.count,
  }));

  return {
    stats: {
      articlesCount,
      productsCount,
      messagesCount,
      subscribersCount,
      categoriesCount,
    },
    charts: {
      monthlyArticles: monthlyArticlesData,
      monthlyProducts: monthlyProductsData,
      messageStatus: messageStatusData,
    },
  };
}

export default async function AdminDashboard() {
  const { stats, charts } = await getDashboardData();

  return (
    <>
      {/* کارت‌های آمار */}
      <AdminStatsCards stats={stats} />

      {/* نمودارها */}
      <AdminCharts charts={charts} />
    </>
  );
}