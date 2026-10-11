import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/SiteShell";
import { BR } from "@/content/types";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { CheckIcon } from "@/components/ui/Icons";
import { Section } from "@/components/ui/Section";
import { TextLink } from "@/components/ui/TextLink";

// Development-only scratch page for checking the primitives. Not part of the five routes.
export const metadata: Metadata = { title: "Styleguide", robots: { index: false } };

export default function Styleguide() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <SiteShell variant="home">
      <Section data-cta-hide>
        <Eyebrow>NDIS provider business support</Eyebrow>
        <Heading
          as="h1"
          className="mt-5"
          content={["The business", BR, "behind", BR, { em: "better care." }]}
        />
        <p className="measure mt-6 text-lead text-muted">
          Rostering, administration, marketing and accounting support. Thoughtfully organised
          around your NDIS business.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Button>Find your support</Button>
          <TextLink href="#services" arrow="down">
            Explore our services
          </TextLink>
        </div>
      </Section>

      <Section ground="tint" id="services">
        <Heading content={["Four services.", BR, "One clear ", { em: "partner." }]} />
        <Heading as="h3" className="mt-10" content="Keep everyday services moving." />
        <Heading as="h4" className="mt-6" content="Rostering" />
        <p className="measure mt-4 text-muted">
          Good support starts by understanding how your business works. We agree the scope, follow
          your approved processes and keep your team in control.
        </p>
        <p className="mt-4 text-small text-muted">
          Tailored to your workload. Advertising spend and registered practitioner services are
          scoped separately.
        </p>
        <ul className="mt-6 grid gap-3">
          {["Rosters and worker confirmations", "Intake and staff document tracking"].map((item) => (
            <li key={item} className="flex items-start gap-3 font-semibold">
              <CheckIcon className="mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <Eyebrow>Buttons on light</Eyebrow>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Button>Let’s talk</Button>
          <ButtonLink href="#services" variant="outline">
            Explore Admin Essentials
          </ButtonLink>
          <Button size="sm">Let’s talk</Button>
          <TextLink href="#services" arrow="right">
            Explore service
          </TextLink>
          <TextLink href="#services" arrow="left">
            All services
          </TextLink>
        </div>
      </Section>

      <Section ground="deep" id="approach">
        <div id="contact" data-cta-hide />
        <Heading
          content={["Your systems.", BR, "Your standards.", BR, { em: "Our support." }]}
        />
        <p className="measure mt-6 text-on-deep">
          Good support starts by understanding how your business works.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button variant="white">Discuss your workflow</Button>
          <TextLink href="#services" arrow="right">
            Explore service
          </TextLink>
        </div>
      </Section>
    </SiteShell>
  );
}
