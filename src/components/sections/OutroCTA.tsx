import SplitText from "../motion/SplitText";
import Reveal from "../motion/Reveal";
import MagneticButton from "../ui/MagneticButton";
import { Sparkles } from "lucide-react";

interface OutroCTAProps {
  darkMode?: boolean;
}

export default function OutroCTA({ darkMode }: OutroCTAProps) {
  // Use darkMode to style section border/tint if needed
  void darkMode;
  return (
    <section className="relative flex min-h-[75vh] items-center justify-center overflow-hidden px-6 py-28 text-center lg:px-12 lg:py-36">
      <div className="relative z-10 mx-auto max-w-4xl">
        <Reveal direction="down" delay={0.1}>
          <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-indigo-200/80 bg-white/90 text-indigo-950 shadow-xs ring-1 ring-indigo-500/10 dark:border-white/15 dark:bg-white/[0.04] dark:text-zinc-200 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] backdrop-blur-xl">
            <Sparkles size={13} className="text-indigo-500 dark:text-indigo-400" />
            <span>AURELIS // THE HORIZON</span>
          </div>
        </Reveal>

        {/* 01 — KINETIC TYPOGRAPHY final message */}
        <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl leading-[1.05]">
          <SplitText delay={0.2} mode="words">
            LET'S CREATE
          </SplitText>
          <br />
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 dark:from-indigo-500 dark:via-purple-500 dark:to-pink-500 bg-clip-text text-transparent">
            <SplitText delay={0.35} mode="words">
              SOMETHING
            </SplitText>
          </span>
          <br />
          <SplitText delay={0.5} mode="words">
            UNEXPECTED.
          </SplitText>
        </h2>

        <Reveal direction="up" delay={0.65}>
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed opacity-70 sm:text-lg font-light">
            Whether you are forging a new category or reimagining a flagship
            experience, AURELIS is engineered for what comes next.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton href="#contact" variant="secondary" size="lg">
              Initiate a Project
            </MagneticButton>

            <MagneticButton href="#home" variant="outline" size="lg" icon={false}>
              Return to Top
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
