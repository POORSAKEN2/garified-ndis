import { home } from "@/content/site";
import { EnquiryTrigger } from "@/components/enquiry/EnquiryTrigger";
import { Checklist } from "@/components/ui/Checklist";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/ui/SectionHead";
import { cn } from "@/lib/cn";

/** Three levels of support. Operations Desk is featured: deep ground, and first on phones. */
export function Packages() {
  const copy = home.packages;
  return (
    <Section ground="tint" id={copy.id} aria-labelledby="packages-title">
      <SectionHead
        layout="split"
        title={copy.title}
        titleId="packages-title"
        intro={<p>{copy.intro}</p>}
      />

      <ul className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-3 lg:items-stretch lg:gap-6">
        {copy.items.map((pkg) => (
          <li
            key={pkg.cta}
            data-package
            data-featured={pkg.featured || undefined}
            className={cn(
              "flex flex-col rounded-panel p-6 sm:p-8",
              pkg.featured
                ? "on-deep order-first bg-deep text-white lg:order-none lg:-my-4 lg:py-12"
                : "border border-line bg-white",
            )}
          >
            <Heading as="h3" content={pkg.title} />
            <p className={cn("mt-4", pkg.featured ? "text-on-deep" : "text-muted")}>{pkg.text}</p>
            <Checklist
              items={pkg.items}
              className={cn("mt-7 border-t pt-7", pkg.featured ? "border-white/15" : "border-line")}
            />
            <div className="mt-auto pt-9">
              <EnquiryTrigger
                preselect={pkg.preselect}
                variant={pkg.featured ? "white" : "outline"}
                className="w-full"
              >
                {pkg.cta}
              </EnquiryTrigger>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-10 max-w-[60ch] text-small text-muted lg:mt-12">{copy.footnote}</p>
    </Section>
  );
}
