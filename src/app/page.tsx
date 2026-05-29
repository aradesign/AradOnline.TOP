import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { Hero } from "@/components/sections/Hero";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { StatsBar } from "@/components/sections/StatsBar";
import { Problem } from "@/components/sections/Problem";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Benefits } from "@/components/sections/Benefits";
import { Services } from "@/components/sections/Services";
import { Portfolio } from "@/components/sections/Portfolio";
import { Testimonials } from "@/components/sections/Testimonials";
import { SpecialOffer } from "@/components/sections/SpecialOffer";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { getSiteSettings } from "@/lib/settings";
import {
  getPublishedPortfolio,
  getPublishedTestimonials,
  getPublishedClientLogos,
} from "@/lib/cms";
import type { MarqueeLogo } from "@/components/sections/LogoMarquee";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [settings, portfolio, testimonials, clientLogos] = await Promise.all([
    getSiteSettings(),
    getPublishedPortfolio(),
    getPublishedTestimonials(),
    getPublishedClientLogos(),
  ]);

  const marqueeLogos: MarqueeLogo[] =
    clientLogos.length > 0
      ? clientLogos.map((c) => ({
          name: c.name,
          logoUrl: c.logoUrl,
          websiteUrl: c.websiteUrl,
        }))
      : settings.clientLogos.map((c) => ({
          name: c.name,
          abbr: c.abbr,
        }));

  return (
    <>
      <Header />
      <main>
        <Hero settings={settings} />
        <LogoMarquee logos={marqueeLogos} />
        <StatsBar stats={settings.heroStats} />
        <Problem />
        <HowItWorks />
        <Benefits />
        <Services />
        <Portfolio projects={portfolio} />
        <Testimonials items={testimonials} />
        <SpecialOffer settings={settings} />
        <Pricing />
        <FAQ />
        <Contact settings={settings} />
      </main>
      <Footer settings={settings} />
      <WhatsAppButton whatsapp={settings.whatsapp} />
    </>
  );
}
