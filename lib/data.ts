// ── Ponya Medical Centre · centralised site content ─────────────────────────
export const CLINIC = {
  name: "Ponya Medical Centre",
  shortName: "Ponya",
  tagline: "Care that heals, close to home.",
  phoneDisplay: "0722 700 593",
  phoneHref: "tel:+254722700593",
  address: "Mwiki–Kasarani Road, Mwiki Town",
  area: "Kasarani Constituency, Nairobi County",
  license: "KMPDC Reg. No. 61097 · Level 2 Private Medical Clinic",
  hoursNote: "Outpatient desk open 7 days a week",
} as const;

export const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#visit", label: "Your Visit" },
  { href: "#hours", label: "Hours & Location" },
  { href: "#team", label: "Our Team" },
] as const;

export type Service = {
  id: string;
  name: string;
  sw: string;
  blurb: string;
  points: string[];
  hours: string;
  image: string;
  alt: string;
  featured?: boolean;
};

export const SERVICES: Service[] = [
  {
    id: "opd",
    name: "General Outpatient (OPD)",
    sw: "Huduma kwa wagonjwa wa nje",
    blurb:
      "Your first stop for everyday illness. Walk in, get seen by a licensed clinical officer, and leave with a clear plan — tests, treatment and explanation included.",
    points: [
      "Consultation & clinical diagnosis",
      "Malaria, typhoid, URTI & stomach infection treatment",
      "Blood pressure & diabetes (sukari) screening",
      "Minor surgery — suturing, wound dressing, abscess drainage",
      "Chronic disease reviews & referrals",
    ],
    hours: "Daily · 7:30 AM – 8:30 PM weekdays",
    image: "/images/svc-opd.png",
    alt: "Clinical officer consulting a patient at Ponya Medical Centre",
    featured: true,
  },
  {
    id: "maternity",
    name: "Maternity & Family Planning",
    sw: "Kliniki ya mama mjamzito",
    blurb:
      "Antenatal care, postnatal reviews and family planning in a private, dignity-focused setting — tracked in your MCH handbook at every step.",
    points: [
      "ANC clinics (mornings 8–11 AM) & postnatal care",
      "Family planning — pills, Depo, Jadelle & Implanon",
      "Implant insertion and removal",
      "Maternal tetanus vaccination & nutrition support",
      "Reproductive health counselling",
    ],
    hours: "Mon–Fri 8 AM – 5 PM · Sat 8:30 AM – 2 PM",
    image: "/images/svc-maternity.png",
    alt: "Nurse conducting an antenatal check-up for an expectant mother",
  },
  {
    id: "vaccination",
    name: "Child Health & Vaccination",
    sw: "Chanjo ya watoto",
    blurb:
      "Every KEPI vaccine on the national schedule, plus growth monitoring and child welfare reviews — gentle, quick and recorded in the Akiba ya Maisha handbook.",
    points: [
      "Full KEPI schedule — BCG, Polio, Pentavalent, PCV10, Rotavirus, Measles-Rubella",
      "Growth monitoring & welfare clinics",
      "Oral rehydration therapy (ORT)",
      "Parent guidance on feeding & development",
    ],
    hours: "Mon–Fri 8 AM – 5 PM · Sat 8:30 AM – 2 PM",
    image: "/images/svc-child.png",
    alt: "Nurse immunising a baby held by her mother",
  },
  {
    id: "lab",
    name: "Diagnostic Laboratory",
    sw: "Maabara ya vipimo",
    blurb:
      "A KMLTTB-registered Class B laboratory, so results reach your clinician the same visit — no running across town for a blood test.",
    points: [
      "Malaria RDT & blood smear, Widal (typhoid)",
      "Urinalysis & stool microscopy",
      "Blood sugar (RBS/FBS) & haemoglobin",
      "Pregnancy tests & rapid HIV screening",
    ],
    hours: "Mon–Sat from 8 AM · holidays 9 AM – 4 PM",
    image: "/images/svc-lab.png",
    alt: "Laboratory technologist examining samples under a microscope",
  },
  {
    id: "dental",
    name: "Dental Care & Oral Health",
    sw: "Afya ya meno",
    blurb:
      "Toothache relief, extractions and honest oral-health advice — with clear referral routing if you need advanced dental work.",
    points: [
      "Oral assessment & hygiene guidance",
      "Toothache relief & infection management",
      "Basic tooth extraction",
      "Dietary counselling for cavity prevention",
    ],
    hours: "Mon–Fri 9 AM – 5 PM · Sat by appointment",
    image: "/images/svc-dental.png",
    alt: "Dentist examining a smiling patient in a modern dental chair",
  },
];

export const JOURNEY = [
  {
    step: 1,
    title: "Registration",
    text: "Bring your ID (or birth notification for minors) and SHA card. Our reception team creates or updates your file in minutes.",
  },
  {
    step: 2,
    title: "Triage",
    text: "A nurse records your vitals — blood pressure, temperature, pulse, weight — and flags anything urgent immediately.",
  },
  {
    step: 3,
    title: "Consultation",
    text: "A licensed clinical officer examines you, explains what's going on in plain language — English, Kiswahili ama Sheng.",
  },
  {
    step: 4,
    title: "Laboratory (if advised)",
    text: "Samples are collected at our on-site Class B lab and results return to your clinician within the same visit.",
  },
  {
    step: 5,
    title: "Cashier",
    text: "Clear, upfront billing via M-Pesa, cash or bank transfer. SHA-accredited services are claimed directly.",
  },
  {
    step: 6,
    title: "Pharmacy",
    text: "Prescriptions are dispensed on-site with dosing counselling before you head home.",
  },
] as const;

export const STATS = [
  {
    value: 28,
    suffix: "%",
    label: "Urgent & emergency care",
    text: "of our patient traffic needs rapid stabilisation — so our triage bypass and 24/7 phone line never close.",
  },
  {
    value: 52,
    suffix: "%",
    label: "Routine outpatient visits",
    text: "come in for everyday treatment and follow-up, seen on streamlined walk-in queues.",
  },
  {
    value: 20,
    suffix: "%",
    label: "Maternal & child health",
    text: "attend antenatal clinics, family planning and KEPI immunisation through scheduled morning sessions.",
  },
] as const;

export type Prep = {
  id: string;
  title: string;
  rule: string;
  why: string;
  docs: string;
};

export const PREP: Prep[] = [
  {
    id: "fbs",
    title: "Fasting Blood Sugar (sukari) test",
    rule: "Fast strictly for 8–12 hours overnight — no food or drinks except plain water before your morning test.",
    why: "Eating before the test inflates your reading and can hide (or fake) a diabetes diagnosis.",
    docs: "National ID · any previous sugar log",
  },
  {
    id: "urine",
    title: "Urine & stool tests",
    rule: "Collect a mid-stream urine sample in the sterile container we provide, and a stool sample free of water or toilet paper contamination.",
    why: "Contamination distorts microscopy and can lead to the wrong antibiotic being prescribed.",
    docs: "Registration slip",
  },
  {
    id: "ultrasound",
    title: "Pelvic / obstetric ultrasound (referral)",
    rule: "Drink about 1 litre of plain water an hour before your scan and do not urinate before the procedure.",
    why: "A full bladder creates the acoustic window that makes pelvic structures clearly visible.",
    docs: "ANC booklet · referral slip",
  },
  {
    id: "anc",
    title: "Antenatal clinic",
    rule: "Come during morning clinic hours, 8:00–11:00 AM, and keep hydrated.",
    why: "Morning visits let us run your full blood panel (Hb, blood group, RPR, HIV) in one session without delays.",
    docs: "MCH handbook · National ID",
  },
  {
    id: "dental",
    title: "Dental consultation",
    rule: "Brush thoroughly before your visit and avoid eating immediately before any extraction.",
    why: "A clean mouth makes examination easier and lowers infection risk during procedures.",
    docs: "National ID · payment (M-Pesa accepted)",
  },
  {
    id: "kepi",
    title: "Childhood immunisation",
    rule: "Dress your baby in easily removable clothing and keep to their normal feeding schedule.",
    why: "Quick access to the thigh or arm keeps the visit short, and a calm, fed child cries less.",
    docs: "MCH handbook (Akiba ya Maisha)",
  },
] as const;

export const DOCUMENTS = [
  { item: "National ID", note: "Adults — or parent/guardian ID for minors" },
  { item: "SHA card", note: "Active Social Health Authority / insurance membership" },
  { item: "MCH handbook", note: "Mothers & children — the Akiba ya Maisha booklet" },
  { item: "Payment", note: "M-Pesa, cash or bank transfer — SHA services billed directly" },
] as const;

export type HourRow = {
  unit: string;
  weekday: string;
  weekend: string;
  holiday: string;
  payments: string;
  finance: string;
};

export const HOURS: HourRow[] = [
  {
    unit: "General Outpatient (OPD)",
    weekday: "7:30 AM – 8:30 PM",
    weekend: "8:00 AM – 7:30 PM",
    holiday: "8:00 AM – 6:00 PM",
    payments: "M-Pesa · Cash · Bank transfer",
    finance: "SHA accredited",
  },
  {
    unit: "Emergency & urgent line",
    weekday: "24/7 on 0722 700 593",
    weekend: "24/7 on 0722 700 593",
    holiday: "24/7 on 0722 700 593",
    payments: "M-Pesa · Cash",
    finance: "Emergency stabilisation first",
  },
  {
    unit: "Diagnostic Laboratory",
    weekday: "8:00 AM – 7:30 PM",
    weekend: "8:00 AM – 6:00 PM",
    holiday: "9:00 AM – 4:00 PM",
    payments: "M-Pesa · Cash",
    finance: "Integrated OPD billing · SHA lab cover",
  },
  {
    unit: "Maternity & Family Planning",
    weekday: "8:00 AM – 5:00 PM",
    weekend: "8:30 AM – 2:00 PM",
    holiday: "Closed (urgent OPD available)",
    payments: "M-Pesa · Cash",
    finance: "SHA maternal benefit",
  },
  {
    unit: "Dental Care",
    weekday: "9:00 AM – 5:00 PM",
    weekend: "By appointment",
    holiday: "Closed",
    payments: "M-Pesa · Cash",
    finance: "Fee-for-service",
  },
  {
    unit: "Outpatient Pharmacy",
    weekday: "7:30 AM – 8:30 PM",
    weekend: "8:00 AM – 7:30 PM",
    holiday: "8:00 AM – 6:00 PM",
    payments: "M-Pesa · Cash",
    finance: "Integrated prescription billing",
  },
] as const;

export const TRANSIT = [
  {
    title: "Reach the Kasarani–Mwiki road",
    text: "From Thika Superhighway or the Kasarani bypass, join the main Kasarani–Mwiki road heading to Mwiki Town.",
  },
  {
    title: "Board matatu route 44 or 178",
    text: "Route 44 runs CBD–Kasarani–Mwiki; route 178 links the Thika Road corridor and Baba Dogo to Mwiki.",
  },
  {
    title: "Alight at Mwiki main stage",
    text: "Ask for Maina Wa Maguru — we're a short walk from the stage along Mwiki–Kasarani Road.",
  },
  {
    title: "Walk straight in",
    text: "Ground-floor premises with a wide, step-free entrance, stroller and wheelchair friendly, plus drop-off space at the door.",
  },
] as const;

export type Member = {
  role: string;
  council: string;
  scope: string;
  languages: string;
  quote: string;
  initials: string;
};

export const TEAM: Member[] = [
  {
    role: "Resident Clinical Officer (In-Charge)",
    council: "Clinical Officers Council",
    scope: "Diagnosis, minor surgery & emergency stabilisation",
    languages: "English · Kiswahili · Sheng",
    quote: "Rapid, compassionate and accurate diagnosis for every family that walks through our doors.",
    initials: "CO",
  },
  {
    role: "Registered Community Health Nurse",
    council: "Nursing Council of Kenya",
    scope: "Triage, ANC, family planning & KEPI immunisation",
    languages: "English · Kiswahili",
    quote: "Supportive, dignity-focused care for mothers and infants through every stage of the journey.",
    initials: "RN",
  },
  {
    role: "Medical Laboratory Technologist",
    council: "KMLTTB · Class B operator",
    scope: "Haematology, parasitology & rapid diagnostics",
    languages: "English · Kiswahili",
    quote: "Precise, timely results that give your clinician certainty to act.",
    initials: "ML",
  },
  {
    role: "Pharmaceutical Technologist",
    council: "Pharmacy & Poisons Board",
    scope: "Dispensing, prescription verification & counselling",
    languages: "English · Kiswahili · Sheng",
    quote: "Rational drug use and safe, affordable medicine for our community.",
    initials: "PT",
  },
] as const;

export const TRUST = [
  {
    title: "KMPDC licensed — Level 2",
    text: "Registered private medical clinic, licence 61097, inspected under the Kenya Medical Practitioners & Dentists Council framework.",
  },
  {
    title: "SHA contracted provider",
    text: "Accredited for outpatient primary care and laboratory cover under the Social Health Authority.",
  },
  {
    title: "Class B laboratory",
    text: "Registered with KMLTTB (Act No. 10 of 1999) with validated testing protocols and quality-control logs.",
  },
  {
    title: "National MOH reporting",
    text: "Statutory registers — MOH 705A, 711 and 747A — are logged and anonymised before submission to sub-county offices.",
  },
  {
    title: "Your data, protected",
    text: "Data Protection Act 2019 compliant: TLS 1.3 in transit, AES-256 at rest, and role-based access — clinicians see clinical records, admin sees billing only.",
  },
] as const;

export const FAQS = [
  {
    q: "Do I need an appointment, or can I just walk in?",
    a: "Walk-ins are welcome any time we're open — booking simply shortens your wait and lets reception prepare your file. Genuine emergencies never queue: tell the front desk immediately or call 0722 700 593.",
  },
  {
    q: "How do I pay, and do you take insurance?",
    a: "We accept M-Pesa, cash and bank transfer. Ponya Medical Centre is SHA-accredited, so covered outpatient and laboratory services are claimed directly — bring your SHA card along.",
  },
  {
    q: "What should I bring for my first visit?",
    a: "Your National ID (or a guardian's ID for children), your SHA or insurance card, and for mothers and babies the MCH handbook. For fasting blood sugar tests, eat nothing for 8–12 hours before a morning draw.",
  },
  {
    q: "How is my medical information kept private?",
    a: "We comply with the Data Protection Act 2019 and ODPC guidance: records are encrypted in transit and at rest, access is role-based, and any data shared with the Ministry of Health is anonymised first.",
  },
] as const;

export const DEPARTMENT_OPTIONS = [
  { value: "opd", label: "General Outpatient (OPD)" },
  { value: "maternity", label: "Antenatal & Family Planning" },
  { value: "vaccination", label: "Child Vaccination (KEPI)" },
  { value: "lab", label: "Laboratory Tests" },
  { value: "dental", label: "Dental Care" },
] as const;
