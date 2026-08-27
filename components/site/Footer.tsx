import { Phone, CalendarPlus, MapPin } from "lucide-react";
import { CLINIC } from "@/lib/data";
import { LogoMark } from "./Logo";

const FOOT_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#visit", label: "Prepare for your visit" },
  { href: "#book", label: "Book an appointment" },
  { href: "#hours", label: "Hours & location" },
  { href: "#team", label: "Our team" },
] as const;

export function Footer() {
  return (
    <footer className="bg-pine-950 text-pine-200">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr_1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <LogoMark className="h-11 w-11" />
              <div className="leading-none">
                <p className="font-display text-2xl font-semibold text-white">Ponya</p>
                <p className="mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-pine-300">
                  Medical Centre
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-[0.92rem] leading-relaxed">
              “Ponya” means <em className="text-gold-300">get well</em> — and that&apos;s the whole
              job description. A KMPDC-licensed Level 2 clinic caring for the Mwiki–Kasarani
              community, seven days a week.
            </p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-[0.8rem] ring-1 ring-white/10">
              <MapPin className="h-3.5 w-3.5 text-gold-400" aria-hidden="true" />
              {CLINIC.address}, {CLINIC.area}
            </p>
          </div>

          {/* Sitemap */}
          <nav aria-label="Footer">
            <h2 className="text-[0.75rem] font-bold uppercase tracking-[0.2em] text-pine-300">
              Explore
            </h2>
            <ul className="mt-4 space-y-2.5 text-[0.92rem]">
              {FOOT_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="text-[0.75rem] font-bold uppercase tracking-[0.2em] text-pine-300">
              First contact
            </h2>
            <a
              href={CLINIC.phoneHref}
              className="mt-4 flex items-center gap-3 rounded-2xl bg-ember-600/15 p-4 ring-1 ring-ember-500/30 transition hover:bg-ember-600/25"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ember-600 text-white">
                <Phone className="h-4.5 w-4.5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-[0.72rem] font-semibold uppercase tracking-wider text-ember-400">
                  24/7 emergency & bookings
                </span>
                <span className="block font-display text-xl font-semibold text-white">
                  {CLINIC.phoneDisplay}
                </span>
              </span>
            </a>
            <a
              href="#book"
              className="mt-3 flex items-center justify-center gap-2 rounded-2xl bg-pine-600 p-4 text-[0.95rem] font-semibold text-white transition hover:bg-pine-500"
            >
              <CalendarPlus className="h-4.5 w-4.5" aria-hidden="true" />
              Book an appointment online
            </a>
            <p className="mt-4 text-[0.82rem] leading-relaxed">
              OPD desk: 7:30 AM – 8:30 PM weekdays · 8:00 AM – 7:30 PM weekends.
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center gap-3 border-t border-white/10 pt-7 text-center text-[0.8rem] text-pine-300/80 sm:flex-row sm:justify-between sm:text-left">
          <p>© {new Date().getFullYear()} Ponya Medical Centre · {CLINIC.license}</p>
          <p>Registered & compliant with the Data Protection Act, 2019 (ODPC).</p>
        </div>
      </div>
      {/* space for the mobile action bar */}
      <div aria-hidden="true" className="h-20 md:hidden" />
    </footer>
  );
}
