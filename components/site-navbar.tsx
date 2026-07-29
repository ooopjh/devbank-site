"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#services", label: "Services" },
  { href: "/#research", label: "Research" },
  { href: "/#alerts", label: "Alerts" },
  { href: "/#submit", label: "Submit" },
  { href: "/#contact", label: "Contact" },
  { href: "/admin", label: "Admin" },
];

export function SiteNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-['Poppins'] text-sm font-semibold tracking-[0.35em] text-white sm:text-base">
          DEVBANK TECHNOLOGIES
        </Link>

        <button
          aria-label="Toggle navigation menu"
          onClick={() => setOpen((value) => !value)}
          className="rounded-md border border-white/20 p-2 text-white md:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>

        <nav className="hidden items-center gap-6 text-sm text-zinc-200 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-[#FF0000]">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {open && (
        <nav className="border-t border-white/10 bg-black/95 px-4 py-3 md:hidden">
          <div className="flex flex-col gap-3 text-sm text-zinc-200">
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="py-1 transition hover:text-[#FF0000]">
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
