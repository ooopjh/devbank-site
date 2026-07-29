import { Breadcrumbs } from "@/components/breadcrumbs";
import type { ReactNode } from "react";

interface PageTemplateProps {
  title: string;
  intro: string;
  breadcrumbs: { label: string; href?: string }[];
  children?: ReactNode;
}

export function PageTemplate({ title, intro, breadcrumbs, children }: PageTemplateProps) {
  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-12 sm:px-6 lg:px-8">
      <Breadcrumbs items={breadcrumbs} />
      <h1 className="mt-4 font-['Poppins'] text-3xl font-semibold text-white sm:text-4xl">{title}</h1>
      <p className="mt-4 max-w-4xl text-zinc-300">{intro}</p>
      <div className="mt-8">{children}</div>
      <p className="mt-8 rounded-xl border border-white/10 bg-black/30 p-4 text-xs text-zinc-400">
        DevBank is an independent informational platform. Content may help with awareness and planning, but it does not guarantee legal, regulatory, platform, or financial outcomes.
      </p>
    </main>
  );
}
