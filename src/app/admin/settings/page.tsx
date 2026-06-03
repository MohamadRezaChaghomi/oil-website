// src/app/admin/settings/page.tsx
import { dbConnect } from "@/lib/db";
import Setting from "@/lib/models/Setting";
import { SettingsTable } from "@/components/admin/settings/SettingsTable";

async function getSettings() {
  await dbConnect();
  const settings = await Setting.find({}).lean();
  const transformed = settings.map((s: any) => ({
    _id: s._id.toString(),
    key: s.key,
    value: s.value,
    group: s.group,
    description: s.description || "",
    isPublic: s.isPublic,
  }));
  const groups = [...new Set(transformed.map(s => s.group))] as string[];
  return { settings: transformed, groups };
}

export default async function AdminSettingsPage() {
  const { settings, groups } = await getSettings();
  return <SettingsTable settings={settings} groups={groups} />;
}