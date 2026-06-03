// src/app/(public)/products/page.tsx
import { ProductsHero } from "@/components/sections/products/ProductsHero";
import { ProductsFilter } from "@/components/sections/products/ProductsFilter";
import { ProductsGrid } from "@/components/sections/products/ProductsGrid";
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

  // Fetch all product categories (for filter display)
  await dbConnect();
  const allCategories = await Category.find({ type: "product", isActive: true })
    .select("name slug")
    .lean();

  // Find selected category by slug to get its ObjectId for filtering
  let categoryId: string | undefined;
  if (categorySlug) {
    const selectedCat = allCategories.find((c) => c.slug === categorySlug);
    if (selectedCat) categoryId = selectedCat._id.toString();
  }

  const query = buildProductQuery({ page, category: categoryId, search });
  const productsResult = await getProducts(query);

  // Prepare categories for filter component (with name and slug)
  const categoriesForFilter = allCategories.map((cat) => ({
    _id: cat._id.toString(),
    name: cat.name,
    slug: cat.slug,
  }));

  const transformed = {
    data: productsResult.products,
    pagination: {
      page: productsResult.page,
      limit: productsResult.limit,
      total: productsResult.total,
      totalPages: productsResult.totalPages,
      hasNext: productsResult.page < productsResult.totalPages,
      hasPrev: productsResult.page > 1,
    },
  };

  const hasProducts = transformed.data.length > 0;

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
              <ProductsGrid products={transformed.data} />
              <ProductsPagination
                currentPage={transformed.pagination.page}
                totalPages={transformed.pagination.totalPages}
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