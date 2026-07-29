export type CopyrightStatus = "none" | "claims" | "strikes" | "both";
export type ReportStatus = "open" | "reviewed" | "resolved";
export type ReportPlatform = "YouTube" | "Instagram" | "TikTok" | "Facebook" | "Other";

export interface CreatorReportInput {
  name?: string;
  youtube_channel_name: string;
  platform?: ReportPlatform;
  country: string;
  years_experience: number;
  earned_from_usa_content: boolean;
  incident_date?: string;
  incident_type?: string;
  contact_email?: string;
  evidence_links?: string[];
  consent_to_process?: boolean;
  report_status?: ReportStatus;
  approximate_earnings?: string;
  copyright_status: CopyrightStatus;
  additional_comments?: string;
}

export interface CreatorReport extends CreatorReportInput {
  id: string;
  created_at: string;
}

export interface CreatorReportApiResponse {
  success: boolean;
  message: string;
}
