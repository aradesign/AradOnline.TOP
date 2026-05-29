"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  MessageSquare,
  Settings,
  Inbox,
  LogOut,
  ExternalLink,
  Building2,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const links = [
  { href: "/admin", label: "داشبورد", icon: LayoutDashboard },
  { href: "/admin/portfolio", label: "نمونه‌کارها", icon: Briefcase },
  { href: "/admin/clients", label: "لوگوی مشتریان", icon: Building2 },
  { href: "/admin/testimonials", label: "نظرات", icon: MessageSquare },
  { href: "/admin/submissions", label: "فرم‌ها", icon: Inbox },
  { href: "/admin/settings", label: "تنظیمات", icon: Settings },
];

export function AdminSidebar({ unreadCount = 0 }: { unreadCount?: number }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="flex w-64 shrink-0 flex-col border-l border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="border-b border-gray-100 p-6">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
            آ
          </div>
          <div>
            <p className="font-bold text-slate-dark">پنل آراد وب</p>
            <p className="text-xs text-slate-muted">CMS اختصاصی</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {links.map((link) => {
          const active =
            pathname === link.href ||
            (link.href !== "/admin" && pathname.startsWith(link.href));
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                active
                  ? "bg-primary/10 text-primary"
                  : "text-slate-muted hover:bg-gray-50 hover:text-slate-dark"
              }`}
            >
              <Icon size={18} />
              {link.label}
              {link.href === "/admin/submissions" && unreadCount > 0 && (
                <span className="mr-auto rounded-full bg-secondary-orange px-2 py-0.5 text-xs font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-1 border-t border-[var(--color-border)] p-4">
        <div className="mb-3 flex justify-center">
          <ThemeToggle />
        </div>
        <a
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-muted hover:bg-gray-50"
        >
          <ExternalLink size={18} />
          مشاهده سایت
        </a>
        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-red-600 hover:bg-red-50"
        >
          <LogOut size={18} />
          خروج
        </button>
      </div>
    </aside>
  );
}
