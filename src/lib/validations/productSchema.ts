// src/lib/validations/productSchema.ts
import { z } from "zod";

// Base schema for common fields
export const productBaseSchema = {
  title: z.string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters"),
  
  slug: z.string()
    .min(3, "Slug must be at least 3 characters")
    .max(100, "Slug cannot exceed 100 characters")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  
  description: z.string()
    .min(20, "Description must be at least 20 characters"),
  
  shortDescription: z.string()
    .max(200, "Short description cannot exceed 200 characters")
    .optional(),
  
  image: z.string()
    .url("Must be a valid URL")
    .optional()
    .default("/images/placeholder-product.jpg"),
  
  category: z.string()
    .min(1, "Category is required"),
  
  isActive: z.boolean()
    .default(true),
};

// Schema for creating a new product
export const createProductSchema = z.object({
  ...productBaseSchema,
});

// Schema for updating an existing product (all fields optional)
export const updateProductSchema = z.object({
  title: productBaseSchema.title.optional(),
  slug: productBaseSchema.slug.optional(),
  description: productBaseSchema.description.optional(),
  shortDescription: productBaseSchema.shortDescription,
  image: productBaseSchema.image,
  category: productBaseSchema.category.optional(),
  isActive: productBaseSchema.isActive.optional(),
});

// Helper to preprocess string to number with default
const toNumberWithDefault = (defaultValue: number) =>
  z.preprocess(
    (val) => (val === undefined || val === "" ? defaultValue : Number(val)),
    z.number().int().positive()
  );

// ✅ Improved isActive preprocessor: accepts boolean OR string "true"/"false"
const isActivePreprocessor = (val: unknown) => {
  if (typeof val === "boolean") return val;
  if (val === "true") return true;
  if (val === "false") return false;
  return undefined;
};

// Schema for product query parameters (filtering, pagination)
export const productQuerySchema = z.object({
  category: z.string().optional(),
  isActive: z.preprocess(isActivePreprocessor, z.boolean().optional()),
  page: toNumberWithDefault(1),
  limit: toNumberWithDefault(10),
  search: z.string().optional(),
});

// Type inference for TypeScript
export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type ProductQueryInput = z.infer<typeof productQuerySchema>;