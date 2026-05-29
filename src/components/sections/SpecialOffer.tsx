"use client";

import { motion } from "framer-motion";
import { Gift, Clock, MapPin } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import type { SiteSettingsMap } from "@/lib/settings";

export function SpecialOffer({ settings }: { settings: SiteSettingsMap }) {
  return (
    <AnimatedSection id="offer" className="section-padding">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-primary via-primary-light to-secondary-blue p-8 text-white sm:p-12 lg:p-16"
        >
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />

          <div className="relative flex flex-col items-center gap-8 text-center lg:flex-row lg:text-right">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
              <Gift size={40} />
            </div>
            <div className="flex-1">
              <span className="mb-4 inline-block rounded-full bg-secondary-orange px-4 py-1 text-sm font-bold">
                پیشنهاد ویژه شمال
              </span>
              <h2 className="mb-4 text-2xl font-extrabold sm:text-3xl lg:text-4xl">
                {settings.offerTitle}
              </h2>
              <p className="mb-6 max-w-2xl text-white/90 lg:mx-0">
                {settings.offerDescription}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm lg:justify-start">
                <span className="flex items-center gap-2">
                  <MapPin size={16} />
                  گیلان · مازندران · گلستان
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={16} />
                  محدود به ۱۰ پروژه اول
                </span>
              </div>
            </div>
            <a
              href="#contact"
              className="shrink-0 rounded-xl bg-white px-8 py-4 text-lg font-bold text-primary shadow-lg transition-transform hover:scale-105"
            >
              همین الان ثبت‌نام کن
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
