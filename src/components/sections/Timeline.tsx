import { useState } from "react";
import { CheckCircle2, Clock } from "lucide-react";
import SectionLabel from "../ui/SectionLabel";
import SplitText from "../motion/SplitText";
import Reveal from "../motion/Reveal";
import { timelineStepsData } from "../../data/content";

interface TimelineProps {
  darkMode?: boolean;
}

export default function Timeline({ darkMode = true }: TimelineProps) {
  const [activeStep, setActiveStep] = useState<string>("01");

  return (
    <section id="process" className="relative px-6 py-28 lg:px-12 lg:py-40">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-20">
          <SectionLabel number="06" tag="METHODOLOGY">
            STUDIO PROCESS
          </SectionLabel>

          <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            <SplitText delay={0.1} mode="words">
              RIGOROUS STEPS.
            </SplitText>
            <br />
            <span className="opacity-40">
              <SplitText delay={0.25} mode="words">
                COMPOUNDING RESULTS.
              </SplitText>
            </span>
          </h2>

          <p className="mt-6 max-w-lg text-sm leading-relaxed opacity-60 sm:text-base font-light">
            From preliminary discovery to global orchestration, every phase is
            structured with measurable deliverables and clear milestones.
          </p>
        </div>

        {/* Process Timeline Vertical Node System */}
        <div className="relative">
          {/* Vertical Connecting Progress Line */}
          <div className="absolute left-[23px] top-4 bottom-4 hidden w-[2px] bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500/20 md:block opacity-30" />

          <div className="space-y-8 md:space-y-10">
            {timelineStepsData.map((step, index) => {
              const isSelected = activeStep === step.number;

              return (
                <Reveal
                  key={step.number}
                  direction="left"
                  delay={index * 0.12}
                  className="relative"
                >
                  <div
                    onClick={() => setActiveStep(step.number)}
                    className={`group relative grid gap-6 rounded-3xl border p-6 sm:p-8 transition-all duration-300 md:grid-cols-[48px_1.2fr_1fr] md:items-center cursor-pointer ${
                      isSelected
                        ? darkMode
                          ? "border-indigo-500/50 bg-[#121218] shadow-[0_10px_30px_rgba(99,102,241,0.15)] text-white"
                          : "border-indigo-400 bg-gradient-to-r from-indigo-50/90 via-purple-50/40 to-white text-zinc-900 shadow-[0_15px_40px_rgba(99,102,241,0.12)] ring-1 ring-indigo-500/15"
                        : darkMode
                        ? "border-white/10 bg-[#0e0e12]/50 hover:border-white/20 hover:bg-[#111116] text-zinc-300"
                        : "border-indigo-100/90 bg-white/80 hover:border-indigo-200 hover:bg-white/95 text-zinc-900 shadow-sm backdrop-blur-xl ring-1 ring-black/[0.02]"
                    }`}
                  >
                    {/* Node Number Circle */}
                    <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl border font-mono text-sm font-bold backdrop-blur-md transition-transform duration-300 group-hover:scale-110 border-indigo-200/80 bg-gradient-to-br from-indigo-50 to-purple-50 text-indigo-700 shadow-sm dark:border-white/20 dark:bg-current/[0.05] dark:text-indigo-400 dark:shadow-none">
                      {step.number}
                    </div>

                    {/* Step Title & Description */}
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-semibold">
                          // {step.phase}
                        </span>
                        <span className="inline-flex items-center gap-1 font-mono text-[10px] opacity-60">
                          <Clock size={11} /> {step.duration}
                        </span>
                      </div>

                      <h3 className="mt-2 font-display text-2xl sm:text-3xl font-semibold tracking-tight">
                        {step.title}
                      </h3>

                      <p className="mt-3 text-sm leading-relaxed opacity-65 font-light">
                        {step.description}
                      </p>
                    </div>

                    {/* Step Deliverables Box */}
                    <div className="rounded-2xl border p-4 text-xs font-mono border-indigo-100/80 bg-indigo-50/40 text-zinc-800 dark:border-white/10 dark:bg-white/[0.02] dark:text-zinc-300">
                      <p className="mb-2 text-[10px] uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-semibold">
                        PHASE DELIVERABLES:
                      </p>
                      <ul className="space-y-1.5 opacity-80">
                        {step.outputs.map((out) => (
                          <li key={out} className="flex items-center gap-2">
                            <CheckCircle2 size={12} className="text-indigo-600 dark:text-indigo-400 shrink-0" />
                            <span>{out}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}