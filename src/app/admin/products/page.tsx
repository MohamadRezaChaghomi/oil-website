// src/app/admin/products/page.tsx
import { dbConnect } from "@/lib/db";
import Product from "@/lib/models/Product";
import Category from "@/lib/models/Category";
import { ProductsTable } from "@/components/admin/products/ProductsTable";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Add } from "@mui/icons-material";

async function getProducts() {
  await dbConnect();
  const products = await Product.find({})
    .populate("category", "name")
    .sort({ createdAt: -1 })
    .lean();
  return products.map((product: any) => ({
    _id: product._id.toString(),
    title: product.title,
    slug: product.slug,
    categoryName: product.category?.name || "بدون دسته",
    isActive: product.isActive,
    createdAt: product.createdAt,
  }));
}

export default async function AdminProductsPage() {
  const products = await getProducts();

  const actionButton = (
    <Link href="/admin/products/new">
      <Button className="gap-2 bg-orange-600 hover:bg-orange-700 text-white">
        <Add className="h-4 w-4" />
        محصول جدید
      </Button>
    </Link>
  );

  return (
    <div>
      <AdminPageHeader
        title="مدیریت محصولات"
        description="لیست تمام محصولات (فعال و غیرفعال)"
        action={actionButton}
      />
      <div className="bg-card/60 backdrop-blur-sm rounded-2xl border border-border/50 p-4 shadow-sm">
        <ProductsTable products={products} />
      </div>
    </div>
  );
}