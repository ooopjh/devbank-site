export interface ContentBase {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  tags: string[];
}

export interface CaseStudy extends ContentBase {
  challenge: string;
  approach: string;
  outcomes: string[];
}

export interface ResearchReport extends ContentBase {
  category: string;
  methodology: string;
  keyFindings: string[];
}

export type AlertSeverity = "Low" | "Medium" | "High";

export interface AlertItem extends ContentBase {
  severity: AlertSeverity;
  recommendedActions: string[];
}

export interface KnowledgeBaseArticle extends ContentBase {
  category: string;
  body: string;
}
