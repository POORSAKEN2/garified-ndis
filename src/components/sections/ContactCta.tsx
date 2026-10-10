import { home } from "@/content/site";
import type { Rich, ServiceId } from "@/content/types";
import { EnquiryTrigger } from "@/components/enquiry/EnquiryTrigger";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { RichText } from "@/components/ui/RichText";

type ContactCopy = { id: string; eyebrow: string; title: Rich; text: Rich | string; cta: string };

/**
 * The closing call to action. The only centred block on the page. The home copy by
 * default; service pages pass their own and tick their service in the dialog.
 */
export function ContactCta({
  copy = home.contact,
  preselect,
}: {
  copy?: ContactCopy;
  preselect?: readonly ServiceId[];
}) {
  return (
    <section
      id={copy.id}
      data-cta-hide
      aria-labelledby="contact-title"
      className="on-deep bg-deep py-[clamp(72px,10vw,144px)] text-center text-white"
    >
      <div className="container-site flex flex-col items-center">
        <Eyebrow>{copy.eyebrow}</Eyebrow>
        <Heading id="contact-title" size="display" className="mt-5" content={copy.title} />
        <p className="mt-7 max-w-[44ch] text-lead text-on-deep">
          <RichText content={copy.text} />
        </p>
        <EnquiryTrigger variant="white" preselect={preselect} className="mt-10 w-full sm:w-auto">
          {copy.cta}
        </EnquiryTrigger>
      </div>
    </section>
  );
}
