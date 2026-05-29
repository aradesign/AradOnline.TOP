import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import { getSiteSettings, defaultSettings } from "@/lib/settings";
import { SiteTheme } from "@/components/theme/SiteTheme";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { DarkModeAmbience } from "@/components/theme/DarkModeAmbience";
import "./globals.css";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazirmatn",
  display: "swap",
});

export const metadata: Metadata = {
  title: "آراد وب | سایت‌هایی که قطعی اینترنت هم نمی‌بنددشان",
  description:
    "طراحی سایت فروشگاهی و شرکتی برای کسب‌وکارهای شمال ایران — رشت، ساری، مازندران.",
};

export const dynamic = "force-dynamic";

const themeScript = `
(function(){
  try {
    var t = localStorage.getItem('arad-theme');
    var d = t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.add(d ? 'dark' : 'light');
    if (d) document.documentElement.style.colorScheme = 'dark';
  } catch (e) {}
})();
`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let settings = defaultSettings;
  try {
    settings = await getSiteSettings();
  } catch {
    /* defaults */
  }

  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans">
        <SiteTheme settings={settings} />
        <DarkModeAmbience />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
