import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Briefcase, MessageSquare, Inbox, Eye } from "lucide-react";

export default async function AdminDashboardPage() {
  const [portfolioCount, testimonialCount, submissions, unread] =
    await Promise.all([
      prisma.portfolioProject.count(),
      prisma.testimonial.count({ where: { published: true } }),
      prisma.formSubmission.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
      }),
      prisma.formSubmission.count({ where: { read: false } }),
    ]);

  const stats = [
    { label: "نمونه‌کار", value: portfolioCount, icon: Briefcase, href: "/admin/portfolio" },
    { label: "نظر مشتری", value: testimonialCount, icon: MessageSquare, href: "/admin/testimonials" },
    { label: "فرم خوانده‌نشده", value: unread, icon: Inbox, href: "/admin/submissions" },
  ];

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold text-slate-dark">داشبورد</h1>
      <p className="mb-8 text-slate-muted">خلاصه وضعیت سایت و محتوا</p>

      <div className="mb-10 grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="zp-card flex items-center gap-4 p-6"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <s.icon size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-dark">{s.value}</p>
              <p className="text-sm text-slate-muted">{s.label}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="zp-card overflow-hidden">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="font-bold text-slate-dark">آخرین درخواست‌های مشاوره</h2>
          <Link href="/admin/submissions" className="text-sm text-primary hover:underline">
            مشاهده همه
          </Link>
        </div>
        <div className="divide-y divide-gray-50">
          {submissions.length === 0 ? (
            <p className="p-6 text-sm text-slate-muted">هنوز درخواستی ثبت نشده</p>
          ) : (
            submissions.map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-between px-6 py-4"
              >
                <div>
                  <p className="font-medium text-slate-dark">{s.fullName}</p>
                  <p className="text-sm text-slate-muted">
                    {s.city} · {s.businessType} · {s.phone}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {!s.read && (
                    <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs text-orange-700">
                      جدید
                    </span>
                  )}
                  <span className="text-xs text-slate-muted">
                    {new Date(s.createdAt).toLocaleDateString("fa-IR")}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="mt-6">
        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
        >
          <Eye size={16} />
          پیش‌نمایش سایت عمومی
        </Link>
      </div>
    </div>
  );
}
