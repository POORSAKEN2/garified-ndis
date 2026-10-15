import { SiteShell } from "@/components/layout/SiteShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { Approach } from "@/components/sections/Approach";
import { ContactCta } from "@/components/sections/ContactCta";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Packages } from "@/components/sections/Packages";
import { ServiceList } from "@/components/sections/ServiceList";
import { WhoWeHelp } from "@/components/sections/WhoWeHelp";
import { ZoomReveal } from "@/components/sections/ZoomReveal";
import { home } from "@/content/site";
import { faqSchema, graph, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ ...home.meta, path: "/" });

export default function Home() {
  return (
    <SiteShell variant="home">
      <JsonLd data={graph(faqSchema(home.faq.items))} />
      <Hero />
      <ZoomReveal />
      <ServiceList />
      <Approach />
      <WhoWeHelp />
      <Packages />
      <Faq />
      <ContactCta />
    </SiteShell>
  );
}
