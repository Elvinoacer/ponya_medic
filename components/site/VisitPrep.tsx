"use client";

import { useState } from "react";
import { ClipboardList, ChevronDown, FolderOpen } from "lucide-react";
import { PREP, DOCUMENTS } from "@/lib/data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./Services";

export function VisitPrep() {
  const [openId, setOpenId] = useState<string | null>(PREP[0]?.id ?? null);

  return (
    <section id="visit" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <SectionHeading
        eyebrow="Prepare for your visit"
        title="A little preparation goes a long way"
        lede="Some tests and clinics need a head start — fasting, a full bladder, the right handbook. Here's exactly how to arrive ready, so nothing has to be repeated."
      />

      <div className="mt-14 grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
        {/* Accordion */}
        <Reveal>
          <div className="overflow-hidden rounded-[1.8rem] border border-sand bg-white shadow-[0_10px_30px_-24px_rgba(14,54,45,0.4)]">
            {PREP.map((item, i) => {
              const open = openId === item.id;
              return (
                <div key={item.id} className={i > 0 ? "border-t border-sand" : ""}>
                  <button
                    type="button"
                    onClick={() => setOpenId(open ? null : item.id)}
                    aria-expanded={open}
                    aria-controls={`prep-${item.id}`}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition hover:bg-pine-50/60"
                  >
                    <span className="flex items-center gap-3">
                      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition ${open ? "bg-pine-700 text-white" : "bg-pine-100 text-pine-700"}`}>
                        <ClipboardList className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="text-[0.98rem] font-semibold text-pine-950">{item.title}</span>
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-ink-faint transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </button>
                  <div
                    id={`prep-${item.id}`}
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 pb-6 pl-[4.25rem]">
                        <p className="text-[0.92rem] leading-relaxed text-ink">
                          <strong className="font-semibold text-pine-700">Do this:</strong> {item.rule}
                        </p>
                        <p className="mt-2 text-[0.88rem] leading-relaxed text-ink-soft">
                          <strong className="font-semibold">Why:</strong> {item.why}
                        </p>
                        <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-parchment px-3 py-1.5 text-[0.78rem] font-medium text-ink-soft">
                          <FolderOpen className="h-3.5 w-3.5" aria-hidden="true" />
                          Bring: {item.docs}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* Documents card */}
        <Reveal delay={120}>
          <aside className="flex h-full flex-col rounded-[1.8rem] bg-pine-950 p-7 text-white shadow-[0_30px_60px_-30px_rgba(8,36,32,0.7)]">
            <h3 className="font-display text-2xl font-medium">The documents desk checklist</h3>
            <p className="mt-2 text-[0.92rem] leading-relaxed text-pine-200">
              Having these ready keeps your registration under five minutes — and keeps your
              records connected across every visit.
            </p>
            <ul className="mt-6 flex-1 space-y-4">
              {DOCUMENTS.map((doc) => (
                <li key={doc.item} className="flex gap-3.5 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                  <span aria-hidden="true" className="mt-1 flex h-2.5 w-2.5 shrink-0 rounded-full bg-gold-400" />
                  <div>
                    <p className="text-[0.95rem] font-semibold">{doc.item}</p>
                    <p className="mt-0.5 text-[0.83rem] leading-relaxed text-pine-200/90">{doc.note}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-6 rounded-2xl bg-gold-400/10 p-4 text-[0.83rem] leading-relaxed text-gold-300 ring-1 ring-gold-400/20">
              Parents: bring your own ID for under-five visits — children are registered under a
              guardian's identification.
            </p>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
