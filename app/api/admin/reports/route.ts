import { getSupabaseServerClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const passcode = request.headers.get("x-admin-passcode");

  if (!process.env.ADMIN_DASHBOARD_PASSCODE || passcode !== process.env.ADMIN_DASHBOARD_PASSCODE) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("creator_reports")
      .select("id, created_at, youtube_channel_name, country, years_experience, earned_from_usa_content, copyright_status")
      .order("created_at", { ascending: false })
      .limit(500);

    if (error) {
      return NextResponse.json({ message: "Failed to load creator reports." }, { status: 500 });
    }

    const countrySet = new Set((data ?? []).map((entry) => entry.country));

    return NextResponse.json({
      reports: data ?? [],
      totalReports: (data ?? []).length,
      countriesCount: countrySet.size,
    });
  } catch {
    return NextResponse.json({ message: "Server error while loading reports." }, { status: 500 });
  }
}
