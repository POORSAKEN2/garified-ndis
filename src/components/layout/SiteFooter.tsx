import { cacheLife } from "next/cache";
import { footer } from "@/content/site";
import { RichText } from "@/components/ui/RichText";
import { Wordmark } from "./Wordmark";

async function CopyrightYear() {
  "use cache";
  // Captured into the static page and refreshed daily, so the year rolls over on its own.
  cacheLife("days");
  return footer.home.copyright.replace("{year}", String(new Date().getFullYear()));
}

export function SiteFooter({ variant }: { variant: "home" | "service" }) {
  if (variant === "service") {
    return (
      <footer className="on-deep bg-navy text-white">
        <div className="container-site flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-10">
          <Wordmark />
          <p className="text-on-deep">{footer.service.tagline}</p>
        </div>
      </footer>
    );
  }

  const { home } = footer;
  return (
    <footer className="on-deep bg-navy text-white">
      <div className="container-site grid gap-10 pt-16 pb-10 md:grid-cols-[1fr_auto] md:items-end md:gap-16 md:pt-20">
        <div>
          <Wordmark size="lg" />
          <p className="mt-4 text-lead text-on-deep">
            <RichText content={home.tagline} />
          </p>
        </div>
        <nav aria-label={home.navLabel}>
          <ul className="flex flex-col gap-x-8 sm:flex-row sm:flex-wrap">
            {home.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex min-h-11 items-center font-semibold text-white underline-offset-[6px] hover:underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="container-site flex flex-col gap-2 border-t border-white/15 py-6 text-small text-on-deep md:flex-row md:flex-wrap md:justify-between md:gap-x-8">
        <p>
          <CopyrightYear />
        </p>
        <p>{home.servicesLine}</p>
        <p>{home.region}</p>
      </div>
    </footer>
  );
}
