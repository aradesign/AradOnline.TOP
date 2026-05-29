"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, CheckCircle } from "lucide-react";
import type { SiteSettingsMap } from "@/lib/settings";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function Contact({ settings }: { settings: SiteSettingsMap }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: fd.get("fullName"),
        phone: fd.get("phone"),
        city: fd.get("city"),
        businessType: fd.get("businessType"),
        message: fd.get("message"),
      }),
    });

    if (res.ok) {
      setSuccess(true);
      e.currentTarget.reset();
    } else {
      const data = await res.json();
      setError(data.error || "خطا در ارسال");
    }
    setLoading(false);
  }

  const inputClass =
    "w-full rounded-xl border border-gray-200 px-4 py-3 text-slate-dark outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20";

  return (
    <AnimatedSection id="contact" className="section-padding zp-section-alt">
      <div className="container-narrow">
        <SectionHeading
          badge="تماس"
          title="مشاوره رایگان — همین امروز"
          subtitle="فرم را پر کنید تا ظرف ۲۴ ساعت با شما تماس بگیریم."
        />

        <div className="grid gap-12 lg:grid-cols-2">
          <motion.form
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="zp-card p-8"
            onSubmit={handleSubmit}
          >
            {success && (
              <div className="mb-4 flex items-center gap-2 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
                <CheckCircle size={18} />
                درخواست شما ثبت شد. به‌زودی تماس می‌گیریم.
              </div>
            )}
            {error && (
              <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </p>
            )}

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium">نام</label>
                <input name="fullName" type="text" required className={inputClass} placeholder="علی محمدی" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">موبایل</label>
                <input name="phone" type="tel" required className={inputClass} placeholder="۰۹۱۲..." />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">شهر</label>
                <select name="city" className={inputClass}>
                  <option>رشت</option>
                  <option>ساری</option>
                  <option>بابل</option>
                  <option>آمل</option>
                  <option>سایر شهرهای شمال</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">نوع کسب‌وکار</label>
                <select name="businessType" className={inputClass}>
                  <option>فروشگاه فیزیکی</option>
                  <option>شرکت / خدمات</option>
                  <option>رستوران / کافه</option>
                  <option>سایر</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">توضیحات</label>
                <textarea name="message" rows={3} className={inputClass} placeholder="نیاز شما..." />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 font-semibold text-white disabled:opacity-60"
              >
                <Send size={18} />
                {loading ? "در حال ارسال..." : "ارسال درخواست مشاوره"}
              </button>
            </div>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center space-y-8"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-bold">تماس تلفنی</h3>
                <a href={`tel:${settings.phone}`} className="text-lg text-primary hover:underline" dir="ltr">
                  {settings.phoneDisplay}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-bold">ایمیل</h3>
                <a href={`mailto:${settings.email}`} className="text-primary hover:underline">
                  {settings.email}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-bold">منطقه فعالیت</h3>
                <p className="text-slate-muted">{settings.region}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
