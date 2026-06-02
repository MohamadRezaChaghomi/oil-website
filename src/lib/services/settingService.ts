// src/lib/services/settingService.ts
import { dbConnect } from "@/lib/db";
import Setting from "@/lib/models/Settings"; 
import { settingSchema, settingsBatchSchema } from "@/lib/validations/settingSchema";
import type { SettingInput, SettingsBatchInput } from "@/lib/validations/settingSchema";

export type SettingValue = string | number | boolean | Record<string, unknown> | unknown[] | null;

// Define the shape of a setting document returned from the database
interface SettingDocument {
  _id: string;
  key: string;
  value: SettingValue;
  group: string;
  description?: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Get all settings, optionally filtered by group and public flag.
 */
export async function getSettings(group?: string, isPublicOnly = false): Promise<SettingDocument[]> {
  await dbConnect();
  const filter: { group?: string; isPublic?: boolean } = {};
  if (group) filter.group = group;
  if (isPublicOnly) filter.isPublic = true;

  const settings = await Setting.find(filter).lean();
  return settings.map((s) => ({
    ...s,
    _id: String(s._id),
  })) as SettingDocument[];
}

/**
 * Get settings as a key-value map for easy consumption.
 */
export async function getSettingsMap(group?: string, isPublicOnly = false): Promise<Record<string, SettingValue>> {
  const settings = await getSettings(group, isPublicOnly);
  const map: Record<string, SettingValue> = {};
  // ✅ Explicit type for parameter 's'
  settings.forEach((s: SettingDocument) => {
    map[s.key] = s.value;
  });
  return map;
}

/**
 * Get a single setting by key.
 */
export async function getSettingByKey(key: string): Promise<SettingDocument | null> {
  await dbConnect();
  const setting = await Setting.findOne({ key }).lean();
  if (!setting) return null;
  return { ...setting, _id: String(setting._id) } as SettingDocument;
}

/**
 * Create or update a setting (upsert).
 */
export async function upsertSetting(data: SettingInput): Promise<SettingDocument | null> {
  await dbConnect();
  const validated = settingSchema.parse(data);
  const result = await Setting.findOneAndUpdate(
    { key: validated.key },
    { $set: validated },
    { upsert: true, new: true, runValidators: true }
  ).lean();
  if (!result) return null;
  return { ...result, _id: String(result._id) } as SettingDocument;
}

/**
 * Batch update multiple settings (e.g., from a settings form).
 */
export async function batchUpdateSettings(data: SettingsBatchInput, group = "general"): Promise<SettingDocument[]> {
  await dbConnect();
  const validatedBatch = settingsBatchSchema.parse(data);
  const results: SettingDocument[] = [];
  for (const [key, value] of Object.entries(validatedBatch)) {
    const setting = await upsertSetting({
      key,
      value: value as SettingValue,
      group,
      isPublic: true,
    });
    if (setting) results.push(setting);
  }
  return results;
}

/**
 * Delete a setting by key.
 */
export async function deleteSetting(key: string): Promise<SettingDocument | null> {
  await dbConnect();
  const result = await Setting.findOneAndDelete({ key }).lean();
  if (!result) return null;
  return { ...result, _id: String(result._id) } as SettingDocument;
}