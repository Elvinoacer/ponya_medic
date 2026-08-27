// ── Emergency triage detection ──────────────────────────────────────────────
// Mirrors the facility's clinical escalation protocol: when a patient describes
// a red-flag presentation on any digital touchpoint, the interface must halt
// text submission and prompt an immediate phone call to the clinic.

export const EMERGENCY_PHONE = "0722 700 593";
export const EMERGENCY_PHONE_HREF = "tel:+254722700593";

/** Red-flag quick chips shown in the booking form (label → explanation). */
export const RED_FLAG_CHIPS = [
  "Severe chest pain",
  "Difficulty breathing",
  "Convulsions / fits",
  "Heavy bleeding",
  "Bleeding in pregnancy",
  "Unresponsive or very drowsy child",
] as const;

/** Common plain-language complaint chips (English / Kiswahili / Sheng). */
export const COMPLAINT_CHIPS = [
  "Homa (fever)",
  "Homa kali na kukohoa",
  "Tumbo kusumbua",
  "Kuhara na kutapika",
  "Presha / BP check",
  "Kupima sukari",
  "Chanjo ya mtoto",
  "Jino linauma",
  "ANC clinic",
  "Family planning",
] as const;

/**
 * Keyword sources compiled into a single case-insensitive regex.
 * Ordered from strongest to weakest clinical signals.
 */
const KEYWORD_SOURCES = [
  // Cardiovascular / respiratory
  "chest pain",
  "chest tightness",
  "pressure on the chest",
  "kifua kinauma sana",
  "can'?t breathe",
  "cannot breathe",
  "difficulty (in )?breathing",
  "short(ness)? of breath",
  "breathless",
  "severe asthma",
  "asthma attack",
  "cyanosis",
  "turning blue",
  // Neurological
  "convulsion",
  "seizure",
  "\\bfits?\\b",
  "degedege",
  "unconscious",
  "unresponsive",
  "collapsed",
  "won'?t wake",
  "not waking",
  "very drowsy",
  "lethargic",
  "slurred speech",
  "weak(ness)? on one side",
  "stroke",
  // Trauma / bleeding
  "heavy bleeding",
  "bleeding (a lot|heavily|won'?t stop|that won'?t stop)",
  "arterial",
  "spurting",
  "deep (cut|laceration|wound)",
  "stab",
  "gunshot",
  "head injury",
  "severe burn",
  "fracture",
  "broken bone",
  "snake ?bite",
  "poison",
  "overdose",
  "near.?drown",
  // Obstetric
  "(vaginal|pregnan\\w*) bleeding",
  "bleeding (in|while|during) pregnan",
  "heavy period.*clots.*pregnan",
  "active labour",
  "active labor",
  "in labour",
  "in labor",
  "water has broken",
  "water broke",
  "cord prolapse",
  "severe abdominal pain.*pregnan",
  "preeclampsia",
  "blurred vision.*pregnan",
  // Paediatric red flags
  "chest indraw",
  "child.*(not feed|refus(es|ing) (the )?(breast|feed|food))",
  "baby.*(not feed|refus(es|ing) (the )?(breast|feed|food))",
  "mtoto.*hali",
  "high fever.*(38\\.5|convuls|stiff neck)",
  "stiff neck",
  "sunken eyes",
  // Other acute
  "suicid",
  "kill myself",
  "end my life",
  "self.?harm",
  "anaphyla",
  "severe allergic",
  "face (is )?swelling",
  "throat closing",
  "coughing blood",
  "vomiting blood",
  "blood in (stool|vomit|urine)",
  "sudden.*vision loss",
  "testicular torsion",
  "severe (dehydration|pain)",
];

const EMERGENCY_RE = new RegExp(`(?:${KEYWORD_SOURCES.join("|")})`, "i");

/** Returns true when free text contains a clinical red flag. */
export function detectEmergency(text: string): string | null {
  if (!text) return null;
  const match = text.match(EMERGENCY_RE);
  return match ? match[0] : null;
}

/** One of the red-flag chips was tapped directly. */
export function isRedFlagChip(label: string): boolean {
  return (RED_FLAG_CHIPS as readonly string[]).includes(label);
}
