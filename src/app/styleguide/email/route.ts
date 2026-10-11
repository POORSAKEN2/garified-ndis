import { buildEnquiryEmail } from "@/lib/enquiry-email";
import type { Enquiry } from "@/lib/enquiry-schema";

// Development-only preview of the enquiry email, with made-up details.
// ?services=none and ?priorities=none show the fallbacks.
const sample: Enquiry = {
  business: "Harbour Care Co",
  name: "Sam Lee",
  email: "sam@harbourcare.com.au",
  teamSize: "8–15 workers",
  services: ["rostering", "administration", "accounting"],
  priorities:
    "Roster changes come in all week and we rebuild Friday's roster by hand.\nInvoices are usually two weeks behind.",
};

export async function GET(request: Request) {
  if (process.env.NODE_ENV === "production") return new Response("Not found", { status: 404 });

  const params = new URL(request.url).searchParams;
  const data: Enquiry = {
    ...sample,
    services: params.get("services") === "none" ? [] : sample.services,
    priorities: params.get("priorities") === "none" ? "" : sample.priorities,
  };
  return new Response(buildEnquiryEmail(data), { headers: { "content-type": "text/html; charset=utf-8" } });
}
