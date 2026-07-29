import type { AlertItem, CaseStudy, KnowledgeBaseArticle, ResearchReport } from "@/types/content";

export const caseStudies: CaseStudy[] = [
  {
    slug: "creator-impostor-response-playbook",
    title: "Creator Impostor Response Playbook (Illustrative)",
    summary: "How a mid-size channel team documented and reduced repeated impersonation attempts.",
    publishedAt: "2026-06-10",
    tags: ["impersonation", "response", "education"],
    challenge: "The team received recurring brand inquiry scams using lookalike domains and fake social profiles.",
    approach:
      "DevBank provided an informational triage checklist, evidence capture workflow, and optional escalation pathways for platform reporting.",
    outcomes: [
      "Reduced response time to suspicious outreach from days to hours.",
      "Improved internal confidence around identifying spoofed sponsorship emails.",
      "No legal or financial outcomes are guaranteed; results vary by case.",
    ],
  },
  {
    slug: "copyright-risk-batch-review",
    title: "Copyright Risk Batch Review (Illustrative)",
    summary: "An educational walkthrough for prioritizing high-risk uploads before publication.",
    publishedAt: "2026-05-18",
    tags: ["copyright", "workflow", "prevention"],
    challenge: "A creator studio needed a repeatable process for evaluating fair use risk signals.",
    approach:
      "We shared informational guidance on content segmentation, source attribution tracking, and escalation to qualified legal counsel when needed.",
    outcomes: [
      "Created a reusable pre-publish checklist for editorial teams.",
      "Reduced uncertainty in review handoffs.",
      "Guidance is educational and does not replace legal advice.",
    ],
  },
];

export const researchReports: ResearchReport[] = [
  {
    slug: "sponsorship-scam-signals-2026",
    title: "Sponsorship Scam Signals 2026 (Template Report)",
    summary: "A neutral overview of recurring social engineering patterns in creator sponsorship outreach.",
    publishedAt: "2026-07-01",
    tags: ["sponsorship", "scam-signals", "social-engineering"],
    category: "Threat Trends",
    methodology: "Aggregated anonymized report patterns and open-source creator safety discussions.",
    keyFindings: [
      "Urgent payment pressure and off-platform messaging requests appeared frequently.",
      "Lookalike domains were common in first-contact emails.",
      "Pattern tracking helps prioritize reviews but does not confirm fraud by itself.",
    ],
  },
  {
    slug: "cross-border-monetization-risk",
    title: "Cross-Border Monetization Risk Notes (Template Report)",
    summary: "Informational considerations creators may review before signing international partner deals.",
    publishedAt: "2026-06-22",
    tags: ["monetization", "contracts", "international"],
    category: "Monetization",
    methodology: "Desk research and anonymized creator interviews summarized into scenario templates.",
    keyFindings: [
      "Contract language around payment timing and currency conversion should be reviewed carefully.",
      "Creators may benefit from independent legal and tax advice in their jurisdiction.",
      "This report is educational and not financial or legal advice.",
    ],
  },
];

export const alerts: AlertItem[] = [
  {
    slug: "urgent-advance-fee-sponsorship-emails",
    title: "Advance-Fee Sponsorship Email Pattern",
    summary: "Reports indicate messages requesting upfront processing fees before campaign onboarding.",
    publishedAt: "2026-07-20",
    tags: ["email", "advance-fee", "sponsorship"],
    severity: "High",
    recommendedActions: [
      "Pause all off-platform payment requests until independently verified.",
      "Verify sender domain ownership and prior brand contact history.",
      "Document evidence and submit to platform abuse reporting channels.",
    ],
  },
  {
    slug: "fake-rights-management-portals",
    title: "Fake Rights-Management Portal Links",
    summary: "Some takedown-themed messages redirect creators to credential-harvesting pages.",
    publishedAt: "2026-07-08",
    tags: ["phishing", "copyright", "credential-safety"],
    severity: "Medium",
    recommendedActions: [
      "Do not sign in from unsolicited portal links.",
      "Use known official account portals directly from bookmarked URLs.",
      "Rotate credentials immediately if suspicious sign-in activity is detected.",
    ],
  },
];

export const knowledgeBaseArticles: KnowledgeBaseArticle[] = [
  {
    slug: "how-to-document-a-scam-incident",
    title: "How to Document a Scam Incident",
    summary: "A practical checklist for preserving reportable evidence while protecting personal information.",
    publishedAt: "2026-07-18",
    tags: ["evidence", "incident-response", "privacy"],
    category: "Incident Response",
    body:
      "Capture timestamps, message headers, URLs, and screenshots in original format where possible. Avoid sharing unrelated private account details. Keep a chronology of actions taken, including platform reports and account security changes. This article is informational guidance only.",
  },
  {
    slug: "dmca-takedown-basics-for-creators",
    title: "DMCA Takedown Basics for Creators",
    summary: "High-level educational guidance on preparing a DMCA notice and understanding common limits.",
    publishedAt: "2026-07-04",
    tags: ["dmca", "copyright", "templates"],
    category: "DMCA Guidance",
    body:
      "Creators may need to identify original work, describe unauthorized use, and include required attestations under applicable law. Rules vary by jurisdiction and platform. Consider consulting qualified legal counsel for case-specific advice.",
  },
  {
    slug: "sponsorship-vetting-checklist",
    title: "Sponsorship Vetting Checklist",
    summary: "Questions to ask before signing creator partnership offers.",
    publishedAt: "2026-06-27",
    tags: ["sponsorship", "contracts", "due-diligence"],
    category: "Creator Safety",
    body:
      "Review payment terms, counterparty identity, and communication channels. Check domain history, contract clauses, and refund obligations. If unusual urgency appears, pause and verify independently.",
  },
  {
    slug: "privacy-safe-reporting-practices",
    title: "Privacy-Safe Reporting Practices",
    summary: "How to share useful report details without disclosing unnecessary personal data.",
    publishedAt: "2026-06-12",
    tags: ["privacy", "reporting", "compliance"],
    category: "Compliance",
    body:
      "Provide platform, timeline, and evidence links where relevant, but avoid posting private IDs or payment account data in public channels. Use direct secure forms for sensitive context.",
  },
];

export const siteSections = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/creator-protection", label: "Creator Protection" },
  { href: "/scam-investigation", label: "Scam Investigation" },
  { href: "/sponsorship-program", label: "Sponsorship Program" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/research-reports", label: "Research Reports" },
  { href: "/latest-alerts", label: "Latest Alerts" },
  { href: "/creator-resources", label: "Creator Resources" },
  { href: "/dmca-guidance-center", label: "DMCA Guidance Center" },
  { href: "/knowledge-base", label: "Knowledge Base" },
  { href: "/submit-report", label: "Submit Report" },
  { href: "/community-reports", label: "Community Reports" },
  { href: "/contact", label: "Contact" },
];
