"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { pricing } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function Pricing() {
  return (
    <AnimatedSection id="pricing" className="section-padding zp-section-alt">
      <div className="container-narrow">
        <SectionHeading
          badge="تعرفه‌ها"
          title="پکیج‌های شفاف، بدون هزینه پنهان"
          subtitle="قیمت‌ها تقریبی هستند — پس از مشاوره رایگان، پیشنهاد دقیق دریافت می‌کنید."
        />

        <div className="grid gap-8 lg:grid-cols-3">
          {pricing.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative flex flex-col p-8 ${
                plan.popular
                  ? "zp-card border-primary ring-2 ring-primary/20 lg:scale-[1.03]"
                  : "zp-card"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-secondary-orange px-4 py-1 text-xs font-bold text-white">
                  پرطرفدار
                </span>
              )}

              <h3 className="text-xl font-bold text-slate-dark">{plan.name}</h3>
              <p className="mt-2 text-sm text-slate-muted">{plan.description}</p>

              <div className="my-6 border-b border-gray-100 pb-6">
                {plan.price === "تماس" ? (
                  <span className="text-3xl font-extrabold text-primary">
                    تماس بگیرید
                  </span>
                ) : (
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-primary">
                      {plan.price}
                    </span>
                    <span className="text-lg text-slate-muted">{plan.unit}</span>
                  </div>
                )}
              </div>

              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm text-slate-dark"
                  >
                    <Check
                      size={18}
                      className="mt-0.5 shrink-0 text-primary"
                    />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`block rounded-xl py-3.5 text-center font-semibold transition-all ${
                  plan.popular
                    ? "bg-primary text-white shadow-lg hover:bg-primary-light"
                    : "border-2 border-primary text-primary hover:bg-primary hover:text-white"
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
