// src/app/(public)/products/[slug]/page.tsx
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getProductBySlug } from "@/lib/services/productService";
import { ProductDetailHero } from "@/components/sections/products/ProductDetailHero";
import { ProductInfo } from "@/components/sections/products/ProductInfo";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "محصول یافت نشد",
      description: "محصول درخواستی پیدا نشد.",
    };
  }

  return {
    title: `${product.title} | محصولات | شرکت نفت و گاز`,
    description: product.shortDescription || product.description.substring(0, 160),
    openGraph: {
      title: product.title,
      description: product.shortDescription || product.description.substring(0, 160),
      images: product.image ? [product.image] : [],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Structured data for SEO (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.shortDescription || product.description,
    image: product.image || undefined,
    sku: product._id,
    category: product.categoryName || product.category,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="relative overflow-hidden">
        <ProductDetailHero product={product} />
        <section className="py-16 bg-gradient-to-b from-background to-card/20">
          <div className="container mx-auto px-4">
            <ProductInfo product={product} />
          </div>
        </section>
      </main>
    </>
  );
}