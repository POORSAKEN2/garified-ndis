/**
 * The four services: the home list rows and the full service page copy.
 * Transcribed 1:1 from the reference site. Do not reword.
 */
import type { ServiceId } from "./types";

export type Service = {
  id: ServiceId;
  number: string;
  href: `/services/${ServiceId}`;
  title: string;
  /** Short line under the title on the home list, and the H2 on the service page. */
  tagline: string;
  /** Home list description. */
  summary: string;
  tags: readonly string[];
  page: {
    metaTitle: string;
    eyebrow: string;
    /** Intro paragraph, also the meta description. */
    intro: string;
    items: readonly string[];
    callout: { title: string; text: string };
  };
};

export const servicePage = {
  backLink: "All services",
  backHref: "/#services",
  calloutLink: "Discuss this service",
} as const;

export const services = [
  {
    id: "rostering",
    number: "01",
    href: "/services/rostering",
    title: "Rostering",
    tagline: "A clearer week. A better prepared team.",
    summary:
      "Staff availability, shift confirmations and roster updates, organised around your approved service requirements.",
    tags: ["Roster preparation", "Availability & leave", "Shift follow-up"],
    page: {
      metaTitle: "Rostering | Garified",
      eyebrow: "01 / Garified services",
      intro:
        "Bring structure to worker availability, confirmations and roster changes. We maintain the agreed workflow around your approved service requirements, with a clear view of gaps needing your team's decision.",
      items: [
        "Maintain staff availability, leave requests and recurring bookings",
        "Prepare draft rosters using approved worker and participant requirements",
        "Follow up shift confirmations through your agreed channels",
        "Record approved changes, cancellations and unresolved gaps",
        "Prepare roster exception reports for your operations contact",
      ],
      callout: {
        title: "Your team stays in control.",
        text: "Your provider retains worker suitability, staffing requirements and final roster approval. We follow the employer-approved rules and escalate exceptions. Live emergency dispatch and after-hours coverage need a separate scope.",
      },
    },
  },
  {
    id: "administration",
    number: "02",
    href: "/services/administration",
    title: "Administration",
    tagline: "The details, taken care of.",
    summary:
      "Keep intake, agreements, staff documents and day-to-day records moving with a structured administration workflow.",
    tags: ["Participant intake", "Document tracking", "Inbox & records"],
    page: {
      metaTitle: "Administration | Garified",
      eyebrow: "02 / Garified services",
      intro:
        "An organised administration workflow helps your team see what is complete and what needs attention. We prepare and follow up the agreed records using your templates, instructions and systems.",
      items: [
        "Prepare intake packs and service agreement drafts",
        "Follow up missing administrative documents",
        "Maintain staff onboarding and document expiry trackers",
        "Organise your agreed inbox and route enquiries to the right contact",
        "Prepare timesheet, invoice and operations reporting inputs",
      ],
      callout: {
        title: "Clear records. Clear responsibilities.",
        text: "Your team owns participant acceptance, safeguarding and final approvals. Complaints and safety concerns are routed promptly to your nominated contact under the provider's procedure.",
      },
    },
  },
  {
    id: "marketing",
    number: "03",
    href: "/services/marketing",
    title: "Marketing",
    tagline: "Make the right connections.",
    summary:
      "Thoughtful content, referral outreach and vacancy campaigns, with a clear path from first enquiry to your intake team.",
    tags: ["Content & campaigns", "SDA vacancy marketing", "Enquiry follow-up"],
    page: {
      metaTitle: "Marketing | Garified",
      eyebrow: "03 / Garified services",
      intro:
        "Present your services clearly and organise the next step for each enquiry. Our marketing support connects verified capacity, relevant content and referral follow-up with your existing intake process.",
      items: [
        "Create approved content plans and service information",
        "Manage agreed campaigns and track enquiry sources",
        "Prepare SDA property listing copy and vacancy creatives",
        "Research relevant provider and housing referral contacts",
        "Maintain enquiry trackers and coordinate callbacks or viewings",
      ],
      callout: {
        title: "Visibility with a clear next step.",
        text: "We promote verified services and property details with approved images and claims. Your intake team assesses suitability and funding. Advertising spend is separate; enquiry or occupancy outcomes are not guaranteed.",
      },
    },
  },
  {
    id: "accounting",
    number: "04",
    href: "/services/accounting",
    title: "Accounting support",
    tagline: "Know where your business stands.",
    summary:
      "Invoice preparation, payment matching and organised finance records, working alongside your accountant or registered practitioner.",
    tags: ["Invoice preparation", "Reconciliations", "Finance reporting"],
    page: {
      metaTitle: "Accounting support | Garified",
      eyebrow: "04 / Garified services",
      intro:
        "Keep finance preparation moving with organised inputs and a visible exception list. Our financial administration works alongside your provider's accountant or appropriately registered practitioner.",
      items: [
        "Prepare invoices from approved service records and rates",
        "Match payments and perform agreed bank reconciliations",
        "Follow up debtors through approved messages",
        "Compile timesheet and payroll input packs",
        "Prepare summaries from approved accounting records",
      ],
      callout: {
        title: "Preparation with the right review.",
        text: "BAS, tax interpretation and regulated payroll or accounting work require the appropriate registered practitioner and engagement. Your provider or practitioner retains the relevant decisions and authorisations.",
      },
    },
  },
] as const satisfies readonly Service[];

export function getService(id: ServiceId): Service {
  const service = services.find((s) => s.id === id);
  if (!service) throw new Error(`Unknown service: ${id}`);
  return service;
}

/** H1 on a service page: the title plus a full stop. */
export function serviceHeading(service: Service) {
  return `${service.title}.`;
}

/** "Explore rostering" — the aria label on each home list link. */
export function exploreLabel(service: Service) {
  return `Explore ${service.title.toLowerCase()}`;
}
