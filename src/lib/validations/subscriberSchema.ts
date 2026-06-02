// src/lib/validations/subscriberSchema.ts
import { z } from "zod";

export const subscribeSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export const subscriberQuerySchema = z.object({
  isActive: z.enum(["true", "false"]).optional().transform(v => v === "true"),
  page: z.preprocess((val) => Number(val) || 1, z.number().int().positive().default(1)),
  limit: z.preprocess((val) => Number(val) || 20, z.number().int().min(1).max(100).default(20)),
});

export type SubscribeInput = z.infer<typeof subscribeSchema>;
export type SubscriberQueryInput = z.infer<typeof subscriberQuerySchema>;