// src/app/admin/messages/page.tsx
import { dbConnect } from "@/lib/db";
import Message from "@/lib/models/Message";
import { MessagesTable } from "@/components/admin/messages/MessagesTable";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";

async function getMessages() {
  await dbConnect();
  const messages = await Message.find({}).sort({ createdAt: -1 }).lean();
  return messages.map((msg: any) => ({
    _id: msg._id.toString(),
    name: msg.name,
    email: msg.email,
    subject: msg.subject || "",
    status: msg.status,
    createdAt: msg.createdAt,
  }));
}

export default async function AdminMessagesPage() {
  const messages = await getMessages();

  return (
    <div>
      <AdminPageHeader
        title="مدیریت پیام‌ها"
        description="پیام‌های دریافتی از فرم تماس"
      />
      <div className="bg-card/60 backdrop-blur-sm rounded-2xl border border-border/50 p-4 shadow-sm">
        <MessagesTable messages={messages} />
      </div>
    </div>
  );
}