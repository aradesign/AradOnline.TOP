"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { PortfolioProject } from "@prisma/client";
import { parseGalleryImages, stringifyGalleryImages } from "@/lib/images";
import { ImageUploadField, GalleryUploadField } from "./ImageUploadField";

const gradients = [
  "from-teal-500/20 to-cyan-500/20",
  "from-blue-500/20 to-indigo-500/20",
  "from-orange-500/20 to-amber-500/20",
  "from-emerald-500/20 to-teal-500/20",
  "from-violet-500/20 to-purple-500/20",
  "from-sky-500/20 to-blue-500/20",
];

type Props = { initial?: PortfolioProject };

export function PortfolioForm({ initial }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [gallery, setGallery] = useState<string[]>(
    () => parseGalleryImages(initial?.galleryImages)
  );
  const [form, setForm] = useState({
    title: initial?.title ?? "",
    slug: initial?.slug ?? "",
    category: initial?.category ?? "فروشگاهی",
    city: initial?.city ?? "",
    excerpt: initial?.excerpt ?? "",
    content: initial?.content ?? "",
    coverGradient: initial?.coverGradient ?? gradients[0],
    thumbnailUrl: initial?.thumbnailUrl ?? "",
    screenshotUrl: initial?.screenshotUrl ?? "",
    clientName: initial?.clientName ?? "",
    projectUrl: initial?.projectUrl ?? "",
    services: initial?.services ?? "",
    year: initial?.year ?? "",
    published: initial?.published ?? true,
    featured: initial?.featured ?? false,
    sortOrder: initial?.sortOrder ?? 0,
  });

  function update(field: string, value: string | number | boolean) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...form,
      galleryImages: gallery.length > 0 ? stringifyGalleryImages(gallery) : null,
    };

    const url = initial
      ? `/api/admin/portfolio/${initial.id}`
      : "/api/admin/portfolio";
    const method = initial ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push("/admin/portfolio");
      router.refresh();
    } else {
      alert("خطا در ذخیره");
    }
    setLoading(false);
  }

  const inputClass =
    "w-full rounded-xl border border-gray-200 px-4 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-6 space-y-5">
        <h3 className="font-bold text-slate-dark">تصاویر پروژه</h3>
        <ImageUploadField
          label="تامبنیل (کارت نمونه‌کار)"
          hint="در لیست نمونه‌کارها — پیشنهاد ۸۰۰×۶۰۰"
          value={form.thumbnailUrl}
          onChange={(url) => update("thumbnailUrl", url)}
        />
        <ImageUploadField
          label="اسکرین‌شات لندینگ اصلی"
          hint="نمایش بزرگ در صفحه پروژه — پیشنهاد عرض ۱۴۴۰px"
          value={form.screenshotUrl}
          onChange={(url) => update("screenshotUrl", url)}
        />
        <GalleryUploadField
          label="گالری تصاویر"
          hint="اسکرین‌های دیگر، جزئیات UI و ..."
          urls={gallery}
          onChange={setGallery}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="عنوان پروژه" required>
          <input
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            className={inputClass}
            required
          />
        </Field>
        <Field label="اسلاگ (URL)" hint="مثال: poshak-rasht">
          <input
            value={form.slug}
            onChange={(e) => update("slug", e.target.value)}
            className={inputClass}
            dir="ltr"
          />
        </Field>
        <Field label="دسته">
          <select
            value={form.category}
            onChange={(e) => update("category", e.target.value)}
            className={inputClass}
          >
            <option>فروشگاهی</option>
            <option>شرکتی</option>
          </select>
        </Field>
        <Field label="شهر">
          <input
            value={form.city}
            onChange={(e) => update("city", e.target.value)}
            className={inputClass}
            required
          />
        </Field>
        <Field label="نام مشتری">
          <input
            value={form.clientName}
            onChange={(e) => update("clientName", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="سال">
          <input
            value={form.year}
            onChange={(e) => update("year", e.target.value)}
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="خلاصه کوتاه">
        <input
          value={form.excerpt}
          onChange={(e) => update("excerpt", e.target.value)}
          className={inputClass}
        />
      </Field>

      <Field label="خدمات (با ویرگول جدا کنید)">
        <input
          value={form.services}
          onChange={(e) => update("services", e.target.value)}
          className={inputClass}
        />
      </Field>

      <Field label="لینک پروژه">
        <input
          value={form.projectUrl}
          onChange={(e) => update("projectUrl", e.target.value)}
          className={inputClass}
          dir="ltr"
        />
      </Field>

      <Field label="گرادیان پس‌زمینه (اگر تصویر ندارید)">
        <select
          value={form.coverGradient}
          onChange={(e) => update("coverGradient", e.target.value)}
          className={inputClass}
        >
          {gradients.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </Field>

      <Field label="محتوای کامل (Markdown)">
        <textarea
          value={form.content}
          onChange={(e) => update("content", e.target.value)}
          className="min-h-[280px] w-full rounded-xl border border-gray-200 px-4 py-2.5 font-mono text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          dir="rtl"
        />
      </Field>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => update("published", e.target.checked)}
          />
          منتشر شده
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => update("featured", e.target.checked)}
          />
          ویژه
        </label>
        <Field label="ترتیب">
          <input
            type="number"
            value={form.sortOrder}
            onChange={(e) => update("sortOrder", parseInt(e.target.value, 10) || 0)}
            className="w-24 rounded-xl border border-gray-200 px-4 py-2.5 outline-none focus:border-primary"
          />
        </Field>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-primary px-6 py-2.5 font-semibold text-white hover:bg-primary-light disabled:opacity-60"
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

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-dark">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      {hint && <p className="mb-1 text-xs text-slate-muted">{hint}</p>}
      {children}
    </div>
  );
}
