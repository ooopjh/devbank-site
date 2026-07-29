import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for DevBank Technologies services and creator report submissions.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-14 text-zinc-200 sm:px-6 lg:px-8">
      <h1 className="font-['Poppins'] text-3xl font-semibold text-white">Privacy Policy</h1>
      <div className="mt-6 space-y-4 text-sm leading-7 text-zinc-300">
        <p>This placeholder policy describes how DevBank Technologies collects, uses, and safeguards creator-submitted information.</p>
        <p>We collect report data to analyze creator safety trends, produce research outputs, and improve platform integrity protections.</p>
        <p>Personal data is handled with least-privilege access, retained only as operationally required, and never sold to third parties.</p>
        <p>Users may request updates or removal of submitted personal identifiers where applicable under local data protection law.</p>
        <p>Contact support@devbank.tech for privacy requests, data usage questions, or compliance concerns.</p>
      </div>
    </main>
  );
}
