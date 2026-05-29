"use client";

export type MarqueeLogo = {
  name: string;
  logoUrl?: string | null;
  abbr?: string;
  websiteUrl?: string | null;
};

function LogoItem({ name, logoUrl, abbr, websiteUrl }: MarqueeLogo) {
  const inner = (
    <div className="logo-marquee-item mx-6 flex h-16 w-40 shrink-0 items-center justify-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 transition-all hover:shadow-md">
      {logoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logoUrl}
          alt={name}
          className="max-h-10 max-w-[120px] object-contain grayscale transition-all group-hover:grayscale-0"
        />
      ) : (
        <>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-section-bg)] text-xs font-bold text-slate-muted">
            {abbr || name.slice(0, 2)}
          </div>
          <span className="truncate text-sm font-medium text-slate-muted">{name}</span>
        </>
      )}
    </div>
  );

  if (websiteUrl) {
    return (
      <a
        href={websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group"
        title={name}
      >
        {inner}
      </a>
    );
  }

  return <div className="group">{inner}</div>;
}

export function LogoMarquee({ logos }: { logos: MarqueeLogo[] }) {
  if (logos.length === 0) return null;

  const items = [...logos, ...logos];

  return (
    <section className="border-y border-[var(--color-border)] bg-section py-10">
      <div className="container-narrow mb-6 text-center">
        <p className="text-sm font-medium text-slate-muted">
          مورد اعتماد کسب‌وکارهای{" "}
          <span className="font-bold text-slate-dark">شمال ایران</span>
        </p>
      </div>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-section to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-section to-transparent" />
        <div className="marquee-track animate-marquee">
          {items.map((logo, i) => (
            <LogoItem key={`${logo.name}-${i}`} {...logo} />
          ))}
        </div>
      </div>
    </section>
  );
}
