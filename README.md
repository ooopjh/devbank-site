# DevBank Technologies Website

Production-ready Next.js 15 + TypeScript + Tailwind CSS + Framer Motion website for **DevBank Technologies**.

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide Icons
- Supabase (creator report storage + admin retrieval)

## Quick Start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Environment Variables

Set all variables from `.env.example`:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` (optional)
- `SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_DASHBOARD_PASSCODE`

> Keep `SUPABASE_SERVICE_ROLE_KEY` server-side only. It is never exposed to the browser.

## Supabase Setup

Create table:

```sql
create extension if not exists pgcrypto;

create table if not exists creator_reports (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text,
  youtube_channel_name text not null,
  country text not null,
  years_experience int not null,
  earned_from_usa_content boolean not null,
  approximate_earnings text,
  copyright_status text not null,
  additional_comments text
);
```

Recommended policy approach for production:

- Restrict writes to `/api/reports` server route.
- Restrict reads to `/api/admin/reports` server route and rotate `ADMIN_DASHBOARD_PASSCODE`.
- Move to full auth/RBAC before handling sensitive data at scale.

## Routes

- `/` landing page with premium sections and creator report form
- `/privacy-policy`
- `/terms`
- `/admin`
- `/api/reports` (POST)
- `/api/admin/reports` (GET with passcode header)

## SEO & Analytics

- Metadata configured in `app/layout.tsx`
- `app/robots.ts`
- `app/sitemap.ts`
- GA4 script loaded only if `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set

## Vercel Deployment

1. Import repository into Vercel
2. Add environment variables from `.env.example`
3. Deploy using default Next.js build command (`npm run build`)

## Notes

The required disclaimer is visible in the shared footer across all pages:

> DevBank Technologies is an independent research platform and is not affiliated with any government, financial institution, or official regulatory body.
