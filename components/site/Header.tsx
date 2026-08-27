"use client";

import { useEffect, useState } from "react";
import { Menu, Phone, X, CalendarPlus } from "lucide-react";
import { Logo } from "./Logo";
import { CLINIC, NAV_LINKS } from "@/lib/data";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* 24/7 emergency strip */}
      <div className="bg-ember-600 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-center text-[0.8rem] font-medium sm:justify-between sm:text-[0.83rem]">
          <p className="flex items-center gap-2">
            <span className="pulse-ember inline-block h-2 w-2 rounded-full bg-gold-300" aria-hidden="true" />
            <span className="hidden sm:inline">24/7 emergency &amp; urgent care line</span>
            <span className="sm:hidden">Emergency line</span>
          </p>
          <a
            href={CLINIC.phoneHref}
            className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-0.5 font-semibold transition hover:bg-white/25"
          >
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            {CLINIC.phoneDisplay}
          </a>
        </div>
      </div>

      {/* Main navigation */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-cream/85 shadow-[0_8px_30px_-18px_rgba(14,54,45,0.45)] backdrop-blur-xl"
            : "bg-cream/0"
        }`}
      >
        <div className="mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Logo />

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-[0.92rem] font-medium text-ink-soft transition hover:bg-pine-50 hover:text-pine-800"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={CLINIC.phoneHref}
              className="hidden items-center gap-2 rounded-full border border-pine-200 bg-white/70 px-4 py-2.5 text-[0.9rem] font-semibold text-pine-800 transition hover:border-pine-400 md:flex"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {CLINIC.phoneDisplay}
            </a>
            <a
              href="#book"
              className="hidden items-center gap-2 rounded-full bg-pine-700 px-5 py-2.5 text-[0.9rem] font-semibold text-white shadow-[0_10px_25px_-12px_rgba(24,85,68,0.7)] transition hover:-translate-y-0.5 hover:bg-pine-600 sm:flex"
            >
              <CalendarPlus className="h-4 w-4" aria-hidden="true" />
              Book appointment
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-pine-200 bg-white/70 text-pine-900 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay menu */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${open ? "" : "pointer-events-none"}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        <div
          className={`absolute inset-0 bg-pine-950/50 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute inset-x-3 top-3 rounded-3xl bg-cream p-6 shadow-2xl transition-all duration-300 ${
            open ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          }`}
        >
          <div className="flex items-center justify-between">
            <Logo />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-pine-200 text-pine-900"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav aria-label="Mobile" className="mt-6 flex flex-col">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-sand py-4 font-display text-2xl font-medium text-pine-900 transition hover:text-pine-600"
                style={{ transitionDelay: `${i * 20}ms` }}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <a
              href={CLINIC.phoneHref}
              className="flex items-center justify-center gap-2 rounded-full bg-ember-600 px-4 py-3.5 text-sm font-semibold text-white"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call now
            </a>
            <a
              href="#book"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 rounded-full bg-pine-700 px-4 py-3.5 text-sm font-semibold text-white"
            >
              <CalendarPlus className="h-4 w-4" aria-hidden="true" />
              Book
            </a>
          </div>
          <p className="mt-4 text-center text-xs text-ink-faint">
            {CLINIC.address} · {CLINIC.area}
          </p>
        </div>
      </div>
    </>
  );
}
