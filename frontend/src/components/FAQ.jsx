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
      className="relative bg-crimson px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-14 md:grid-cols-12 md:gap-20">
        <div className="md:col-span-5">
          <span className="font-archivo text-sm text-white/70">FAQ</span>
          <h2
            className="font-display mt-4 text-[10vw] font-black leading-[0.92] tracking-[-0.03em] text-white md:text-[5vw] lg:text-[4.5rem]"
            data-testid="faq-headline"
          >
            THE USUAL <span className="text-ember">QUESTIONS.</span>
          </h2>
          <p className="font-archivo mt-5 max-w-md text-base text-white/75 md:text-lg">
            Anything not covered here? WhatsApp directly — I usually reply
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
                className="border-b border-white/15 last:border-0"
              >
                <AccordionTrigger className="py-6 text-left font-archivo text-lg font-semibold text-white hover:text-[#ff5722] hover:no-underline md:text-xl">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="font-archivo pb-6 pr-6 text-sm leading-relaxed text-white/75 md:text-base">
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
