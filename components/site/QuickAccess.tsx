import { CalendarPlus, Phone, Zap } from "lucide-react";
import { CLINIC } from "@/lib/data";
import { Reveal } from "./Reveal";

const PATHS = [
  {
    icon: Zap,
    title: "I need care today",
    text: "Walk in — no appointment needed. Registration takes minutes, and a clinician sees every patient.",
    action: { href: "#hours", label: "See today's hours" },
    tone: "pine" as const,
  },
  {
    icon: CalendarPlus,
    title: "Plan a visit ahead",
    text: "Book an ANC session, a fasting sugar test or a follow-up — choose your department and preferred time.",
    action: { href: "#book", label: "Book an appointment" },
    tone: "gold" as const,
  },
  {
    icon: Phone,
    title: "It's an emergency",
    text: "Chest pain, heavy bleeding, convulsions, a child who can't feed? Don't queue — call us right now.",
    action: { href: CLINIC.phoneHref, label: `Call ${CLINIC.phoneDisplay}` },
    tone: "ember" as const,
  },
];

const TONES = {
  pine: {
    wrap: "border-pine-200 bg-pine-50",
    icon: "bg-pine-700 text-white",
    link: "text-pine-700 hover:text-pine-600",
  },
  gold: {
    wrap: "border-gold-300/60 bg-[#fdf6e9]",
    icon: "bg-gold-500 text-white",
    link: "text-gold-600 hover:text-gold-500",
  },
  ember: {
    wrap: "border-ember-400/50 bg-ember-50",
    icon: "bg-ember-600 text-white",
    link: "text-ember-600 hover:text-ember-500",
  },
} as const;

export function QuickAccess() {
  return (
    <section aria-label="How can we help today" className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
      <div className="grid gap-4 md:grid-cols-3">
        {PATHS.map((path, i) => {
          const tone = TONES[path.tone];
          return (
            <Reveal key={path.title} delay={i * 90}>
              <div className={`group h-full rounded-3xl border p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_45px_-25px_rgba(14,54,45,0.35)] ${tone.wrap}`}>
                <span className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ${tone.icon}`}>
                  <path.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="mt-4 font-display text-[1.3rem] font-semibold text-pine-950">{path.title}</h2>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-ink-soft">{path.text}</p>
                <a
                  href={path.action.href}
                  className={`mt-4 inline-flex items-center gap-1.5 text-[0.9rem] font-semibold ${tone.link}`}
                >
                  {path.action.label}
                  <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </a>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
