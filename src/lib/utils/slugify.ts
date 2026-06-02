// src/lib/utils/slugify.ts
/**
 * Converts a string to a URL-friendly slug.
 * Supports Persian/Arabic characters (converts to English equivalents).
 */
export function slugify(text: string): string {
  if (!text) return "";

  // Normalize characters (e.g., é -> e)
  const normalized = text
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  // Replace Persian/Arabic chars with Latin approximations
  const persianMap: Record<string, string> = {
    ا: "a", ب: "b", پ: "p", ت: "t", ث: "s", ج: "j", چ: "ch", ح: "h", خ: "kh",
    د: "d", ذ: "z", ر: "r", ز: "z", ژ: "zh", س: "s", ش: "sh", ص: "s", ض: "z",
    ط: "t", ظ: "z", ع: "a", غ: "gh", ف: "f", ق: "gh", ک: "k", گ: "g", ل: "l",
    م: "m", ن: "n", و: "v", ه: "h", ی: "y",
  };
  let converted = normalized;
  for (const [persian, latin] of Object.entries(persianMap)) {
    converted = converted.replace(new RegExp(persian, "g"), latin);
  }

  // Replace spaces and special characters with hyphens
  return converted
    .replace(/[^\w\s-]/g, "") // Remove invalid chars
    .replace(/\s+/g, "-")     // Replace spaces with hyphens
    .replace(/-+/g, "-")      // Collapse multiple hyphens
    .replace(/^-+|-+$/g, ""); // Trim hyphens
}