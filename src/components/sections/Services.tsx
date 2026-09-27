import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Code2, Lightbulb, Palette, Rocket, Check, ChevronDown } from "lucide-react";
import SectionLabel from "../ui/SectionLabel";
import SplitText from "../motion/SplitText";
import Reveal from "../motion/Reveal";
import { servicesData } from "../../data/content";

const iconMap = {
  Lightbulb,
  Palette,
  Code2,
  Rocket,
};

interface ServicesProps {
  darkMode?: boolean;
}

export default function Services({ darkMode = true }: ServicesProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section
      id="services"
      className="relative px-6 py-28 lg:px-12 lg:py-40 transition-colors duration-500"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Tag */}
        <SectionLabel number="02" tag="CAPABILITIES">
          SERVICES & DISCIPLINES
        </SectionLabel>

        {/* Section Heading */}
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl lg:text-7xl">
              <SplitText delay={0.1} mode="words">
                FROM IDEA TO
              </SplitText>
              <br />
              <span className="opacity-40">
                <SplitText delay={0.25} mode="words">
                  EXPERIENCE.
                </SplitText>
              </span>
            </h2>
          </div>

          <p className="max-w-md text-sm leading-relaxed opacity-60 sm:text-base font-light">
            Four cohesive disciplines working in synthesis to conceptualize,
            engineer, and launch digital products of rare fidelity.
          </p>
        </div>

        {/* Interactive Service Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          {servicesData.map((service, index) => {
            const Icon = iconMap[service.iconName];
            const isExpanded = expandedId === service.id;

            return (
              <Reveal
                key={service.id}
                direction="up"
                delay={index * 0.1}
                className="h-full"
              >
                <motion.article
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] border p-8 sm:p-10 transition-all duration-300 ${
                    darkMode
                      ? "border-white/10 bg-[#101014]/60 hover:border-indigo-500/40 hover:bg-[#15151c]/80 shadow-lg"
                      : "border-indigo-100/90 bg-white/80 shadow-[0_10px_35px_rgba(99,102,241,0.06),0_1px_3px_rgba(0,0,0,0.02)] backdrop-blur-xl ring-1 ring-black/[0.03] hover:shadow-[0_22px_50px_rgba(99,102,241,0.14)] hover:border-indigo-300/80 hover:bg-white/95"
                  }`}
                >
                  {/* Top Bar: Number & Icon */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                      // {service.number}
                    </span>

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-indigo-200/80 bg-gradient-to-br from-indigo-50 to-purple-50 text-indigo-600 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:from-indigo-600 group-hover:to-purple-600 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] dark:border-white/15 dark:bg-indigo-500/10 dark:text-indigo-400 dark:group-hover:border-indigo-500/50 dark:group-hover:bg-indigo-500/20">
                      <Icon size={20} />
                    </div>
                  </div>

                  {/* Body Copy */}
                  <div className="mt-8">
                    <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm font-medium text-indigo-600 dark:text-indigo-400/90">
                      {service.tagline}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed opacity-65 font-light">
                      {service.description}
                    </p>
                  </div>

                  {/* Expandable Deliverables Accordion */}
                  <div className="mt-8 border-t border-current/10 pt-4">
                    <button
                      type="button"
                      onClick={() => toggleExpand(service.id)}
                      className="flex w-full items-center justify-between py-2 text-xs font-mono uppercase tracking-wider opacity-75 hover:opacity-100"
                      aria-expanded={isExpanded}
                    >
                      <span>Studio Deliverables</span>
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-300 ${
                          isExpanded ? "rotate-180 text-indigo-600 dark:text-indigo-400" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="pt-3 pb-2"
                        >
                          <ul className="space-y-2 rounded-2xl border p-4 text-xs font-mono border-indigo-100/80 bg-indigo-50/40 text-zinc-800 dark:border-white/10 dark:bg-white/[0.02] dark:text-zinc-300">
                            {service.deliverables.map((item) => (
                              <li key={item} className="flex items-center gap-2">
                                <Check size={12} className="text-indigo-600 dark:text-indigo-400 shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Footer Action */}
                  <div className="mt-6 flex items-center justify-between pt-2">
                    <a
                      href="#contact"
                      className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 transition-opacity hover:opacity-100"
                    >
                      Inquire service
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </motion.article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}