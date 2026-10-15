import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * Everything is crawlable. /styleguide is kept out of results by its own `noindex`
 * rather than a Disallow here: a disallowed page can't be fetched, so crawlers would
 * never see the noindex and could still list the bare URL.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
