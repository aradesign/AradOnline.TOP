"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionHeading({
  badge,
  title,
  subtitle,
  centered = true,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ y: 20 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className={`mb-12 lg:mb-16 ${centered ? "text-center" : ""}`}
    >
      {badge && (
        <span
          className="mb-4 inline-block rounded-lg px-3 py-1 text-sm font-semibold text-primary"
          style={{
            backgroundColor:
              "color-mix(in srgb, var(--color-primary, #006666) 10%, transparent)",
          }}
        >
          {badge}
        </span>
      )}
      <h2 className="text-2xl font-extrabold tracking-tight text-slate-dark sm:text-3xl lg:text-[2rem] lg:leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-base leading-[1.85] text-slate-muted sm:text-lg">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
