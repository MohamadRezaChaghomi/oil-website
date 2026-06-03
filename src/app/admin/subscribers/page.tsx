// src/app/admin/subscribers/page.tsx
import { dbConnect } from "@/lib/db";
import Subscriber from "@/lib/models/Subscriber";
import { SubscribersTable } from "@/components/admin/subscribers/SubscribersTable";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";

async function getSubscribers() {
  await dbConnect();
  const subscribers = await Subscriber.find({}).sort({ createdAt: -1 }).lean();
  return subscribers.map((sub: any) => ({
    _id: sub._id.toString(),
    email: sub.email,
    isActive: sub.isActive,
    createdAt: sub.createdAt,
  }));
}

export default async function AdminSubscribersPage() {
  const subscribers = await getSubscribers();

  return (
    <div>
      <AdminPageHeader
        title="مدیریت مشترکین خبرنامه"
        description="لیست ایمیل‌های ثبت‌شده در خبرنامه"
      />
      <div className="bg-card/60 backdrop-blur-sm rounded-2xl border border-border/50 p-4 shadow-sm">
        <SubscribersTable subscribers={subscribers} />
      </div>
    </div>
  );
}