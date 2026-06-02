// src/lib/validations/categorySchema.ts
import { z } from "zod";

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const createCategorySchema = z.object({
  name: z.string().min(2, "Name too short").max(50, "Name too long"),
  slug: z.string().min(2).max(50).regex(slugRegex, "Invalid slug format"),
  description: z.string().max(200).optional(),
  type: z.enum(["product", "article"]),
  parentId: z.string().nullable().optional().transform(val => val === "" ? null : val),
  order: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
});

export const updateCategorySchema = createCategorySchema.partial();

export const categoryQuerySchema = z.object({
  type: z.enum(["product", "article"]).optional(),
  isActive: z.enum(["true", "false"]).optional().transform(v => v === "true"),
  parentId: z.string().optional(),
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
export type CategoryQueryInput = z.infer<typeof categoryQuerySchema>;