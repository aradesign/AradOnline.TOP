import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function AdminClientsPage() {
  const items = await prisma.clientLogo.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-dark">لوگوی مشتریان</h1>
          <p className="mt-1 text-sm text-slate-muted">
            لوگوها در کروسل صفحه اصلی نمایش داده می‌شوند
          </p>
        </div>
        <Link
          href="/admin/clients/new"
          className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white"
        >
          + مشتری جدید
        </Link>
      </div>

      {items.length === 0 ? (
        <p className="text-slate-muted">هنوز لوگویی ثبت نشده.</p>
      ) : (
        <div className="space-y-3">
          {items.map((c) => (
            <div
              key={c.id}
              className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4"
            >
              <div className="flex h-14 w-24 shrink-0 items-center justify-center rounded-lg bg-gray-50 p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.logoUrl} alt={c.name} className="max-h-full max-w-full object-contain" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-slate-dark">{c.name}</p>
                <p className="text-xs text-slate-muted">
                  {c.published ? "منتشر شده" : "پیش‌نویس"} · ترتیب {c.sortOrder}
                </p>
              </div>
              <Link
                href={`/admin/clients/${c.id}`}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm hover:bg-gray-50"
              >
                ویرایش
              </Link>
              <DeleteButton url={`/api/admin/clients/${c.id}`} label="حذف" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
