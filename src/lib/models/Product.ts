// src/lib/models/Product.ts
import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IProduct extends Document {
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  image?: string;
  category: Types.ObjectId; 
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: { type: String, required: true },
    shortDescription: { type: String, maxlength: 200 },
    image: { type: String, default: "/images/placeholder-product.jpg" },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

ProductSchema.index({ category: 1, isActive: 1 });

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;