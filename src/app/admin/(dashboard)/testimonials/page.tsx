import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Plus, Pencil } from "lucide-react";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function AdminTestimonialsPage() {
  const items = await prisma.testimonial.findMany({
    orderBy: [{ sortOrder: "asc" }],
  });

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-dark">نظرات مشتریان</h1>
        <Link
          href="/admin/testimonials/new"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white"
        >
          <Plus size={18} />
          نظر جدید
        </Link>
      </div>

      <div className="space-y-4">
        {items.map((t) => (
          <div key={t.id} className="zp-card flex items-start justify-between p-5">
            <div>
              <p className="font-bold">{t.name}</p>
              <p className="text-sm text-slate-muted">
                {t.role} — {t.city}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-dark">
                {t.text}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <Link
                href={`/admin/testimonials/${t.id}`}
                className="rounded-lg p-2 text-primary hover:bg-primary/10"
              >
                <Pencil size={16} />
              </Link>
              <DeleteButton
                url={`/api/admin/testimonials/${t.id}`}
                label={t.name}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
