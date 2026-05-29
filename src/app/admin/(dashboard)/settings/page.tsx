import { getSiteSettings } from "@/lib/settings";
import { SettingsForm } from "@/components/admin/SettingsForm";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();
  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold text-slate-dark">تنظیمات سایت</h1>
      <p className="mb-8 text-slate-muted">
        رنگ‌بندی، فونت، تماس، Hero و پیشنهاد ویژه
      </p>
      <SettingsForm initial={settings} />
    </div>
  );
}
