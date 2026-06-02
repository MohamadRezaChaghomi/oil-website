// src/lib/utils/mongoose.ts
import { Document } from "mongoose";

/**
 * Type guard to check if a value has a toString method
 */
function hasToString(value: unknown): value is { toString(): string } {
  return typeof value === "object" && value !== null && "toString" in value;
}

/**
 * Converts a single Mongoose document to a plain JavaScript object.
 * Converts `_id`, `parentId`, and `category` fields from ObjectId to string.
 */
export function toPlainObject<T extends Document>(
  doc: T | null
): (Omit<T, keyof Document> & { _id: string }) | null {
  if (!doc) return null;
  const obj = doc.toObject() as Record<string, unknown>;
  obj._id = String(obj._id);

  if (hasToString(obj.parentId)) obj.parentId = obj.parentId.toString();
  if (hasToString(obj.category)) obj.category = obj.category.toString();

  return obj as Omit<T, keyof Document> & { _id: string };
}

/**
 * Converts an array of lean documents (or any objects with `_id`) to plain objects.
 * Safely converts `parentId` and `category` if they exist and have toString.
 */
export function toPlainObjects<T extends { _id: unknown }>(
  docs: T[]
): (T & { _id: string })[] {
  return docs.map((doc) => {
    const result = { ...doc, _id: String(doc._id) } as T & { _id: string };
    const record = result as Record<string, unknown>;

    if (hasToString(record.parentId)) record.parentId = record.parentId.toString();
    if (hasToString(record.category)) record.category = record.category.toString();

    return result;
  });
}