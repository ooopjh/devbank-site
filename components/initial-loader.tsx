"use client";

import { useEffect, useState } from "react";

export function InitialLoader() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("devbank_loader_shown") === "true") {
      return;
    }

    setShow(true);
    const timeout = window.setTimeout(() => {
      sessionStorage.setItem("devbank_loader_shown", "true");
      setShow(false);
    }, 1400);

    return () => window.clearTimeout(timeout);
  }, []);

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-white/20 border-t-[#FF0000]" />
        <p className="font-['Poppins'] text-sm tracking-[0.25em] text-zinc-200">DEVBANK TECHNOLOGIES</p>
      </div>
    </div>
  );
}
