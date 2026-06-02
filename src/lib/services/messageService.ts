// src/lib/services/messageService.ts
import mongoose from "mongoose";
import { dbConnect } from "@/lib/db";
import Message from "@/lib/models/Message";
import {
  createMessageSchema,
  updateMessageStatusSchema,
} from "@/lib/validations/messageSchema";
import type {
  CreateMessageInput,
  UpdateMessageStatusInput,
} from "@/lib/validations/messageSchema";
import { toPlainObject, toPlainObjects } from "@/lib/utils/mongoose";

export async function createMessage(data: CreateMessageInput) {
  await dbConnect();
  const validated = createMessageSchema.parse(data);
  const message = await Message.create({
    name: validated.name,
    email: validated.email,
    phone: validated.phone || "",
    subject: validated.subject || "",
    message: validated.message,
    status: "pending",
  });
  return toPlainObject(message);
}

export async function getMessages(query: {
  page?: number;
  limit?: number;
  status?: "pending" | "read" | "replied";
  search?: string;
}) {
  await dbConnect();
  const page = Math.max(1, query.page || 1);
  const limit = Math.min(100, Math.max(1, query.limit || 20));
  const skip = (page - 1) * limit;

  const filter: Record<string, unknown> = {};
  if (query.status) filter.status = query.status;
  if (query.search) {
    const regex = { $regex: query.search, $options: "i" };
    filter.$or = [
      { name: regex },
      { email: regex },
      { subject: regex },
      { message: regex },
    ];
  }

  const [messages, total] = await Promise.all([
    Message.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Message.countDocuments(filter),
  ]);

  return {
    data: toPlainObjects(messages),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNext: page * limit < total,
      hasPrev: page > 1,
    },
  };
}

export async function getMessageById(id: string) {
  await dbConnect();
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  const message = await Message.findById(id).lean();
  return message ? { ...message, _id: String(message._id) } : null;
}

export async function updateMessageStatus(id: string, data: UpdateMessageStatusInput) {
  await dbConnect();
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  const validated = updateMessageStatusSchema.parse(data);
  const message = await Message.findByIdAndUpdate(
    id,
    { status: validated.status },
    { new: true }
  ).lean();
  return message ? { ...message, _id: String(message._id) } : null;
}

export async function deleteMessage(id: string) {
  await dbConnect();
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  const message = await Message.findByIdAndDelete(id).lean();
  return message ? { ...message, _id: String(message._id) } : null;
}