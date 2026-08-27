"use client";

import { useEffect, useState } from "react";
import { CalendarPlus, Phone } from "lucide-react";
import { CLINIC } from "@/lib/data";

/** Sticky bottom action bar for phones — thumb-reach call & book. */
export function MobileCTA() {
  const [past, setPast] = useState(false);

  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden={!past}
      className={`fixed inset-x-3 bottom-3 z-40 transition-all duration-300 md:hidden ${
        past ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-2 gap-2 rounded-full border border-white/50 bg-pine-950/80 p-1.5 shadow-2xl backdrop-blur-xl">
        <a
          href={CLINIC.phoneHref}
          className="flex items-center justify-center gap-2 rounded-full bg-ember-600 py-3.5 text-[0.92rem] font-bold text-white"
        >
          <Phone className="h-4.5 w-4.5" aria-hidden="true" />
          Call now
        </a>
        <a
          href="#book"
          className="flex items-center justify-center gap-2 rounded-full bg-white py-3.5 text-[0.92rem] font-bold text-pine-900"
        >
          <CalendarPlus className="h-4.5 w-4.5" aria-hidden="true" />
          Book
        </a>
      </div>
    </div>
  );
}
