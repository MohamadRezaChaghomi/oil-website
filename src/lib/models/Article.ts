// src/lib/models/Article.ts
import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IArticle extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image?: string;
  author?: string;
  category: Types.ObjectId;  // اضافه شد
  publishedAt: Date;
  isPublished: boolean;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const ArticleSchema = new Schema<IArticle>(
  {
    title: {
      type: String,
      required: [true, "Article title is required"],
      trim: true,
      maxlength: [120, "Title cannot exceed 120 characters"],
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    excerpt: {
      type: String,
      required: [true, "Excerpt is required"],
      maxlength: [300, "Excerpt cannot exceed 300 characters"],
    },
    content: { type: String, required: true },
    image: { type: String, default: "/images/placeholder-article.jpg" },
    author: { type: String, default: "Admin" },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    publishedAt: { type: Date, default: Date.now },
    isPublished: { type: Boolean, default: false, index: true },
    viewCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

ArticleSchema.index({ isPublished: 1, publishedAt: -1 });
ArticleSchema.index({ slug: 1 });
ArticleSchema.index({ category: 1 }); 

const Article: Model<IArticle> =
  mongoose.models.Article || mongoose.model<IArticle>("Article", ArticleSchema);

export default Article;