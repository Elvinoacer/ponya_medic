import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { detectEmergency } from "@/lib/triage";
import { DEPARTMENT_OPTIONS } from "@/lib/data";
import { isValidKenyanPhone, normalizePhone } from "@/lib/validation";
const SESSIONS = new Set(["morning", "afternoon"]);
const SEXES = new Set(["female", "male"]);

function refCode(): string {
  const alphabet = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"; // no look-alikes
  let out = "";
  for (let i = 0; i < 6; i++) {
    out += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `PMC-${out}`;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const str = (key: string) => (typeof body[key] === "string" ? (body[key] as string).trim() : "");

  const fullName = str("fullName");
  const dateOfBirth = str("dateOfBirth");
  const sex = str("sex").toLowerCase();
  const phone = normalizePhone(str("phone"));
  const residence = str("residence");
  const department = str("department");
  const preferredDate = str("preferredDate");
  const preferredTime = str("preferredTime").toLowerCase();
  const complaint = str("complaint");
  const idNumber = str("idNumber") || null;
  const shaNumber = str("shaNumber") || null;
  const clinicianNote = str("clinicianNote") || null;
  const consent = body.consent === true;

  /* Server-side emergency gate — red flags are never booked, only called. */
  const matched = detectEmergency(complaint);
  if (matched) {
    return NextResponse.json(
      {
        status: "emergency",
        matchedText: matched,
        phone: "0722 700 593",
        message:
          "Your message mentions a possible emergency. Please call 0722 700 593 now — do not wait for an online reply.",
      },
      { status: 200 },
    );
  }

  /* Validation */
  const errors: string[] = [];
  if (fullName.length < 3) errors.push("Full name is required.");
  if (!dateOfBirth) errors.push("Date of birth is required.");
  if (!SEXES.has(sex)) errors.push("Sex selection is required.");
  if (!isValidKenyanPhone(phone)) errors.push("A valid Kenyan phone number is required.");
  if (!residence) errors.push("Residential area is required.");
  if (!DEPARTMENT_OPTIONS.some((d) => d.value === department)) errors.push("Department selection is invalid.");
  if (!preferredDate) errors.push("Preferred date is required.");
  if (!SESSIONS.has(preferredTime)) errors.push("Preferred session is invalid.");
  if (complaint.length < 3) errors.push("Please describe the reason for your visit.");
  if (!consent) errors.push("Data-processing consent is required.");

  if (errors.length > 0) {
    return NextResponse.json({ ok: false, error: errors.join(" ") }, { status: 422 });
  }

  try {
    const booking = await db.appointment.create({
      data: {
        refCode: refCode(),
        fullName,
        dateOfBirth,
        sex,
        phone,
        residence,
        idNumber,
        shaNumber,
        department,
        preferredDate,
        preferredTime,
        clinicianNote,
        complaint,
        consent,
      },
    });

    return NextResponse.json({
      ok: true,
      booking: {
        refCode: booking.refCode,
        fullName: booking.fullName,
        department: booking.department,
        preferredDate: booking.preferredDate,
        preferredTime: booking.preferredTime,
        phone: booking.phone,
      },
    });
  } catch (error) {
    console.error("Failed to store appointment", error);
    return NextResponse.json(
      { ok: false, error: "We couldn't save your request right now. Please try again, or call 0722 700 593." },
      { status: 500 },
    );
  }
}
