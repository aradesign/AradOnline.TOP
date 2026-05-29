"use client";

import { useState } from "react";
import type { SiteSettingsMap, ThemeColors } from "@/lib/settings";
import { defaultTheme, defaultFont } from "@/lib/settings";
import { COLOR_FIELDS, FONT_PRESET_OPTIONS } from "@/lib/theme";
import { ColorPicker } from "./ColorPicker";
import { FontUploadZone } from "./FontUploadZone";
import { RotateCcw, Type } from "lucide-react";

export function SettingsForm({ initial }: { initial: SiteSettingsMap }) {
  const [form, setForm] = useState<SiteSettingsMap>({
    ...initial,
    theme: { ...defaultTheme, ...initial.theme },
    font: { ...defaultFont, ...initial.font },
  });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSaved(false);
    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setSaved(true);
      setTimeout(() => window.location.reload(), 600);
    } else {
      alert("خطا در ذخیره تنظیمات");
    }
    setLoading(false);
  }

  function updateTheme(key: keyof ThemeColors, value: string) {
    setForm({
      ...form,
      theme: { ...form.theme, [key]: value },
    });
  }

  const inputClass =
    "w-full rounded-xl border border-gray-200 px-4 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      {saved && (
        <p className="rounded-lg bg-green-50 px-4 py-2 text-sm text-green-700">
          تنظیمات ذخیره شد — صفحه به‌روزرسانی می‌شود...
        </p>
      )}

      {/* Colors */}
      <section className="zp-card space-y-5 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold text-slate-dark">رنگ‌بندی سایت</h2>
            <p className="mt-1 text-sm text-slate-muted">
              رنگ دکمه‌ها، متن‌ها و پس‌زمینه سکشن‌ها — بلافاصله روی سایت اعمال می‌شود
            </p>
          </div>
          <button
            type="button"
            onClick={() => setForm({ ...form, theme: { ...defaultTheme } })}
            className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-slate-muted hover:bg-gray-50"
          >
            <RotateCcw size={14} />
            پیش‌فرض
          </button>
        </div>

        <div
          className="rounded-xl border border-gray-100 p-4"
          style={{
            background: `linear-gradient(135deg, ${form.theme.heroTint}, ${form.theme.sectionBg})`,
          }}
        >
          <p className="mb-3 text-xs font-medium text-slate-muted">پیش‌نمایش</p>
          <div className="flex flex-wrap gap-2">
            <span
              className="rounded-lg px-4 py-2 text-sm font-semibold text-white"
              style={{ backgroundColor: form.theme.primary }}
            >
              دکمه اصلی
            </span>
            <span
              className="rounded-lg px-4 py-2 text-sm font-semibold text-white"
              style={{ backgroundColor: form.theme.accentOrange }}
            >
              CTA ویژه
            </span>
            <span
              className="text-sm font-bold"
              style={{ color: form.theme.textDark }}
            >
              متن اصلی
            </span>
            <span
              className="text-sm"
              style={{ color: form.theme.textMuted }}
            >
              متن ثانویه
            </span>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {COLOR_FIELDS.map((field) => (
            <div key={field.key} className="py-4 first:pt-0 last:pb-0">
              <ColorPicker
                label={field.label}
                hint={field.hint}
                value={form.theme[field.key]}
                onChange={(v) => updateTheme(field.key, v)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Fonts */}
      <section className="zp-card space-y-5 p-6">
        <div className="flex items-center gap-2">
          <Type size={20} className="text-primary" />
          <div>
            <h2 className="font-bold text-slate-dark">فونت سایت</h2>
            <p className="text-sm text-slate-muted">
              فونت پیش‌ساخته یا بارگذاری فونت اختصاصی (woff2 توصیه می‌شود)
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="radio"
              name="fontMode"
              checked={form.font.mode === "preset"}
              onChange={() =>
                setForm({
                  ...form,
                  font: { ...form.font, mode: "preset" },
                })
              }
            />
            فونت آماده
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="radio"
              name="fontMode"
              checked={form.font.mode === "custom"}
              onChange={() =>
                setForm({
                  ...form,
                  font: { ...form.font, mode: "custom" },
                })
              }
            />
            فونت بارگذاری‌شده
          </label>
        </div>

        {form.font.mode === "preset" ? (
          <div className="grid gap-3 sm:grid-cols-3">
            {FONT_PRESET_OPTIONS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() =>
                  setForm({
                    ...form,
                    font: { ...form.font, mode: "preset", presetId: preset.id },
                  })
                }
                className={`rounded-xl border-2 px-4 py-4 text-sm font-medium transition-all ${
                  form.font.presetId === preset.id
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-gray-100 hover:border-gray-200"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        ) : (
          <FontUploadZone
            font={form.font}
            onChange={(font) => setForm({ ...form, font })}
          />
        )}
      </section>

      <section className="zp-card space-y-4 p-6">
        <h2 className="font-bold">اطلاعات تماس</h2>
        <Field label="نام سایت">
          <input
            value={form.siteName}
            onChange={(e) => setForm({ ...form, siteName: e.target.value })}
            className={inputClass}
          />
        </Field>
        <Field label="شعار">
          <input
            value={form.tagline}
            onChange={(e) => setForm({ ...form, tagline: e.target.value })}
            className={inputClass}
          />
        </Field>
        <Field label="تلفن (نمایش)">
          <input
            value={form.phoneDisplay}
            onChange={(e) => setForm({ ...form, phoneDisplay: e.target.value })}
            className={inputClass}
          />
        </Field>
        <Field label="تلفن (لینک tel)">
          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className={inputClass}
            dir="ltr"
          />
        </Field>
        <Field label="واتساپ (بدون +)">
          <input
            value={form.whatsapp}
            onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
            className={inputClass}
            dir="ltr"
          />
        </Field>
        <Field label="ایمیل">
          <input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={inputClass}
            dir="ltr"
          />
        </Field>
        <Field label="منطقه فعالیت">
          <input
            value={form.region}
            onChange={(e) => setForm({ ...form, region: e.target.value })}
            className={inputClass}
          />
        </Field>
      </section>

      <section className="zp-card space-y-4 p-6">
        <h2 className="font-bold">بخش Hero</h2>
        <Field label="تیتر (قسمت اول)">
          <input
            value={form.heroTitle}
            onChange={(e) => setForm({ ...form, heroTitle: e.target.value })}
            className={inputClass}
          />
        </Field>
        <Field label="تیتر (برجسته)">
          <input
            value={form.heroHighlight}
            onChange={(e) => setForm({ ...form, heroHighlight: e.target.value })}
            className={inputClass}
          />
        </Field>
        <Field label="زیرتیتر">
          <textarea
            value={form.heroSubtitle}
            onChange={(e) => setForm({ ...form, heroSubtitle: e.target.value })}
            className={`${inputClass} min-h-[80px]`}
          />
        </Field>
      </section>

      <section className="zp-card space-y-4 p-6">
        <h2 className="font-bold">پیشنهاد ویژه</h2>
        <Field label="عنوان">
          <input
            value={form.offerTitle}
            onChange={(e) => setForm({ ...form, offerTitle: e.target.value })}
            className={inputClass}
          />
        </Field>
        <Field label="توضیحات">
          <textarea
            value={form.offerDescription}
            onChange={(e) =>
              setForm({ ...form, offerDescription: e.target.value })
            }
            className={`${inputClass} min-h-[80px]`}
          />
        </Field>
      </section>

      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-primary px-8 py-3 font-semibold text-white"
      >
        {loading ? "ذخیره..." : "ذخیره تنظیمات"}
      </button>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">{label}</label>
      {children}
    </div>
  );
}
