import type { SiteSettingsMap } from "@/lib/settings";
import { defaultTheme } from "@/lib/settings";
import { darkThemeCssVars, fontToCssVar } from "@/lib/theme";

const PRESET_FONT_IMPORTS: Record<string, string> = {
  estedad:
    "@import url('https://fonts.googleapis.com/css2?family=Estedad:wght@400;500;600;700;800&display=swap');",
  iranyekan:
    "@import url('https://fonts.bunny.net/css?family=iranyekan:400,500,700,800&display=swap');",
};

function safeColor(value: string | undefined, fallback: string): string {
  if (!value || typeof value !== "string") return fallback;
  const trimmed = value.trim();
  if (/^#[0-9A-Fa-f]{3,8}$/.test(trimmed)) return trimmed;
  return fallback;
}

function safeFontName(name: string): string {
  return name.replace(/['"\\]/g, "").slice(0, 64) || "AradCustom";
}

function safeUrl(url: string): string {
  if (!url.startsWith("/uploads/fonts/")) return "";
  return url.replace(/['"\\]/g, "");
}

function fontFormatFromUrl(url: string): string {
  if (url.endsWith(".woff2")) return "woff2";
  if (url.endsWith(".woff")) return "woff";
  if (url.endsWith(".otf")) return "opentype";
  if (url.endsWith(".ttf")) return "truetype";
  return "woff2";
}

function cssBlock(selector: string, vars: Record<string, string>): string {
  const lines = Object.entries(vars)
    .map(([k, v]) => `    ${k}: ${v};`)
    .join("\n");
  return `${selector} {\n${lines}\n  }`;
}

export function SiteTheme({ settings }: { settings: SiteSettingsMap }) {
  const theme = settings.theme ?? defaultTheme;
  const t = {
    primary: safeColor(theme.primary, defaultTheme.primary),
    primaryLight: safeColor(theme.primaryLight, defaultTheme.primaryLight),
    primaryDark: safeColor(theme.primaryDark, defaultTheme.primaryDark),
    accentBlue: safeColor(theme.accentBlue, defaultTheme.accentBlue),
    accentOrange: safeColor(theme.accentOrange, defaultTheme.accentOrange),
    textDark: safeColor(theme.textDark, defaultTheme.textDark),
    textMuted: safeColor(theme.textMuted, defaultTheme.textMuted),
    sectionBg: safeColor(theme.sectionBg, defaultTheme.sectionBg),
    heroTint: safeColor(theme.heroTint, defaultTheme.heroTint),
  };

  const fontFamily = fontToCssVar(settings.font);
  const fontImport =
    settings.font.mode === "preset"
      ? PRESET_FONT_IMPORTS[settings.font.presetId] || ""
      : "";

  const customUrl = safeUrl(settings.font.customFileUrl || "");
  const customName = safeFontName(settings.font.customFamilyName || "AradCustom");

  let customFontCss = "";
  if (settings.font.mode === "custom" && customUrl) {
    const fmt = fontFormatFromUrl(customUrl);
    customFontCss = `
      @font-face {
        font-family: '${customName}';
        src: url('${customUrl}') format('${fmt}');
        font-weight: 100 900;
        font-display: swap;
      }
    `;
  }

  const brandVars: Record<string, string> = {
    "--color-primary": t.primary,
    "--color-primary-light": t.primaryLight,
    "--color-primary-dark": t.primaryDark,
    "--color-accent-blue": t.accentBlue,
    "--color-accent-orange": t.accentOrange,
    "--font-body": fontFamily,
  };

  const lightVars: Record<string, string> = {
    ...brandVars,
    "--color-text-dark": t.textDark,
    "--color-text-muted": t.textMuted,
    "--color-section-bg": t.sectionBg,
    "--color-hero-tint": t.heroTint,
    "--color-bg": "#ffffff",
    "--color-surface": "#ffffff",
    "--color-border": "#e2e8f0",
    "--neon-glow": "none",
    "--neon-glow-sm": "none",
    "--neon-text": "none",
  };

  const darkVars: Record<string, string> = {
    ...brandVars,
    ...darkThemeCssVars(t),
  };

  const css = `
    ${fontImport}
    ${customFontCss}
    ${cssBlock(":root, html.light", lightVars)}
    ${cssBlock("html.dark", darkVars)}
  `;

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: css,
      }}
    />
  );
}
