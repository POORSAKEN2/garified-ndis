import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { absoluteUrl } from "@/lib/seo";

/**
 * The five public routes. No `lastModified`: a build timestamp would claim every page
 * changed on every deploy, which teaches crawlers to ignore the field.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
    ...services.map((service) => ({
      url: absoluteUrl(service.href),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
