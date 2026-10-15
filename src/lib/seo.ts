/**
 * Search metadata and structured data, built from the approved copy so nothing here
 * says more than the site does. No contact details, address, ABN, ratings or prices:
 * those are undecided or must not be invented (see PRODUCT.md). Add them here once real.
 */
import type { Metadata } from "next";
import type { Service } from "@/content/services";
import { services } from "@/content/services";
import { footer, home } from "@/content/site";

export const SITE_URL = "https://www.garifiedsolutions.com";
export const SITE_NAME = "Garified Solutions";

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/** `path` is "/" or a route such as "/services/rostering". */
export function absoluteUrl(path: string) {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

/**
 * Per-page metadata. Next merges metadata shallowly, so a page that sets `openGraph`
 * replaces the layout's whole object; the shared fields are repeated here so they
 * survive. The Open Graph image still comes from app/opengraph-image.png.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "en_AU",
      type: "website",
    },
  };
}

/**
 * Escapes `<` so a stray "</script>" in copy cannot end the tag early
 * (the approach in Next's JSON-LD guide).
 */
export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    alternateName: "Garified",
    url: SITE_URL,
    logo: `${SITE_URL}/icon.png`,
    description: footer.blurb,
    areaServed: { "@type": "Country", name: "Australia" },
    knowsAbout: services.map((s) => s.detail.hero.eyebrow),
  } as const;
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    description: home.meta.description,
    inLanguage: "en-AU",
    publisher: { "@id": ORG_ID },
  } as const;
}

export function faqSchema(items: readonly { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function serviceSchema(service: Service) {
  return {
    "@type": "Service",
    "@id": `${absoluteUrl(service.href)}#service`,
    name: service.detail.hero.eyebrow,
    serviceType: service.title,
    description: service.detail.meta.description,
    url: absoluteUrl(service.href),
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "Australia" },
    audience: { "@type": "BusinessAudience", audienceType: "NDIS provider businesses" },
  };
}

/** Home, then the service. There is no /services index page, so no middle crumb. */
export function breadcrumbSchema(service: Service) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: service.title, item: absoluteUrl(service.href) },
    ],
  };
}

/** Wraps nodes in one `@graph` so a page emits a single JSON-LD script. */
export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
