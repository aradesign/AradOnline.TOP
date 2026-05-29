"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Testimonial } from "@prisma/client";

export function TestimonialForm({ initial }: { initial?: Testimonial }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: initial?.name ?? "",
    role: initial?.role ?? "",
    city: initial?.city ?? "",
    text: initial?.text ?? "",
    rating: initial?.rating ?? 5,
    published: initial?.published ?? true,
    sortOrder: initial?.sortOrder ?? 0,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const url = initial
      ? `/api/admin/testimonials/${initial.id}`
      : "/api/admin/testimonials";
    const res = await fetch(url, {
      method: initial ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      router.push("/admin/testimonials");
      router.refresh();
    }
    setLoading(false);
  }

  const inputClass =
    "w-full rounded-xl border border-gray-200 px-4 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
      <input
        placeholder="نام"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className={inputClass}
        required
      />
      <input
        placeholder="نقش / عنوان"
        value={form.role}
        onChange={(e) => setForm({ ...form, role: e.target.value })}
        className={inputClass}
        required
      />
      <input
        placeholder="شهر"
        value={form.city}
        onChange={(e) => setForm({ ...form, city: e.target.value })}
        className={inputClass}
        required
      />
      <textarea
        placeholder="متن نظر"
        value={form.text}
        onChange={(e) => setForm({ ...form, text: e.target.value })}
        className={`${inputClass} min-h-[120px]`}
        required
      />
      <div className="flex gap-4">
        <label className="text-sm">
          امتیاز:
          <input
            type="number"
            min={1}
            max={5}
            value={form.rating}
            onChange={(e) =>
              setForm({ ...form, rating: parseInt(e.target.value) || 5 })
            }
            className="mr-2 w-16 rounded border px-2 py-1"
          />
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => setForm({ ...form, published: e.target.checked })}
          />
          منتشر شده
        </label>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-primary px-6 py-2.5 font-semibold text-white"
      >
        ذخیره
      </button>
    </form>
  );
}
