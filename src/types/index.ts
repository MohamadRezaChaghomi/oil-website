// src/types/index.ts

// ========== Models (متناسب با مدل‌های بهینه‌شده) ==========

import { Types } from "mongoose";

export interface ICategory {
  _id: Types.ObjectId;
  name: string;
  slug: string;
  description?: string;
  type: "product" | "article";
  parentId: Types.ObjectId | null;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IArticle {
  _id: Types.ObjectId;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image?: string;
  author?: string;
  category: Types.ObjectId;
  publishedAt: Date;
  isPublished: boolean;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProduct {
  _id: Types.ObjectId;
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

export interface IMessage {
  _id: Types.ObjectId;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: "pending" | "read" | "replied";
  createdAt: Date;
  updatedAt: Date;
}

export interface ISubscriber {
  _id: Types.ObjectId;
  email: string;
  isActive: boolean;
  subscribedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISetting {
  _id: Types.ObjectId;
  key: string;
  value: string | number | boolean | Record<string, unknown> | unknown[] | null;
  group: string;
  description?: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ========== API Responses ==========

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  error: string;
  details?: unknown;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

// ========== Pagination ==========

export interface PaginationParams {
  page: number;
  limit: number;
  search?: string;
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// ========== Forms (فرم‌های سمت کلاینت) ==========

export interface ContactFormValues {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  website?: string; // honeypot
}

export interface NewsletterFormValues {
  email: string;
}

// ========== Component Props (مثال‌هایی برای کامپوننت‌های آینده) ==========

export interface ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export interface InputProps {
  type?: string;
  label?: string;
  error?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
}

// ========== Utility Types ==========

export type WithId<T> = T & { _id: string };
export type Nullable<T> = T | null;
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;