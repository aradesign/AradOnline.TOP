"use client";

import { motion } from "framer-motion";
import {
  ShoppingBag,
  Building2,
  Map,
  Wrench,
  Check,
} from "lucide-react";
import { services } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const iconMap = {
  "shopping-bag": ShoppingBag,
  building: Building2,
  map: Map,
  wrench: Wrench,
};

export function Services() {
  return (
    <AnimatedSection id="services" className="section-padding zp-section-alt">
      <div className="container-narrow">
        <SectionHeading
          badge="خدمات"
          title="هر آنچه کسب‌وکار شمال برای حضور آنلاین نیاز دارد"
          subtitle="از فروشگاه آنلاین تا سئو محلی — یک تیم، یک مسئولیت."
        />

        <div className="grid gap-8 md:grid-cols-2">
          {services.map((service, i) => {
            const Icon =
              iconMap[service.icon as keyof typeof iconMap] || ShoppingBag;
            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? 24 : -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="zp-card flex flex-col p-8 lg:flex-row lg:gap-6"
              >
                <div className="mb-6 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-light text-white lg:mb-0">
                  <Icon size={32} />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-slate-dark">
                    {service.title}
                  </h3>
                  <p className="mb-4 leading-relaxed text-slate-muted">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2 text-sm text-slate-dark"
                      >
                        <Check size={16} className="shrink-0 text-primary" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
