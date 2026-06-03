// src/lib/services/productService.ts
import { dbConnect } from "@/lib/db";
import Product, { IProduct } from "@/lib/models/Product";
import {
  createProductSchema,
  updateProductSchema,
  productQuerySchema,
  type CreateProductInput,
  type UpdateProductInput,
  type ProductQueryInput,
} from "@/lib/validations/productSchema";
import { Types } from "mongoose";
import { getCache, setCache, deleteCachePattern } from "@/lib/cache";

type ProductFilter = {
  category?: string;
  isActive?: boolean;
  $or?: Array<{ [key: string]: { $regex: string; $options: string } }>;
};

export interface CachedProductsResult {
  products: Array<{
    _id: string;
    title: string;
    slug: string;
    description: string;
    shortDescription?: string;
    image?: string;
    category: string;
    categoryName: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  }>;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

function toPlainObject(doc: IProduct | null) {
  if (!doc) return null;
  const obj = doc.toObject();
  obj._id = obj._id.toString();
  if (obj.category) obj.category = obj.category.toString();
  return obj;
}

export async function getProducts(query: ProductQueryInput): Promise<CachedProductsResult> {
  await dbConnect();
  const validatedQuery = productQuerySchema.parse(query);
  const cacheKey = `products:${JSON.stringify(validatedQuery)}`;

  const cached = await getCache<CachedProductsResult>(cacheKey);
  if (cached) return cached;

  const { category, isActive, page, limit, search } = validatedQuery;
  const filter: ProductFilter = {};
  if (category) filter.category = category;
  if (isActive !== undefined) filter.isActive = isActive;
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { shortDescription: { $regex: search, $options: "i" } },
    ];
  }

  const skip = (page - 1) * limit;
  const [products, total] = await Promise.all([
    Product.find(filter)
      .populate("category", "name slug")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Product.countDocuments(filter),
  ]);

  // Safe transformation: use any to bypass TypeScript's strict checking after populate
  const safeProducts = products.map((product: any) => {
    const categoryData = product.category as any;
    return {
      ...product,
      _id: product._id.toString(),
      category: categoryData?._id?.toString() || "",
      categoryName: categoryData?.name || "بدون دسته",
      __v: undefined,
    };
  }) as CachedProductsResult["products"];

  const result: CachedProductsResult = {
    products: safeProducts,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };

  await setCache(cacheKey, result, 60);
  return result;
}

export async function getProductBySlug(slug: string) {
  await dbConnect();
  const product = await Product.findOne({ slug })
    .populate("category", "name slug")
    .lean();
  if (!product) return null;
  const categoryData = (product as any).category;
  return {
    ...product,
    _id: product._id.toString(),
    category: categoryData?._id?.toString() || "",
    categoryName: categoryData?.name || "بدون دسته",
    __v: undefined,
  };
}

export async function getProductById(id: string) {
  await dbConnect();
  if (!Types.ObjectId.isValid(id)) return null;
  const product = await Product.findById(id)
    .populate("category", "name slug")
    .lean();
  if (!product) return null;
  const categoryData = (product as any).category;
  return {
    ...product,
    _id: product._id.toString(),
    category: categoryData?._id?.toString() || "",
    categoryName: categoryData?.name || "بدون دسته",
    __v: undefined,
  };
}

export async function createProduct(data: CreateProductInput) {
  await dbConnect();
  const validatedData = createProductSchema.parse(data);
  const existing = await Product.findOne({ slug: validatedData.slug });
  if (existing) throw new Error("Product with this slug already exists");
  const product = await Product.create(validatedData);
  await deleteCachePattern("products:*");
  return toPlainObject(product);
}

export async function updateProduct(id: string, data: UpdateProductInput) {
  await dbConnect();
  if (!Types.ObjectId.isValid(id)) throw new Error("Invalid product ID");
  const validatedData = updateProductSchema.parse(data);
  if (validatedData.slug) {
    const existing = await Product.findOne({ slug: validatedData.slug, _id: { $ne: id } });
    if (existing) throw new Error("Another product with this slug already exists");
  }
  const product = await Product.findByIdAndUpdate(id, validatedData, {
    new: true,
    runValidators: true,
  });
  if (!product) throw new Error("Product not found");
  await deleteCachePattern("products:*");
  return toPlainObject(product);
}

export async function deleteProduct(id: string) {
  await dbConnect();
  if (!Types.ObjectId.isValid(id)) throw new Error("Invalid product ID");
  const product = await Product.findByIdAndDelete(id);
  await deleteCachePattern("products:*");
  return toPlainObject(product);
}

export async function getProductCategories(): Promise<string[]> {
  await dbConnect();
  const categories = await Product.distinct("category", { isActive: true });
  return categories.map((id) => id.toString()).sort();
}