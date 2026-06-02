// src/lib/utils/mongoose.ts
import { Document } from "mongoose";

export function toPlainObject<T extends Document>(doc: T | null): (Omit<T, keyof Document> & { _id: string }) | null {
  if (!doc) return null;
  const obj = doc.toObject();
  obj._id = obj._id.toString();
  if (obj.parentId && typeof obj.parentId === "object") obj.parentId = obj.parentId.toString();
  if (obj.category && typeof obj.category === "object") obj.category = obj.category.toString();
  return obj;
}

export function toPlainObjects<T extends Document>(docs: T[]): (Omit<T, keyof Document> & { _id: string })[] {
  return docs.map(doc => toPlainObject(doc)!);
}