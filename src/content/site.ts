/**
 * Home page and site-wide copy, transcribed 1:1 from the reference site.
 * Punctuation is deliberate: curly ’ in "Let’s" and "We’ll", straight ' in
 * "team's", "provider's" and "home's", en dash in team sizes. Do not reword.
 */
import { BR, type Rich, type ServiceId } from "./types";

export const site = {
  name: "Garified",
  wordmarkLabel: "Garified home",
  skipLink: "Skip to content",
  letsTalk: "Let’s talk",
  nav: {
    label: "Main navigation",
    mobileLabel: "Mobile navigation",
    open: "Open navigation",
    close: "Close navigation",
    links: [
      { label: "Our services", href: "#services" },
      { label: "Our approach", href: "#approach" },
      { label: "Who we help", href: "#providers" },
    ],
  },
} as const;

export type ProviderTab = {
  id: "in-home" | "sil" | "sda";
  tab: string;
  title: string;
  text: string;
  items: readonly string[];
  preselect: readonly ServiceId[];
};

export type Package = {
  title: Rich;
  text: string;
  items: readonly string[];
  cta: string;
  featured: boolean;
  preselect: readonly ServiceId[];
};

export const home = {
  meta: {
    title: "Garified | Business support for NDIS providers",
    description:
      "Rostering, administration, marketing and accounting support, thoughtfully organised around your Australian NDIS provider business.",
  },

  hero: {
    eyebrow: "NDIS provider business support",
    title: ["The business behind", BR, { em: "better care." }] satisfies Rich,
    text: "Rostering, administration, marketing and accounting support. Thoughtfully organised around your NDIS business.",
    primary: "Find your support",
    secondary: { label: "Explore our services", href: "#services" },
    note: "Your care team leads. We support the business behind it.",
    imageAlt:
      "Two business professionals reviewing a laptop and planning documents in a sunlit office",
    captionKicker: "A considered partnership",
    caption: ["More clarity.", BR, "More room to focus."] satisfies Rich,
    sideLabel: "Built around your business",
    indexLabel: "01 / The Garified approach",
    // New: column labels for the hero week sheet. Plain weekday names, no claims.
    weekDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  },

  ribbon: {
    title: ["For the people", BR, "behind the support"] satisfies Rich,
    items: [
      "In-home & community",
      "Supported independent living",
      "Specialist disability accommodation",
    ],
  },

  services: {
    id: "services",
    title: ["Four services.", BR, "One clear ", { em: "partner." }] satisfies Rich,
    intro:
      "The work behind a provider can fill the whole day. Choose the support you need, with clear responsibilities and a process that fits your team.",
    linkLabel: "Explore service",
  },

  approach: {
    id: "approach",
    title: ["Your systems.", BR, "Your standards.", BR, { em: "Our support." }] satisfies Rich,
    text: "Good support starts by understanding how your business works. We agree the scope, follow your approved processes and keep your team in control.",
    cta: "Discuss your workflow",
    steps: [
      {
        number: "01",
        title: "Understand",
        text: "Start with the work taking your time. Map the workflow, volume and decisions that need your approval.",
      },
      {
        number: "02",
        title: "Organise",
        text: "Agree the tasks, access, hours and reporting. Build a clear way to work together in your existing systems.",
      },
      {
        number: "03",
        title: "Support",
        text: "Keep the agreed work moving. Review the exceptions and adjust your support as the business grows.",
      },
    ],
  },

  providers: {
    id: "providers",
    title: ["Support that understands", BR, { em: "your kind of business." }] satisfies Rich,
    cta: "Find the right support",
    sideEyebrow: "Where we can help",
    tabs: [
      {
        id: "in-home",
        tab: "In-home & community",
        title: "Keep everyday services moving.",
        text: "For growing providers balancing recurring shifts, intake and service administration. We bring structure to the daily workload.",
        items: [
          "Rosters and worker confirmations",
          "Intake and staff document tracking",
          "Invoice and timesheet preparation",
        ],
        preselect: ["rostering", "administration"],
      },
      {
        id: "sil",
        tab: "SIL providers",
        title: "A clearer picture across your homes.",
        text: "Back-office support for SIL homes. Your Australian team makes care and staffing decisions; we maintain the agreed roster, records and reporting.",
        items: [
          "Approved roster updates and gap reports",
          "Staff records and document reminders",
          "Operational and finance preparation",
        ],
        preselect: ["rostering", "administration"],
      },
      {
        id: "sda",
        tab: "SDA businesses",
        title: "Give your vacancies a clear next step.",
        text: "Market verified property details with care. We keep referrals, enquiries and viewings organised, so your intake team can focus on suitability.",
        items: [
          "Property listings and vacancy campaigns",
          "Referral research and outreach",
          "Enquiry tracking and viewing coordination",
        ],
        preselect: ["marketing"],
      },
    ] satisfies ProviderTab[],
  },

  packages: {
    id: "packages",
    title: ["A focused start.", BR, { em: "Room to grow." }] satisfies Rich,
    intro:
      "Begin with one workflow or combine the services your business needs. Every engagement has an agreed scope, service hours and a nominated contact.",
    footnote:
      "Tailored to your workload. Advertising spend and registered practitioner services are scoped separately.",
    items: [
      {
        title: ["Admin", BR, "Essentials"],
        text: "Practical support for the records and tasks that keep your business organised.",
        items: [
          "Intake and document preparation",
          "Inbox and staff record tracking",
          "Invoice input and regular reporting",
        ],
        cta: "Explore Admin Essentials",
        featured: false,
        preselect: ["administration"],
      },
      {
        title: ["Operations", BR, "Desk"],
        text: "A structured partner for rostering, administration and finance preparation.",
        items: [
          "Roster updates and confirmations",
          "Administration and document tracking",
          "Timesheet and invoice preparation",
        ],
        cta: "Explore Operations Desk",
        featured: true,
        preselect: ["rostering", "administration", "accounting"],
      },
      {
        title: ["Complete", BR, "Support"],
        text: "Bring operations, marketing and finance administration into one support plan.",
        items: [
          "Your Operations Desk services",
          "Marketing and enquiry follow-up",
          "Finance processing and reporting",
        ],
        cta: "Explore Complete Support",
        featured: false,
        preselect: ["rostering", "administration", "marketing", "accounting"],
      },
    ] satisfies Package[],
  },

  faq: {
    id: "faq",
    title: ["Good questions.", BR, { em: "Clear answers." }] satisfies Rich,
    intro: "A few things to know before we start working together.",
    items: [
      {
        q: "Can we start with just one service?",
        a: "Yes. Start with the workflow taking the most time, such as roster updates, administration or invoice preparation. We agree the tasks, hours and approval process before expanding the support.",
      },
      {
        q: "Will you work in our existing systems?",
        a: "We aim to work within your existing roster, accounting and communication systems. We confirm the access arrangements, your approved processes and the training needed before taking on the work.",
      },
      {
        q: "Who makes participant and staffing decisions?",
        a: "Your provider team retains participant suitability, worker suitability, care decisions and final approvals. Garified prepares and maintains the agreed administrative work and escalates decisions to your nominated contact.",
      },
      {
        q: "What does accounting support include?",
        a: "Our support covers agreed finance administration, including invoice preparation, payment matching, bank reconciliations and payroll input packs. Regulated BAS and tax work sits with an appropriately registered practitioner under a separate engagement.",
      },
      {
        q: "How is remote access to information managed?",
        a: "We agree the team location, the records needed for each role, named access and confidentiality arrangements before starting. Your provider's privacy requirements and the handling of any offshore access form part of the scope.",
      },
    ],
  },

  contact: {
    id: "contact",
    eyebrow: "Let’s find your starting point",
    title: ["More room", BR, "for what ", { em: "matters." }] satisfies Rich,
    text: ["Tell us where your business needs support.", BR, "We’ll start with the workflow that makes a difference."] satisfies Rich,
    cta: "Start a conversation",
  },
} as const;

/**
 * 404 page. Not on the reference site, so this is new copy (a framework error state,
 * not a content page). Pending client review with the other new lines.
 */
export const notFoundPage = {
  meta: { title: "Page not found | Garified" },
  title: "We can’t find that page.",
  text: "The link may be out of date or mistyped. Choose a service below, or go back to the home page.",
  home: "Go to the home page",
} as const;

/**
 * Footer copy. The one deliberate exception to the 1:1 rule: rewritten for the
 * large-type footer at the owner's request (2026-10-09). The statement closes the page
 * on the hero's note; the rest reuses words from the copy above it.
 */
export const footer = {
  statement: ["Your care team leads.", BR, "We support the ", { em: "business behind it." }] satisfies Rich,
  cta: {
    text: "Start with the workflow taking the most time.",
    label: "Let’s talk",
  },
  blurb:
    "Rostering, administration, marketing and accounting support for Australian NDIS providers, organised around your approved processes.",
  servicesLabel: "Services",
  exploreLabel: "Explore",
  /** Home page sections, by id. */
  explore: [
    { label: "Our approach", id: "approach" },
    { label: "Who we help", id: "providers" },
    { label: "Packages", id: "packages" },
    { label: "Questions", id: "faq" },
  ],
  /** "{year}" is replaced with the current year. */
  copyright: "© {year} Garified Solutions",
  region: "Supporting Australian NDIS businesses",
  backToTop: "Back to top",
  logoLabel: "Garified Solutions",
} as const;
