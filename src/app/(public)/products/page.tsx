// src/app/(public)/products/page.tsx
import { ProductsHero } from "@/components/sections/products/ProductsHero";
import { ProductsFilter } from "@/components/sections/products/ProductsFilter";
import { ProductGrid } from "@/components/sections/products/ProductsGrid";
import { ProductsPagination } from "@/components/sections/products/ProductsPagination";
import { ProductsEmptyState } from "@/components/sections/products/ProductsEmptyState";
import { getProducts } from "@/lib/services/productService";
import { dbConnect } from "@/lib/db";
import Category from "@/lib/models/Category";
import { Metadata } from "next";

interface ProductsPageProps {
  searchParams: Promise<{
    page?: string;
    category?: string;
    search?: string;
  }>;
}

export const metadata: Metadata = {
  title: "محصولات | شرکت نفت و گاز",
  description:
    "مشاهده طیف کاملی از محصولات نفت، گاز و پتروشیمی با کیفیت بالا و استانداردهای جهانی.",
};

function buildProductQuery(params: {
  page: number;
  category?: string;
  search?: string;
}) {
  return {
    page: params.page,
    limit: 9,
    category: params.category,
    search: params.search,
    isActive: true,
  };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || "1", 10);
  const categorySlug = params.category || undefined;
  const search = params.search || undefined;

  await dbConnect();
  const allCategories = await Category.find({ type: "product", isActive: true })
    .select("name slug")
    .lean();

  let categoryId: string | undefined;
  if (categorySlug) {
    const selectedCat = allCategories.find((c) => c.slug === categorySlug);
    if (selectedCat) categoryId = selectedCat._id.toString();
  }

  const query = buildProductQuery({ page, category: categoryId, search });
  const productsResult = await getProducts(query);

  const categoriesForFilter = allCategories.map((cat) => ({
    _id: cat._id.toString(),
    name: cat.name,
    slug: cat.slug,
  }));

  const hasProducts = productsResult.products && productsResult.products.length > 0;

  return (
    <main className="relative overflow-hidden">
      <ProductsHero />
      <section className="py-16 bg-gradient-to-b from-background to-card/20">
        <div className="container mx-auto px-4">
          <ProductsFilter
            categories={categoriesForFilter}
            currentCategory={categorySlug}
            currentSearch={search}
          />
          {hasProducts ? (
            <>
              <ProductGrid products={productsResult.products} />
              <ProductsPagination
                currentPage={productsResult.page}
                totalPages={productsResult.totalPages}
                category={categorySlug}
                search={search}
              />
            </>
          ) : (
            <ProductsEmptyState />
          )}
        </div>
      </section>
    </main>
  );
}