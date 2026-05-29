import { footerLinks } from "@/lib/data";
import type { SiteSettingsMap } from "@/lib/settings";

export function Footer({ settings }: { settings: SiteSettingsMap }) {
  return (
    <footer className="site-footer border-t border-gray-100 bg-slate-dark text-white">
      <div className="container-narrow px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="footer-glow flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-lg font-bold">
                آ
              </div>
              <span className="text-xl font-bold">{settings.siteName}</span>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-gray-400">
              {settings.tagline}
            </p>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} {settings.siteName}. تمامی حقوق محفوظ است.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-bold">خدمات</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-gray-400 hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-bold">شرکت</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-gray-400 hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="/admin" className="text-sm text-gray-500 hover:text-gray-300">
                  پنل مدیریت
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-bold">تماس</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href={`tel:${settings.phone}`} className="hover:text-white" dir="ltr">
                  {settings.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${settings.email}`} className="hover:text-white">
                  {settings.email}
                </a>
              </li>
              <li>{settings.region}</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
