"use client";

import { useState } from "react";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import { FAQS } from "@/lib/data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./Services";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section aria-labelledby="faq-heading" className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <SectionHeading
        eyebrow="Common questions"
        title="Before you come in"
        lede="The things patients ask us most at the front desk — answered here so your visit is even quicker."
      />

      <div className="mt-12 space-y-3.5">
        {FAQS.map((faq, i) => {
          const open = openIndex === i;
          return (
            <Reveal key={faq.q} delay={i * 60}>
              <div
                className={`overflow-hidden rounded-3xl border transition ${
                  open ? "border-pine-300 bg-white shadow-[0_18px_40px_-28px_rgba(14,54,45,0.45)]" : "border-sand bg-white/70"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                  aria-controls={`faq-${i}`}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="flex items-center gap-3 text-[1rem] font-semibold text-pine-950">
                    <MessageCircleQuestion className={`h-5 w-5 shrink-0 ${open ? "text-pine-600" : "text-ink-faint"}`} aria-hidden="true" />
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-ink-faint transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>
                <div
                  id={`faq-${i}`}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 pl-[3.4rem] text-[0.93rem] leading-relaxed text-ink-soft">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
