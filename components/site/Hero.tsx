import Image from "next/image";
import { Phone, CalendarPlus, Clock, ShieldCheck, Stethoscope } from "lucide-react";
import { CLINIC } from "@/lib/data";
import { Reveal } from "./Reveal";
import { OpenToday } from "./OpenToday";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* ambient background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 right-[-10%] h-[34rem] w-[34rem] rounded-full bg-pine-100/70 blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-12%] h-[28rem] w-[28rem] rounded-full bg-gold-300/20 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:px-8 lg:pb-24 lg:pt-16">
        {/* Copy */}
        <div>
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-pine-200 bg-white/70 px-4 py-1.5 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-pine-700">
              <ShieldCheck className="h-4 w-4 text-pine-600" aria-hidden="true" />
              KMPDC Licensed Level 2 Clinic · Mwiki, Kasarani
            </p>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="mt-6 font-display text-[2.6rem] font-medium leading-[1.06] tracking-tight text-pine-950 sm:text-6xl lg:text-[4.2rem]">
              Care that heals,
              <br />
              <em className="font-light italic text-pine-600">right here in Mwiki.</em>
            </h1>
          </Reveal>

          <Reveal delay={170}>
            <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-ink-soft">
              Outpatient, maternity, childhood immunisation, laboratory and dental
              services on Mwiki–Kasarani Road — open seven days a week, with a
              24/7 urgent line when minutes matter.
            </p>
            <p className="mt-3 text-[0.95rem] font-medium italic text-pine-700">
              “Afya bora, karibu sana” — quality care, close to home.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#book"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-pine-700 px-7 py-4 text-[0.95rem] font-semibold text-white shadow-[0_18px_35px_-15px_rgba(24,85,68,0.65)] transition hover:-translate-y-0.5 hover:bg-pine-600"
              >
                <CalendarPlus className="h-4.5 w-4.5" aria-hidden="true" />
                Book an appointment
              </a>
              <a
                href={CLINIC.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-ember-500/70 bg-white px-7 py-[0.85rem] text-[0.95rem] font-semibold text-ember-600 transition hover:-translate-y-0.5 hover:bg-ember-50"
              >
                <Phone className="h-4.5 w-4.5" aria-hidden="true" />
                {CLINIC.phoneDisplay}
                <span className="sr-only"> — 24/7 emergency line</span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={310}>
            <dl className="mt-10 grid max-w-lg grid-cols-3 divide-x divide-sand rounded-2xl border border-sand bg-white/60 py-4">
              {[
                { icon: Clock, term: "Open today", dd: <OpenToday /> },
                { icon: Stethoscope, term: "Walk-ins", dd: "Always welcome" },
                { icon: ShieldCheck, term: "SHA", dd: "Accredited" },
              ].map(({ icon: Icon, term, dd }) => (
                <div key={term} className="px-4 text-center sm:px-5">
                  <dt className="flex items-center justify-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-wider text-ink-faint">
                    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                    {term}
                  </dt>
                  <dd className="mt-1 text-[0.9rem] font-semibold text-pine-800">{dd}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Imagery */}
        <Reveal delay={160} className="relative">
          <div className="relative mx-auto max-w-[34rem] lg:max-w-none">
            <div className="relative aspect-[4/3.4] overflow-hidden rounded-[2.5rem] rounded-tr-[7rem] shadow-[0_40px_80px_-40px_rgba(14,54,45,0.55)]">
              <Image
                src="/images/hero.png"
                alt="A Ponya Medical Centre nurse gently examining a toddler held by his mother"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pine-950/25 via-transparent to-transparent" />
            </div>

            {/* floating glass chips */}
            <div className="float-slow absolute -left-3 top-8 rounded-2xl border border-white/60 bg-white/70 px-4 py-3 shadow-lg backdrop-blur-xl sm:-left-8">
              <p className="flex items-center gap-2 text-[0.82rem] font-semibold text-pine-900">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ember-500/10 text-ember-600">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                </span>
                24/7 urgent line
              </p>
              <p className="mt-0.5 pl-10 text-[0.72rem] text-ink-soft">{CLINIC.phoneDisplay}</p>
            </div>

            <div className="float-slower absolute -right-2 bottom-10 rounded-2xl border border-white/60 bg-white/70 px-4 py-3 shadow-lg backdrop-blur-xl sm:-right-6">
              <p className="text-[0.82rem] font-semibold text-pine-900">Step-free access</p>
              <p className="mt-0.5 text-[0.72rem] text-ink-soft">Ground floor · stroller friendly</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
