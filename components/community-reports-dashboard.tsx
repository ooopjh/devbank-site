"use client";

import type { CreatorReport, ReportPlatform, ReportStatus } from "@/types/report";
import { Search } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";

interface DashboardResponse {
  reports: CreatorReport[];
  totalReports: number;
  byStatus: Record<ReportStatus, number>;
  byCountry: Record<string, number>;
  byPlatform: Record<string, number>;
}

export function CommunityReportsDashboard() {
  const [passcode, setPasscode] = useState("");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | ReportStatus>("all");
  const [platformFilter, setPlatformFilter] = useState<"all" | ReportPlatform>("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<DashboardResponse | null>(null);

  const filteredReports = useMemo(() => {
    if (!data) return [];
    const normalized = query.trim().toLowerCase();

    return data.reports.filter((report) => {
      const matchesQuery =
        !normalized ||
        report.youtube_channel_name.toLowerCase().includes(normalized) ||
        report.country.toLowerCase().includes(normalized) ||
        (report.incident_type ?? "").toLowerCase().includes(normalized);
      const matchesStatus = statusFilter === "all" || (report.report_status ?? "open") === statusFilter;
      const matchesPlatform = platformFilter === "all" || (report.platform ?? "Other") === platformFilter;
      return matchesQuery && matchesStatus && matchesPlatform;
    });
  }, [data, platformFilter, query, statusFilter]);

  const onAccess = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/reports", {
        headers: {
          "x-admin-passcode": passcode,
        },
      });

      const json = (await response.json()) as DashboardResponse | { message?: string };

      if (!response.ok || !("reports" in json)) {
        setData(null);
        setError("message" in json ? json.message ?? "Unable to load dashboard." : "Unable to load dashboard.");
        return;
      }

      setData(json);
    } catch {
      setData(null);
      setError("Network error while loading dashboard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-6">
      <form onSubmit={onAccess} className="grid gap-3 rounded-2xl border border-white/15 bg-white/5 p-4 md:grid-cols-[1fr_auto] md:items-end">
        <label className="grid gap-2 text-sm text-zinc-200" htmlFor="community-dashboard-passcode">
          Admin passcode
          <input
            id="community-dashboard-passcode"
            type="password"
            value={passcode}
            onChange={(event) => setPasscode(event.target.value)}
            placeholder="Enter ADMIN_DASHBOARD_PASSCODE"
            required
            className="rounded-lg border border-white/20 bg-black/50 px-3 py-2 text-white outline-none transition focus:border-[#FF0000]"
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-[#FF0000] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Loading..." : "Load Reports"}
        </button>
      </form>

      {error && <p className="rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">{error}</p>}

      {!data && !error && (
        <p className="rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-zinc-300">
          Enter a valid admin passcode to view community report metrics and report tracking data.
        </p>
      )}

      {data && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <article className="rounded-2xl border border-white/15 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-zinc-400">Total Reports</p>
              <p className="mt-2 text-3xl font-semibold text-white">{data.totalReports}</p>
            </article>
            <article className="rounded-2xl border border-white/15 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-zinc-400">Open</p>
              <p className="mt-2 text-3xl font-semibold text-white">{data.byStatus.open ?? 0}</p>
            </article>
            <article className="rounded-2xl border border-white/15 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-zinc-400">Reviewed</p>
              <p className="mt-2 text-3xl font-semibold text-white">{data.byStatus.reviewed ?? 0}</p>
            </article>
            <article className="rounded-2xl border border-white/15 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-zinc-400">Resolved</p>
              <p className="mt-2 text-3xl font-semibold text-white">{data.byStatus.resolved ?? 0}</p>
            </article>
          </div>

          <div className="grid gap-3 rounded-2xl border border-white/15 bg-white/[0.04] p-4 lg:grid-cols-3">
            <label htmlFor="dashboard-search" className="relative block">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
              <input
                id="dashboard-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by channel, country, or incident"
                className="w-full rounded-xl border border-white/20 bg-black/50 py-2 pl-10 pr-3 text-sm text-white outline-none transition focus:border-[#FF0000]"
              />
            </label>

            <label className="grid gap-1 text-sm text-zinc-200">
              Status
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value as "all" | ReportStatus)}
                className="rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-white outline-none transition focus:border-[#FF0000]"
              >
                <option value="all">All statuses</option>
                <option value="open">Open</option>
                <option value="reviewed">Reviewed</option>
                <option value="resolved">Resolved</option>
              </select>
            </label>

            <label className="grid gap-1 text-sm text-zinc-200">
              Platform
              <select
                value={platformFilter}
                onChange={(event) => setPlatformFilter(event.target.value as "all" | ReportPlatform)}
                className="rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-white outline-none transition focus:border-[#FF0000]"
              >
                <option value="all">All platforms</option>
                <option value="YouTube">YouTube</option>
                <option value="Instagram">Instagram</option>
                <option value="TikTok">TikTok</option>
                <option value="Facebook">Facebook</option>
                <option value="Other">Other</option>
              </select>
            </label>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-300">By Country</h2>
              <ul className="mt-3 space-y-2 text-sm text-zinc-200">
                {Object.entries(data.byCountry).length === 0 ? (
                  <li className="text-zinc-400">No country data available.</li>
                ) : (
                  Object.entries(data.byCountry)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 6)
                    .map(([country, count]) => (
                      <li key={country} className="flex items-center justify-between">
                        <span>{country}</span>
                        <span>{count}</span>
                      </li>
                    ))
                )}
              </ul>
            </article>

            <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-300">By Platform</h2>
              <ul className="mt-3 space-y-2 text-sm text-zinc-200">
                {Object.entries(data.byPlatform).length === 0 ? (
                  <li className="text-zinc-400">No platform data available.</li>
                ) : (
                  Object.entries(data.byPlatform)
                    .sort((a, b) => b[1] - a[1])
                    .map(([platform, count]) => (
                      <li key={platform} className="flex items-center justify-between">
                        <span>{platform}</span>
                        <span>{count}</span>
                      </li>
                    ))
                )}
              </ul>
            </article>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/15">
            <table className="min-w-full divide-y divide-white/10 text-sm text-zinc-200">
              <thead className="bg-white/5 text-left text-xs uppercase tracking-[0.15em] text-zinc-400">
                <tr>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Channel</th>
                  <th className="px-4 py-3">Platform</th>
                  <th className="px-4 py-3">Country</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Incident</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredReports.length === 0 ? (
                  <tr>
                    <td className="px-4 py-4 text-zinc-400" colSpan={6}>
                      No reports matched the selected filters.
                    </td>
                  </tr>
                ) : (
                  filteredReports.map((report) => (
                    <tr key={report.id} className="bg-black/20">
                      <td className="px-4 py-3">{new Date(report.created_at).toLocaleDateString()}</td>
                      <td className="px-4 py-3">{report.youtube_channel_name}</td>
                      <td className="px-4 py-3">{report.platform ?? "Other"}</td>
                      <td className="px-4 py-3">{report.country}</td>
                      <td className="px-4 py-3 capitalize">{report.report_status ?? "open"}</td>
                      <td className="px-4 py-3">{report.incident_type ?? "Unspecified"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-zinc-400">
            Reporter contact details are intentionally excluded from this dashboard to reduce unnecessary exposure of personal data.
          </p>
        </>
      )}
    </section>
  );
}
