import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, BarChart3, Globe2, Sparkles } from "lucide-react";
import SectionLabel from "../ui/SectionLabel";
import SplitText from "../motion/SplitText";
import Reveal from "../motion/Reveal";
import ProjectModal from "../ui/ProjectModal";
import { projectsData } from "../../data/content";
import type { ProjectItem } from "../../types";

const iconMap = {
  BarChart3,
  Sparkles,
  Globe2,
};

interface LiveProjectPreviewProps {
  project: ProjectItem;
  darkMode?: boolean;
}

function LiveProjectPreview({ project, darkMode = true }: LiveProjectPreviewProps) {
  if (project.type === "dashboard") {
    return (
      <div
        className={`absolute inset-6 sm:inset-8 overflow-hidden rounded-2xl border p-4 sm:p-5 backdrop-blur-xl transition-colors duration-300 ${
          darkMode
            ? "border-white/20 bg-black/60 text-white shadow-2xl"
            : "border-zinc-200/90 bg-white/90 text-zinc-900 shadow-xl"
        }`}
      >
        {/* Mockup Header */}
        <div
          className={`mb-4 flex items-center justify-between border-b pb-3 ${
            darkMode ? "border-white/10" : "border-zinc-200/80"
          }`}
        >
          <div className="flex items-center gap-2">
            <span
              className={`h-2.5 w-2.5 rounded-full animate-pulse ${
                darkMode ? "bg-cyan-400" : "bg-cyan-600"
              }`}
            />
            <span
              className={`font-mono text-[10px] font-bold ${
                darkMode ? "text-cyan-300" : "text-cyan-700"
              }`}
            >
              NORTHSTAR // TELEMETRY
            </span>
          </div>
          <span
            className={`font-mono text-[9px] ${
              darkMode ? "text-white/70" : "text-zinc-500 font-semibold"
            }`}
          >
            FPS: 60
          </span>
        </div>

        {/* Dynamic Telemetry Chart Bars */}
        <div
          className={`h-28 sm:h-36 rounded-xl p-3 flex items-end gap-1.5 sm:gap-2 ${
            darkMode
              ? "bg-white/[0.06] border border-white/5"
              : "bg-zinc-100/90 border border-zinc-200/60"
          }`}
        >
          {[42, 65, 38, 85, 55, 92, 70, 48, 80, 60, 95, 78].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              whileInView={{ height: `${h}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.04 }}
              className="flex-1 rounded-t-sm bg-gradient-to-t from-cyan-500 to-indigo-600 shadow-xs"
            />
          ))}
        </div>

        {/* Live metric footer */}
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div
            className={`rounded-lg p-2 ${
              darkMode
                ? "bg-white/[0.08]"
                : "bg-zinc-100/80 border border-zinc-200/60 shadow-2xs"
            }`}
          >
            <p
              className={`text-[9px] font-mono ${
                darkMode ? "text-white/60" : "text-zinc-500 font-medium"
              }`}
            >
              STREAM LATENCY
            </p>
            <p
              className={`text-xs font-bold ${
                darkMode ? "text-cyan-300" : "text-cyan-700"
              }`}
            >
              &lt; 12 ms
            </p>
          </div>
          <div
            className={`rounded-lg p-2 ${
              darkMode
                ? "bg-white/[0.08]"
                : "bg-zinc-100/80 border border-zinc-200/60 shadow-2xs"
            }`}
          >
            <p
              className={`text-[9px] font-mono ${
                darkMode ? "text-white/60" : "text-zinc-500 font-medium"
              }`}
            >
              DATA PACKETS
            </p>
            <p
              className={`text-xs font-bold ${
                darkMode ? "text-indigo-300" : "text-indigo-700"
              }`}
            >
              250k / sec
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (project.type === "brand") {
    return (
      <div
        className={`absolute inset-6 sm:inset-8 overflow-hidden rounded-2xl border p-5 backdrop-blur-xl flex flex-col justify-between transition-colors duration-300 ${
          darkMode
            ? "border-white/20 bg-black/60 text-white shadow-2xl"
            : "border-zinc-200/90 bg-white/90 text-zinc-900 shadow-xl"
        }`}
      >
        <div
          className={`flex items-center justify-between border-b pb-3 ${
            darkMode ? "border-white/10" : "border-zinc-200/80"
          }`}
        >
          <span
            className={`font-mono text-[10px] font-bold tracking-widest ${
              darkMode ? "text-pink-300" : "text-pink-700"
            }`}
          >
            MORROW // RESONANCE
          </span>
          <span
            className={`font-mono text-[9px] ${
              darkMode ? "text-white/70" : "text-zinc-500 font-semibold"
            }`}
          >
            GEN.04
          </span>
        </div>

        <div className="flex items-center justify-center my-auto py-4">
          <motion.div
            animate={{
              rotate: [0, 8, -8, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-3xl bg-gradient-to-tr from-purple-600 via-pink-500 to-rose-400 text-4xl sm:text-5xl font-extrabold text-white shadow-[0_10px_35px_rgba(236,72,153,0.45)]"
          >
            M
          </motion.div>
        </div>

        <div
          className={`flex justify-between font-mono text-[9px] uppercase tracking-widest ${
            darkMode ? "text-white/70" : "text-zinc-500 font-semibold"
          }`}
        >
          <span>SPATIAL IDENTITY</span>
          <span>ACOUSTIC MATRIX</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`absolute inset-6 sm:inset-8 overflow-hidden rounded-2xl border backdrop-blur-xl flex flex-col justify-between p-5 transition-colors duration-300 ${
        darkMode
          ? "border-white/20 bg-black/60 text-white shadow-2xl"
          : "border-zinc-200/90 bg-white/90 text-zinc-900 shadow-xl"
      }`}
    >
      <div
        className={`flex items-center justify-between border-b pb-3 ${
          darkMode ? "border-white/10" : "border-zinc-200/80"
        }`}
      >
        <span
          className={`font-mono text-[10px] font-bold ${
            darkMode ? "text-emerald-300" : "text-emerald-700"
          }`}
        >
          FORMA // ARCHIVE
        </span>
        <div className="flex gap-1.5">
          <span
            className={`h-2 w-2 rounded-full ${
              darkMode ? "bg-emerald-400" : "bg-emerald-600"
            }`}
          />
          <span
            className={`h-2 w-2 rounded-full ${
              darkMode ? "bg-white/20" : "bg-zinc-300"
            }`}
          />
        </div>
      </div>

      <div className="my-auto py-3 space-y-2">
        <div
          className={`h-16 sm:h-20 rounded-xl border p-3 flex items-center justify-between ${
            darkMode
              ? "border-white/10 bg-white/[0.06]"
              : "border-zinc-200/80 bg-zinc-50/90 shadow-2xs"
          }`}
        >
          <div>
            <p
              className={`font-mono text-[10px] uppercase font-bold ${
                darkMode ? "text-emerald-300" : "text-emerald-700"
              }`}
            >
              MONOGRAPH 01
            </p>
            <p
              className={`text-xs font-semibold ${
                darkMode ? "text-white" : "text-zinc-900"
              }`}
            >
              Brutalist Pavilion
            </p>
          </div>
          <span
            className={`font-mono text-[10px] ${
              darkMode ? "text-white/70" : "text-zinc-500 font-semibold"
            }`}
          >
            100/100 SPEED
          </span>
        </div>
        <div
          className={`h-10 rounded-xl border ${
            darkMode
              ? "bg-white/[0.04] border-white/10"
              : "bg-zinc-100/80 border-zinc-200/60"
          }`}
        />
      </div>

      <div
        className={`flex justify-between font-mono text-[9px] uppercase tracking-widest ${
          darkMode ? "text-white/70" : "text-zinc-500 font-semibold"
        }`}
      >
        <span>EDITORIAL SYSTEM</span>
        <span>2025 EDITION</span>
      </div>
    </div>
  );
}

interface FeaturedWorkProps {
  darkMode?: boolean;
}

const lightGradientMap: Record<string, string> = {
  northstar: "from-cyan-100/80 via-sky-50 to-indigo-100/70 border-cyan-200/80",
  morrow: "from-purple-100/80 via-pink-50 to-rose-100/70 border-pink-200/80",
  forma: "from-emerald-100/80 via-teal-50 to-emerald-100/70 border-emerald-200/80",
};

export default function FeaturedWork({ darkMode = true }: FeaturedWorkProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <section
      id="work"
      className="relative px-6 py-28 lg:px-12 lg:py-40 transition-colors duration-500"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionLabel number="05" tag="PORTFOLIO">
              FEATURED EXPERIENCES
            </SectionLabel>

            <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
              <SplitText delay={0.1} mode="words">
                SELECTED
              </SplitText>
              <br />
              <span className="opacity-40">
                <SplitText delay={0.25} mode="words">
                  CREATIONS.
                </SplitText>
              </span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-relaxed opacity-65 font-light">
            A curated index of conceptual studio projects exploring data telemetry,
            spatial brand identities, and editorial architecture.
          </p>
        </div>

        {/* Projects 3-Column Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {projectsData.map((project, index) => {
            const Icon = iconMap[project.iconName];
            const cardBgStyle = darkMode
              ? `bg-gradient-to-br ${project.gradient} border-white/10 shadow-lg`
              : `bg-gradient-to-br ${lightGradientMap[project.id] || "from-zinc-100 via-white to-zinc-50"} shadow-md`;

            return (
              <Reveal
                key={project.id}
                direction="up"
                delay={index * 0.12}
                className="h-full"
              >
                <motion.article
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  onClick={() => setSelectedProject(project)}
                  className="group relative flex h-full flex-col cursor-pointer"
                >
                  {/* Card Visual Stage */}
                  <div
                    className={`relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border transition-all duration-300 group-hover:shadow-[0_20px_50px_rgba(99,102,241,0.25)] ${cardBgStyle}`}
                  >
                    {/* Live Interactive Simulation Widget */}
                    <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">
                      <LiveProjectPreview project={project} darkMode={darkMode} />
                    </div>

                    {/* Top Corner Icon Badge */}
                    <div
                      className={`absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-2xl border backdrop-blur-md transition-transform duration-300 group-hover:scale-110 ${
                        darkMode
                          ? "border-white/20 bg-black/40 text-white"
                          : "border-zinc-200/90 bg-white/95 text-zinc-800 shadow-md"
                      }`}
                    >
                      <Icon size={18} />
                    </div>

                    {/* Bottom Metadata Overlay */}
                    <div className="absolute bottom-4 sm:bottom-5 left-4 sm:left-5 right-4 sm:right-5 z-10 flex items-end justify-between gap-3">
                      <div
                        className={`rounded-xl sm:rounded-2xl border p-3 sm:p-4 backdrop-blur-xl transition-colors duration-300 ${
                          darkMode
                            ? "border-white/15 bg-black/80 text-white"
                            : "border-zinc-200/90 bg-white/95 text-zinc-900 shadow-xl"
                        }`}
                      >
                        <span
                          className={`font-mono text-[9px] sm:text-[10px] uppercase tracking-widest font-bold ${
                            darkMode ? "text-indigo-300" : "text-indigo-600"
                          }`}
                        >
                          {project.category}
                        </span>
                        <h3
                          className={`mt-0.5 sm:mt-1 font-display text-xl sm:text-2xl font-semibold ${
                            darkMode ? "text-white" : "text-zinc-900"
                          }`}
                        >
                          {project.title}
                        </h3>
                      </div>

                      {/* Expand Action Icon */}
                      <div
                        className={`flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl shadow-xl transition-all duration-300 group-hover:bg-indigo-600 group-hover:text-white group-hover:rotate-45 ${
                          darkMode
                            ? "bg-white text-black"
                            : "bg-white text-zinc-900 border border-zinc-200/90 shadow-lg group-hover:border-indigo-600"
                        }`}
                      >
                        <ArrowUpRight size={16} />
                      </div>
                    </div>
                  </div>

                  {/* Card Sub-bar */}
                  <div className="mt-4 flex items-center justify-between px-2 font-mono text-xs opacity-60">
                    <span>{project.client}</span>
                    <span>{project.year} // VERIFIED DEMO</span>
                  </div>
                </motion.article>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Case Study Deep-Dive Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        darkMode={darkMode}
      />
    </section>
  );
}