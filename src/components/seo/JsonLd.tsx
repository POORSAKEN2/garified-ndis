import { serializeJsonLd } from "@/lib/seo";

/**
 * Structured data for search engines. A plain <script>, not next/script: JSON-LD is
 * data, not code to run.
 */
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />;
}
