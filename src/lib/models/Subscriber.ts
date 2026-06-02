// src/lib/models/Subscriber.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISubscriber extends Document {
  email: string;
  isActive: boolean;
  subscribedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const SubscriberSchema = new Schema<ISubscriber>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    isActive: { type: Boolean, default: true },
    subscribedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

SubscriberSchema.index({ createdAt: -1 });

export default (mongoose.models.Subscriber as Model<ISubscriber>) ||
  mongoose.model<ISubscriber>("Subscriber", SubscriberSchema);