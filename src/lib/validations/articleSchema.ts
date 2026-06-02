// src/lib/validations/articleSchema.ts
import { z } from "zod";

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const createArticleSchema = z.object({
  title: z.string()
    .min(3, "Title must be at least 3 characters")
    .max(120, "Title cannot exceed 120 characters"),
  slug: z.string()
    .min(3, "Slug must be at least 3 characters")
    .max(120, "Slug cannot exceed 120 characters")
    .regex(slugRegex, "Slug must contain only lowercase letters, numbers, and hyphens"),
  excerpt: z.string()
    .min(10, "Excerpt must be at least 10 characters")
    .max(300, "Excerpt cannot exceed 300 characters"),
  content: z.string().min(50, "Content must be at least 50 characters"),
  image: z.string().url("Must be a valid URL").optional().default("/images/placeholder-article.jpg"),
  author: z.string().optional().default("Admin"),
  publishedAt: z.coerce.date().optional(),
  isPublished: z.boolean().default(false),
  viewCount: z.number().int().min(0).default(0),
  category: z.string().min(1, "Category ID is required"), // will be transformed to ObjectId
});

export const updateArticleSchema = createArticleSchema.partial();

export const articleQuerySchema = z.object({
  isPublished: z.enum(["true", "false"]).optional().transform(v => v === "true"),
  page: z.preprocess((val) => Number(val) || 1, z.number().int().positive().default(1)),
  limit: z.preprocess((val) => Number(val) || 10, z.number().int().min(1).max(100).default(10)),
  search: z.string().optional(),
  author: z.string().optional(),
  fromDate: z.preprocess((val) => (val ? new Date(val as string) : undefined), z.date().optional()),
  toDate: z.preprocess((val) => (val ? new Date(val as string) : undefined), z.date().optional()),
  category: z.string().optional(),
});

export type CreateArticleInput = z.infer<typeof createArticleSchema>;
export type UpdateArticleInput = z.infer<typeof updateArticleSchema>;
export type ArticleQueryInput = z.infer<typeof articleQuerySchema>;