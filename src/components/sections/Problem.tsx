"use client";

import { motion } from "framer-motion";
import { WifiOff, Smartphone, MapPin, AlertTriangle } from "lucide-react";
import { problems } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const iconMap = {
  "wifi-off": WifiOff,
  smartphone: Smartphone,
  "map-pin": MapPin,
};

export function Problem() {
  return (
    <AnimatedSection id="problem" className="section-padding zp-section-alt">
      <div className="container-narrow">
        <SectionHeading
          badge="مشکل واقعی"
          title="وقتی اینترنت قطع می‌شود، فروش شما هم قطع می‌شود"
          subtitle="بیشتر فروشگاه‌های شمال هنوز فقط به اینستاگرام و تلگرام وابسته‌اند — و این یعنی ریسک بزرگ."
        />

        <div className="mb-12 flex justify-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 rounded-2xl border border-red-100 bg-red-50 px-6 py-4 text-red-700"
          >
            <AlertTriangle size={24} />
            <span className="font-medium">
              ۷۸٪ کسب‌وکارهای شمال در قطعی اخیر فروش آنلاین را از دست دادند
            </span>
          </motion.div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {problems.map((item, i) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap] || WifiOff;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group zp-card p-8"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500 transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                  <Icon size={28} />
                </div>
                <h3 className="mb-3 text-lg font-bold text-slate-dark">
                  {item.title}
                </h3>
                <p className="leading-relaxed text-slate-muted">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
