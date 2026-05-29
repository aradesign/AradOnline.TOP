import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, MapPin, Calendar, User, ExternalLink } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { getPortfolioBySlug, getPublishedPortfolio } from "@/lib/cms";
import { getSiteSettings } from "@/lib/settings";
import { renderMarkdown } from "@/lib/markdown";
import { parseGalleryImages } from "@/lib/images";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPortfolioBySlug(slug);
  if (!project) return { title: "پروژه یافت نشد" };
  return {
    title: `${project.title} | آراد وب`,
    description: project.excerpt || project.title,
  };
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;
  const [project, settings, allProjects] = await Promise.all([
    getPortfolioBySlug(slug),
    getSiteSettings(),
    getPublishedPortfolio(),
  ]);

  if (!project) notFound();

  const related = allProjects
    .filter((p) => p.id !== project.id && p.category === project.category)
    .slice(0, 3);

  const services = project.services?.split(",").map((s) => s.trim()) ?? [];
  const contentHtml = renderMarkdown(project.content);
  const gallery = parseGalleryImages(project.galleryImages);

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section
          className={`relative overflow-hidden pt-24 ${
            project.screenshotUrl
              ? "bg-[var(--color-bg)]"
              : `bg-gradient-to-br ${project.coverGradient}`
          }`}
        >
          <div className="container-narrow px-4 pb-16 pt-8 sm:px-6 lg:px-8">
            <Link
              href="/#portfolio"
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <ArrowRight size={16} />
              بازگشت به نمونه‌کارها
            </Link>

            <div className="max-w-3xl">
              <span className="mb-4 inline-block rounded-full bg-white/90 px-4 py-1 text-sm font-medium text-primary">
                {project.category}
              </span>
              <h1 className="text-3xl font-extrabold text-slate-dark sm:text-4xl lg:text-5xl">
                {project.title}
              </h1>
              {project.excerpt && (
                <p className="mt-4 text-lg leading-relaxed text-slate-muted">
                  {project.excerpt}
                </p>
              )}

              <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-muted">
                <span className="flex items-center gap-1">
                  <MapPin size={16} className="text-primary" />
                  {project.city}
                </span>
                {project.clientName && (
                  <span className="flex items-center gap-1">
                    <User size={16} className="text-primary" />
                    {project.clientName}
                  </span>
                )}
                {project.year && (
                  <span className="flex items-center gap-1">
                    <Calendar size={16} className="text-primary" />
                    {project.year}
                  </span>
                )}
              </div>

              {project.projectUrl && (
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white"
                >
                  <ExternalLink size={18} />
                  مشاهده سایت زنده
                </a>
              )}
            </div>
          </div>

          {project.screenshotUrl && (
            <div className="container-narrow px-4 pb-12 sm:px-6 lg:px-8">
              <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] shadow-2xl zp-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.screenshotUrl}
                  alt={`اسکرین‌شات ${project.title}`}
                  className="w-full object-cover object-top"
                />
              </div>
            </div>
          )}
        </section>

        {gallery.length > 0 && (
          <section className="border-t border-[var(--color-border)] pb-16">
            <div className="container-narrow px-4 sm:px-6 lg:px-8">
              <h2 className="mb-8 text-2xl font-bold text-slate-dark">گالری پروژه</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {gallery.map((url) => (
                  <div
                    key={url}
                    className="group overflow-hidden rounded-2xl border border-[var(--color-border)] zp-card"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={url}
                      alt=""
                      className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Content */}
        <section className="section-padding">
          <div className="container-narrow">
            <div className="grid gap-12 lg:grid-cols-3">
              <article className="lg:col-span-2">
                <div
                  className="prose prose-slate max-w-none"
                  dangerouslySetInnerHTML={{ __html: contentHtml }}
                />
              </article>

              <aside className="space-y-6">
                {services.length > 0 && (
                  <div className="zp-card p-6">
                    <h3 className="mb-4 font-bold text-slate-dark">
                      خدمات ارائه‌شده
                    </h3>
                    <ul className="space-y-2">
                      {services.map((s) => (
                        <li
                          key={s}
                          className="flex items-center gap-2 text-sm text-slate-muted"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="rounded-2xl bg-gradient-to-br from-primary to-primary-light p-6 text-white">
                  <h3 className="mb-2 font-bold">پروژه مشابه می‌خواهید؟</h3>
                  <p className="mb-4 text-sm text-white/90">
                    مشاوره رایگان برای کسب‌وکارهای {project.city} و شمال ایران
                  </p>
                  <a
                    href="/#contact"
                    className="inline-block rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-primary"
                  >
                    مشاوره رایگان
                  </a>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="section-padding zp-section-alt">
            <div className="container-narrow">
              <h2 className="mb-8 text-2xl font-bold text-slate-dark">
                پروژه‌های مرتبط
              </h2>
              <div className="grid gap-6 sm:grid-cols-3">
                {related.map((p) => (
                  <Link
                    key={p.id}
                    href={`/portfolio/${p.slug}`}
                    className="zp-card overflow-hidden transition-transform hover:-translate-y-1"
                  >
                    {p.thumbnailUrl ? (
                      <div className="relative h-32 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={p.thumbnailUrl}
                          alt={p.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <div
                        className={`flex h-32 items-center justify-center bg-gradient-to-br ${p.coverGradient}`}
                      >
                        <span className="text-3xl">🌐</span>
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-bold">{p.title}</h3>
                      <p className="text-sm text-slate-muted">{p.city}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer settings={settings} />
      <WhatsAppButton whatsapp={settings.whatsapp} />
    </>
  );
}
