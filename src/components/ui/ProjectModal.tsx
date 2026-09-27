import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, Check, Sparkles, Activity, Layers } from "lucide-react";
import type { ProjectItem } from "../../types";

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  darkMode?: boolean;
}

export default function ProjectModal({
  project,
  onClose,
  darkMode = true,
}: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "metrics" | "interactive">("overview");
  const [telemetryValue, setTelemetryValue] = useState(72);
  const [wireframeMode, setWireframeMode] = useState(false);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 lg:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className={`relative z-10 max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] sm:rounded-[2.5rem] border p-5 sm:p-8 md:p-10 shadow-2xl ${
            darkMode
              ? "border-white/15 bg-[#0e0e12] text-white"
              : "border-zinc-200/90 bg-white text-zinc-900 shadow-2xl"
          }`}
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b border-current/10 pb-5 sm:pb-6">
            <div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-semibold">
                  // CASE STUDY PREVIEW
                </span>
                <span className="rounded-full border border-current/15 px-2.5 py-0.5 text-[10px] font-mono opacity-60">
                  {project.year}
                </span>
              </div>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
                {project.title}
              </h2>
              <p className="mt-1 text-xs sm:text-sm opacity-60">{project.client} — {project.category}</p>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close project modal"
              className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-current/15 transition-colors hover:bg-current/[0.08]"
            >
              <X size={18} />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-5 sm:mt-6 flex flex-wrap gap-2 border-b border-current/10 pb-4">
            {(["overview", "metrics", "interactive"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors ${
                  activeTab === tab
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "border border-zinc-200/90 bg-zinc-100/80 text-zinc-700 hover:text-zinc-900 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300 hover:opacity-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="mt-6">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-display text-xl font-semibold">{project.tagline}</h3>
                  <p className="mt-3 text-sm leading-7 opacity-75 sm:text-base font-light">
                    {project.description}
                  </p>
                </div>

                {/* Deliverables List */}
                <div className="rounded-2xl border p-5 border-zinc-200/80 bg-zinc-50/80 text-zinc-800 dark:border-white/10 dark:bg-white/[0.02] dark:text-zinc-300">
                  <h4 className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-semibold">
                    <Layers size={14} /> Studio Deliverables
                  </h4>
                  <div className="mt-3 grid gap-2.5 sm:grid-cols-2 font-mono">
                    {project.deliverables.map((item) => (
                      <div key={item} className="flex items-center gap-2.5 text-xs sm:text-sm">
                        <Check size={14} className="text-indigo-600 dark:text-indigo-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-current/15 px-3 py-1 font-mono text-[11px] opacity-75"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "metrics" && (
              <div className="space-y-6">
                <p className="text-sm opacity-65 font-light">
                  Key engineered performance benchmarks and UX engagement metrics validated during prototype telemetry:
                </p>

                <div className="grid gap-4 sm:grid-cols-3">
                  {project.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-2xl border p-5 text-center border-zinc-200/80 bg-zinc-50/80 text-zinc-900 dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
                    >
                      <p className="font-display text-3xl font-bold text-indigo-600 dark:text-indigo-400">{m.value}</p>
                      <p className="mt-2 text-xs font-mono uppercase tracking-wider opacity-60">
                        {m.label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl border p-5 border-zinc-200/80 bg-zinc-50/80 dark:border-white/10 dark:bg-white/[0.02]">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold">
                    <Activity size={14} /> Telemetry State: Optimized
                  </div>
                  <p className="mt-2 text-xs opacity-65 leading-5 font-light">
                    Zero layout shifts (CLS &lt; 0.01), sub-16ms frame budget maintenance across all mobile and desktop viewports.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "interactive" && (
              <div className="space-y-6">
                <p className="text-sm opacity-65 font-light">
                  Interactive UI Simulator — manipulate parameters in real-time to inspect responsive dynamics:
                </p>

                {project.type === "dashboard" && (
                  <div
                    className={`rounded-2xl border p-6 backdrop-blur-md transition-colors ${
                      darkMode
                        ? "border-white/15 bg-black/60 text-white"
                        : "border-zinc-200/90 bg-zinc-50/90 text-zinc-900 shadow-sm"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono font-semibold text-cyan-600 dark:text-cyan-400 mb-4">
                      <span>TELEMETRY STREAM: LIVE</span>
                      <span>DENSITY: {telemetryValue}%</span>
                    </div>

                    <div
                      className={`flex h-32 items-end gap-2 border-b pb-2 ${
                        darkMode ? "border-white/10" : "border-zinc-200/80"
                      }`}
                    >
                      {[30, 45, 60, telemetryValue, 40, 85, telemetryValue * 0.9, 50, 70, 95].map(
                        (val, i) => (
                          <motion.div
                            key={i}
                            animate={{ height: `${Math.min(100, Math.max(10, val))}%` }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            className="flex-1 rounded-t-md bg-gradient-to-t from-cyan-500 to-indigo-600 shadow-2xs"
                          />
                        )
                      )}
                    </div>

                    <div className="mt-5 flex items-center gap-4">
                      <label htmlFor="telemetry-range" className="text-xs font-mono opacity-60">
                        Simulation Intensity:
                      </label>
                      <input
                        id="telemetry-range"
                        type="range"
                        min="20"
                        max="100"
                        value={telemetryValue}
                        onChange={(e) => setTelemetryValue(Number(e.target.value))}
                        className="flex-1 accent-indigo-600"
                      />
                    </div>
                  </div>
                )}

                {project.type === "brand" && (
                  <div
                    className={`flex flex-col items-center justify-center rounded-2xl border p-8 backdrop-blur-md transition-colors ${
                      darkMode
                        ? "border-white/15 bg-black/60"
                        : "border-zinc-200/90 bg-zinc-50/90 shadow-sm"
                    }`}
                  >
                    <motion.div
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      className="flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 text-4xl font-bold text-white shadow-[0_10px_40px_rgba(236,72,153,0.4)]"
                    >
                      M
                    </motion.div>
                    <p className="mt-6 font-mono text-xs tracking-widest text-pink-600 dark:text-pink-400 uppercase font-semibold">
                      Kinetic Crystal Resonator
                    </p>
                  </div>
                )}

                {project.type === "web" && (
                  <div
                    className={`rounded-2xl border p-6 backdrop-blur-md transition-colors ${
                      darkMode
                        ? "border-white/15 bg-black/60"
                        : "border-zinc-200/90 bg-zinc-50/90 shadow-sm"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono font-semibold text-emerald-700 dark:text-emerald-400 mb-4">
                      <span>SPATIAL VIEWPORT ARCHIVE</span>
                      <button
                        type="button"
                        onClick={() => setWireframeMode(!wireframeMode)}
                        className={`rounded-full border px-3 py-1 transition-colors ${
                          darkMode
                            ? "border-emerald-400/40 text-emerald-300 hover:bg-emerald-400/10"
                            : "border-emerald-600/40 text-emerald-800 hover:bg-emerald-50 bg-white"
                        }`}
                      >
                        {wireframeMode ? "Rendered Mode" : "Wireframe Mode"}
                      </button>
                    </div>

                    <div
                      className={`h-36 rounded-xl border p-4 transition-all duration-300 flex items-center justify-center ${
                        wireframeMode
                          ? darkMode
                            ? "border-dashed border-emerald-400/50 bg-emerald-950/20 font-mono text-xs text-emerald-300"
                            : "border-dashed border-emerald-600/50 bg-emerald-50/70 font-mono text-xs text-emerald-800"
                          : darkMode
                          ? "border-white/15 bg-gradient-to-r from-emerald-900/30 to-teal-900/30"
                          : "border-emerald-200/80 bg-gradient-to-r from-emerald-100/50 to-teal-100/50 text-emerald-900"
                      }`}
                    >
                      <div className="text-center">
                        <Sparkles
                          size={20}
                          className={`mx-auto mb-2 ${
                            darkMode ? "text-emerald-400" : "text-emerald-600"
                          }`}
                        />
                        <p className="text-xs font-mono font-medium">
                          {wireframeMode
                            ? "ORTHOGRAPHIC GRID ACTIVE // 12-COL"
                            : "ARCHITECTURAL PROJECTION RENDERED"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-current/10 pt-6">
            <span className="font-mono text-xs opacity-40">
              AURELIS STUDIO CONCEPT // VERIFIED DEMO
            </span>

            <a
              href="#contact"
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2.5 text-xs font-medium text-white transition-colors hover:bg-indigo-500 shadow-sm"
            >
              Discuss similar project
              <ArrowUpRight size={14} />
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
