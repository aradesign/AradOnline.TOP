import { AdminSidebar } from "./AdminSidebar";
import { getUnreadSubmissionsCount } from "@/lib/cms";

export async function AdminShell({ children }: { children: React.ReactNode }) {
  const unreadCount = await getUnreadSubmissionsCount();

  return (
    <div className="flex min-h-screen bg-section" dir="rtl">
      <AdminSidebar unreadCount={unreadCount} />
      <main className="flex-1 overflow-auto p-6 lg:p-8">{children}</main>
    </div>
  );
}
