// ── Shared field validation (client + server) ───────────────────────────────

/** Strips spaces and dashes, e.g. "0722 123 456" → "0722123456". */
export function normalizePhone(raw: string): string {
  return raw.replace(/[\s-]/g, "").trim();
}

/** Kenyan mobile numbers: 07XX…, 01XX…, or +2547XX/2541XX. */
export function isValidKenyanPhone(raw: string): boolean {
  return /^(?:\+254|0)(?:7\d|1\d)\d{7}$/.test(normalizePhone(raw));
}
