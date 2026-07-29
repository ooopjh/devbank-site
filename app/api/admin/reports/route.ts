import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { CreatorReport, ReportStatus } from "@/types/report";
import { NextResponse } from "next/server";

function summarizeReports(reports: CreatorReport[]) {
  const byStatus: Record<ReportStatus, number> = { open: 0, reviewed: 0, resolved: 0 };
  const byCountry: Record<string, number> = {};
  const byPlatform: Record<string, number> = {};

  for (const report of reports) {
    const status = report.report_status ?? "open";
    const platform = report.platform ?? "Other";
    byStatus[status] += 1;
    byCountry[report.country] = (byCountry[report.country] ?? 0) + 1;
    byPlatform[platform] = (byPlatform[platform] ?? 0) + 1;
  }

  return {
    totalReports: reports.length,
    byStatus,
    byCountry,
    byPlatform,
  };
}

export async function GET(request: Request) {
  const passcode = request.headers.get("x-admin-passcode");

  if (!process.env.ADMIN_DASHBOARD_PASSCODE || passcode !== process.env.ADMIN_DASHBOARD_PASSCODE) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("creator_reports")
      .select(
        "id, created_at, youtube_channel_name, platform, country, years_experience, earned_from_usa_content, incident_date, incident_type, report_status, copyright_status",
      )
      .order("created_at", { ascending: false })
      .limit(500);

    if (error) {
      return NextResponse.json({ message: "Failed to load creator reports." }, { status: 500 });
    }

    const reports: CreatorReport[] = (data ?? []).map((entry) => ({
      id: String(entry.id),
      created_at: String(entry.created_at),
      youtube_channel_name: String(entry.youtube_channel_name ?? ""),
      platform: (entry.platform as CreatorReport["platform"]) ?? "Other",
      country: String(entry.country ?? "Unknown"),
      years_experience: Number(entry.years_experience ?? 0),
      earned_from_usa_content: Boolean(entry.earned_from_usa_content),
      incident_date: typeof entry.incident_date === "string" ? entry.incident_date : undefined,
      incident_type: typeof entry.incident_type === "string" ? entry.incident_type : undefined,
      report_status: (entry.report_status as ReportStatus) ?? "open",
      copyright_status: (entry.copyright_status as CreatorReport["copyright_status"]) ?? "none",
    }));

    const summary = summarizeReports(reports);

    return NextResponse.json({
      reports,
      ...summary,
    });
  } catch {
    return NextResponse.json({ message: "Server error while loading reports." }, { status: 500 });
  }
}
