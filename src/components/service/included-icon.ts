import {
  ArrowRightLeft,
  Banknote,
  CalendarCheck,
  CalendarOff,
  CalendarRange,
  ChartColumnIncreasing,
  ChartPie,
  ClipboardList,
  DoorOpen,
  FileClock,
  FilePenLine,
  FolderInput,
  History,
  IdCard,
  Inbox,
  Landmark,
  MailWarning,
  MessageSquareText,
  PhoneCall,
  ReceiptText,
  Target,
  TriangleAlert,
  UserRoundCheck,
  UserRoundSearch,
  type LucideIcon,
} from "lucide-react";

/**
 * One outline icon per "What's included" task on the service pages, keyed by the task
 * title. Each picks the object the task works on (the leave calendar, the timesheet, the
 * bank) rather than a generic "service" mark. Always decorative: the title carries the meaning.
 */
export const includedIcon: Record<string, LucideIcon> = {
  // Rostering
  "Availability & leave": CalendarOff,
  "Draft roster preparation": CalendarRange,
  "Shift confirmations": UserRoundCheck,
  "Approved changes": History,
  "Gap & exception tracking": TriangleAlert,
  "Timesheet preparation": FileClock,

  // Administration
  "Participant intake preparation": FolderInput,
  "Agreement & document drafts": FilePenLine,
  "Staff onboarding records": IdCard,
  "Inbox & enquiry routing": Inbox,
  "Records & appointment follow-up": CalendarCheck,
  "Operations reporting": ClipboardList,

  // Marketing
  "Content & service messaging": MessageSquareText,
  "Paid campaign support": Target,
  "SDA vacancy promotion": DoorOpen,
  "Referral outreach": UserRoundSearch,
  "Enquiry follow-up": PhoneCall,
  "Campaign reporting": ChartColumnIncreasing,

  // Accounting
  "Invoice preparation": ReceiptText,
  "Payment matching": ArrowRightLeft,
  "Bank reconciliations": Landmark,
  "Debtor follow-up": MailWarning,
  "Payroll input packs": Banknote,
  "Finance summaries": ChartPie,
};
