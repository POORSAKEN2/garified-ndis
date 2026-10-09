import { cacheLife } from "next/cache";
import Link from "next/link";
import { services } from "@/content/services";
import { footer } from "@/content/site";
import { EnquiryTrigger } from "@/components/enquiry/EnquiryTrigger";
import { ArrowIcon } from "@/components/ui/Icons";
import { RichText } from "@/components/ui/RichText";
import { cn } from "@/lib/cn";
import { LogoSvg } from "./LogoSvg";

async function CopyrightYear() {
  "use cache";
  // Captured into the static page and refreshed daily, so the year rolls over on its own.
  cacheLife("days");
  return footer.copyright.replace("{year}", String(new Date().getFullYear()));
}

const linkClasses = cn(
  "inline-flex min-h-11 items-center font-semibold text-navy underline-offset-[6px]",
  "transition-colors duration-200 hover:text-blue hover:underline",
);

function FooterLink({ href, children }: { href: string; children: string }) {
  if (href.startsWith("#")) {
    return (
      <a href={href} className={linkClasses}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={linkClasses}>
      {children}
    </Link>
  );
}

function FooterNav({ label, links }: { label: string; links: readonly { label: string; href: string }[] }) {
  const id = `footer-${label.toLowerCase()}`;
  return (
    <nav aria-labelledby={id}>
      <h2 id={id} className="text-small font-semibold text-muted">
        {label}
      </h2>
      <ul className="mt-3">
        {links.map((link) => (
          <li key={link.href}>
            <FooterLink href={link.href}>{link.label}</FooterLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/**
 * Large-type footer on the tint ground, the same on every page. The closing statement
 * and the enquiry button sit above the links; the full logo spans the container at the
 * very bottom, in its own colours, and rises out of a clip line as the page reaches its
 * end (globals.css, `data-footer-logo`). Section links jump in place on the home page
 * and lead back to it from the others.
 */
export function SiteFooter({ variant }: { variant: "home" | "service" }) {
  const base = variant === "home" ? "" : "/";
  const explore = footer.explore.map((link) => ({ label: link.label, href: `${base}#${link.id}` }));

  return (
    // Hides the phone CTA bar, so it never covers the logo.
    <footer data-cta-hide className="bg-tint text-navy">
      <div className="container-site pt-[clamp(64px,9vw,128px)]">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
          <p className="accent text-h2 font-bold text-balance">
            <RichText content={footer.statement} />
          </p>
          <div className="lg:pb-1.5">
            <p className="max-w-[30ch] text-muted">{footer.cta.text}</p>
            <EnquiryTrigger className="mt-5 w-full sm:w-auto">{footer.cta.label}</EnquiryTrigger>
          </div>
        </div>

        <div className="mt-[clamp(48px,6vw,80px)] grid grid-cols-2 gap-x-6 gap-y-10 border-t border-navy/12 pt-10 lg:grid-cols-[1.6fr_1fr_1fr] lg:gap-16">
          <p className="col-span-2 max-w-[38ch] text-muted lg:col-span-1">{footer.blurb}</p>
          <FooterNav
            label={footer.servicesLabel}
            links={services.map((service) => ({ label: service.title, href: service.href }))}
          />
          <FooterNav label={footer.exploreLabel} links={explore} />
        </div>

        <div className="mt-10 flex flex-col gap-1 border-t border-navy/12 pt-4 text-small text-muted sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8">
          <p>
            <CopyrightYear />
          </p>
          <p>{footer.region}</p>
          <a
            href="#main"
            className="group inline-flex min-h-11 items-center gap-1.5 font-semibold text-navy hover:text-blue sm:ml-auto"
          >
            {footer.backToTop}
            <ArrowIcon direction="up" className="size-4" />
          </a>
        </div>

        <div data-footer-logo className="mt-[clamp(24px,4vw,56px)] mb-[clamp(16px,3vw,40px)] overflow-clip">
          <LogoSvg label={footer.logoLabel} className="block h-auto w-full" />
        </div>
      </div>
    </footer>
  );
}
