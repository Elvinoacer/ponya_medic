import { CLINIC } from "@/lib/data";

export function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="ponya-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1e6b53" />
          <stop offset="1" stopColor="#0e362d" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="url(#ponya-bg)" />
      <path d="M25 14h14v11h11v14H39v11H25V39H14V25h11z" fill="#faf6ef" />
      <circle cx="49" cy="15" r="6" fill="#e29a35" />
    </svg>
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#top" className="flex items-center gap-3 group" aria-label={`${CLINIC.name} — home`}>
      <LogoMark className="h-10 w-10 shrink-0 transition-transform duration-300 group-hover:scale-105" />
      <span className="leading-none">
        <span className="block font-display text-[1.35rem] font-semibold tracking-tight text-pine-900">
          Ponya
        </span>
        {!compact && (
          <span className="mt-0.5 block text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-ink-soft">
            Medical Centre
          </span>
        )}
      </span>
    </a>
  );
}
