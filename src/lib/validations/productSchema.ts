// src/lib/validations/productSchema.ts
import { z } from "zod";

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const createProductSchema = z.object({
  title: z.string().min(3).max(100),
  slug: z.string().min(3).max(100).regex(slugRegex, "Invalid slug format"),
  description: z.string().min(20),
  shortDescription: z.string().max(200).optional(),
  image: z.string().url().optional().default("/images/placeholder-product.jpg"),
  category: z.string().min(1, "Category ID is required"), // تغییر به string برای ObjectId
  isActive: z.boolean().default(true),
});

export const updateProductSchema = createProductSchema.partial();

export const productQuerySchema = z.object({
  category: z.string().optional(),
  isActive: z.enum(["true", "false"]).optional().transform(v => v === "true"),
  page: z.preprocess((val) => Number(val) || 1, z.number().int().positive().default(1)),
  limit: z.preprocess((val) => Number(val) || 10, z.number().int().min(1).max(100).default(10)),
  search: z.string().optional(),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type ProductQueryInput = z.infer<typeof productQuerySchema>;