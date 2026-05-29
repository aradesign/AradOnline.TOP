"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ClientLogo } from "@prisma/client";
import { ImageUploadField } from "./ImageUploadField";

type Props = { initial?: ClientLogo };

export function ClientForm({ initial }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: initial?.name ?? "",
    logoUrl: initial?.logoUrl ?? "",
    websiteUrl: initial?.websiteUrl ?? "",
    published: initial?.published ?? true,
    sortOrder: initial?.sortOrder ?? 0,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.logoUrl) {
      alert("لوگو را آپلود کنید");
      return;
    }
    setLoading(true);

    const url = initial ? `/api/admin/clients/${initial.id}` : "/api/admin/clients";
    const method = initial ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/admin/clients");
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      alert(data.error || "خطا در ذخیره");
    }
    setLoading(false);
  }

  const inputClass =
    "w-full rounded-xl border border-gray-200 px-4 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-6">
      <div>
        <label className="mb-1.5 block text-sm font-medium">نام مشتری / برند</label>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className={inputClass}
          required
        />
      </div>

      <ImageUploadField
        label="لوگو"
        hint="در کروسل صفحه اصلی نمایش داده می‌شود — PNG شفاف پیشنهاد می‌شود"
        value={form.logoUrl}
        onChange={(logoUrl) => setForm({ ...form, logoUrl })}
      />

      <div>
        <label className="mb-1.5 block text-sm font-medium">لینک وب‌سایت (اختیاری)</label>
        <input
          value={form.websiteUrl}
          onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })}
          className={inputClass}
          dir="ltr"
          placeholder="https://"
        />
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => setForm({ ...form, published: e.target.checked })}
          />
          نمایش در کروسل
        </label>
        <div>
          <label className="mb-1 block text-sm font-medium">ترتیب</label>
          <input
            type="number"
            value={form.sortOrder}
            onChange={(e) =>
              setForm({ ...form, sortOrder: parseInt(e.target.value, 10) || 0 })
            }
            className="w-24 rounded-xl border border-gray-200 px-3 py-2"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-primary px-6 py-2.5 font-semibold text-white disabled:opacity-60"
        >
          {loading ? "ذخیره..." : "ذخیره"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-xl border border-gray-200 px-6 py-2.5 text-slate-muted"
        >
          انصراف
        </button>
      </div>
    </form>
  );
}
