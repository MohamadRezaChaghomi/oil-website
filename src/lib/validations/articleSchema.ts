// src/lib/validations/articleSchema.ts
import { z } from "zod";

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const createArticleSchema = z.object({
  title: z.string().min(3, "Title too short").max(120, "Title too long"),
  slug: z.string().min(3).max(120).regex(slugRegex, "Invalid slug format"),
  excerpt: z.string().min(10).max(300),
  content: z.string().min(50),
  image: z.string().url().optional().default("/images/placeholder-article.jpg"),
  author: z.string().optional().default("Admin"),
  category: z.string().min(1, "Category ID is required"), // اضافه شد
  publishedAt: z.coerce.date().optional(),
  isPublished: z.boolean().default(false),
  viewCount: z.number().int().min(0).default(0),
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
  category: z.string().optional(), // اضافه شد
});

export type CreateArticleInput = z.infer<typeof createArticleSchema>;
export type UpdateArticleInput = z.infer<typeof updateArticleSchema>;
export type ArticleQueryInput = z.infer<typeof articleQuerySchema>;