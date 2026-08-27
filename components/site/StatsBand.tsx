"use client";

import { useEffect, useRef, useState } from "react";
import { STATS } from "@/lib/data";
import { Reveal } from "./Reveal";

function useCountUp(target: number, active: boolean, duration = 1100) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return value;
}

function Stat({ stat, active, index }: { stat: (typeof STATS)[number]; active: boolean; index: number }) {
  const value = useCountUp(stat.value, active);
  return (
    <div className="relative">
      <p className="font-display text-6xl font-medium tracking-tight text-white lg:text-7xl">
        {value}
        <span className="text-gold-400">{stat.suffix}</span>
      </p>
      <h3 className="mt-2 text-[1.05rem] font-semibold text-pine-100">{stat.label}</h3>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10" role="presentation">
        <div
          className="h-full rounded-full bg-gradient-to-r from-gold-400 to-gold-300 transition-[width] duration-1000 ease-out"
          style={{ width: active ? `${stat.value}%` : "0%", transitionDelay: `${index * 150}ms` }}
        />
      </div>
      <p className="mt-4 text-[0.9rem] leading-relaxed text-pine-200/90">{stat.text}</p>
    </div>
  );
}

export function StatsBand() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setActive(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section aria-label="How our patients use the clinic" className="relative overflow-hidden bg-pine-950">
      <div className="dot-grid absolute inset-0" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute -right-24 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-pine-600/30 blur-3xl"
      />
      <div ref={ref} className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <Reveal className="max-w-2xl">
          <p className="text-[0.78rem] font-bold uppercase tracking-[0.22em] text-gold-400">Why we're built this way</p>
          <h2 className="mt-3 font-display text-4xl font-medium tracking-tight text-white sm:text-[2.75rem] sm:leading-[1.1]">
            A facility shaped around how Mwiki actually seeks care
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
          {STATS.map((stat, i) => (
            <Stat key={stat.label} stat={stat} active={active} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
