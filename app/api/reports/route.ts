import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { CreatorReportInput } from "@/types/report";
import { NextResponse } from "next/server";

function normalizePayload(body: unknown): CreatorReportInput {
  const data = body as Partial<CreatorReportInput>;

  return {
    name: data.name?.trim() || undefined,
    youtube_channel_name: data.youtube_channel_name?.trim() || "",
    country: data.country?.trim() || "",
    years_experience: Number(data.years_experience),
    earned_from_usa_content: Boolean(data.earned_from_usa_content),
    approximate_earnings: data.approximate_earnings?.trim() || undefined,
    copyright_status: data.copyright_status || "none",
    additional_comments: data.additional_comments?.trim() || undefined,
  };
}

function validate(payload: CreatorReportInput) {
  if (!payload.youtube_channel_name) return "YouTube Channel Name is required.";
  if (!payload.country) return "Country is required.";
  if (!Number.isFinite(payload.years_experience) || payload.years_experience < 0) {
    return "Years of experience must be a valid non-negative number.";
  }

  if (!["none", "claims", "strikes", "both"].includes(payload.copyright_status)) {
    return "Invalid copyright status.";
  }

  return null;
}

export async function POST(request: Request) {
  try {
    const payload = normalizePayload(await request.json());
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
