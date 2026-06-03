// src/app/admin/messages/[id]/page.tsx
import { notFound } from "next/navigation";
import { dbConnect } from "@/lib/db";
import Message from "@/lib/models/Message";
import { MessageDetail } from "@/components/admin/messages/MessageDetail";
import mongoose from "mongoose";

interface Props {
  params: Promise<{ id: string }>;
}

async function getMessage(id: string) {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  await dbConnect();
  const msg = await Message.findById(id).lean();
  if (!msg) return null;
  return {
    _id: msg._id.toString(),
    name: msg.name,
    email: msg.email,
    phone: msg.phone,
    subject: msg.subject,
    message: msg.message,
    status: msg.status,
    createdAt: msg.createdAt,
  };
}

export default async function MessageDetailPage({ params }: Props) {
  const { id } = await params;
  const message = await getMessage(id);
  if (!message) notFound();
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground relative inline-block">
          جزئیات پیام
          <span className="absolute -bottom-2 right-0 w-12 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></span>
        </h1>
      </div>
      <MessageDetail message={message} />
    </div>
  );
}