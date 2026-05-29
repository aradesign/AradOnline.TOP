"use client";

import { motion } from "framer-motion";
import { MessageSquare, Palette, Rocket } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const steps = [
  {
    step: "۰۱",
    icon: MessageSquare,
    title: "مشاوره رایگان",
    description:
      "نیاز کسب‌وکار شما را می‌شنویم و بهترین نوع سایت (فروشگاهی یا شرکتی) را پیشنهاد می‌دهیم.",
  },
  {
    step: "۰۲",
    icon: Palette,
    title: "طراحی و توسعه",
    description:
      "طراحی UI تمیز و مدرن، اتصال درگاه پرداخت و سئو محلی برای شهر شما.",
  },
  {
    step: "۰۳",
    icon: Rocket,
    title: "راه‌اندازی و پشتیبانی",
    description:
      "سایت را تحویل می‌گیرید، آموزش می‌بینید و با پشتیبانی ۲۴/۷ همراهتان می‌مانیم.",
  },
];

export function HowItWorks() {
  return (
    <AnimatedSection className="section-padding">
      <div className="container-narrow">
        <SectionHeading
          badge="مسیر همکاری"
          title="در سه قدم سایت حرفه‌ای تحویل بگیرید"
          subtitle="فرآیند شفاف و سریع — مثل تجربه‌ای که از برندهای معتبر انتظار دارید."
        />

        <div className="relative grid gap-8 md:grid-cols-3">
          {/* Connector line — desktop */}
          <div className="absolute top-16 right-[16%] left-[16%] hidden h-0.5 bg-gradient-to-l from-primary/20 via-primary/40 to-primary/20 md:block" />

          {steps.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="relative zp-card p-8 text-center"
            >
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs font-bold text-white">
                {item.step}
              </span>
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <item.icon size={28} />
              </div>
              <h3 className="mb-3 text-lg font-bold text-slate-dark">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-muted">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
