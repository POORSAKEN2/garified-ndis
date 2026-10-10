import { Plus } from "lucide-react";
import { home } from "@/content/site";
import type { FaqCopy } from "@/content/types";
import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/ui/SectionHead";

/**
 * Native <details> with a shared `name`, so only one answer is open at a time. It works
 * without JavaScript, which Radix Accordion does not (it hides closed answers in the HTML).
 * The home questions by default; service pages pass their own.
 */
export function Faq({ copy = home.faq }: { copy?: FaqCopy }) {
  return (
    <Section id={copy.id} aria-labelledby="faq-title">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <SectionHead
          eyebrow={copy.eyebrow}
          title={copy.title}
          titleId="faq-title"
          intro={<p>{copy.intro}</p>}
          className="self-start lg:sticky lg:top-28"
        />
        <div className="border-t border-line">
          {copy.items.map((item) => (
            <details key={item.q} name="faq" className="faq-item group border-b border-line">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                <h3 className="text-h5 font-semibold">{item.q}</h3>
                <span
                  aria-hidden="true"
                  className="grid size-9 flex-none place-items-center rounded-full border-[1.5px] border-line text-blue transition-colors group-open:border-blue group-open:bg-blue group-open:text-white"
                >
                  <Plus size={18} strokeWidth={2.4} className="transition-transform duration-300 group-open:rotate-45" />
                </span>
              </summary>
              <p className="measure pb-6 text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
