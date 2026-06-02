// src/lib/validations/settingSchema.ts
import { z } from "zod";

export const settingSchema = z.object({
  key: z.string().min(1, "Key required").max(100),
  value: z.any(),
  group: z.string().min(1).max(50).default("general"),
  description: z.string().max(500).optional(),
  isPublic: z.boolean().default(false),
});

export const settingsBatchSchema = z.record(z.string(), z.any());

export const settingQuerySchema = z.object({
  group: z.string().optional(),
  isPublic: z.enum(["true", "false"]).optional().transform(v => v === "true"),
});

export type SettingInput = z.infer<typeof settingSchema>;
export type SettingsBatchInput = z.infer<typeof settingsBatchSchema>;
export type SettingQueryInput = z.infer<typeof settingQuerySchema>;