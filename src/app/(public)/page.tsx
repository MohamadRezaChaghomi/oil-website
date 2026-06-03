import { dbConnect } from "@/lib/db";
import Product from "@/lib/models/Product";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { ServicesSection } from "@/components/sections/home/ServicesSection";
import { ProductsShowcase } from "@/components/sections/home/ProductsShowcase";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "خانه | شرکت نفت و گاز",
  description: "پیشرو در صنعت نفت، گاز و پتروشیمی",
};

export default async function HomePage() {
  await dbConnect();
  const products = await Product.find({ isActive: true })
    .sort({ createdAt: -1 })
    .limit(6)
    .lean(); 

  const plainProducts = products.map((product) => ({
    ...product,
    _id: product._id.toString(),
    category: product.category.toString(),
  }));

  return (
    <main className="overflow-hidden">
      <HeroSection />
      <ServicesSection />
      <ProductsShowcase products={plainProducts} />
    </main>
  );
}