import { Compass, Cpu, Feather } from "lucide-react";
import SectionLabel from "../ui/SectionLabel";
import SplitText from "../motion/SplitText";
import Reveal from "../motion/Reveal";
import MagneticButton from "../ui/MagneticButton";

const pillars = [
  {
    icon: Compass,
    title: "Conceptual Rigor",
    description:
      "We interrogate user intent and business architecture before aesthetic execution.",
  },
  {
    icon: Cpu,
    title: "Technical Precision",
    description:
      "Clean TypeScript architectures, sub-second latency budgets, and seamless responsive physics.",
  },
  {
    icon: Feather,
    title: "Emotional Resonance",
    description:
      "Micro-animations and fluid typography that evoke genuine delight and brand memorability.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative px-6 py-28 lg:px-12 lg:py-40">
      <div className="mx-auto max-w-7xl">
        {/* Section Tag */}
        <SectionLabel number="01" tag="PHILOSOPHY">
          ABOUT AURELIS
        </SectionLabel>

        <div className="grid gap-16 lg:grid-cols-2 lg:items-end">
          {/* Main Statement */}
          <div>
            <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              <SplitText delay={0.1} mode="words">
                IDEAS ARE FLUID.
              </SplitText>
              <br />
              <span className="opacity-40">
                <SplitText delay={0.25} mode="words">
                  WE GIVE THEM FORM.
                </SplitText>
              </span>
            </h2>
          </div>

          {/* Editorial Philosophy Description */}
          <Reveal direction="up" delay={0.2} className="max-w-xl lg:ml-auto">
            <p className="text-lg leading-relaxed opacity-70 sm:text-xl font-light">
              AURELIS operates at the intersection of graphic design, spatial
              motion, and modern web engineering. We reject generic templates in
              favor of tailored digital artifacts that communicate clearly and
              feel alive.
            </p>

            <div className="mt-8">
              <MagneticButton href="#services" variant="ghost" size="sm">
                Discover what we do
              </MagneticButton>
            </div>
          </Reveal>
        </div>

        {/* 3 Pillars of Craft */}
        <div className="mt-20 grid gap-6 sm:grid-cols-3 border-t border-current/10 pt-12">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <Reveal
                key={pillar.title}
                direction="up"
                delay={0.1 * (index + 1)}
                className="group rounded-3xl border p-8 transition-all duration-300 border-indigo-100/90 bg-white/80 shadow-[0_10px_30px_rgba(99,102,241,0.05),0_1px_3px_rgba(0,0,0,0.02)] backdrop-blur-xl ring-1 ring-black/[0.03] hover:shadow-[0_20px_45px_rgba(99,102,241,0.12)] hover:border-indigo-300/80 hover:bg-white/95 dark:border-white/10 dark:bg-[#101015]/60 dark:hover:border-indigo-500/40 dark:hover:bg-[#14141c] dark:shadow-none dark:ring-0"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-indigo-200/80 bg-gradient-to-br from-indigo-50 to-purple-50 text-indigo-600 shadow-sm shadow-indigo-100/50 dark:border-white/15 dark:bg-indigo-500/10 dark:text-indigo-400 dark:shadow-none transition-transform duration-300 group-hover:scale-110">
                  <Icon size={22} />
                </div>

                <h3 className="mt-6 text-xl font-semibold tracking-tight">
                  {pillar.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed opacity-65 font-light">
                  {pillar.description}
                </p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}