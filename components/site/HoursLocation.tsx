import Image from "next/image";
import { Bus, Car, Clock3, Footprints, MapPin, Phone, Wallet } from "lucide-react";
import { CLINIC, HOURS, TRANSIT } from "@/lib/data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./Services";

export function HoursLocation() {
  return (
    <section id="hours" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <SectionHeading
        eyebrow="Hours & getting here"
        title="Open early, open late, open weekends"
        lede="Built around market days, commutes and work shifts — with a phone line that never sleeps."
      />

      {/* Hours */}
      <Reveal className="mt-14">
        <div className="overflow-hidden rounded-[1.8rem] border border-sand bg-white shadow-[0_10px_30px_-24px_rgba(14,54,45,0.4)]">
          {/* Desktop table */}
          <table className="hidden w-full text-left md:table">
            <thead>
              <tr className="bg-pine-950 text-[0.78rem] uppercase tracking-wider text-pine-200">
                <th scope="col" className="px-6 py-4 font-semibold">Department</th>
                <th scope="col" className="px-6 py-4 font-semibold">Weekdays</th>
                <th scope="col" className="px-6 py-4 font-semibold">Saturday / Sunday</th>
                <th scope="col" className="px-6 py-4 font-semibold">Holidays</th>
                <th scope="col" className="px-6 py-4 font-semibold">Payment & cover</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand text-[0.9rem]">
              {HOURS.map((row) => (
                <tr key={row.unit} className="transition hover:bg-pine-50/50">
                  <th scope="row" className="px-6 py-4 font-semibold text-pine-900">{row.unit}</th>
                  <td className="px-6 py-4 text-ink-soft">{row.weekday}</td>
                  <td className="px-6 py-4 text-ink-soft">{row.weekend}</td>
                  <td className="px-6 py-4 text-ink-soft">{row.holiday}</td>
                  <td className="px-6 py-4">
                    <span className="block text-ink-soft">{row.payments}</span>
                    <span className="mt-0.5 block text-[0.8rem] font-medium text-gold-600">{row.finance}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile cards */}
          <ul className="divide-y divide-sand md:hidden">
            {HOURS.map((row) => (
              <li key={row.unit} className="p-5">
                <p className="flex items-center gap-2 text-[0.95rem] font-semibold text-pine-900">
                  <Clock3 className="h-4 w-4 text-pine-600" aria-hidden="true" />
                  {row.unit}
                </p>
                <dl className="mt-3 space-y-1.5 text-[0.85rem]">
                  {[
                    ["Weekdays", row.weekday],
                    ["Sat / Sun", row.weekend],
                    ["Holidays", row.holiday],
                  ].map(([term, dd]) => (
                    <div key={term} className="flex justify-between gap-3">
                      <dt className="text-ink-faint">{term}</dt>
                      <dd className="text-right font-medium text-ink">{dd}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-2.5 text-[0.8rem] text-ink-soft">
                  {row.payments} · <span className="font-medium text-gold-600">{row.finance}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* Location */}
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Reveal>
          <div className="relative h-full min-h-[22rem] overflow-hidden rounded-[1.8rem] shadow-[0_20px_50px_-30px_rgba(14,54,45,0.5)]">
            <Image
              src="/images/location.png"
              alt="Street view of Ponya Medical Centre on Mwiki–Kasarani Road with a matatu passing by"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-pine-950/80 via-pine-950/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-[0.78rem] font-semibold text-white backdrop-blur-md">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                Find us on Mwiki–Kasarani Road
              </p>
              <p className="mt-3 font-display text-2xl font-medium text-white sm:text-[1.7rem]">
                {CLINIC.address}
              </p>
              <p className="mt-1 text-[0.9rem] text-pine-100">{CLINIC.area}</p>
              <p className="mt-2 text-[0.85rem] text-pine-200">
                A short walk from Mwiki main stage, near the Maina Wa Maguru landmark.
              </p>
              <a
                href={CLINIC.phoneHref}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-5 py-2.5 text-[0.88rem] font-semibold text-pine-900 backdrop-blur transition hover:bg-white"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call {CLINIC.phoneDisplay}
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={110}>
          <div className="flex h-full flex-col gap-4">
            <ol className="grid flex-1 gap-4 sm:grid-cols-2">
              {TRANSIT.map((leg, i) => {
                const icons = [Bus, Bus, Footprints, Car];
                const Icon = icons[i % icons.length];
                return (
                  <li
                    key={leg.title}
                    className="rounded-3xl border border-sand bg-white p-5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-25px_rgba(14,54,45,0.35)]"
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-pine-100 text-pine-700">
                        <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                      </span>
                      <span className="text-[0.72rem] font-bold uppercase tracking-widest text-ink-faint">
                        Step {i + 1}
                      </span>
                    </span>
                    <h3 className="mt-3 text-[0.98rem] font-semibold text-pine-950">{leg.title}</h3>
                    <p className="mt-1.5 text-[0.85rem] leading-relaxed text-ink-soft">{leg.text}</p>
                  </li>
                );
              })}
            </ol>
            <div className="flex items-center gap-4 rounded-3xl bg-gold-400/15 p-5 ring-1 ring-gold-400/30">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gold-500 text-white">
                <Wallet className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="text-[0.88rem] leading-relaxed text-ink">
                <strong className="font-semibold text-pine-900">Pay your way:</strong> M-Pesa,
                cash or bank transfer — and SHA-accredited services are billed directly, no
                upfront reimbursement.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
