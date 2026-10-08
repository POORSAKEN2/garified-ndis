import { SiteShell } from "@/components/layout/SiteShell";
import { Approach } from "@/components/sections/Approach";
import { ContactCta } from "@/components/sections/ContactCta";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Packages } from "@/components/sections/Packages";
import { Ribbon } from "@/components/sections/Ribbon";
import { ServiceList } from "@/components/sections/ServiceList";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhoWeHelp } from "@/components/sections/WhoWeHelp";

export default function Home() {
  return (
    <SiteShell variant="home">
      <Hero />
      <Ribbon />
      <ServiceList />
      <Approach />
      <Testimonials />
      <WhoWeHelp />
      <Packages />
      <Faq />
      <ContactCta />
    </SiteShell>
  );
}
