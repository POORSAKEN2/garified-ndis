import { home } from "@/content/site";
import { richToText } from "@/content/types";
import { RichText } from "@/components/ui/RichText";

/** Deep band naming the three kinds of provider Garified works with. */
export function Ribbon() {
  const { ribbon } = home;
  return (
    <section aria-label={richToText(ribbon.title)} className="on-deep bg-deep text-white">
      <div className="container-site grid gap-5 py-8 md:grid-cols-[auto_1fr] md:items-center md:gap-14 md:py-9">
        <p className="font-serif text-[1.75rem] leading-[1.05] italic text-white">
          <RichText content={ribbon.title} />
        </p>
        <ul className="flex flex-col gap-3 md:flex-row md:flex-wrap md:justify-end md:gap-x-10">
          {ribbon.items.map((item) => (
            <li key={item} className="flex items-center gap-3 font-semibold text-on-deep">
              <span aria-hidden="true" className="size-2 flex-none rounded-full bg-amber" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
