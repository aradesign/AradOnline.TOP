"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Play, MapPin } from "lucide-react";
import { HeroDashboard } from "@/components/hero/HeroDashboard";
import type { SiteSettingsMap } from "@/lib/settings";

export function Hero({ settings }: { settings: SiteSettingsMap }) {
  return (
    <section className="hero-section relative overflow-hidden bg-[var(--color-bg)] pt-20">
      <div className="absolute inset-0 -z-10">
        <div className="hero-section-gradient absolute inset-0" />
        <div className="hero-section-glow absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full blur-3xl" />
        <div className="hero-dark-grid absolute inset-0" aria-hidden />
        <div className="hero-dark-beam hero-dark-beam-1" aria-hidden />
        <div className="hero-dark-beam hero-dark-beam-2" aria-hidden />
      </div>

      <div className="container-narrow px-4 pb-8 pt-8 sm:px-6 sm:pt-12 lg:px-8 lg:pb-12">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="order-2 flex-1 text-center lg:order-1 lg:text-right"
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="hero-badge mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium text-primary shadow-sm"
            >
              <MapPin size={16} />
              <span>ویژه کسب‌وکارهای شمال ایران</span>
            </motion.div>

            <h1 className="dark-hero-title text-3xl font-extrabold leading-[1.35] tracking-tight text-slate-dark sm:text-4xl lg:text-[2.75rem] lg:leading-[1.25]">
              {settings.heroTitle}{" "}
              <span className="text-gradient text-gradient-shine">{settings.heroHighlight}</span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-[1.9] text-slate-muted sm:text-lg lg:mx-0">
              {settings.heroSubtitle}
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <a
                href="#contact"
                className="btn-neon group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-white shadow-[0_8px_24px_rgba(0,102,102,0.35)] transition-all hover:bg-primary-light sm:w-auto"
              >
                مشاوره رایگان بگیر
                <ArrowLeft
                  size={20}
                  className="transition-transform group-hover:-translate-x-1"
                />
              </a>
              <a
                href="#portfolio"
                className="btn-glass inline-flex w-full items-center justify-center gap-2 rounded-xl border px-8 py-3.5 text-base font-semibold text-slate-dark shadow-sm transition-all sm:w-auto"
              >
                <Play size={18} className="text-primary" />
                نمونه کارها
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="order-1 w-full flex-1 lg:order-2"
          >
            <HeroDashboard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
