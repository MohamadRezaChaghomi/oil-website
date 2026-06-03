// src/app/admin/layout.tsx
import { Sidebar } from "@/components/admin/layout/Sidebar";
import { AdminHeader } from "@/components/admin/layout/AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="pt-16 flex">
        <Sidebar />
        <main className="flex-1 overflow-auto pt-8 px-6 pb-8">
          {children}
        </main>
      </div>
    </div>
  );
}