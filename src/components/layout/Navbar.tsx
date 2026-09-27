import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, Moon, Sun, X, Sparkles } from "lucide-react";
import Magnetic from "../motion/Magnetic";

interface NavbarProps {
  darkMode: boolean;
  toggleTheme: () => void;
  activeSection?: string;
}

const navItems = [
  { label: "About", href: "#about", id: "about" },
  { label: "Services", href: "#services", id: "services" },
  { label: "Work", href: "#work", id: "work" },
  { label: "Process", href: "#process", id: "process" },
  { label: "Pricing", href: "#pricing", id: "pricing" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export default function Navbar({
  darkMode,
  toggleTheme,
  activeSection = "home",
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = () => {
    setMenuOpen(false);
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
        <nav
          className={`flex items-center justify-between rounded-full border px-4 py-2.5 sm:px-6 sm:py-3 transition-all duration-300 ${
            isScrolled
              ? darkMode
                ? "border-white/15 bg-[#09090b]/80 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl text-white"
                : "border-indigo-100/90 bg-white/85 shadow-[0_10px_30px_rgba(99,102,241,0.08)] backdrop-blur-2xl text-zinc-900 ring-1 ring-black/[0.03]"
              : darkMode
              ? "border-white/10 bg-black/40 backdrop-blur-md text-white"
              : "border-indigo-100/80 bg-white/75 backdrop-blur-xl text-zinc-900 shadow-xs ring-1 ring-black/[0.02]"
          }`}
        >
          {/* Studio Brand Identity */}
          <a
            href="#home"
            className="group flex items-center gap-2.5 font-semibold tracking-tight"
            onClick={handleNavigation}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-transform duration-300 group-hover:scale-105">
              A
            </span>

            <div className="flex flex-col">
              <span className="font-display text-sm tracking-wider sm:text-base font-bold">
                AURELIS
              </span>
              <span className="hidden font-mono text-[9px] uppercase tracking-widest opacity-50 sm:inline-block">
                Experience Studio
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links with Active Pill */}
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`relative rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors duration-200 ${
                    isActive
                      ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                      : "opacity-70 hover:opacity-100 hover:text-indigo-500"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 -z-10 rounded-full border border-indigo-500/25 bg-indigo-500/10 shadow-xs shadow-indigo-100/50 dark:border-indigo-500/30 dark:bg-indigo-500/15 dark:shadow-none backdrop-blur-xs"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* Desktop Actions (Theme Toggle & CTA) */}
          <div className="hidden items-center gap-3 md:flex">
            <Magnetic strength={0.2}>
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={darkMode ? "Switch to light theme" : "Switch to dark theme"}
                className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${
                  darkMode
                    ? "border-white/15 bg-white/5 hover:bg-white/10 text-yellow-300"
                    : "border-indigo-100/90 bg-indigo-50/80 hover:bg-indigo-100/80 text-indigo-600 shadow-xs"
                }`}
              >
                <motion.div
                  key={darkMode ? "dark" : "light"}
                  initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {darkMode ? <Sun size={16} /> : <Moon size={16} />}
                </motion.div>
              </button>
            </Magnetic>

            <Magnetic strength={0.25}>
              <a
                href="#contact"
                className="group relative flex items-center gap-2 rounded-full bg-black px-4 py-2 text-xs font-medium uppercase tracking-wider text-white shadow-[0_0_20px_rgba(99,102,241,0.25)] transition-all duration-300 hover:bg-indigo-600 dark:bg-white dark:text-black dark:hover:bg-indigo-400 dark:hover:text-black"
              >
                <Sparkles size={13} className="text-indigo-400 dark:text-indigo-600" />
                Let's Talk
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </Magnetic>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className={`flex h-9 w-9 items-center justify-center rounded-full border ${
                darkMode
                  ? "border-white/15 text-yellow-300 bg-white/5"
                  : "border-indigo-100 text-indigo-600 bg-indigo-50/80 shadow-xs"
              }`}
            >
              {darkMode ? (
                <Sun size={16} />
              ) : (
                <Moon size={16} />
              )}
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-current/10"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className={`mt-2 rounded-3xl border p-5 shadow-2xl backdrop-blur-2xl md:hidden ${
                darkMode
                  ? "border-white/15 bg-[#09090b]/95 text-white"
                  : "border-indigo-100/90 bg-[#ffffff]/95 text-zinc-900 shadow-2xl ring-1 ring-black/[0.03]"
              }`}
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item, idx) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    onClick={handleNavigation}
                    className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium ${
                      activeSection === item.id
                        ? "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 font-semibold"
                        : "hover:bg-current/[0.05]"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="font-mono text-[10px] opacity-40">0{idx + 1}</span>
                  </motion.a>
                ))}

                <div className="mt-3 border-t border-current/10 pt-3">
                  <a
                    href="#contact"
                    onClick={handleNavigation}
                    className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-center text-sm font-medium text-white shadow-lg"
                  >
                    Start a Project
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}