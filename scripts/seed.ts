// scripts/seed.ts
import "dotenv/config"; // بارگذاری متغیرهای محیطی از .env.local
import mongoose from "mongoose";
import { dbConnect } from "../src/lib/db";
import Category from "../src/lib/models/Category";
import Product from "../src/lib/models/Product";
import Article from "../src/lib/models/Article";
// اگر فایل Setting.ts وجود ندارد، این خط را کامنت کنید
// import Setting from "../src/lib/models/Setting";

const seedData = async () => {
  try {
    await dbConnect();
    console.log("✅ Connected to MongoDB");

    // پاک کردن داده‌های قبلی (اختیاری)
    await Category.deleteMany({});
    await Product.deleteMany({});
    await Article.deleteMany({});
    // await Setting.deleteMany({}); // در صورت نیاز فعال کنید
    console.log("🗑 Cleared existing data");

    // 1. ایجاد دسته‌بندی‌ها
    const categories = await Category.insertMany([
      {
        name: "تجهیزات حفاری",
        slug: "drilling-equipment",
        type: "product",
        order: 1,
        isActive: true,
      },
      {
        name: "لوله و اتصالات",
        slug: "pipes-fittings",
        type: "product",
        order: 2,
        isActive: true,
      },
      {
        name: "اخبار شرکت",
        slug: "company-news",
        type: "article",
        order: 1,
        isActive: true,
      },
      {
        name: "مقالات فنی",
        slug: "technical-articles",
        type: "article",
        order: 2,
        isActive: true,
      },
    ]);
    console.log(`📁 Created ${categories.length} categories`);

    // 2. ایجاد محصولات نمونه
    const products = await Product.insertMany([
      {
        title: "مته حفاری سه‌مخروطی",
        slug: "tri-cone-bit",
        description: "مته حفاری با کیفیت بالا برای سازندهای سخت",
        shortDescription: "مناسب برای حفاری در لایه‌های سخت و نیمه‌سخت",
        image: "/images/products/tricone-bit.jpg",
        category: categories[0]._id,
        isActive: true,
      },
      {
        title: "لوله فولادی ضد زنگ",
        slug: "stainless-steel-pipe",
        description: "لوله‌های فولادی با مقاومت بالا در برابر خوردگی",
        shortDescription: "مقاوم در برابر فشار و دماهای بالا",
        image: "/images/products/steel-pipe.jpg",
        category: categories[1]._id,
        isActive: true,
      },
    ]);
    console.log(`📦 Created ${products.length} products`);

    // 3. ایجاد مقالات نمونه
    const articles = await Article.insertMany([
      {
        title: "روش‌های نوین حفاری دریایی",
        slug: "offshore-drilling-methods",
        excerpt: "بررسی تکنیک‌های مدرن حفاری در آب‌های عمیق",
        content: "محتوای کامل مقاله... می‌توانید متن طولانی را در اینجا وارد کنید.",
        author: "مدیر تحقیق و توسعه",
        category: categories[2]._id,
        isPublished: true,
        publishedAt: new Date(),
      },
      {
        title: "بهبود بهره‌وری در پالایشگاه‌ها",
        slug: "refinery-efficiency",
        excerpt: "راهکارهای عملی برای افزایش بازدهی پالایشگاه‌های نفت",
        content: "محتوای کامل مقاله... توضیحات مفصل درباره بهینه‌سازی فرآیندها.",
        author: "تیم مهندسی",
        category: categories[3]._id,
        isPublished: true,
        publishedAt: new Date(),
      },
    ]);
    console.log(`📝 Created ${articles.length} articles`);

    // 4. (اختیاری) تنظیمات اولیه سایت - در صورت وجود مدل Setting
    // اگر فایل Setting.ts موجود است و می‌خواهید تنظیمات اولیه را ایجاد کنید، بخش زیر را از کامنت خارج کنید
    /*
    await Setting.insertMany([
      { key: "site_name", value: "شرکت نفت و گاز", group: "general", isPublic: true },
      { key: "contact_email", value: "info@oilgasco.com", group: "contact", isPublic: true },
      { key: "phone", value: "+98 21 1234 5678", group: "contact", isPublic: true },
      { key: "address", value: "تهران، خیابان ولیعصر، پلاک ۱۲۳", group: "contact", isPublic: true },
    ]);
    console.log("⚙️ Created settings");
    */

    console.log("🌱 Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedData();