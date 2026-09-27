import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SectionLabel from "../ui/SectionLabel";
import SplitText from "../motion/SplitText";
import { Sparkles, Layers, Compass } from "lucide-react";
import { useIsMobile, usePrefersReducedMotion } from "../../hooks/useMediaQuery";

interface ParallaxShowcaseProps {
  darkMode?: boolean;
}

export default function ParallaxShowcase({ darkMode = true }: ParallaxShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const prefersReduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Layered parallax transforms
  const yBack = useTransform(scrollYProgress, [0, 1], [isMobile ? -20 : -80, isMobile ? 20 : 80]);
  const yMid = useTransform(scrollYProgress, [0, 1], [isMobile ? 30 : 120, isMobile ? -30 : -120]);
  const yFront = useTransform(scrollYProgress, [0, 1], [isMobile ? -40 : -160, isMobile ? 40 : 160]);
  const rotateShard = useTransform(scrollYProgress, [0, 1], [-8, 12]);
  const scaleCard = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.02, 0.96]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-28 lg:px-12 lg:py-40 transition-colors duration-500"
    >
      {/* Ambient background light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[120px]"
      />

      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="relative z-10 mb-12">
          <SectionLabel number="04" tag="SPATIAL DEPTH">
            PARALLAX SHOWCASE
          </SectionLabel>

          <h2 className="font-display text-3xl xs:text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight">
            <SplitText delay={0.1} mode="words">
              DESIGNED TO
            </SplitText>
            <br />
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              <SplitText delay={0.25} mode="words">
                COMMAND DEPTH.
              </SplitText>
            </span>
          </h2>

          <p className="mt-6 max-w-lg text-sm leading-relaxed opacity-60 sm:text-base font-light">
            Multi-plane visual choreography translating 2D interface layouts into
            tactile, depth-aware digital environments.
          </p>
        </div>

        {/* 3D Multi-Layer Parallax Stage */}
        <div
          className={`relative mt-12 sm:mt-16 h-[540px] xs:h-[580px] sm:h-[620px] lg:h-[680px] w-full rounded-[2rem] sm:rounded-[3rem] border p-4 sm:p-6 overflow-hidden backdrop-blur-xl ${
            darkMode
              ? "border-white/10 bg-[#0e0e12]/50"
              : "border-indigo-100/90 bg-gradient-to-b from-white/70 via-indigo-50/20 to-white/70 shadow-[0_10px_40px_rgba(99,102,241,0.06)] ring-1 ring-black/[0.03]"
          }`}
        >
          {/* Layer 01: Background Monolithic Typography */}
          <motion.div
            style={prefersReduced ? {} : { y: yBack }}
            className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
          >
            <span className="font-display text-[14vw] font-black tracking-tighter opacity-[0.04] dark:opacity-[0.06] text-current">
              SPATIAL
            </span>
          </motion.div>

          {/* Layer 02: Primary Midground Glassmorphism Card */}
          <motion.div
            style={prefersReduced ? {} : { y: yMid, scale: scaleCard }}
            className={`absolute left-[3%] sm:left-[5%] top-4 sm:top-16 min-h-[250px] sm:h-96 w-[94%] sm:w-[62%] rounded-[1.75rem] sm:rounded-[2.5rem] border p-5 sm:p-8 shadow-2xl backdrop-blur-2xl transition-all duration-300 ${
              darkMode
                ? "border-white/20 bg-gradient-to-br from-indigo-950/60 via-purple-950/40 to-black/80 text-white"
                : "border-indigo-100/90 bg-gradient-to-br from-white/95 via-indigo-50/40 to-purple-50/30 text-zinc-900 shadow-[0_20px_50px_rgba(99,102,241,0.12)] ring-1 ring-indigo-500/10"
            }`}
          >
            <div className="flex h-full flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-current/15 px-2.5 sm:px-3 py-0.5 sm:py-1 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                  <Layers size={12} /> LAYER // 01.PROJECTION
                </span>
                <span className="font-mono text-[10px] sm:text-xs opacity-50">Z-INDEX // 200</span>
              </div>

              <div className="my-auto py-2 sm:py-0">
                <p className="font-mono text-[10px] sm:text-xs text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                  INTERACTIVE MOTION ENGINE
                </p>
                <h3 className="mt-1 font-display text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
                  Kinetic Fluidity
                </h3>
                <p className="mt-2 sm:mt-3 max-w-md text-xs sm:text-sm leading-relaxed opacity-65 font-light">
                  Responsive spring mechanics and scroll-linked camera matrices
                  calibrated for 60fps rendering across devices.
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-current/10 pt-3 sm:pt-4 text-[10px] sm:text-xs font-mono opacity-50">
                <span className="truncate">COEFF: 1.42x</span>
                <span>ACTIVE</span>
              </div>
            </div>
          </motion.div>

          {/* Layer 03: Floating Crystal Shard / Stat Badge */}
          <motion.div
            style={prefersReduced ? {} : { y: yFront, rotate: rotateShard }}
            className={`absolute bottom-4 sm:bottom-8 right-[3%] sm:right-[6%] min-h-[200px] sm:h-72 w-[88%] sm:w-[48%] rounded-[1.5rem] sm:rounded-[2rem] border p-5 sm:p-8 shadow-2xl backdrop-blur-2xl ${
              darkMode
                ? "border-indigo-500/30 bg-[#121218]/90 text-white shadow-[0_20px_50px_rgba(99,102,241,0.2)]"
                : "border-indigo-200/80 bg-gradient-to-br from-white via-indigo-50/50 to-sky-50/40 text-zinc-900 shadow-[0_20px_50px_rgba(99,102,241,0.14)] ring-1 ring-indigo-500/10"
            }`}
          >
            <div className="flex h-full flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl sm:rounded-2xl bg-indigo-600 text-white shadow-lg">
                  <Sparkles size={16} />
                </div>
                <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                  REFRACTION 02
                </span>
              </div>

              <div className="my-auto py-2 sm:py-0">
                <span className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400">
                  0.18s
                </span>
                <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm font-semibold">Interpolation Response</p>
                <p className="mt-1.5 text-[11px] sm:text-xs opacity-60">
                  Zero jitter dampening for seamless scroll navigation.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Layer 04: Top Right Floating Compass Badge */}
          <motion.div
            style={prefersReduced ? {} : { y: yBack }}
            className="absolute right-[12%] top-6 hidden h-20 w-20 sm:flex items-center justify-center rounded-full border border-indigo-100/90 bg-white/90 shadow-md ring-1 ring-indigo-500/10 dark:border-white/20 dark:bg-white/[0.05] backdrop-blur-xl dark:shadow-sm"
          >
            <Compass size={28} className="text-indigo-600 dark:text-indigo-400 animate-spin-slow" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}