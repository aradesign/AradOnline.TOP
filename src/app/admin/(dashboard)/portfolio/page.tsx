import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Plus, Pencil, ExternalLink } from "lucide-react";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function AdminPortfolioPage() {
  const items = await prisma.portfolioProject.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-dark">نمونه‌کارها</h1>
          <p className="text-slate-muted">مدیریت پروژه‌ها و صفحات مستقل</p>
        </div>
        <Link
          href="/admin/portfolio/new"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white"
        >
          <Plus size={18} />
          پروژه جدید
        </Link>
      </div>

      <div className="zp-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-100 bg-gray-50/50">
            <tr>
              <th className="px-4 py-3 text-right font-medium">عنوان</th>
              <th className="px-4 py-3 text-right font-medium">شهر</th>
              <th className="px-4 py-3 text-right font-medium">وضعیت</th>
              <th className="px-4 py-3 text-right font-medium">عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/50">
                <td className="px-4 py-3">
                  <p className="font-medium">{item.title}</p>
                  <p className="text-xs text-slate-muted" dir="ltr">
                    /portfolio/{item.slug}
                  </p>
                </td>
                <td className="px-4 py-3 text-slate-muted">{item.city}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      item.published
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {item.published ? "منتشر" : "پیش‌نویس"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/portfolio/${item.slug}`}
                      target="_blank"
                      className="rounded-lg p-2 text-slate-muted hover:bg-gray-100"
                    >
                      <ExternalLink size={16} />
                    </Link>
                    <Link
                      href={`/admin/portfolio/${item.id}`}
                      className="rounded-lg p-2 text-primary hover:bg-primary/10"
                    >
                      <Pencil size={16} />
                    </Link>
                    <DeleteButton
                      url={`/api/admin/portfolio/${item.id}`}
                      label={item.title}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
