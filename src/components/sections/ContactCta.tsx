import { home } from "@/content/site";
import { EnquiryTrigger } from "@/components/enquiry/EnquiryTrigger";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { RichText } from "@/components/ui/RichText";

/** The closing call to action. The only centred block on the page. */
export function ContactCta() {
  const copy = home.contact;
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
        <EnquiryTrigger variant="white" className="mt-10 w-full sm:w-auto">
          {copy.cta}
        </EnquiryTrigger>
      </div>
    </section>
  );
}
