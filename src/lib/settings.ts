import { prisma } from "@/lib/prisma";

export type ThemeColors = {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  accentBlue: string;
  accentOrange: string;
  textDark: string;
  textMuted: string;
  sectionBg: string;
  heroTint: string;
};

export type FontSettings = {
  mode: "preset" | "custom";
  presetId: string;
  customFamilyName: string;
  customFileUrl: string;
};

export type SiteSettingsMap = {
  siteName: string;
  tagline: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  email: string;
  region: string;
  heroTitle: string;
  heroHighlight: string;
  heroSubtitle: string;
  offerTitle: string;
  offerDescription: string;
  clientLogos: { name: string; abbr: string }[];
  heroStats: { value: string; label: string }[];
  theme: ThemeColors;
  font: FontSettings;
};

export const defaultTheme: ThemeColors = {
  primary: "#006666",
  primaryLight: "#007777",
  primaryDark: "#004d4d",
  accentBlue: "#3B82F6",
  accentOrange: "#F97316",
  textDark: "#1E293B",
  textMuted: "#64748B",
  sectionBg: "#F7F9FC",
  heroTint: "#F0F7F7",
};

export const defaultFont: FontSettings = {
  mode: "preset",
  presetId: "vazirmatn",
  customFamilyName: "AradCustom",
  customFileUrl: "",
};

export const defaultSettings: SiteSettingsMap = {
  siteName: "آراد وب",
  tagline: "سایت‌هایی که قطعی اینترنت هم نمی‌بنددشان",
  phone: "+989121234567",
  phoneDisplay: "۰۹۱۲-۱۲۳-۴۵۶۷",
  whatsapp: "989121234567",
  email: "info@aradweb.ir",
  region: "گیلان، مازندران، گلستان — دفتر مجازی با پشتیبانی آنلاین",
  heroTitle: "سایت بسازید که",
  heroHighlight: "قطعی اینترنت هم نبنددش!",
  heroSubtitle:
    "سایت‌هایی که قطعی اینترنت هم نمی‌بنددشان — فروش آنلاین شما در رشت، ساری و مازندران حتی وقتی اینستاگرام و تلگرام قطع است، ادامه دارد.",
  offerTitle: "۲۰٪ تخفیف برای کسب‌وکارهای گیلان و مازندران",
  offerDescription:
    "تا پایان فصل جاری، پکیج حرفه‌ای سایت فروشگاهی با ۲۰٪ تخفیف ویژه — فقط برای ثبت‌نام‌های رشت، ساری، بابل، آمل و سایر شهرهای شمال.",
  clientLogos: [
    { name: "پوشاک رشت", abbr: "پر" },
    { name: "ساختمان ساری", abbr: "سس" },
    { name: "رستوران بابل", abbr: "رب" },
    { name: "کلینیک آمل", abbr: "کا" },
  ],
  heroStats: [
    { value: "+۵۰", label: "پروژه تحویل‌شده" },
    { value: "۹۸٪", label: "رضایت مشتری" },
    { value: "۲۴/۷", label: "پشتیبانی" },
    { value: "۱۴", label: "شهر شمال" },
  ],
  theme: defaultTheme,
  font: defaultFont,
};

function mergeSettings(rows: { key: string; value: string }[]): SiteSettingsMap {
  const merged: SiteSettingsMap = {
    ...defaultSettings,
    theme: { ...defaultTheme },
    font: { ...defaultFont },
    clientLogos: [...defaultSettings.clientLogos],
    heroStats: [...defaultSettings.heroStats],
  };

  for (const row of rows) {
    try {
      const parsed = JSON.parse(row.value);
      if (row.key === "theme" && parsed && typeof parsed === "object") {
        merged.theme = { ...defaultTheme, ...parsed };
      } else if (row.key === "font" && parsed && typeof parsed === "object") {
        merged.font = { ...defaultFont, ...parsed };
      } else if (row.key in merged) {
        (merged as Record<string, unknown>)[row.key] = parsed;
      }
    } catch {
      if (row.key in merged) {
        (merged as Record<string, unknown>)[row.key] = row.value;
      }
    }
  }

  return merged;
}

export async function getSiteSettings(): Promise<SiteSettingsMap> {
  try {
    const rows = await prisma.siteSetting.findMany();
    if (rows.length === 0) return defaultSettings;
    return mergeSettings(rows);
  } catch (error) {
    console.error("[getSiteSettings]", error);
    return defaultSettings;
  }
}

export async function saveSiteSettings(settings: Partial<SiteSettingsMap>) {
  for (const [key, value] of Object.entries(settings)) {
    await prisma.siteSetting.upsert({
      where: { key },
      create: { key, value: JSON.stringify(value) },
      update: { value: JSON.stringify(value) },
    });
  }
}
