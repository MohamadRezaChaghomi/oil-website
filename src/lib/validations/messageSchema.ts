// src/lib/validations/messageSchema.ts
import { z } from "zod";

// Base schema shared between contact form and message model
export const baseMessageSchema = {
  name: z.string().min(2, "Name too short").max(100, "Name too long"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().max(200).optional(),
  message: z.string().min(10, "Message too short").max(5000, "Message too long"),
  website: z.string().max(0, "Bot detected").optional(), // honeypot
};

export const createMessageSchema = z.object(baseMessageSchema);

export const updateMessageStatusSchema = z.object({
  status: z.enum(["pending", "read", "replied"]),
});

export const messageQuerySchema = z.object({
  status: z.enum(["pending", "read", "replied"]).optional(),
  page: z.preprocess((val) => Number(val) || 1, z.number().int().positive().default(1)),
  limit: z.preprocess((val) => Number(val) || 20, z.number().int().min(1).max(100).default(20)),
});

export type CreateMessageInput = z.infer<typeof createMessageSchema>;
export type UpdateMessageStatusInput = z.infer<typeof updateMessageStatusSchema>;
export type MessageQueryInput = z.infer<typeof messageQuerySchema>;