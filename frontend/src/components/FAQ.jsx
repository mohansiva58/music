import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { FAQS } from "../lib/content";

export default function FAQ() {
  return (
    <section
      id="faq"
      data-testid="faq-section"
      className="relative px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-12 md:gap-20">
        <div className="md:col-span-5">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#E2B365]">
            FAQ
          </span>
          <h2
            className="font-display mt-4 text-4xl font-medium tracking-tight text-white md:text-5xl lg:text-6xl"
            data-testid="faq-headline"
          >
            The usual{" "}
            <span className="font-script text-gold-gradient">questions.</span>
          </h2>
          <p className="mt-5 max-w-md text-base text-zinc-400 md:text-lg">
            Anything not covered here? WhatsApp me directly — I usually reply
            within the hour.
          </p>
        </div>

        <div className="md:col-span-7">
          <Accordion
            type="single"
            collapsible
            defaultValue="item-0"
            className="w-full"
            data-testid="faq-accordion"
          >
            {FAQS.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                data-testid={`faq-item-${i}`}
                className="border-b border-white/10 last:border-0"
              >
                <AccordionTrigger className="py-6 text-left font-display text-lg font-medium text-white hover:text-[#E2B365] hover:no-underline md:text-xl">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 pr-6 text-sm leading-relaxed text-zinc-400 md:text-base">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
