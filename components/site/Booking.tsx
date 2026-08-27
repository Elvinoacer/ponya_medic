"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import {
  AlertTriangle,
  BadgeCheck,
  CalendarCheck2,
  CheckCircle2,
  Loader2,
  Lock,
  Phone,
  RotateCcw,
  Sparkles,
  UserRound,
} from "lucide-react";
import { CLINIC, DEPARTMENT_OPTIONS, PREP } from "@/lib/data";
import { isValidKenyanPhone } from "@/lib/validation";
import {
  COMPLAINT_CHIPS,
  EMERGENCY_PHONE,
  EMERGENCY_PHONE_HREF,
  RED_FLAG_CHIPS,
  detectEmergency,
  isRedFlagChip,
} from "@/lib/triage";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./Services";

type Status = "idle" | "submitting" | "success" | "error";

type Confirmation = {
  refCode: string;
  fullName: string;
  department: string;
  preferredDate: string;
  preferredTime: string;
  phone: string;
};

const deptLabel = (value: string) =>
  DEPARTMENT_OPTIONS.find((d) => d.value === value)?.label ?? value;

function todayISO(): string {
  const d = new Date();
  const off = d.getTimezoneOffset();
  return new Date(d.getTime() - off * 60_000).toISOString().slice(0, 10);
}

function prettyDate(iso: string): string {
  try {
    return new Date(`${iso}T00:00:00`).toLocaleDateString("en-KE", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export function Booking() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);
  const [emergencyFlag, setEmergencyFlag] = useState<string | null>(null);
  const [form, setForm] = useState({
    fullName: "",
    dateOfBirth: "",
    sex: "",
    phone: "",
    residence: "",
    idNumber: "",
    shaNumber: "",
    department: "",
    preferredDate: "",
    preferredTime: "morning",
    clinicianNote: "",
    complaint: "",
    consent: false,
  });

  const complaintRef = useRef<HTMLTextAreaElement>(null);

  /* Preselect department when a service card "Book this service" was clicked */
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      const el = (event.target as HTMLElement).closest<HTMLElement>("[data-book-dept]");
      const dept = el?.dataset.bookDept;
      if (!dept) return;
      setForm((f) => ({ ...f, department: dept }));
      setEmergencyFlag(null);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  /* Scan free text for red flags as the patient types */
  useEffect(() => {
    const hit = detectEmergency(form.complaint);
    setEmergencyFlag((prev) => (hit ? prev ?? hit : null));
  }, [form.complaint]);

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const addChip = (chip: string) => {
    if (isRedFlagChip(chip)) {
      setEmergencyFlag((prev) => prev ?? chip);
      return;
    }
    setForm((f) => ({
      ...f,
      complaint: f.complaint ? `${f.complaint.replace(/[.,\s]+$/, "")}, ${chip}` : chip,
    }));
    complaintRef.current?.focus();
  };

  const clearEmergency = () => {
    setEmergencyFlag(null);
    setForm((f) => ({
      ...f,
      complaint: f.complaint
        .replace(new RegExp(RED_FLAG_CHIPS.join("|"), "gi"), "")
        .replace(/\s{2,}/g, " ")
        .replace(/^[,\s]+|[,\s]+$/g, ""),
    }));
  };

  const minDate = useMemo(todayISO, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (emergencyFlag) return;

    if (!isValidKenyanPhone(form.phone)) {
      setStatus("error");
      setErrorMsg("Please enter a valid Kenyan phone number, e.g. 0722 123 456 or +254722123456.");
      return;
    }
    if (!form.consent) {
      setStatus("error");
      setErrorMsg("Please tick the consent box so we're allowed to store your details for this booking.");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.status === "emergency") {
        setEmergencyFlag(data.matchedText ?? "emergency");
        setStatus("idle");
        return;
      }
      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "Something went wrong. Please try again or call us.");
      }
      setConfirmation(data.booking as Confirmation);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Network problem — please try again.");
    }
  }

  /* ── Success state ─────────────────────────────────────────────────────── */
  if (status === "success" && confirmation) {
    return (
      <section id="book" className="scroll-mt-24 bg-parchment py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal>
            <div className="rounded-[2rem] border border-pine-100 bg-white p-8 text-center shadow-[0_30px_70px_-35px_rgba(14,54,45,0.5)] sm:p-12">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-pine-100 text-pine-700">
                <CheckCircle2 className="h-9 w-9" aria-hidden="true" />
              </span>
              <h2 className="mt-6 font-display text-3xl font-semibold text-pine-950 sm:text-4xl">
                Request received, {confirmation.fullName.split(" ")[0]}.
              </h2>
              <p className="mt-3 text-[1rem] leading-relaxed text-ink-soft">
                Our reception team will call <strong className="font-semibold text-pine-800">{confirmation.phone}</strong>{" "}
                to confirm your slot. Keep your reference handy:
              </p>
              <p className="mx-auto mt-5 w-fit rounded-2xl border-2 border-dashed border-pine-300 bg-pine-50 px-6 py-3 font-mono text-2xl font-bold tracking-[0.12em] text-pine-800">
                {confirmation.refCode}
              </p>

              <dl className="mx-auto mt-8 grid max-w-md gap-3 text-left">
                {[
                  ["Department", deptLabel(confirmation.department)],
                  ["Preferred date", prettyDate(confirmation.preferredDate)],
                  ["Session", confirmation.preferredTime === "morning" ? "Morning (8–12)" : "Afternoon (12–5)"],
                ].map(([term, dd]) => (
                  <div key={term} className="flex items-center justify-between gap-4 rounded-xl bg-parchment px-4 py-3">
                    <dt className="text-[0.85rem] font-medium text-ink-soft">{term}</dt>
                    <dd className="text-[0.9rem] font-semibold text-pine-900">{dd}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 rounded-2xl bg-pine-950 p-5 text-left text-white">
                <p className="flex items-center gap-2 text-[0.9rem] font-semibold">
                  <BadgeCheck className="h-4.5 w-4.5 text-gold-400" aria-hidden="true" />
                  What to bring
                </p>
                <p className="mt-1.5 text-[0.85rem] leading-relaxed text-pine-200">
                  National ID (or guardian ID), your SHA card if insured, and for mamas &amp; babies
                  the MCH handbook. Check the{" "}
                  <a href="#visit" className="font-semibold text-gold-300 underline underline-offset-2">
                    preparation guide
                  </a>{" "}
                  if a test was advised.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setConfirmation(null);
                  setStatus("idle");
                  setForm((f) => ({ ...f, complaint: "", department: "", preferredDate: "" }));
                }}
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-pine-200 px-6 py-3 text-[0.9rem] font-semibold text-pine-800 transition hover:bg-pine-50"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                Book another appointment
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  /* ── Form state ────────────────────────────────────────────────────────── */
  return (
    <section id="book" className="scroll-mt-24 bg-parchment py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Book an appointment"
          title="Tell us what you need — in your own words"
          lede="English, Kiswahili ama Sheng — however you can say it, we'll understand. Fill this in and reception calls you back to confirm."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Reassurance column */}
          <Reveal>
            <div className="flex h-full flex-col gap-5">
              <div className="rounded-[1.8rem] bg-pine-950 p-7 text-white">
                <h3 className="flex items-center gap-2 font-display text-[1.35rem] font-medium">
                  <Sparkles className="h-5 w-5 text-gold-400" aria-hidden="true" />
                  Good to know
                </h3>
                <ul className="mt-4 space-y-3.5 text-[0.9rem] leading-relaxed text-pine-200">
                  <li className="flex gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold-400" aria-hidden="true" />
                    Walk-ins are always welcome — booking just shortens your wait.
                  </li>
                  <li className="flex gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold-400" aria-hidden="true" />
                    We confirm every booking by phone, so leave the number you actually answer.
                  </li>
                  <li className="flex gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold-400" aria-hidden="true" />
                    M-Pesa, cash &amp; bank transfer accepted; SHA services billed directly.
                  </li>
                  <li className="flex gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold-400" aria-hidden="true" />
                    ANC runs best in the morning — book the 8–12 session for same-day labs.
                  </li>
                </ul>
              </div>

              <div className="rounded-[1.8rem] border border-sand bg-white p-7">
                <h3 className="flex items-center gap-2 font-display text-[1.35rem] font-medium text-pine-950">
                  <Lock className="h-5 w-5 text-pine-600" aria-hidden="true" />
                  Your privacy, by design
                </h3>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-ink-soft">
                  This form is encrypted in transit (TLS 1.3) and your record is stored under
                  AES-256 encryption. Only your treating team can open clinical notes — admin
                  staff see booking logistics only. We comply with the Data Protection Act 2019
                  and ODPC health-data guidance.
                </p>
              </div>

              <div className="rounded-[1.8rem] border border-ember-400/50 bg-ember-50 p-7">
                <h3 className="font-display text-[1.35rem] font-medium text-ember-700">
                  Is it urgent right now?
                </h3>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-ink-soft">
                  Chest pain, heavy bleeding, convulsions, a baby who won&apos;t feed — don&apos;t
                  wait for a call-back. Phone us and a clinician guides you immediately.
                </p>
                <a
                  href={EMERGENCY_PHONE_HREF}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-ember-600 px-6 py-3 text-[0.92rem] font-semibold text-white transition hover:bg-ember-500"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Call {EMERGENCY_PHONE}
                </a>
              </div>
            </div>
          </Reveal>

          {/* Form card */}
          <Reveal delay={120}>
            <form
              onSubmit={onSubmit}
              noValidate
              className="rounded-[1.8rem] border border-sand bg-white p-6 shadow-[0_30px_70px_-40px_rgba(14,54,45,0.5)] sm:p-8"
            >
              {/* Emergency interlude */}
              {emergencyFlag && (
                <div
                  role="alert"
                  className="mb-7 rounded-2xl border-2 border-ember-500 bg-ember-50 p-5"
                >
                  <p className="flex items-start gap-3 font-semibold text-ember-700">
                    <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                    This may be an emergency — please don&apos;t book online.
                  </p>
                  <p className="mt-2 text-[0.88rem] leading-relaxed text-ink">
                    You described <strong>“{emergencyFlag}”</strong>. For your safety, call our
                    24/7 line now — a clinician will guide you straight away, day or night.
                  </p>
                  <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                    <a
                      href={EMERGENCY_PHONE_HREF}
                      className="pulse-ember inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-ember-600 px-5 py-3.5 text-[0.95rem] font-bold text-white transition hover:bg-ember-500"
                    >
                      <Phone className="h-4.5 w-4.5" aria-hidden="true" />
                      Call {EMERGENCY_PHONE} now
                    </a>
                    <button
                      type="button"
                      onClick={clearEmergency}
                      className="rounded-full border border-ember-400/60 px-5 py-3.5 text-[0.88rem] font-semibold text-ember-700 transition hover:bg-ember-100"
                    >
                      Selected by mistake — clear it
                    </button>
                  </div>
                  <p className="mt-3 text-[0.78rem] text-ink-soft">
                    If someone is unconscious, severely bleeding, or the breathing problem is
                    severe — come to the clinic immediately or go to the nearest emergency room.
                  </p>
                </div>
              )}

              <p className="mb-6 flex items-center gap-2 text-[0.85rem] font-medium text-ink-soft">
                <UserRound className="h-4 w-4 text-pine-600" aria-hidden="true" />
                About 2 minutes to complete.
              </p>

              {/* Identity */}
              <fieldset>
                <legend className="mb-3 text-[0.78rem] font-bold uppercase tracking-[0.16em] text-pine-700">
                  1 · Who is the appointment for?
                </legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="bk-name" className="field-label">Full legal name *</label>
                    <input
                      id="bk-name"
                      className="field"
                      placeholder="e.g. Grace Wanjiru"
                      autoComplete="name"
                      required
                      value={form.fullName}
                      onChange={(e) => set("fullName", e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="bk-dob" className="field-label">Date of birth *</label>
                    <input
                      id="bk-dob"
                      type="date"
                      className="field"
                      required
                      max={todayISO()}
                      value={form.dateOfBirth}
                      onChange={(e) => set("dateOfBirth", e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="bk-sex" className="field-label">Sex *</label>
                    <select
                      id="bk-sex"
                      className="field"
                      required
                      value={form.sex}
                      onChange={(e) => set("sex", e.target.value)}
                    >
                      <option value="" disabled>Select…</option>
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="bk-phone" className="field-label">Phone number *</label>
                    <input
                      id="bk-phone"
                      type="tel"
                      inputMode="tel"
                      className="field"
                      placeholder="07XX XXX XXX"
                      autoComplete="tel"
                      required
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="bk-residence" className="field-label">Where do you live? *</label>
                    <input
                      id="bk-residence"
                      className="field"
                      placeholder="e.g. Mwiki, Kasarani"
                      required
                      value={form.residence}
                      onChange={(e) => set("residence", e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="bk-id" className="field-label">National ID number</label>
                    <input
                      id="bk-id"
                      className="field"
                      inputMode="numeric"
                      placeholder="Optional for children"
                      value={form.idNumber}
                      onChange={(e) => set("idNumber", e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="bk-sha" className="field-label">SHA / insurance number</label>
                    <input
                      id="bk-sha"
                      className="field"
                      placeholder="If insured"
                      value={form.shaNumber}
                      onChange={(e) => set("shaNumber", e.target.value)}
                    />
                  </div>
                </div>
              </fieldset>

              {/* Visit */}
              <fieldset className="mt-8">
                <legend className="mb-3 text-[0.78rem] font-bold uppercase tracking-[0.16em] text-pine-700">
                  2 · What do you need?
                </legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="bk-dept" className="field-label">Department *</label>
                    <select
                      id="bk-dept"
                      className="field"
                      required
                      value={form.department}
                      onChange={(e) => set("department", e.target.value)}
                    >
                      <option value="" disabled>Select a department…</option>
                      {DEPARTMENT_OPTIONS.map((d) => (
                        <option key={d.value} value={d.value}>{d.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="bk-date" className="field-label">Preferred date *</label>
                    <input
                      id="bk-date"
                      type="date"
                      className="field"
                      required
                      min={minDate}
                      value={form.preferredDate}
                      onChange={(e) => set("preferredDate", e.target.value)}
                    />
                  </div>
                </div>

                <fieldset className="mt-4">
                  <legend className="field-label">Preferred session *</legend>
                  <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Preferred session">
                    {[
                      { v: "morning", l: "Morning", s: "8:00 AM – 12:00 PM" },
                      { v: "afternoon", l: "Afternoon", s: "12:00 PM – 5:00 PM" },
                    ].map((opt) => (
                      <label
                        key={opt.v}
                        className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-3.5 transition ${
                          form.preferredTime === opt.v
                            ? "border-pine-600 bg-pine-50"
                            : "border-sand bg-white hover:border-pine-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="preferredTime"
                          value={opt.v}
                          checked={form.preferredTime === opt.v}
                          onChange={() => set("preferredTime", opt.v)}
                          className="sr-only"
                        />
                        <span
                          aria-hidden="true"
                          className={`flex h-4.5 w-4.5 items-center justify-center rounded-full border-2 ${
                            form.preferredTime === opt.v ? "border-pine-600" : "border-ink-faint"
                          }`}
                        >
                          {form.preferredTime === opt.v && (
                            <span className="h-2 w-2 rounded-full bg-pine-600" />
                          )}
                        </span>
                        <span>
                          <span className="block text-[0.9rem] font-semibold text-pine-950">{opt.l}</span>
                          <span className="block text-[0.75rem] text-ink-soft">{opt.s}</span>
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="mt-4">
                  <label htmlFor="bk-clinician" className="field-label">
                    Preferred clinician <span className="font-normal text-ink-faint">(optional — e.g. for follow-up)</span>
                  </label>
                  <input
                    id="bk-clinician"
                    className="field"
                    placeholder="Leave blank to see the next available clinician"
                    value={form.clinicianNote}
                    onChange={(e) => set("clinicianNote", e.target.value)}
                  />
                </div>
              </fieldset>

              {/* Complaint */}
              <fieldset className="mt-8">
                <legend className="mb-3 text-[0.78rem] font-bold uppercase tracking-[0.16em] text-pine-700">
                  3 · Why are you coming? *
                </legend>
                <div className="flex flex-wrap gap-2" aria-label="Common complaint quick picks">
                  {COMPLAINT_CHIPS.map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => addChip(chip)}
                      className="rounded-full border border-pine-200 bg-pine-50 px-3.5 py-1.5 text-[0.8rem] font-medium text-pine-800 transition hover:border-pine-400 hover:bg-pine-100"
                    >
                      {chip}
                    </button>
                  ))}
                  {RED_FLAG_CHIPS.map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => addChip(chip)}
                      className="rounded-full border border-ember-400/60 bg-ember-50 px-3.5 py-1.5 text-[0.8rem] font-semibold text-ember-700 transition hover:bg-ember-100"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
                <label htmlFor="bk-complaint" className="field-label mt-4">
                  Describe your symptoms <span className="font-normal text-ink-faint">(English, Kiswahili ama Sheng — in your own words)</span>
                </label>
                <textarea
                  id="bk-complaint"
                  ref={complaintRef}
                  className="field min-h-28 resize-y"
                  placeholder="e.g. Mtoto ana homa na kukohoa since jana…"
                  required
                  value={form.complaint}
                  onChange={(e) => set("complaint", e.target.value)}
                />
              </fieldset>

              {/* Consent */}
              <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-2xl bg-parchment p-4">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => set("consent", e.target.checked)}
                  className="mt-0.5 h-4.5 w-4.5 shrink-0 accent-pine-700"
                />
                <span className="text-[0.83rem] leading-relaxed text-ink-soft">
                  I consent to Ponya Medical Centre storing these details under the Data
                  Protection Act 2019, to be used only for arranging and following up this
                  appointment.
                </span>
              </label>

              {status === "error" && errorMsg && (
                <p role="alert" className="mt-4 rounded-xl border border-ember-400/60 bg-ember-50 px-4 py-3 text-[0.88rem] font-medium text-ember-700">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "submitting" || Boolean(emergencyFlag)}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-pine-700 px-6 py-4 text-[1rem] font-semibold text-white shadow-[0_18px_35px_-15px_rgba(24,85,68,0.65)] transition enabled:hover:-translate-y-0.5 enabled:hover:bg-pine-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                    Sending your request…
                  </>
                ) : (
                  <>
                    <CalendarCheck2 className="h-5 w-5" aria-hidden="true" />
                    Request appointment
                  </>
                )}
              </button>
              <p className="mt-3 text-center text-[0.78rem] text-ink-faint">
                No payment is taken online. Reception confirms every request by phone.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
