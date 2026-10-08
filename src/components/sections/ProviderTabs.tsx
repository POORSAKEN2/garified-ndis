"use client";

import { animate, stagger } from "animejs";
import { Tabs } from "radix-ui";
import { useRef } from "react";
import { home } from "@/content/site";
import { EnquiryTrigger } from "@/components/enquiry/EnquiryTrigger";
import { Checklist } from "@/components/ui/Checklist";
import { Heading } from "@/components/ui/Heading";

/**
 * Radix Tabs with arrow-key navigation. Every panel is force-mounted so all three are
 * in the HTML; CSS hides inactive ones only when JS is running (see globals.css).
 */
export function ProviderTabs() {
  const copy = home.providers;
  const rootRef = useRef<HTMLDivElement>(null);

  // Motion answers the click: the new panel's content rises in and its ticks pop.
  function onChange() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    requestAnimationFrame(() => {
      const panel = rootRef.current?.querySelector('[data-provider-panel][data-state="active"]');
      if (!panel) return;
      animate(panel.querySelectorAll("[data-panel-main] > *"), {
        opacity: { from: 0, to: 1 },
        y: { from: 12, to: 0 },
        duration: 500,
        delay: stagger(60),
        ease: "outExpo",
      });
      animate(panel.querySelectorAll("li [aria-hidden=true]"), {
        scale: { from: 0, to: 1 },
        duration: 420,
        delay: stagger(90, { start: 150 }),
        ease: "outBack(2)",
      });
    });
  }

  return (
    <Tabs.Root ref={rootRef} defaultValue={copy.defaultTab} onValueChange={onChange} className="mt-10 lg:mt-12">
      <Tabs.List
        aria-label={copy.eyebrow.replace(/^\d{2} \/ /, "")}
        className="-mx-[clamp(16px,4vw,40px)] flex gap-2 overflow-x-auto px-[clamp(16px,4vw,40px)] pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0"
      >
        {copy.tabs.map((tab) => (
          <Tabs.Trigger
            key={tab.id}
            value={tab.id}
            className="min-h-12 flex-none rounded-pill border-[1.5px] border-line bg-white px-5 font-bold text-navy transition-colors hover:border-navy data-[state=active]:border-navy data-[state=active]:bg-navy data-[state=active]:text-white"
          >
            {tab.tab}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      {copy.tabs.map((tab) => (
        <Tabs.Content
          key={tab.id}
          value={tab.id}
          forceMount
          data-provider-panel
          className="mt-6 grid gap-8 rounded-panel border border-line bg-white p-6 shadow-raised sm:p-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14 lg:p-12"
        >
          <div data-panel-main>
            <p className="font-semibold text-blue">{tab.accent}</p>
            <Heading as="h3" className="mt-3" content={tab.title} />
            <p className="measure mt-5 text-muted">{tab.text}</p>
            <EnquiryTrigger preselect={tab.preselect} className="mt-8">
              {copy.cta}
            </EnquiryTrigger>
          </div>
          <div className="self-start rounded-card bg-tint p-6 sm:p-7">
            <p className="text-small font-semibold text-blue">{copy.sideEyebrow}</p>
            <Checklist items={tab.items} className="mt-5" />
          </div>
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}
