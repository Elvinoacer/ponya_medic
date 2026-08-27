import { Languages, Quote, ShieldCheck } from "lucide-react";
import { TEAM } from "@/lib/data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./Services";

export function Team() {
  return (
    <section id="team" aria-labelledby="team-heading" className="bg-parchment py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="The people behind the care"
          title="Licensed, regulated, and from here"
          lede="Every clinician at Ponya is registered with their national council — and every one of them speaks your language, literally."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((member, i) => (
            <Reveal key={member.role} delay={i * 80} className="h-full">
              <article className="flex h-full flex-col rounded-[1.8rem] border border-sand bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_25px_50px_-30px_rgba(14,54,45,0.45)]">
                <div className="flex items-center justify-between">
                  <span
                    aria-hidden="true"
                    className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pine-600 to-pine-800 font-display text-lg font-semibold text-white"
                  >
                    {member.initials}
                  </span>
                  <ShieldCheck className="h-5 w-5 text-pine-400" aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-display text-[1.18rem] font-semibold leading-snug text-pine-950">
                  {member.role}
                </h3>
                <p className="mt-1 text-[0.8rem] font-semibold uppercase tracking-wide text-gold-600">
                  {member.council}
                </p>
                <p className="mt-3 text-[0.87rem] leading-relaxed text-ink-soft">{member.scope}</p>
                <p className="mt-3 flex items-center gap-1.5 text-[0.8rem] font-medium text-ink">
                  <Languages className="h-3.5 w-3.5 text-pine-600" aria-hidden="true" />
                  {member.languages}
                </p>
                <blockquote className="mt-auto pt-5">
                  <Quote className="h-4 w-4 text-pine-300" aria-hidden="true" />
                  <p className="mt-1.5 text-[0.85rem] italic leading-relaxed text-ink-soft">
                    {member.quote}
                  </p>
                </blockquote>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
