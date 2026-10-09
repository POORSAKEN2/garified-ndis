import { SiteShell } from "@/components/layout/SiteShell";
import { Approach } from "@/components/sections/Approach";
import { ContactCta } from "@/components/sections/ContactCta";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Packages } from "@/components/sections/Packages";
import { ServiceList } from "@/components/sections/ServiceList";
import { WhoWeHelp } from "@/components/sections/WhoWeHelp";
import { ZoomReveal } from "@/components/sections/ZoomReveal";

export default function Home() {
  return (
    <SiteShell variant="home">
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
