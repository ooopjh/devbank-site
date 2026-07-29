import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { CreatorReportInput, ReportPlatform, ReportStatus } from "@/types/report";
import { NextResponse } from "next/server";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const reportStatuses: ReportStatus[] = ["open", "reviewed", "resolved"];
const reportPlatforms: ReportPlatform[] = ["YouTube", "Instagram", "TikTok", "Facebook", "Other"];

type RateLimitEntry = { count: number; resetAt: number };

const rateLimitStore = new Map<string, RateLimitEntry>();

function getClientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(key: string) {
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  entry.count += 1;
  rateLimitStore.set(key, entry);
  return false;
}

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  return trimmed.slice(0, maxLength);
}

function cleanBoolean(value: unknown, fallback = false) {
  if (typeof value === "boolean") return value;
  return fallback;
}

function normalizePayload(body: unknown): CreatorReportInput {
  const data = body as Partial<CreatorReportInput>;
  const evidenceLinks = Array.isArray(data.evidence_links)
    ? data.evidence_links.map((entry) => cleanText(entry, 512)).filter((entry): entry is string => Boolean(entry))
    : [];

  return {
    name: cleanText(data.name, 120),
    youtube_channel_name: cleanText(data.youtube_channel_name, 120) || "",
    platform: reportPlatforms.includes(data.platform ?? "Other") ? data.platform : "Other",
    country: cleanText(data.country, 80) || "",
    years_experience: Number(data.years_experience),
    earned_from_usa_content: cleanBoolean(data.earned_from_usa_content),
    incident_date: cleanText(data.incident_date, 20),
    incident_type: cleanText(data.incident_type, 140),
    contact_email: cleanText(data.contact_email, 180),
    evidence_links: evidenceLinks.slice(0, 10),
    consent_to_process: cleanBoolean(data.consent_to_process),
    report_status: reportStatuses.includes(data.report_status ?? "open") ? data.report_status : "open",
    approximate_earnings: cleanText(data.approximate_earnings, 120),
    copyright_status: data.copyright_status || "none",
    additional_comments: cleanText(data.additional_comments, 3000),
  };
}

function validate(payload: CreatorReportInput) {
  if (!payload.youtube_channel_name) return "YouTube Channel Name is required.";
  if (!payload.platform) return "Platform is required.";
  if (!payload.country) return "Country is required.";
  if (!payload.incident_date) return "Incident date is required.";
  if (!payload.incident_type) return "Incident type is required.";
  if (!Number.isFinite(payload.years_experience) || payload.years_experience < 0) {
    return "Years of experience must be a valid non-negative number.";
  }
  if (!payload.consent_to_process) return "Consent is required before submission.";

  if (!["none", "claims", "strikes", "both"].includes(payload.copyright_status)) {
    return "Invalid copyright status.";
  }

  if (payload.contact_email && !/^\S+@\S+\.\S+$/.test(payload.contact_email)) {
    return "Invalid contact email.";
  }

  return null;
}

export async function POST(request: Request) {
  try {
    if (isRateLimited(getClientKey(request))) {
      return NextResponse.json(
        { success: false, message: "Rate limit reached. Please wait before submitting again." },
        { status: 429 },
      );
    }

    const rawPayload = (await request.json()) as CreatorReportInput & { website?: string };
    const payload = normalizePayload(rawPayload);
    const trapField = cleanText(rawPayload.website, 50);

    if (trapField) {
      return NextResponse.json({ success: false, message: "Submission rejected." }, { status: 400 });
    }

    const validationError = validate(payload);

    if (validationError) {
      return NextResponse.json({ success: false, message: validationError }, { status: 400 });
    }

    const supabase = getSupabaseServerClient();
    const { error } = await supabase.from("creator_reports").insert(payload);

    if (error) {
      return NextResponse.json(
        { success: false, message: "Unable to save submission right now." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, message: "Submission stored successfully." }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request payload." }, { status: 400 });
  }
}
