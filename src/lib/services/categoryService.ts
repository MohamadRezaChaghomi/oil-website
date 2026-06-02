// src/lib/services/categoryService.ts
import { dbConnect } from "@/lib/db";
import Category from "@/lib/models/Category";
import { Types } from "mongoose";
import { toPlainObject } from "@/lib/utils/mongoose";

export interface CreateCategoryInput {
  name: string;
  slug: string;
  description?: string;
  type: "product" | "article";
  parentId?: string | null;
  order?: number;
  isActive?: boolean;
}

export type UpdateCategoryInput = Partial<CreateCategoryInput>;

export interface CategoryNode {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  type: "product" | "article";
  parentId: string | null;
  order: number;
  isActive: boolean;
  children: CategoryNode[];
}

/**
 * Get all categories, optionally filtered by type and active status.
 */
export async function getCategories(type?: "product" | "article", activeOnly = true) {
  await dbConnect();
  const filter: Record<string, unknown> = {};
  if (type) filter.type = type;
  if (activeOnly) filter.isActive = true;

  const categories = await Category.find(filter).sort({ order: 1, name: 1 }).lean();
  return categories.map((c) => ({
    ...c,
    _id: String(c._id),
    parentId: c.parentId ? String(c.parentId) : null,
  }));
}

/**
 * Get categories as a nested tree structure.
 */
export async function getCategoryTree(type?: "product" | "article"): Promise<CategoryNode[]> {
  const categories = await getCategories(type, true);
  const map = new Map<string, CategoryNode>();
  const roots: CategoryNode[] = [];

  categories.forEach((cat) => {
    map.set(cat._id, { ...cat, children: [] });
  });

  categories.forEach((cat) => {
    const node = map.get(cat._id)!;
    if (cat.parentId && map.has(cat.parentId)) {
      map.get(cat.parentId)!.children.push(node);
    } else {
      roots.push(node);
    }
  });
  return roots;
}

/**
 * Get a single category by slug.
 */
export async function getCategoryBySlug(slug: string) {
  await dbConnect();
  const category = await Category.findOne({ slug }).lean();
  if (!category) return null;
  return {
    ...category,
    _id: String(category._id),
    parentId: category.parentId ? String(category.parentId) : null,
  };
}

/**
 * Get a single category by ID.
 */
export async function getCategoryById(id: string) {
  await dbConnect();
  if (!Types.ObjectId.isValid(id)) return null;
  const category = await Category.findById(id).lean();
  if (!category) return null;
  return {
    ...category,
    _id: String(category._id),
    parentId: category.parentId ? String(category.parentId) : null,
  };
}

/**
 * Create a new category.
 */
export async function createCategory(data: CreateCategoryInput) {
  await dbConnect();
  if (data.parentId && !Types.ObjectId.isValid(data.parentId)) {
    throw new Error("Invalid parent category ID");
  }
  const existing = await Category.findOne({ slug: data.slug });
  if (existing) throw new Error("Category with this slug already exists");

  const categoryData = {
    ...data,
    parentId: data.parentId ? new Types.ObjectId(data.parentId) : null,
    order: data.order ?? 0,
    isActive: data.isActive ?? true,
  };
  const category = await Category.create(categoryData);
  return toPlainObject(category);
}

/**
 * Update an existing category.
 */
export async function updateCategory(id: string, data: UpdateCategoryInput) {
  await dbConnect();
  if (!Types.ObjectId.isValid(id)) throw new Error("Invalid category ID");
  if (data.parentId && !Types.ObjectId.isValid(data.parentId)) throw new Error("Invalid parent category ID");
  if (data.parentId === id) throw new Error("A category cannot be its own parent");

  // Slug uniqueness
  if (data.slug) {
    const existing = await Category.findOne({ slug: data.slug, _id: { $ne: id } });
    if (existing) throw new Error("Another category with this slug already exists");
  }

  const updateData: Record<string, unknown> = { ...data };
  if (data.parentId !== undefined) {
    updateData.parentId = data.parentId ? new Types.ObjectId(data.parentId) : null;
  }

  const category = await Category.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
  if (!category) throw new Error("Category not found");
  return toPlainObject(category);
}

/**
 * Delete a category. Fails if it has subcategories.
 */
export async function deleteCategory(id: string) {
  await dbConnect();
  if (!Types.ObjectId.isValid(id)) throw new Error("Invalid category ID");
  const hasChildren = await Category.exists({ parentId: id });
  if (hasChildren) throw new Error("Cannot delete category with subcategories. Delete or reassign children first.");

  const category = await Category.findByIdAndDelete(id);
  return toPlainObject(category);
}