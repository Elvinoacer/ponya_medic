import { BadgeCheck, Landmark, Lock, Microscope, FileCheck2 } from "lucide-react";
import { TRUST } from "@/lib/data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./Services";

const ICONS = [BadgeCheck, Landmark, Microscope, FileCheck2, Lock];

export function Trust() {
  return (
    <section aria-labelledby="trust-heading" className="relative overflow-hidden bg-pine-950">
      <div className="dot-grid absolute inset-0" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-pine-600/25 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow="Licences & your protection"
          title="Regulated at every layer, so you can relax at the front desk"
          lede="Healthcare runs on trust. Ours is verifiable — every licence, register and safeguard below is a matter of public record or statutory duty."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {TRUST.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Reveal key={item.title} delay={i * 70} className="h-full">
                <article className="flex h-full flex-col rounded-3xl bg-white/[0.06] p-6 ring-1 ring-white/10 backdrop-blur-sm transition duration-300 hover:bg-white/[0.1]">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold-400/15 text-gold-300">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-[1rem] font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-[0.85rem] leading-relaxed text-pine-200/90">{item.text}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
