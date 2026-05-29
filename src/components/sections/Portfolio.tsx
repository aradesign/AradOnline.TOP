"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { PortfolioProject } from "@prisma/client";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

function ProjectCover({ project }: { project: PortfolioProject }) {
  if (project.thumbnailUrl) {
    return (
      <div className="relative h-48 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.thumbnailUrl}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute right-3 top-3 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
          {project.category}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`relative flex h-48 items-center justify-center bg-gradient-to-br ${project.coverGradient}`}
    >
      <div className="text-center">
        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/80 text-2xl shadow-sm">
          🌐
        </div>
        <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-primary">
          {project.category}
        </span>
      </div>
    </div>
  );
}

export function Portfolio({ projects }: { projects: PortfolioProject[] }) {
  return (
    <AnimatedSection id="portfolio" className="section-padding">
      <div className="container-narrow">
        <SectionHeading
          badge="نمونه‌کارها"
          title="پروژه‌هایی که به فروش کمک کردند"
          subtitle="نمونه‌ای از کارهای ما برای فروشگاه‌ها و شرکت‌های شمال ایران."
        />

        {projects.length === 0 ? (
          <p className="text-center text-slate-muted">
            به‌زودی نمونه‌کارها اضافه می‌شوند.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="group zp-card overflow-hidden"
              >
                <Link href={`/portfolio/${project.slug}`} className="block">
                  <div className="relative overflow-hidden">
                    <ProjectCover project={project} />
                    <div className="absolute inset-0 flex items-center justify-center bg-primary/80 opacity-0 transition-opacity group-hover:opacity-100">
                      <span className="flex items-center gap-2 text-white">
                        <ExternalLink size={18} />
                        مشاهده پروژه
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="mb-1 font-bold text-slate-dark">{project.title}</h3>
                    <p className="text-sm text-slate-muted">📍 {project.city}</p>
                    {project.excerpt && (
                      <p className="mt-2 line-clamp-2 text-sm text-slate-muted">
                        {project.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-primary px-8 py-3 font-semibold text-primary transition-all hover:bg-primary hover:text-white"
          >
            پروژه بعدی شماست — مشاوره بگیرید
          </a>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
