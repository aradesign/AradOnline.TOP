"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import type { Testimonial } from "@prisma/client";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function Testimonials({ items }: { items: Testimonial[] }) {
  return (
    <AnimatedSection id="testimonials" className="section-padding zp-section-alt">
      <div className="container-narrow">
        <SectionHeading
          badge="نظر مشتریان"
          title="کسب‌وکارهای شمال به ما اعتماد کردند"
          subtitle="از رشت تا ساری و بابل — تجربه واقعی صاحبان کسب‌وکار."
        />

        <div className="grid gap-8 md:grid-cols-3">
          {items.map((t, i) => (
            <motion.blockquote
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative zp-card p-8"
            >
              <Quote
                size={32}
                className="absolute left-6 top-6 text-primary/10"
              />
              <div className="mb-4 flex gap-1">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star
                    key={j}
                    size={16}
                    className="fill-secondary-orange text-secondary-orange"
                  />
                ))}
              </div>
              <p className="mb-6 leading-relaxed text-slate-dark">{t.text}</p>
              <footer className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <cite className="not-italic font-bold text-slate-dark">
                    {t.name}
                  </cite>
                  <p className="text-sm text-slate-muted">
                    {t.role} — {t.city}
                  </p>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
