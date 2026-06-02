// src/lib/services/productService.ts
import mongoose from "mongoose";
import { dbConnect } from "@/lib/db";
import Product from "@/lib/models/Product";
import {
  createProductSchema,
  updateProductSchema,
  productQuerySchema,
} from "@/lib/validations/productSchema";
import type {
  CreateProductInput,
  UpdateProductInput,
  ProductQueryInput,
} from "@/lib/validations/productSchema";
import { getCache, setCache, deleteCachePattern } from "@/lib/cache";
import { toPlainObject, toPlainObjects } from "@/lib/utils/mongoose";

const PRODUCTS_CACHE_TTL = 60;

export async function getProducts(query: ProductQueryInput) {
  await dbConnect();
  const validatedQuery = productQuerySchema.parse(query);
  const cacheKey = `products:${JSON.stringify(validatedQuery)}`;
  const cached = await getCache(cacheKey);
  if (cached) return cached;

  const { category, isActive, page, limit, search } = validatedQuery;
  const filter: Record<string, unknown> = {};

  if (category && mongoose.Types.ObjectId.isValid(category)) {
    filter.category = new mongoose.Types.ObjectId(category);
  }
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
    Product.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Product.countDocuments(filter),
  ]);

  const result = {
    data: toPlainObjects(products),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNext: page * limit < total,
      hasPrev: page > 1,
    },
  };

  await setCache(cacheKey, result, PRODUCTS_CACHE_TTL);
  return result;
}

export async function getProductBySlug(slug: string) {
  await dbConnect();
  const product = await Product.findOne({ slug }).lean();
  return product ? { ...product, _id: String(product._id) } : null;
}

export async function getProductById(id: string) {
  await dbConnect();
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  const product = await Product.findById(id).lean();
  return product ? { ...product, _id: String(product._id) } : null;
}

export async function createProduct(data: CreateProductInput) {
  await dbConnect();
  const validatedData = createProductSchema.parse(data);
  const categoryId = new mongoose.Types.ObjectId(validatedData.category);
  const existing = await Product.findOne({ slug: validatedData.slug });
  if (existing) throw new Error("Product with this slug already exists");

  const product = await Product.create({
    ...validatedData,
    category: categoryId,
  });
  await deleteCachePattern("products:*");
  return toPlainObject(product);
}

export async function updateProduct(id: string, data: UpdateProductInput) {
  await dbConnect();
  if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid product ID");
  const validatedData = updateProductSchema.parse(data);

  if (validatedData.slug) {
    const existing = await Product.findOne({ slug: validatedData.slug, _id: { $ne: id } });
    if (existing) throw new Error("Another product with this slug already exists");
  }

  const updateData: Record<string, unknown> = {};
  if (validatedData.title !== undefined) updateData.title = validatedData.title;
  if (validatedData.slug !== undefined) updateData.slug = validatedData.slug;
  if (validatedData.description !== undefined) updateData.description = validatedData.description;
  if (validatedData.shortDescription !== undefined) updateData.shortDescription = validatedData.shortDescription;
  if (validatedData.image !== undefined) updateData.image = validatedData.image;
  if (validatedData.isActive !== undefined) updateData.isActive = validatedData.isActive;
  if (validatedData.category !== undefined) {
    if (!mongoose.Types.ObjectId.isValid(validatedData.category)) throw new Error("Invalid category ID");
    updateData.category = new mongoose.Types.ObjectId(validatedData.category);
  }

  const product = await Product.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
  if (!product) throw new Error("Product not found");
  await deleteCachePattern("products:*");
  return toPlainObject(product);
}

export async function deleteProduct(id: string) {
  await dbConnect();
  if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid product ID");
  const product = await Product.findByIdAndDelete(id);
  await deleteCachePattern("products:*");
  return toPlainObject(product);
}

export async function getProductCategories(): Promise<string[]> {
  await dbConnect();
  const categories = await Product.distinct("category", { isActive: true });
  return categories.map((id: unknown) => String(id)).sort();
}