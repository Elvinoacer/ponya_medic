import Image from "next/image";
import { ArrowRight, Clock3 } from "lucide-react";
import { SERVICES, type Service } from "@/lib/data";
import { Reveal } from "./Reveal";

function SectionHeading({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede: string;
}) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <p className="text-[0.78rem] font-bold uppercase tracking-[0.22em] text-gold-600">{eyebrow}</p>
      <h2 className="mt-3 font-display text-4xl font-medium tracking-tight text-pine-950 sm:text-[2.75rem] sm:leading-[1.1]">
        {title}
      </h2>
      <p className="mt-4 text-[1.02rem] leading-relaxed text-ink-soft">{lede}</p>
    </Reveal>
  );
}

export { SectionHeading };

function ServiceCard({ service, large = false }: { service: Service; large?: boolean }) {
  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-[1.8rem] border border-sand bg-white shadow-[0_10px_30px_-22px_rgba(14,54,45,0.4)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(14,54,45,0.45)] ${
        large ? "sm:col-span-2" : ""
      }`}
    >
      <div className={`relative overflow-hidden ${large ? "aspect-[16/8]" : "aspect-[16/9]"}`}>
        <Image
          src={service.image}
          alt={service.alt}
          fill
          sizes={large ? "(max-width: 640px) 100vw, 60vw" : "(max-width: 640px) 100vw, 30vw"}
          className="object-cover transition duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pine-950/45 via-transparent to-transparent" />
        <span className="absolute bottom-3 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1.5 text-[0.72rem] font-semibold text-pine-800 backdrop-blur-md">
          <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
          {service.hours}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-[1.45rem] font-semibold leading-snug text-pine-950">
          {service.name}
        </h3>
        <p className="mt-0.5 text-[0.85rem] font-medium italic text-gold-600">{service.sw}</p>
        <p className="mt-3 text-[0.93rem] leading-relaxed text-ink-soft">{service.blurb}</p>

        <ul className={`mt-4 grid gap-x-4 gap-y-2 text-[0.88rem] text-ink ${large ? "sm:grid-cols-2" : ""}`}>
          {service.points.map((point) => (
            <li key={point} className="flex items-start gap-2">
              <span aria-hidden="true" className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-pine-400" />
              {point}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-5">
          <a
            href="#book"
            data-book-dept={service.id}
            className="inline-flex items-center gap-1.5 text-[0.9rem] font-semibold text-pine-700 transition hover:text-pine-500"
          >
            Book this service
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}

export function Services() {
  const [featured, ...rest] = SERVICES;
  return (
    <section id="services" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <SectionHeading
        eyebrow="What we do"
        title="Five departments, one front door"
        lede="From a fever that won't break to your first antenatal visit, every service sits under one roof — triaged fast, treated by licensed professionals, explained in your own words."
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured && (
          <Reveal className="sm:col-span-2 lg:col-span-2">
            <ServiceCard service={featured} large />
          </Reveal>
        )}
        {rest.map((service, i) => (
          <Reveal key={service.id} delay={i * 80}>
            <ServiceCard service={service} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
