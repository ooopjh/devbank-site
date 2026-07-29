import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for DevBank Technologies platform usage and reporting.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-14 text-zinc-200 sm:px-6 lg:px-8">
      <h1 className="font-['Poppins'] text-3xl font-semibold text-white">Terms of Service</h1>
      <div className="mt-6 space-y-4 text-sm leading-7 text-zinc-300">
        <p>These placeholder terms govern access to DevBank Technologies research materials and creator submission channels.</p>
        <p>By using this platform, users confirm submitted information is accurate to the best of their knowledge and lawfully shared.</p>
        <p>Research and alerts are informational and do not constitute legal, financial, or regulatory advice.</p>
        <p>DevBank Technologies may moderate or remove abusive submissions and suspend misuse of platform services.</p>
        <p>For support or legal inquiries, contact support@devbank.tech.</p>
      </div>
    </main>
  );
}
