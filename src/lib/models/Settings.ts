// src/lib/models/Setting.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export type SettingValue = string | number | boolean | Record<string, unknown> | unknown[] | null;

export interface ISetting extends Document {
  key: string;
  value: SettingValue;
  group: string;
  description?: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SettingSchema = new Schema<ISetting>(
  {
    key: {
      type: String,
      required: [true, "Setting key is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    value: { type: Schema.Types.Mixed, required: true },
    group: { type: String, required: true, default: "general", index: true },
    description: { type: String, maxlength: 500 },
    isPublic: { type: Boolean, default: false, index: true },
  },
  { timestamps: true }
);

SettingSchema.index({ group: 1, key: 1 });

export default (mongoose.models.Setting as Model<ISetting>) ||
  mongoose.model<ISetting>("Setting", SettingSchema);