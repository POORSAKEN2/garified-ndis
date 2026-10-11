/**
 * The four services: the home list rows and the full service page copy.
 * Transcribed 1:1 from the reference site. Do not reword.
 */
import { BR, type FaqCopy, type Rich, type ServiceId } from "./types";

type ServiceBase = {
  id: ServiceId;
  number: string;
  href: `/services/${ServiceId}`;
  title: string;
  /** Short line under the title on the home list. */
  tagline: string;
  /** Home list description. */
  summary: string;
  tags: readonly string[];
};

/** The service page: hero, what's included, handover, process, FAQ and contact. */
export type ServiceDetail = {
  meta: { title: string; description: string };
  hero: {
    eyebrow: string;
    title: Rich;
    text: string;
    /** Opens the enquiry dialog, here and in the closing section. */
    cta: string;
    /** The side panel. Its number is the service number. */
    panel: {
      title: string;
      builtAround: string;
      engagement: string;
    };
  };
  included: {
    title: Rich;
    intro: string;
    items: readonly { title: string; text: string }[];
  };
  handover: {
    intro: string;
    prepares: readonly string[];
    control: readonly string[];
    note: string;
  };
  process: {
    title: Rich;
    steps: readonly { title: string; text: string }[];
  };
  faq: Omit<FaqCopy, "id" | "title">;
  contact: { eyebrow: string; title: Rich; text: string };
};

export type Service = ServiceBase & { detail: ServiceDetail };

/** Copy shared by every service page. */
export const servicePage = {
  backLink: "All services",
  backHref: "/#services",
  includedLink: "What’s included",
  panel: {
    eyebrow: "The Garified approach",
    builtAround: "Built around",
    engagement: "Your engagement",
  },
  handover: {
    title: ["Know what", BR, { em: "to expect." }] satisfies Rich,
    preparesTitle: "Garified prepares",
    controlEyebrow: "Your provider stays in control",
    controlTitle: ["Your team leads", BR, "the decisions."] satisfies Rich,
  },
  faq: {
    id: "questions",
    title: ["Good questions.", BR, { em: "Clear answers." }] satisfies Rich,
  },
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
    detail: {
      meta: {
        title: "NDIS Rostering Support | Garified",
        description:
          "Rostering support for NDIS providers: staff availability, draft rosters, shift confirmations, approved updates and gap tracking, in one clear workflow.",
      },
      hero: {
        eyebrow: "Rostering support for NDIS providers",
        title: ["A clearer week.", BR, { em: "A prepared team." }],
        text: "Rostering support for NDIS providers who need a clearer view of worker availability, confirmed shifts and outstanding gaps. We prepare and maintain your roster around the requirements your team approves.",
        cta: "Discuss your roster",
        panel: {
          title: "From worker availability to a roster ready for your team's approval.",
          builtAround: "In-home, community and SIL providers",
          engagement: "Agreed scope. Clear service hours. Named contact.",
        },
      },
      included: {
        title: ["Practical support.", BR, { em: "A clearer roster." }],
        intro:
          "Choose the roster tasks your team needs help with. We agree the workflow, updates and reporting before starting.",
        items: [
          {
            title: "Availability & leave",
            text: "Maintain a current availability tracker, record leave requests and flag changes affecting recurring shifts. Leave approval stays with your team.",
          },
          {
            title: "Draft roster preparation",
            text: "Build draft rosters using your approved service times, worker suitability list, participant requirements and staffing rules.",
          },
          {
            title: "Shift confirmations",
            text: "Follow up workers through your agreed channels and record confirmations, pending responses and changes needing attention.",
          },
          {
            title: "Approved changes",
            text: "Update cancellations, rescheduled services and replacements after the relevant approval. Keep a clear record of what changed.",
          },
          {
            title: "Gap & exception tracking",
            text: "Maintain a visible list of uncovered shifts, availability conflicts and other exceptions for your operations contact to resolve.",
          },
          {
            title: "Timesheet preparation",
            text: "Compare submitted timesheets with approved roster records, flag discrepancies and prepare the input pack for your payroll team.",
          },
        ],
      },
      handover: {
        intro:
          "Your rostering support plan specifies the outputs, timing and approvals. Here is what that can look like.",
        prepares: [
          "Draft roster for approval",
          "Worker confirmation tracker",
          "Open shift and exception list",
          "Approved change log",
          "Timesheet discrepancy summary",
        ],
        control: [
          "Confirm worker and participant suitability",
          "Approve staffing levels, roster rules and changes",
          "Handle urgent care and safety decisions",
          "Authorise payroll and payments",
        ],
        note: "Final responsibilities and access are recorded in your agreed scope.",
      },
      process: {
        title: ["Your roster.", BR, { em: "Our support." }],
        steps: [
          {
            title: "Map your roster",
            text: "Confirm your service schedule, systems, worker list, approval contact and the times your team needs updates.",
          },
          {
            title: "Prepare & confirm",
            text: "Draft the roster, follow up availability and confirmations, then present the gaps and decisions for approval.",
          },
          {
            title: "Maintain & report",
            text: "Apply approved changes and keep your contact informed with the agreed exception and timesheet reports.",
          },
        ],
      },
      faq: {
        intro: "What to know about your rostering support before we start.",
        items: [
          {
            q: "Can you work in our current rostering system?",
            a: "Yes, subject to confirming access and training. We work in your agreed system and follow your templates rather than requiring a new rostering platform.",
          },
          {
            q: "Do you cover SIL rosters?",
            a: "SIL administration can be scoped around each home's approved staffing requirements and roster workflow. Your provider team retains decisions about staffing levels, worker suitability and service delivery.",
          },
          {
            q: "Do you provide emergency or after-hours dispatch?",
            a: "Standard support operates during the hours agreed in your engagement. Live emergency dispatch, overnight response and after-hours coverage are separate requirements and are not included unless expressly agreed.",
          },
          {
            q: "Can we begin with roster updates only?",
            a: "Yes. We can start with availability tracking, confirmations or approved updates, then expand the scope once the workflow and workload are clear.",
          },
        ],
      },
      contact: {
        eyebrow: "Let’s discuss your roster",
        title: ["More clarity.", BR, { em: "More room to focus." }],
        text: "Tell us about the roster tasks taking your time. Start with a support scope that fits your team.",
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
    detail: {
      meta: {
        title: "NDIS Administration Support | Garified",
        description:
          "Administration support for NDIS providers: intake paperwork, document preparation, staff onboarding records, inbox follow-up and operations reporting.",
      },
      hero: {
        eyebrow: "Administration support for NDIS providers",
        title: ["The details,", BR, { em: "taken care of." }],
        text: "A practical administration desk for NDIS providers. Keep intake paperwork, staff records, inboxes and day-to-day follow-up organised, with a clear list of what is complete and what needs your decision.",
        cta: "Discuss admin support",
        panel: {
          title: "One organised workflow for the records and follow-up behind your services.",
          builtAround: "Growing NDIS provider teams",
          engagement: "Agreed scope. Clear service hours. Named contact.",
        },
      },
      included: {
        title: ["Practical support.", BR, { em: "Less to chase." }],
        intro:
          "Choose the admin tasks taking your team’s time. We agree your templates, follow-up process and reporting before starting.",
        items: [
          {
            title: "Participant intake preparation",
            text: "Prepare intake packs, collect the agreed administrative information and track missing documents before your team reviews the referral.",
          },
          {
            title: "Agreement & document drafts",
            text: "Prepare service agreement drafts and other routine documents using your approved templates, instructions and service information.",
          },
          {
            title: "Staff onboarding records",
            text: "Organise onboarding checklists, follow up outstanding documents and maintain expiry reminders for your team's review.",
          },
          {
            title: "Inbox & enquiry routing",
            text: "Sort the agreed inbox, acknowledge routine enquiries with approved messages and direct decisions or concerns to the right contact.",
          },
          {
            title: "Records & appointment follow-up",
            text: "Maintain agreed trackers, coordinate administrative appointments and update the record of completed actions.",
          },
          {
            title: "Operations reporting",
            text: "Prepare a regular summary of intake progress, missing documents, overdue actions and the administrative workload.",
          },
        ],
      },
      handover: {
        intro:
          "Your administration support plan specifies the outputs, timing and approvals. Here is what that can look like.",
        prepares: [
          "Intake progress tracker",
          "Document and expiry register",
          "Draft packs ready for review",
          "Inbox and action summary",
          "Weekly administration report",
        ],
        control: [
          "Accept participants and approve service arrangements",
          "Approve agreements and final documents",
          "Assess staff suitability and onboarding decisions",
          "Manage complaints, safeguarding and care decisions",
        ],
        note: "Final responsibilities and access are recorded in your agreed scope.",
      },
      process: {
        title: ["Your admin.", BR, { em: "Our support." }],
        steps: [
          {
            title: "Agree the workflow",
            text: "Map the inboxes, templates, records and recurring tasks, along with the approvals your team needs to retain.",
          },
          {
            title: "Organise the desk",
            text: "Set up the agreed checklists, task tracker and named access so work is visible and easy to hand over.",
          },
          {
            title: "Keep work moving",
            text: "Prepare, follow up and report on the agreed tasks while routing exceptions to your nominated contact.",
          },
        ],
      },
      faq: {
        intro: "What to know about your administration support before we start.",
        items: [
          {
            q: "Can you help with participant onboarding?",
            a: "We can prepare and follow up the administrative paperwork. Your provider team assesses suitability, accepts the participant and approves the service arrangements.",
          },
          {
            q: "Do you create our policies or certify compliance?",
            a: "Routine support uses your approved policies and templates. Specialist policy drafting, audit advice or compliance certification needs a separately defined engagement with a suitably qualified professional.",
          },
          {
            q: "How do you handle sensitive records?",
            a: "Before access is granted, we agree which records each role needs, where the team works, named access, confidentiality arrangements and the provider's privacy requirements. Participant information is not needed for an initial enquiry.",
          },
          {
            q: "Can we outsource only our inbox and document follow-up?",
            a: "Yes. We agree a focused scope and service hours, then review whether additional tasks would help your team.",
          },
        ],
      },
      contact: {
        eyebrow: "Let’s organise your admin",
        title: ["Less paperwork.", BR, { em: "More room to focus." }],
        text: "Tell us what needs attention. Start with a focused administration scope that fits your provider team.",
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
    detail: {
      meta: {
        title: "NDIS Marketing Support | Garified",
        description:
          "Marketing support for NDIS providers: social content, paid campaigns, SDA vacancy promotion, referral outreach, enquiry follow-up and campaign reporting.",
      },
      hero: {
        eyebrow: "Marketing support for NDIS providers",
        title: ["More visibility.", BR, { em: "Better conversations." }],
        text: "Marketing support built around your verified services and available capacity. Connect clear content, referral outreach and vacancy campaigns with an organised follow-up process for your intake team.",
        cta: "Discuss your marketing",
        panel: {
          title: "A clear path from service visibility to an intake conversation.",
          builtAround: "NDIS service providers and SDA businesses",
          engagement: "Agreed scope. Clear reporting. Named contact.",
        },
      },
      included: {
        title: ["Practical marketing.", BR, { em: "A clearer message." }],
        intro:
          "Choose the services or vacancies you want to promote. We agree your audience, content, approval process and reporting before starting.",
        items: [
          {
            title: "Content & service messaging",
            text: "Plan and prepare approved social posts, service descriptions and campaign copy that explain who you support and how to enquire.",
          },
          {
            title: "Paid campaign support",
            text: "Set up and maintain agreed campaigns, monitor spend and report on enquiries. Your team approves the budget, targeting and published claims.",
          },
          {
            title: "SDA vacancy promotion",
            text: "Prepare property listing copy and campaign material from verified property details, approved images and confirmed vacancy information.",
          },
          {
            title: "Referral outreach",
            text: "Research relevant support coordinators, SIL providers and housing contacts, then prepare and carry out approved business outreach.",
          },
          {
            title: "Enquiry follow-up",
            text: "Maintain the enquiry tracker, use agreed callback and follow-up messages, and coordinate the next step with your intake contact.",
          },
          {
            title: "Campaign reporting",
            text: "Summarise spend, enquiry sources, follow-up status and the next actions so marketing activity stays connected to your business.",
          },
        ],
      },
      handover: {
        intro:
          "Your marketing support plan specifies the outputs, reporting cycle and approvals. Here is what that can look like.",
        prepares: [
          "Approved content calendar",
          "Campaign and spending summary",
          "Referral contact tracker",
          "Enquiry and follow-up pipeline",
          "SDA listing and vacancy material",
        ],
        control: [
          "Verify service capacity and property information",
          "Approve content, images, consent and campaign budgets",
          "Assess participant suitability and funding",
          "Accept referrals and approve service arrangements",
        ],
        note: "Final responsibilities, campaign budgets and access are recorded in your agreed scope.",
      },
      process: {
        title: ["Your growth.", BR, { em: "Our support." }],
        steps: [
          {
            title: "Clarify your offer",
            text: "Confirm the services or vacancies to promote, your audience, capacity and the next step your intake team can support.",
          },
          {
            title: "Prepare & launch",
            text: "Create the agreed content, listings and campaigns for approval, then publish within the approved budget.",
          },
          {
            title: "Follow up & review",
            text: "Track enquiries and referrals, coordinate follow-up and review the activity with your nominated contact.",
          },
        ],
      },
      faq: {
        intro: "What to know about your marketing support before we start.",
        items: [
          {
            q: "Can you market a single SDA vacancy?",
            a: "Yes. A focused vacancy campaign can include verified listing content, approved creatives, referral outreach and enquiry tracking. Your team assesses suitability and confirms the accommodation arrangements.",
          },
          {
            q: "Is advertising spend included?",
            a: "Advertising spend is separate from Garified's service fee. We agree the platform, budget and approval process before running a paid campaign.",
          },
          {
            q: "Do you guarantee leads or occupancy?",
            a: "No. We agree the activity, reporting and follow-up process. Enquiries, participant placements and occupancy depend on factors beyond the campaign and cannot be guaranteed.",
          },
          {
            q: "Can you support organic marketing and referral follow-up?",
            a: "Yes. You can start with content, business referral outreach and enquiry follow-up without paid advertising.",
          },
        ],
      },
      contact: {
        eyebrow: "Let’s build your visibility",
        title: ["Clearer marketing.", BR, { em: "Better connections." }],
        text: "Tell us about your services, available capacity or SDA vacancy. Start with a marketing scope that fits your provider business.",
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
    detail: {
      meta: {
        title: "NDIS Accounting Support | Garified",
        description:
          "Accounting support for NDIS providers: invoice preparation, payment matching, bank reconciliations, debtor follow-up, payroll inputs and finance reporting.",
      },
      hero: {
        eyebrow: "Accounting support for NDIS providers",
        title: ["Clearer records.", BR, { em: "A better business view." }],
        text: "Finance administration for NDIS providers who need organised invoices, payment records and payroll inputs. We prepare the agreed work alongside your accountant or appropriately registered practitioner.",
        cta: "Discuss accounting support",
        panel: {
          title: "Organised finance inputs, visible exceptions and the right review.",
          builtAround: "NDIS providers with recurring invoicing and payroll",
          engagement: "Agreed scope. Clear reporting. Named contact.",
        },
      },
      included: {
        title: ["Practical support.", BR, { em: "Cleaner records." }],
        intro:
          "Choose the finance tasks your business needs help with. We agree your systems, approved inputs, review process and reporting before starting.",
        items: [
          {
            title: "Invoice preparation",
            text: "Prepare invoices from service records and rates approved by your provider. Flag missing evidence or discrepancies before the authorised review.",
          },
          {
            title: "Payment matching",
            text: "Match received payments to invoices, maintain the agreed debtor record and flag differences for your finance contact.",
          },
          {
            title: "Bank reconciliations",
            text: "Perform agreed reconciliations in your accounting system using approved classifications and escalate transactions needing interpretation.",
          },
          {
            title: "Debtor follow-up",
            text: "Prepare statements and follow up overdue invoices using approved messages and escalation instructions.",
          },
          {
            title: "Payroll input packs",
            text: "Collect approved timesheets and roster records, identify missing inputs and prepare the pack for your payroll team or practitioner.",
          },
          {
            title: "Finance summaries",
            text: "Compile the agreed invoice, receivables and transaction reports from your approved accounting records.",
          },
        ],
      },
      handover: {
        intro:
          "Your accounting support plan specifies the outputs, reporting cycle and approvals. Here is what that can look like.",
        prepares: [
          "Invoice batch ready for approval",
          "Payment matching and debtor tracker",
          "Reconciliation exception list",
          "Payroll input pack",
          "Regular finance administration summary",
        ],
        control: [
          "Approve service records, rates and invoices",
          "Authorise payroll, payments and claim submission",
          "Resolve tax, BAS and payroll interpretations with the relevant practitioner",
          "Approve the final financial records and reports",
        ],
        note: "Final responsibilities, review arrangements and system access are recorded in your agreed scope.",
      },
      process: {
        title: ["Your records.", BR, { em: "Our support." }],
        steps: [
          {
            title: "Confirm the process",
            text: "Agree your accounting system, approved inputs, reporting cycle and the provider or practitioner who reviews the work.",
          },
          {
            title: "Prepare & reconcile",
            text: "Process the agreed records, match payments and prepare invoice or payroll inputs with a clear exception list.",
          },
          {
            title: "Review & report",
            text: "Route decisions for the right approval and provide the agreed summaries and outstanding action list.",
          },
        ],
      },
      faq: {
        intro: "What to know about your accounting support before we start.",
        items: [
          {
            q: "Does this include BAS or tax advice?",
            a: "Garified's core offer is finance administration. Regulated BAS, tax advice and other practitioner work require an appropriately registered practitioner and a separate engagement.",
          },
          {
            q: "Do you choose NDIS rates or decide claim eligibility?",
            a: "Your provider or relevant adviser supplies and approves the applicable rates, service records and claim decisions. We prepare the agreed administrative inputs and flag inconsistencies.",
          },
          {
            q: "Can you work with our existing accountant?",
            a: "Yes. We can prepare organised records and exception reports for your existing accountant or registered practitioner, following the agreed division of responsibilities.",
          },
          {
            q: "Can we start with invoicing and payment matching?",
            a: "Yes. Start with a clearly defined finance workflow and expand only after the volume, review process and service hours have been agreed.",
          },
        ],
      },
      contact: {
        eyebrow: "Let’s organise your finances",
        title: ["Clearer finances.", BR, { em: "More room to focus." }],
        text: "Tell us about the finance tasks taking your time. Start with an accounting support scope alongside your existing accountant or registered practitioner.",
      },
    },
  },
] as const satisfies readonly Service[];

export function getService(id: ServiceId): Service {
  const service = services.find((s) => s.id === id);
  if (!service) throw new Error(`Unknown service: ${id}`);
  return service;
}

/** "Explore rostering" — the aria label on each home list link. */
export function exploreLabel(service: Service) {
  return `Explore ${service.title.toLowerCase()}`;
}
