"use client";

import type { CreatorReportInput } from "@/types/report";
import { AlertTriangle, ArrowRight, BadgeCheck, BadgeX, ChartNoAxesCombined, Globe, Mail, PlayCircle, Shield } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { FormEvent, useEffect, useMemo, useState } from "react";

const stats = [
  { label: "Creator Reports Collected", value: 500, suffix: "+" },
  { label: "Copyright Cases Analyzed", value: 100, suffix: "+" },
  { label: "Monetization Studies", value: 50, suffix: "+" },
  { label: "Countries Covered", value: 10, suffix: "+" },
];

const services = [
  "Creator Safety Research",
  "Copyright Risk Assessment",
  "Monetization Analysis",
  "Scam Investigation",
  "Digital Reports",
  "Community Support",
];

const featuredResearch = [
  "USA Content Monetization: Myth vs Reality",
  "Movie & TV Show Copyright Risks",
  "Foreign Content Success Stories",
];

const alerts = [
  { title: "Rising fake sponsorship payout scams", date: "Jul 2026", severity: "High" },
  { title: "Mass copyright claim automation wave", date: "Jun 2026", severity: "Medium" },
  { title: "Fraudulent content licensing contracts", date: "May 2026", severity: "Critical" },
];

const testimonials = [
  {
    name: "Ariya N.",
    role: "Education Creator, Thailand",
    quote: "DevBank helped us spot monetization blind spots and avoid predatory outreach campaigns.",
    avatar: "/avatars/avatar-1.svg",
  },
  {
    name: "Michael R.",
    role: "Film Commentary Creator, USA",
    quote: "Their copyright breakdown saved our team from repeated strike exposure across multiple uploads.",
    avatar: "/avatars/avatar-2.svg",
  },
  {
    name: "Sofia D.",
    role: "Gaming Creator, Spain",
    quote: "The research reports gave us practical benchmarks for safer growth in international audiences.",
    avatar: "/avatars/avatar-3.svg",
  },
];

const defaultForm: CreatorReportInput = {
  name: "",
  youtube_channel_name: "",
  country: "",
  years_experience: 1,
  earned_from_usa_content: true,
  approximate_earnings: "",
  copyright_status: "none",
  additional_comments: "",
};

function useCounter(target: number) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frame = 0;
    const totalFrames = 45;
    const timer = window.setInterval(() => {
      frame += 1;
      const next = Math.round((target * frame) / totalFrames);
      setValue(next >= target ? target : next);
      if (frame >= totalFrames) window.clearInterval(timer);
    }, 24);

    return () => window.clearInterval(timer);
  }, [target]);

  return value;
}

function StatCard({ label, value, suffix, index }: { label: string; value: number; suffix: string; index: number }) {
  const counterValue = useCounter(value);

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
    >
      <p className="text-4xl font-semibold text-white">
        {counterValue}
        {suffix}
      </p>
      <p className="mt-2 text-sm text-zinc-300">{label}</p>
    </motion.article>
  );
}

export function HomePage() {
  const [index, setIndex] = useState(0);
  const [form, setForm] = useState<CreatorReportInput>(defaultForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % testimonials.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  const statusClassName = useMemo(() => {
    if (!status) return "";
    return status.type === "success"
      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
      : "border-red-500/40 bg-red-500/10 text-red-200";
  }, [status]);

  const validate = () => {
    const nextErrors: Record<string, string> = {};

    if (!form.youtube_channel_name.trim()) {
      nextErrors.youtube_channel_name = "YouTube Channel Name is required.";
    }

    if (!form.country.trim()) {
      nextErrors.country = "Country is required.";
    }

    if (!Number.isFinite(form.years_experience) || form.years_experience < 0) {
      nextErrors.years_experience = "Years of experience must be a valid number.";
    }

    if (!form.copyright_status) {
      nextErrors.copyright_status = "Please select a copyright status.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);

    if (!validate()) return;

    setSubmitting(true);

    try {
      const response = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        setStatus({ type: "error", message: payload.message ?? "Unable to submit your report." });
        return;
      }

      setStatus({ type: "success", message: "Thank you. Your experience was submitted successfully." });
      setForm(defaultForm);
      setErrors({});
    } catch {
      setStatus({ type: "error", message: "Network error. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-4 pb-24 pt-14 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-white/15 bg-white/[0.04] p-8 backdrop-blur-xl sm:p-12"
        >
          <p className="font-['Poppins'] text-xs tracking-[0.32em] text-zinc-300">DEVBANK TECHNOLOGIES</p>
          <h1 className="mt-4 max-w-3xl font-['Poppins'] text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
            Protecting Creators. Uncovering the Truth.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-zinc-300">
            Independent research platform dedicated to YouTube creator safety, foreign content monetization analysis, and digital scam awareness.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#submit" className="rounded-full bg-[#FF0000] px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700">
              Submit Your Experience
            </a>
            <a
              href="#research"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-zinc-100 transition hover:border-[#FF0000] hover:text-[#FF0000]"
            >
              View Research Reports <ArrowRight size={16} />
            </a>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-4 px-4 pb-24 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((item, statIndex) => (
          <StatCard
            key={item.label}
            index={statIndex}
            label={item.label}
            value={item.value}
            suffix={item.suffix}
          />
        ))}
      </section>

      <section id="about" className="mx-auto w-full max-w-4xl px-4 pb-24 text-center sm:px-6 lg:px-8">
        <h2 className="font-['Poppins'] text-3xl font-semibold text-white">Who We Are</h2>
        <p className="mt-5 text-zinc-300">
          DevBank Technologies is an independent digital research initiative committed to studying creator monetization trends, copyright risks, and online scams affecting content creators worldwide.
        </p>
      </section>

      <section id="services" className="mx-auto w-full max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <h2 className="font-['Poppins'] text-3xl font-semibold text-white">Core Services</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, serviceIndex) => (
            <motion.article
              key={service}
              whileHover={{ y: -4 }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.35, delay: serviceIndex * 0.04 }}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
            >
              <Shield className="text-[#FF0000]" size={20} />
              <p className="mt-4 text-lg font-medium text-white">{service}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="research" className="mx-auto w-full max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <h2 className="font-['Poppins'] text-3xl font-semibold text-white">Featured Research</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {featuredResearch.map((research) => (
            <article key={research} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <ChartNoAxesCombined className="text-[#FF0000]" size={20} />
              <h3 className="mt-4 text-lg font-medium text-white">{research}</h3>
              <p className="mt-2 text-sm text-zinc-300">Data-backed insights with global creator context and risk indicators.</p>
            </article>
          ))}
        </div>
      </section>

      <section id="alerts" className="mx-auto w-full max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <h2 className="font-['Poppins'] text-3xl font-semibold text-white">Latest Creator Safety Alerts</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {alerts.map((alert) => (
            <article key={alert.title} className="rounded-2xl border border-red-500/30 bg-red-500/5 p-5">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs text-zinc-200">{alert.date}</span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    alert.severity === "Critical"
                      ? "bg-red-500/25 text-red-100"
                      : alert.severity === "High"
                        ? "bg-orange-500/20 text-orange-200"
                        : "bg-yellow-500/20 text-yellow-200"
                  }`}
                >
                  {alert.severity}
                </span>
              </div>
              <h3 className="mt-4 flex items-start gap-2 text-lg font-medium text-white">
                <AlertTriangle className="mt-1 text-[#FF0000]" size={18} />
                {alert.title}
              </h3>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 pb-24 sm:px-6 lg:px-8">
        <h2 className="font-['Poppins'] text-3xl font-semibold text-white">Creator Testimonials</h2>
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <AnimatePresence mode="wait">
            <motion.article
              key={testimonials[index].name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.35 }}
              className="grid items-center gap-6 sm:grid-cols-[auto_1fr]"
            >
              <Image
                src={testimonials[index].avatar}
                alt={`${testimonials[index].name} profile avatar`}
                width={72}
                height={72}
                className="rounded-full border border-white/20"
              />
              <div>
                <p className="text-lg text-zinc-100">“{testimonials[index].quote}”</p>
                <p className="mt-4 font-medium text-white">{testimonials[index].name}</p>
                <p className="text-sm text-zinc-400">{testimonials[index].role}</p>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </section>

      <section id="submit" className="mx-auto w-full max-w-4xl px-4 pb-24 sm:px-6 lg:px-8">
        <h2 className="font-['Poppins'] text-3xl font-semibold text-white">Submit Creator Experience</h2>
        <p className="mt-3 text-zinc-300">Share your research-relevant creator experience securely.</p>

        <form onSubmit={onSubmit} className="mt-8 grid gap-4 rounded-3xl border border-white/15 bg-white/[0.04] p-6 sm:grid-cols-2">
          <label className="grid gap-2 text-sm text-zinc-200">
            Name (optional)
            <input
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              className="rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-white outline-none transition focus:border-[#FF0000]"
            />
          </label>

          <label className="grid gap-2 text-sm text-zinc-200">
            YouTube Channel Name *
            <input
              value={form.youtube_channel_name}
              onChange={(event) => setForm((prev) => ({ ...prev, youtube_channel_name: event.target.value }))}
              className="rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-white outline-none transition focus:border-[#FF0000]"
              aria-invalid={Boolean(errors.youtube_channel_name)}
            />
            {errors.youtube_channel_name && <span className="text-xs text-red-300">{errors.youtube_channel_name}</span>}
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
            Years of Experience *
            <input
              type="number"
              min={0}
              value={form.years_experience}
              onChange={(event) => setForm((prev) => ({ ...prev, years_experience: Number(event.target.value) }))}
              className="rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-white outline-none transition focus:border-[#FF0000]"
              aria-invalid={Boolean(errors.years_experience)}
            />
            {errors.years_experience && <span className="text-xs text-red-300">{errors.years_experience}</span>}
          </label>

          <fieldset className="grid gap-2 text-sm text-zinc-200">
            <legend className="mb-1">Did you earn money from USA content? *</legend>
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                name="usa-content"
                checked={form.earned_from_usa_content}
                onChange={() => setForm((prev) => ({ ...prev, earned_from_usa_content: true }))}
              />
              Yes
            </label>
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                name="usa-content"
                checked={!form.earned_from_usa_content}
                onChange={() => setForm((prev) => ({ ...prev, earned_from_usa_content: false }))}
              />
              No
            </label>
          </fieldset>

          <label className="grid gap-2 text-sm text-zinc-200">
            Approximate earnings (optional)
            <input
              value={form.approximate_earnings}
              onChange={(event) => setForm((prev) => ({ ...prev, approximate_earnings: event.target.value }))}
              className="rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-white outline-none transition focus:border-[#FF0000]"
            />
          </label>

          <label className="grid gap-2 text-sm text-zinc-200 sm:col-span-2">
            Did you receive copyright claims/strikes? *
            <select
              value={form.copyright_status}
              onChange={(event) => setForm((prev) => ({ ...prev, copyright_status: event.target.value as CreatorReportInput["copyright_status"] }))}
              className="rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-white outline-none transition focus:border-[#FF0000]"
              aria-invalid={Boolean(errors.copyright_status)}
            >
              <option value="none">None</option>
              <option value="claims">Claims</option>
              <option value="strikes">Strikes</option>
              <option value="both">Both</option>
            </select>
            {errors.copyright_status && <span className="text-xs text-red-300">{errors.copyright_status}</span>}
          </label>

          <label className="grid gap-2 text-sm text-zinc-200 sm:col-span-2">
            Additional comments (optional)
            <textarea
              rows={4}
              value={form.additional_comments}
              onChange={(event) => setForm((prev) => ({ ...prev, additional_comments: event.target.value }))}
              className="rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-white outline-none transition focus:border-[#FF0000]"
            />
          </label>

          {status && <p className={`rounded-lg border p-3 text-sm sm:col-span-2 ${statusClassName}`}>{status.message}</p>}

          <button
            disabled={submitting}
            type="submit"
            className="sm:col-span-2 rounded-lg bg-[#FF0000] px-4 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? "Submitting..." : "Submit Experience"}
          </button>
        </form>
      </section>

      <section id="contact" className="mx-auto w-full max-w-7xl px-4 pb-28 sm:px-6 lg:px-8">
        <h2 className="font-['Poppins'] text-3xl font-semibold text-white">Contact</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <Mail size={18} className="text-[#FF0000]" />
            <a href="mailto:support@devbank.tech" className="mt-3 inline-block text-zinc-300 transition hover:text-[#FF0000]">
              support@devbank.tech
            </a>
          </article>
          <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <Globe size={18} className="text-[#FF0000]" />
            <a href="https://devbank.tech" className="mt-3 inline-block text-zinc-300 transition hover:text-[#FF0000]">
              devbank.tech
            </a>
          </article>
          <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <PlayCircle size={18} className="text-[#FF0000]" />
            <a href="https://youtube.com" className="mt-3 inline-block text-zinc-300 transition hover:text-[#FF0000]">
              YouTube
            </a>
          </article>
          <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <div className="flex gap-2 text-[#FF0000]">
              <BadgeX size={18} />
              <BadgeCheck size={18} />
            </div>
            <div className="mt-3 flex flex-col gap-1 text-zinc-300">
              <a href="https://x.com" className="transition hover:text-[#FF0000]">
                X (Twitter)
              </a>
              <a href="https://linkedin.com" className="transition hover:text-[#FF0000]">
                LinkedIn
              </a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
