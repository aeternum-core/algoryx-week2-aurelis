import { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Selected Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative border-t border-current/10 px-6 pb-12 pt-20 lg:px-12 transition-colors duration-500">
      <div className="mx-auto max-w-7xl">
        {/* Upper Grid */}
        <div className="grid gap-12 border-b border-current/10 pb-16 lg:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand Column */}
          <div>
            <a
              href="#home"
              className="font-display text-3xl font-bold tracking-tight"
            >
              AURELIS<span className="text-indigo-600 dark:text-indigo-400">.</span>
            </a>

            <p className="mt-4 max-w-sm text-sm leading-relaxed opacity-65 font-light">
              An architectural digital experience studio crafting responsive,
              motion-grounded interfaces for visionary concepts.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-[11px] border-zinc-200/90 bg-white/80 text-zinc-700 dark:border-white/15 dark:bg-white/[0.04] dark:text-zinc-300 shadow-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>STUDIO CLOCK // {time || "00:00:00"} IST (BANGALORE NODE)</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <p className="mb-5 font-mono text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              // NAVIGATION
            </p>
            <ul className="space-y-3 font-mono text-xs opacity-75">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="transition-all duration-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:opacity-100 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Studio Meta & Nodes */}
          <div>
            <p className="mb-5 font-mono text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              // STUDIO NODES
            </p>
            <div className="space-y-3 font-mono text-xs opacity-75">
              <div>
                <p className="font-semibold text-current">Bangalore, India (HQ)</p>
                <p className="opacity-60">Primary Studio Node</p>
              </div>
              <div>
                <p className="font-semibold text-current">Principal Architect</p>
                <p className="text-indigo-600 dark:text-indigo-400 font-medium">Likith V Gowda</p>
              </div>
              <div>
                <p className="font-semibold text-current">London Node</p>
                <p className="opacity-60">Collaborative Network</p>
              </div>
              <div className="pt-2 text-[11px] opacity-60">
                <span>Direct: likith@aurelis.studio // hello@aurelis.studio</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lower Bar */}
        <div className="mt-8 flex flex-col justify-between gap-4 font-mono text-xs opacity-60 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} AURELIS STUDIO. Crafted & Directed by Likith V Gowda — Algoryx UI/UX Internship.</p>

          <a
            href="#home"
            className="inline-flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-indigo-400 hover:opacity-100 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </footer>
  );
}