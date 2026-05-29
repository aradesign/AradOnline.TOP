"use client";

import { useRouter } from "next/navigation";
import type { FormSubmission } from "@prisma/client";
import { Trash2, Check } from "lucide-react";

export function SubmissionsList({ initial }: { initial: FormSubmission[] }) {
  const router = useRouter();

  async function toggleRead(id: string, read: boolean) {
    await fetch(`/api/admin/submissions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read }),
    });
    router.refresh();
  }

  async function remove(id: string) {
    if (!confirm("حذف این درخواست؟")) return;
    await fetch(`/api/admin/submissions/${id}`, { method: "DELETE" });
    router.refresh();
  }

  if (initial.length === 0) {
    return (
      <div className="zp-card p-8 text-center text-slate-muted">
        هنوز درخواستی ثبت نشده
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {initial.map((s) => (
        <div
          key={s.id}
          className={`zp-card p-5 ${!s.read ? "ring-2 ring-secondary-orange/30" : ""}`}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <h3 className="font-bold text-slate-dark">{s.fullName}</h3>
                {!s.read && (
                  <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs text-orange-700">
                    جدید
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-muted" dir="ltr">
                {s.phone}
              </p>
              <p className="mt-1 text-sm">
                {s.city} · {s.businessType}
              </p>
              {s.message && (
                <p className="mt-3 rounded-lg bg-gray-50 p-3 text-sm leading-relaxed">
                  {s.message}
                </p>
              )}
              <p className="mt-2 text-xs text-slate-muted">
                {new Date(s.createdAt).toLocaleString("fa-IR")}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => toggleRead(s.id, !s.read)}
                className="rounded-lg p-2 text-primary hover:bg-primary/10"
                title={s.read ? "علامت‌گذاری خوانده‌نشده" : "خوانده شد"}
              >
                <Check size={18} />
              </button>
              <button
                type="button"
                onClick={() => remove(s.id)}
                className="rounded-lg p-2 text-red-500 hover:bg-red-50"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
