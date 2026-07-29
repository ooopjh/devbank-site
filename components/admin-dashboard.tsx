"use client";

import type { CreatorReport } from "@/types/report";
import { Search } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";

interface AdminResponse {
  reports: CreatorReport[];
  totalReports: number;
  countriesCount: number;
}

export function AdminDashboard() {
  const [passcode, setPasscode] = useState("");
  const [search, setSearch] = useState("");
  const [data, setData] = useState<AdminResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filteredReports = useMemo(() => {
    if (!data) return [];
    const query = search.trim().toLowerCase();

    if (!query) return data.reports;

    return data.reports.filter((report) => {
      return (
        report.country.toLowerCase().includes(query) ||
        report.youtube_channel_name.toLowerCase().includes(query)
      );
    });
  }, [data, search]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/reports", {
        method: "GET",
        headers: {
          "x-admin-passcode": passcode,
        },
      });

      const json = (await response.json()) as AdminResponse | { message?: string };

      if (!response.ok || !("reports" in json)) {
        const errorMessage = "message" in json ? json.message : undefined;
        setData(null);
        setError(errorMessage ?? "Unable to retrieve reports.");
        return;
      }

      setData(json);
    } catch {
      setError("Network error while fetching admin data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-12 sm:px-6 lg:px-8">
      <div>
        <h1 className="font-['Poppins'] text-3xl font-semibold text-white">Creator Reports Admin</h1>
        <p className="mt-2 text-sm text-zinc-300">Protected starter dashboard for reviewing submitted creator reports.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-3 rounded-2xl border border-white/15 bg-white/5 p-4 sm:grid-cols-[1fr_auto] sm:items-end">
        <label className="grid gap-2 text-sm text-zinc-200" htmlFor="admin-passcode">
          Admin passcode
          <input
            id="admin-passcode"
            type="password"
            value={passcode}
            onChange={(event) => setPasscode(event.target.value)}
            required
            className="rounded-lg border border-white/20 bg-black/50 px-3 py-2 text-white outline-none transition focus:border-[#FF0000]"
            placeholder="Enter ADMIN_DASHBOARD_PASSCODE"
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-[#FF0000] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Loading..." : "Access Dashboard"}
        </button>
      </form>

      {error && <p className="rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">{error}</p>}

      {data && (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            <article className="rounded-2xl border border-white/15 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-zinc-400">Total Reports</p>
              <p className="mt-2 text-3xl font-semibold text-white">{data.totalReports}</p>
            </article>
            <article className="rounded-2xl border border-white/15 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-zinc-400">Countries</p>
              <p className="mt-2 text-3xl font-semibold text-white">{data.countriesCount}</p>
            </article>
            <article className="rounded-2xl border border-white/15 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-zinc-400">Visible Results</p>
              <p className="mt-2 text-3xl font-semibold text-white">{filteredReports.length}</p>
            </article>
          </div>

          <label htmlFor="search" className="relative block">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
            <input
              id="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by country or channel name"
              className="w-full rounded-xl border border-white/20 bg-black/50 py-2 pl-10 pr-3 text-sm text-white outline-none transition focus:border-[#FF0000]"
            />
          </label>

          <div className="overflow-x-auto rounded-2xl border border-white/15">
            <table className="min-w-full divide-y divide-white/10 text-sm text-zinc-200">
              <thead className="bg-white/5 text-left text-xs uppercase tracking-[0.15em] text-zinc-400">
                <tr>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Channel</th>
                  <th className="px-4 py-3">Country</th>
                  <th className="px-4 py-3">USA Earnings</th>
                  <th className="px-4 py-3">Copyright</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredReports.map((report) => (
                  <tr key={report.id} className="bg-black/20">
                    <td className="px-4 py-3">{new Date(report.created_at).toLocaleDateString()}</td>
                    <td className="px-4 py-3">{report.youtube_channel_name}</td>
                    <td className="px-4 py-3">{report.country}</td>
                    <td className="px-4 py-3">{report.earned_from_usa_content ? "Yes" : "No"}</td>
                    <td className="px-4 py-3 capitalize">{report.copyright_status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
}
