import { home } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/ui/SectionHead";
import { ProviderTabs } from "./ProviderTabs";

export function WhoWeHelp() {
  const copy = home.providers;
  return (
    <Section id={copy.id} aria-labelledby="providers-title">
      <SectionHead eyebrow={copy.eyebrow} title={copy.title} titleId="providers-title" />
      <ProviderTabs />
    </Section>
  );
}
