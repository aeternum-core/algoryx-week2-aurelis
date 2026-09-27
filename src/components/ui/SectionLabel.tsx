import { type ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionLabelProps {
  children: ReactNode;
  number?: string;
  tag?: string;
  className?: string;
}

export default function SectionLabel({
  children,
  number,
  tag,
  className = "",
}: SectionLabelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-5 inline-flex items-center gap-2.5 rounded-full border px-4 py-1.5 font-mono text-[11px] font-medium tracking-[0.2em] uppercase backdrop-blur-xl border-indigo-200/80 bg-white/90 text-indigo-950 shadow-xs ring-1 ring-indigo-500/10 dark:border-white/15 dark:bg-white/[0.04] dark:text-zinc-300 dark:ring-0 dark:shadow-none ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)] animate-pulse" />
      {number && <span className="opacity-50">[{number}]</span>}
      <span>{children}</span>
      {tag && <span className="opacity-50">// {tag}</span>}
    </motion.div>
  );
}
