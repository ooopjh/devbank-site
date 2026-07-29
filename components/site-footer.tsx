import Link from "next/link";
import { DISCLAIMER_TEXT } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black/70">
      <div className="mx-auto max-w-7xl space-y-5 px-4 py-10 text-sm text-zinc-300 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-4">
          <Link href="/privacy-policy" className="transition hover:text-[#FF0000]">
            Privacy Policy
          </Link>
          <Link href="/terms" className="transition hover:text-[#FF0000]">
            Terms of Service
          </Link>
          <a href="#disclaimer" className="transition hover:text-[#FF0000]">
            Disclaimer
          </a>
        </div>
        <p id="disclaimer" className="text-zinc-200">
          {DISCLAIMER_TEXT}
        </p>
        <p className="text-zinc-400">© 2026 DevBank Technologies</p>
      </div>
    </footer>
  );
}
