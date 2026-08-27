import { JOURNEY } from "@/lib/data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./Services";

export function Journey() {
  return (
    <section aria-labelledby="journey-heading" className="bg-parchment py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Your visit, step by step"
          title="From the door to the pharmacy in one smooth line"
          lede="No guessing where to go next. Our care sequence is designed to move you from registration to treatment with clear hand-offs at every station."
        />

        <ol className="relative mt-16 grid gap-8 md:grid-cols-3 lg:grid-cols-6 lg:gap-5">
          {JOURNEY.map((step, i) => (
            <li key={step.step}>
              <Reveal delay={i * 70} className="h-full">
                <div className="relative h-full rounded-3xl border border-sand bg-white/80 p-5">
                  <span
                    aria-hidden="true"
                    className="absolute -top-4 left-5 flex h-9 w-9 items-center justify-center rounded-full bg-pine-700 font-display text-[0.95rem] font-semibold text-white shadow-md"
                  >
                    {step.step}
                  </span>
                  <h3 className="mt-4 font-display text-[1.12rem] font-semibold text-pine-950">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[0.85rem] leading-relaxed text-ink-soft">{step.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal delay={200}>
          <p className="mx-auto mt-10 max-w-xl text-center text-[0.88rem] text-ink-soft">
            <strong className="font-semibold text-ember-600">Emergencies skip this line.</strong>{" "}
            Red-flag cases bypass registration and go straight to triage — tell the front desk
            or call{" "}
            <a href="tel:+254722700593" className="font-semibold text-ember-600 underline decoration-ember-400/50 underline-offset-2">
              0722 700 593
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
