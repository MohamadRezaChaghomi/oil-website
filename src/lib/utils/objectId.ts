// src/lib/utils/objectId.ts
import mongoose from "mongoose";

/**
 * Converts a string to MongoDB ObjectId if valid.
 * Returns null if invalid.
 */
export function toObjectId(id: string | null | undefined): mongoose.Types.ObjectId | null {
  if (!id) return null;
  if (mongoose.Types.ObjectId.isValid(id)) {
    return new mongoose.Types.ObjectId(id);
  }
  return null;
}

/**
 * Checks if a string is a valid ObjectId.
 */
export function isValidObjectId(id: string): boolean {
  return mongoose.Types.ObjectId.isValid(id);
}