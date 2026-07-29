export type CopyrightStatus = "none" | "claims" | "strikes" | "both";

export interface CreatorReportInput {
  name?: string;
  youtube_channel_name: string;
  country: string;
  years_experience: number;
  earned_from_usa_content: boolean;
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
