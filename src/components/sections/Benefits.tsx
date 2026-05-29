"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Search,
  Sparkles,
  Headphones,
  Zap,
  Layout,
} from "lucide-react";
import { benefits } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const iconMap = {
  shield: Shield,
  search: Search,
  sparkles: Sparkles,
  headphones: Headphones,
  zap: Zap,
  layout: Layout,
};

export function Benefits() {
  return (
    <AnimatedSection id="benefits" className="section-padding">
      <div className="container-narrow">
        <SectionHeading
          badge="چرا آراد وب؟"
          title="راه‌حلی که اعتماد مشتری را جلب می‌کند"
          subtitle="همان حس حرفه‌ای و قابل اعتماد برندهای بزرگ — با تمرکز روی نیاز کسب‌وکار شمال ایران."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((item, i) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap] || Shield;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="group zp-card p-8"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <Icon size={26} />
                </div>
                <h3 className="mb-3 text-lg font-bold text-slate-dark">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-muted">
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
