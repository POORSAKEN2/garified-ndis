import type { Metadata } from "next";
import Link from "next/link";
import { notFoundPage } from "@/content/site";
import { services } from "@/content/services";
import { SiteShell } from "@/components/layout/SiteShell";
import { ButtonLink } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { ArrowIcon } from "@/components/ui/Icons";

export const metadata: Metadata = { title: notFoundPage.meta.title };

export default function NotFound() {
  return (
    <SiteShell variant="service" ctaBar={false}>
      <section className="py-section">
        <div className="container-site grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-20">
          <div>
            <Heading as="h1" size="h2" content={notFoundPage.title} />
            <p className="measure mt-6 text-lead text-muted">{notFoundPage.text}</p>
            <ButtonLink href="/" arrow="right" className="mt-8">
              {notFoundPage.home}
            </ButtonLink>
          </div>

          <ul className="border-t border-line">
            {services.map((service) => (
              <li key={service.id} className="border-b border-line">
                <Link
                  href={service.href}
                  className="group flex min-h-16 items-center gap-5 py-3 text-navy"
                >
                  <span className="w-7 text-small font-medium tabular-nums text-muted">
                    {service.number}
                  </span>
                  <span className="text-h4 font-bold transition-colors group-hover:text-blue">
                    {service.title}
                  </span>
                  <ArrowIcon className="ml-auto text-blue" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SiteShell>
  );
}
