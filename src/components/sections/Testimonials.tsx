import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ArrowLeft, ArrowRight, Star } from "lucide-react";
import SectionLabel from "../ui/SectionLabel";
import SplitText from "../motion/SplitText";
import Reveal from "../motion/Reveal";
import { testimonialsData } from "../../data/content";

interface TestimonialsProps {
  darkMode?: boolean;
}

export default function Testimonials({ darkMode = true }: TestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const prevTestimonial = () => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length
    );
  };

  const active = testimonialsData[activeIndex];

  return (
    <section className="relative px-6 py-28 lg:px-12 lg:py-40">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionLabel number="07" tag="EDITORIAL">
              DEMO TESTIMONIALS
            </SectionLabel>

            <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
              <SplitText delay={0.1} mode="words">
                GOOD WORK
              </SplitText>
              <br />
              <span className="opacity-40">
                <SplitText delay={0.25} mode="words">
                  SPEAKS FOR ITSELF.
                </SplitText>
              </span>
            </h2>
          </div>

          <p className="max-w-sm font-mono text-xs opacity-50">
            // FICTIONAL CASE PREVIEWS DEMONSTRATING EDITORIAL TYPOGRAPHY
          </p>
        </div>

        {/* Featured Editorial Quote Stage */}
        <Reveal direction="up" delay={0.2}>
          <div
            className={`relative rounded-[3rem] border p-8 sm:p-12 lg:p-16 backdrop-blur-2xl ${
              darkMode
                ? "border-white/10 bg-[#101014]/60 text-white shadow-2xl"
                : "border-indigo-100/90 bg-gradient-to-br from-white/95 via-indigo-50/30 to-purple-50/20 text-zinc-900 shadow-[0_20px_60px_rgba(99,102,241,0.08)] ring-1 ring-black/[0.03]"
            }`}
          >
            <div className="flex items-center justify-between border-b border-current/10 pb-6">
              <div className="flex items-center gap-2">
                <Quote size={28} className="text-indigo-600 dark:text-indigo-400" />
                <span className="font-mono text-xs uppercase tracking-widest opacity-50">
                  VERIFIED REVIEW [{activeIndex + 1}/03]
                </span>
              </div>

              <div className="flex items-center gap-1.5 font-mono text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                <Star size={14} className="fill-indigo-600 text-indigo-600 dark:fill-indigo-400 dark:text-indigo-400" />
                <span>{active.metric}</span>
              </div>
            </div>

            {/* Animated Quote Text */}
            <div className="my-10 min-h-[160px] sm:min-h-[140px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={active.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="font-display text-2xl font-normal leading-snug tracking-tight sm:text-3xl lg:text-4xl text-current"
                >
                  “{active.quote}”
                </motion.blockquote>
              </AnimatePresence>
            </div>

            {/* Author Attribution & Nav Controls */}
            <div className="flex flex-col justify-between gap-6 border-t border-current/10 pt-8 sm:flex-row sm:items-center">
              <div>
                <p className="font-display text-lg font-semibold">{active.name}</p>
                <p className="font-mono text-xs opacity-50">
                  {active.role} — {active.company} ({active.location})
                </p>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={prevTestimonial}
                  aria-label="Previous testimonial"
                  className="flex h-11 w-11 items-center justify-center rounded-full border transition-colors border-indigo-200/80 bg-white hover:bg-indigo-50/80 text-zinc-900 shadow-xs dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                >
                  <ArrowLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={nextTestimonial}
                  aria-label="Next testimonial"
                  className="flex h-11 w-11 items-center justify-center rounded-full border transition-colors border-indigo-200/80 bg-white hover:bg-indigo-50/80 text-zinc-900 shadow-xs dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}