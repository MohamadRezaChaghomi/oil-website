// src/lib/models/Message.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMessage extends Document {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: "pending" | "read" | "replied";
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, trim: true, default: "" },
    subject: { type: String, trim: true, default: "" },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "read", "replied"],
      default: "pending",
      index: true,
    },
  },
  { timestamps: true }
);

MessageSchema.index({ createdAt: -1 });
MessageSchema.index({ status: 1, createdAt: -1 });

export default (mongoose.models.Message as Model<IMessage>) ||
  mongoose.model<IMessage>("Message", MessageSchema);