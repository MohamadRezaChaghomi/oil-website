// src/lib/validations/categorySchema.ts
import { z } from "zod";
import mongoose from "mongoose";

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const createCategorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name too long"),
  slug: z.string()
    .min(2, "Slug too short")
    .max(50, "Slug too long")
    .regex(slugRegex, "Invalid slug format"),
  description: z.string().max(200).optional(),
  type: z.enum(["product", "article"]),
  parentId: z.string().nullable().optional().transform(val => 
    val && mongoose.Types.ObjectId.isValid(val) ? new mongoose.Types.ObjectId(val) : null
  ),
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