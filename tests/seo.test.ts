import { describe, expect, it } from "vitest";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { services } from "@/content/services";
import { home } from "@/content/site";
import {
  SITE_URL,
  breadcrumbSchema,
  faqSchema,
  organizationSchema,
  pageMetadata,
  serializeJsonLd,
  serviceSchema,
} from "@/lib/seo";

describe("sitemap", () => {
  it("lists exactly the five public routes as absolute URLs", () => {
    expect(sitemap().map((entry) => entry.url)).toEqual([
      SITE_URL,
      `${SITE_URL}/services/rostering`,
      `${SITE_URL}/services/administration`,
      `${SITE_URL}/services/marketing`,
      `${SITE_URL}/services/accounting`,
    ]);
  });

  it("leaves the styleguide out", () => {
    expect(sitemap().some((entry) => entry.url.includes("styleguide"))).toBe(false);
  });
});

describe("robots", () => {
  it("allows crawling and points at the sitemap", () => {
    const result = robots();
    expect(result.rules).toEqual({ userAgent: "*", allow: "/" });
    expect(result.sitemap).toBe(`${SITE_URL}/sitemap.xml`);
  });
});

describe("pageMetadata", () => {
  it("sets the canonical and keeps the shared Open Graph fields", () => {
    const meta = pageMetadata({ title: "T", description: "D", path: "/services/rostering" });
    expect(meta.alternates?.canonical).toBe("/services/rostering");
    expect(meta.openGraph).toMatchObject({
      url: "/services/rostering",
      title: "T",
      description: "D",
      siteName: "Garified Solutions",
      locale: "en_AU",
      type: "website",
    });
  });
});

describe("structured data", () => {
  it("escapes < so copy cannot close the script tag", () => {
    expect(serializeJsonLd({ text: "</script><b>" })).not.toContain("<");
  });

  it("builds the FAQ from the approved copy, word for word", () => {
    const schema = faqSchema(home.faq.items);
    expect(schema["@type"]).toBe("FAQPage");
    expect(schema.mainEntity).toHaveLength(home.faq.items.length);
    expect(schema.mainEntity[0]).toEqual({
      "@type": "Question",
      name: home.faq.items[0].q,
      acceptedAnswer: { "@type": "Answer", text: home.faq.items[0].a },
    });
  });

  it("describes each service against the organisation", () => {
    const service = services[0];
    const schema = serviceSchema(service);
    expect(schema.url).toBe(`${SITE_URL}${service.href}`);
    expect(schema.description).toBe(service.detail.meta.description);
    expect(schema.provider).toEqual({ "@id": organizationSchema()["@id"] });
  });

  it("breadcrumbs run from home to the service", () => {
    const schema = breadcrumbSchema(services[1]);
    expect(schema.itemListElement.map((item) => item.item)).toEqual([
      SITE_URL,
      `${SITE_URL}${services[1].href}`,
    ]);
  });

  it("does not invent contact details, addresses or ratings", () => {
    const org = organizationSchema();
    for (const key of ["telephone", "email", "address", "aggregateRating", "taxID"]) {
      expect(org).not.toHaveProperty(key);
    }
  });
});
