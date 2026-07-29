"use client";

import type { CreatorReportInput, CreatorReportApiResponse, ReportPlatform } from "@/types/report";
import { FormEvent, useMemo, useState } from "react";

const defaultForm: CreatorReportInput = {
  name: "",
  youtube_channel_name: "",
  platform: "YouTube",
  country: "",
  years_experience: 0,
  earned_from_usa_content: false,
  incident_date: "",
  incident_type: "",
  contact_email: "",
  evidence_links: [],
  consent_to_process: false,
  copyright_status: "none",
  approximate_earnings: "",
  additional_comments: "",
};

const platforms: ReportPlatform[] = ["YouTube", "Instagram", "TikTok", "Facebook", "Other"];

export function ReportSubmissionForm() {
  const [form, setForm] = useState<CreatorReportInput>(defaultForm);
  const [evidenceInput, setEvidenceInput] = useState("");
  const [trapValue, setTrapValue] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<CreatorReportApiResponse | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const statusClassName = useMemo(() => {
    if (!status) return "";
    return status.success
      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
      : "border-red-500/40 bg-red-500/10 text-red-200";
  }, [status]);

  const validate = () => {
    const nextErrors: Record<string, string> = {};

    if (!form.youtube_channel_name?.trim()) {
      nextErrors.youtube_channel_name = "Channel or account name is required.";
    }

    if (!form.country?.trim()) {
      nextErrors.country = "Country is required.";
    }

    if (!form.incident_date) {
      nextErrors.incident_date = "Incident date is required.";
    }

    if (!form.incident_type?.trim()) {
      nextErrors.incident_type = "Incident type is required.";
    }

    if (!form.consent_to_process) {
      nextErrors.consent_to_process = "Consent is required before submitting.";
    }

    if (form.contact_email && !/^\S+@\S+\.\S+$/.test(form.contact_email)) {
      nextErrors.contact_email = "Please enter a valid email or leave it blank.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);

    if (!validate()) {
      return;
    }

    setSubmitting(true);

    try {
      const payload: CreatorReportInput & { website?: string } = {
        ...form,
        evidence_links: evidenceInput
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
        website: trapValue,
      };

      const response = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = (await response.json()) as CreatorReportApiResponse;

      if (!response.ok) {
        setStatus({ success: false, message: json.message ?? "Unable to submit your report right now." });
        return;
      }

      setForm(defaultForm);
      setEvidenceInput("");
      setTrapValue("");
      setErrors({});
      setStatus({ success: true, message: json.message ?? "Report submitted." });
    } catch {
      setStatus({ success: false, message: "Network error. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="mt-6 grid gap-4 rounded-3xl border border-white/15 bg-white/[0.04] p-6 sm:grid-cols-2" noValidate>
      <p className="sm:col-span-2 rounded-xl border border-white/15 bg-black/40 p-3 text-sm text-zinc-300">
        Reports are reviewed for informational and community safety purposes. Submission does not guarantee legal, platform, or financial outcomes.
      </p>

      <label className="grid gap-2 text-sm text-zinc-200">
        Name (optional)
        <input
          value={form.name}
          onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
          className="rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-white outline-none transition focus:border-[#FF0000]"
        />
      </label>

      <label className="grid gap-2 text-sm text-zinc-200">
        Channel or Account Name *
        <input
          value={form.youtube_channel_name}
          onChange={(event) => setForm((prev) => ({ ...prev, youtube_channel_name: event.target.value }))}
          className="rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-white outline-none transition focus:border-[#FF0000]"
          aria-invalid={Boolean(errors.youtube_channel_name)}
        />
        {errors.youtube_channel_name && <span className="text-xs text-red-300">{errors.youtube_channel_name}</span>}
      </label>

      <label className="grid gap-2 text-sm text-zinc-200">
        Platform *
        <select
          value={form.platform}
          onChange={(event) => setForm((prev) => ({ ...prev, platform: event.target.value as ReportPlatform }))}
          className="rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-white outline-none transition focus:border-[#FF0000]"
        >
          {platforms.map((platform) => (
            <option key={platform} value={platform}>
              {platform}
            </option>
          ))}
        </select>
      </label>

      <label className="grid gap-2 text-sm text-zinc-200">
        Country *
        <input
          value={form.country}
          onChange={(event) => setForm((prev) => ({ ...prev, country: event.target.value }))}
          className="rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-white outline-none transition focus:border-[#FF0000]"
          aria-invalid={Boolean(errors.country)}
        />
        {errors.country && <span className="text-xs text-red-300">{errors.country}</span>}
      </label>

      <label className="grid gap-2 text-sm text-zinc-200">
        Incident Date *
        <input
          type="date"
          value={form.incident_date}
          onChange={(event) => setForm((prev) => ({ ...prev, incident_date: event.target.value }))}
          className="rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-white outline-none transition focus:border-[#FF0000]"
          aria-invalid={Boolean(errors.incident_date)}
        />
        {errors.incident_date && <span className="text-xs text-red-300">{errors.incident_date}</span>}
      </label>

      <label className="grid gap-2 text-sm text-zinc-200">
        Incident Type *
        <input
          value={form.incident_type}
          onChange={(event) => setForm((prev) => ({ ...prev, incident_type: event.target.value }))}
          placeholder="Example: fake sponsorship outreach"
          className="rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-white outline-none transition focus:border-[#FF0000]"
          aria-invalid={Boolean(errors.incident_type)}
        />
        {errors.incident_type && <span className="text-xs text-red-300">{errors.incident_type}</span>}
      </label>

      <label className="grid gap-2 text-sm text-zinc-200">
        Contact Email (optional)
        <input
          type="email"
          value={form.contact_email}
          onChange={(event) => setForm((prev) => ({ ...prev, contact_email: event.target.value }))}
          className="rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-white outline-none transition focus:border-[#FF0000]"
          aria-invalid={Boolean(errors.contact_email)}
        />
        {errors.contact_email && <span className="text-xs text-red-300">{errors.contact_email}</span>}
      </label>

      <label className="grid gap-2 text-sm text-zinc-200 sm:col-span-2">
        Evidence Links (optional, one URL per line)
        <textarea
          rows={4}
          value={evidenceInput}
          onChange={(event) => setEvidenceInput(event.target.value)}
          className="rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-white outline-none transition focus:border-[#FF0000]"
        />
      </label>

      <label className="grid gap-2 text-sm text-zinc-200 sm:col-span-2">
        Additional Context (optional)
        <textarea
          rows={4}
          value={form.additional_comments}
          onChange={(event) => setForm((prev) => ({ ...prev, additional_comments: event.target.value }))}
          className="rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-white outline-none transition focus:border-[#FF0000]"
        />
      </label>

      <label className="hidden" htmlFor="website-field">
        Leave this field empty
      </label>
      <input
        id="website-field"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        value={trapValue}
        onChange={(event) => setTrapValue(event.target.value)}
      />

      <label className="sm:col-span-2 inline-flex items-start gap-2 text-sm text-zinc-200">
        <input
          type="checkbox"
          checked={Boolean(form.consent_to_process)}
          onChange={(event) => setForm((prev) => ({ ...prev, consent_to_process: event.target.checked }))}
          className="mt-1"
          aria-invalid={Boolean(errors.consent_to_process)}
        />
        I consent to DevBank processing this report for moderation, analysis, and educational safety reporting.
      </label>
      {errors.consent_to_process && <p className="sm:col-span-2 text-xs text-red-300">{errors.consent_to_process}</p>}

      {status && <p className={`sm:col-span-2 rounded-lg border p-3 text-sm ${statusClassName}`}>{status.message}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="sm:col-span-2 rounded-lg bg-[#FF0000] px-4 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitting ? "Submitting..." : "Submit Report"}
      </button>
    </form>
  );
}
