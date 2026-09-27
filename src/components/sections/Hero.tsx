import { motion } from "framer-motion";
import { ArrowDown, Terminal } from "lucide-react";
import DigitalSculpture from "../experience/DigitalSculpture";
import SplitText from "../motion/SplitText";
import Reveal from "../motion/Reveal";
import MagneticButton from "../ui/MagneticButton";

interface HeroProps {
  darkMode?: boolean;
}

export default function Hero({ darkMode = true }: HeroProps) {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pb-16 pt-32 lg:px-12 lg:pt-36"
    >
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        {/* Left Column: Kinetic Typography & CTAs */}
        <div className="relative z-10">
          {/* 01 — KINETIC TYPOGRAPHY (Communication) */}
          <div className="space-y-1">
            <h1 className="font-display text-[2.75rem] xs:text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-[-0.04em] leading-[0.95] break-words">
              <SplitText delay={0.2} mode="words">
                WE BUILD
              </SplitText>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 dark:from-indigo-500 dark:via-purple-500 dark:to-pink-500 bg-clip-text text-transparent">
                DIGITAL
              </span>
              <br />
              <SplitText delay={0.35} mode="words">
                EXPERIENCES.
              </SplitText>
            </h1>
          </div>

          {/* Value proposition copy */}
          <Reveal direction="up" delay={0.45}>
            <p className="mt-6 sm:mt-8 max-w-xl text-sm leading-relaxed opacity-70 sm:text-lg lg:text-xl font-light">
              We turn fluid ideas into architectural digital products, tactile
              interfaces, and cinematic web experiences for ambitious visionaries.
            </p>
          </Reveal>

          {/* Primary CTAs */}
          <Reveal direction="up" delay={0.6}>
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
              <MagneticButton href="#work" variant="primary" size="md">
                Explore our work
              </MagneticButton>

              <MagneticButton href="#contact" variant="outline" size="md" icon={false}>
                Start a project
              </MagneticButton>
            </div>
          </Reveal>

          {/* Live Studio Telemetry Bar */}
          <Reveal direction="up" delay={0.75}>
            <div className="mt-8 sm:mt-12 flex flex-wrap items-center gap-3 sm:gap-6 border-t border-current/10 pt-5 sm:pt-6 font-mono text-[10px] sm:text-[11px] opacity-60">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Terminal size={12} className="text-indigo-500 dark:text-indigo-400 shrink-0" />
                <span className="truncate">DIRECTED BY: LIKITH V GOWDA</span>
              </div>
              <div className="hidden xs:block">
                <span>COORDINATES: 12.9716° N, 77.5946° E // BANGALORE</span>
              </div>
              <div className="hidden md:block">
                <span>STACK: REACT // TS // FRAMER</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Column: 03 — CINEMATIC SCULPTURE (Creation) */}
        <div className="relative z-10 flex items-center justify-center">
          <Reveal direction="scale" delay={0.3} duration={1}>
            <div className="relative flex items-center justify-center">
              {/* Refraction background halo */}
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute h-72 w-72 rounded-full blur-3xl sm:h-96 sm:w-96 transition-all duration-500 ${
                  darkMode
                    ? "bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-pink-500/20"
                    : "bg-gradient-to-tr from-indigo-300/35 via-purple-200/30 to-sky-200/30"
                }`}
              />

              {/* Geometric 3D Sculpture Canvas */}
              <DigitalSculpture darkMode={darkMode} size={420} />

              {/* Floating Spatial Badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -left-4 hidden rounded-2xl border p-3.5 backdrop-blur-2xl sm:block transition-all duration-300 border-indigo-100/90 bg-white/85 shadow-[0_10px_30px_rgba(99,102,241,0.08)] text-zinc-900 ring-1 ring-indigo-500/10 dark:border-white/15 dark:bg-[#121218]/90 dark:text-white dark:shadow-2xl dark:ring-0"
              >
                <p className="font-mono text-[10px] uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-semibold">
                  SYSTEM.INTERACTION
                </p>
                <p className="text-xs font-semibold">Tactile Physics // 60 FPS</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -right-4 hidden rounded-2xl border p-3.5 backdrop-blur-2xl sm:block transition-all duration-300 border-indigo-100/90 bg-white/85 shadow-[0_10px_30px_rgba(99,102,241,0.08)] text-zinc-900 ring-1 ring-indigo-500/10 dark:border-white/15 dark:bg-[#121218]/90 dark:text-white dark:shadow-2xl dark:ring-0"
              >
                <p className="font-mono text-[10px] uppercase tracking-widest text-purple-600 dark:text-purple-400 font-semibold">
                  REFRACTION
                </p>
                <p className="text-xs font-semibold">Crystal Geometry 04</p>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Scroll Down Cue */}
      <motion.a
        href="#about"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-current/15 p-2.5 opacity-60 transition-opacity hover:opacity-100"
        aria-label="Scroll to about section"
      >
        <ArrowDown size={16} />
      </motion.a>
    </section>
  );
}