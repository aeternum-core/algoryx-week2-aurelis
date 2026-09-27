import { motion, useScroll, useSpring, useTransform } from "framer-motion";

interface ScrollProgressProps {
  currentSectionIndex?: number;
  totalSections?: number;
}

export default function ScrollProgress({
  currentSectionIndex = 1,
  totalSections = 9,
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  const percentage = useTransform(scrollYProgress, (v) => Math.round(v * 100));

  return (
    <>
      {/* Top Edge Progress Beam */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX, transformOrigin: "0%" }}
        className="fixed inset-x-0 top-0 z-[100] h-[3px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-[0_0_12px_rgba(99,102,241,0.6)]"
      />

      {/* Floating Right Section Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-6 right-6 z-40 hidden items-center gap-2.5 rounded-full border px-3.5 py-1.5 font-mono text-[11px] backdrop-blur-2xl lg:flex transition-all duration-300 border-zinc-200/80 bg-white/80 text-zinc-900 shadow-[0_6px_25px_rgba(0,0,0,0.04)] ring-1 ring-black/[0.02] dark:border-white/15 dark:bg-[#121218]/90 dark:text-zinc-200 dark:shadow-xl dark:ring-0"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
        <span className="font-semibold text-indigo-600 dark:text-indigo-400">
          0{currentSectionIndex}
        </span>
        <span className="opacity-30">/</span>
        <span className="opacity-50">0{totalSections}</span>
        <span className="text-[10px] opacity-40 border-l border-current/15 pl-2 font-mono">
          <motion.span>{percentage}</motion.span>%
        </span>
      </motion.div>
    </>
  );
}