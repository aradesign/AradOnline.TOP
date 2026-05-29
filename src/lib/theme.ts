import type { SiteSettingsMap } from "./settings";

export function themeToCssVars(
  theme: SiteSettingsMap["theme"]
): Record<string, string> {
  return {
    ["--color-primary" as string]: theme.primary,
    ["--color-primary-light" as string]: theme.primaryLight,
    ["--color-primary-dark" as string]: theme.primaryDark,
    ["--color-accent-blue" as string]: theme.accentBlue,
    ["--color-accent-orange" as string]: theme.accentOrange,
    ["--color-text-dark" as string]: theme.textDark,
    ["--color-text-muted" as string]: theme.textMuted,
    ["--color-section-bg" as string]: theme.sectionBg,
    ["--color-hero-tint" as string]: theme.heroTint,
  };
}

export type ThemeColors = SiteSettingsMap["theme"];

/** دارک پریمیوم — رنگ برند از CMS، پس‌زمینه عمیق و متغیرهای افکت */
export function darkThemeCssVars(t: ThemeColors): Record<string, string> {
  const p = t.primary;
  const blue = t.accentBlue;
  const orange = t.accentOrange;

  return {
    "--color-bg": "#020408",
    "--color-surface": `color-mix(in srgb, ${p} 7%, #0a1018)`,
    "--color-glass": `color-mix(in srgb, ${p} 10%, rgba(10, 16, 24, 0.65))`,
    "--color-border": `color-mix(in srgb, ${p} 32%, rgba(255, 255, 255, 0.07))`,
    "--color-section-bg": `color-mix(in srgb, ${p} 4%, #050a10)`,
    "--color-hero-tint": "#010306",
    "--color-text-dark": "#f2fbf9",
    "--color-text-muted": `color-mix(in srgb, ${t.textMuted} 22%, #8aa8a0)`,
    "--neon-glow": `0 0 32px color-mix(in srgb, ${p} 60%, transparent), 0 0 64px color-mix(in srgb, ${p} 25%, transparent), 0 0 100px color-mix(in srgb, ${blue} 12%, transparent)`,
    "--neon-glow-sm": `0 0 20px color-mix(in srgb, ${p} 45%, transparent), 0 0 40px color-mix(in srgb, ${p} 15%, transparent)`,
    "--neon-text": `0 0 28px color-mix(in srgb, ${p} 70%, transparent), 0 0 56px color-mix(in srgb, ${p} 30%, transparent)`,
    "--mesh-primary": `color-mix(in srgb, ${p} 42%, transparent)`,
    "--mesh-blue": `color-mix(in srgb, ${blue} 32%, transparent)`,
    "--mesh-orange": `color-mix(in srgb, ${orange} 22%, transparent)`,
    "--grid-line": `color-mix(in srgb, ${p} 14%, transparent)`,
    "--gradient-border": `linear-gradient(135deg, color-mix(in srgb, ${p} 70%, transparent), color-mix(in srgb, ${blue} 45%, transparent), color-mix(in srgb, ${orange} 25%, transparent))`,
  };
}

export function fontToCssVar(font: SiteSettingsMap["font"]): string {
  if (font.mode === "custom" && font.customFileUrl) {
    const name = font.customFamilyName || "AradCustom";
    return `'${name}', var(--font-vazirmatn), system-ui, sans-serif`;
  }

  const presets: Record<string, string> = {
    vazirmatn: "var(--font-vazirmatn), system-ui, sans-serif",
    estedad: "'Estedad', var(--font-vazirmatn), system-ui, sans-serif",
    iranyekan: "'IRANYekan', var(--font-vazirmatn), system-ui, sans-serif",
  };

  return presets[font.presetId] || presets.vazirmatn;
}

export const FONT_PRESET_OPTIONS = [
  { id: "vazirmatn", label: "وزیرمتن (پیش‌فرض)" },
  { id: "estedad", label: "استعداد" },
  { id: "iranyekan", label: "ایران‌یکان" },
] as const;

export const COLOR_FIELDS: {
  key: keyof SiteSettingsMap["theme"];
  label: string;
  hint?: string;
}[] = [
  { key: "primary", label: "رنگ اصلی (دکمه‌ها و برند)" },
  { key: "primaryLight", label: "رنگ اصلی روشن (هاور)" },
  { key: "primaryDark", label: "رنگ اصلی تیره" },
  { key: "accentBlue", label: "رنگ تأکید آبی" },
  { key: "accentOrange", label: "رنگ تأکید نارنجی (CTA ویژه)" },
  { key: "textDark", label: "متن اصلی" },
  { key: "textMuted", label: "متن ثانویه" },
  { key: "sectionBg", label: "پس‌زمینه سکشن‌های متناوب" },
  { key: "heroTint", label: "پس‌زمینه Hero" },
];
