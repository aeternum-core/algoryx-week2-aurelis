import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
import { statsData } from "../../data/content";
import SectionLabel from "../ui/SectionLabel";
import Reveal from "../motion/Reveal";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1800;
    const startTime = performance.now();

    const update = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.floor(eased * value);
      setCount(start);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(update);
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="relative px-6 py-20 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <SectionLabel number="03" tag="METRICS">
            STUDIO TELEMETRY
          </SectionLabel>
          <span className="hidden font-mono text-[11px] opacity-50 sm:inline-block">
            VERIFIED BENCHMARKS // ACTIVE
          </span>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 gap-6 sm:gap-8 rounded-[2rem] sm:rounded-[2.5rem] border p-6 sm:p-10 md:p-12 md:grid-cols-4 backdrop-blur-xl border-indigo-100/90 bg-white/80 shadow-[0_10px_35px_rgba(99,102,241,0.06),0_1px_3px_rgba(0,0,0,0.02)] ring-1 ring-black/[0.03] dark:border-white/10 dark:bg-white/[0.02] dark:shadow-none dark:ring-0">
          {statsData.map((stat, index) => (
            <Reveal
              key={stat.label}
              direction="up"
              delay={index * 0.1}
              className="flex flex-col justify-between"
            >
              <div>
                <p className="font-display text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </p>

                <h3 className="mt-2 sm:mt-3 text-sm font-semibold sm:text-base">
                  {stat.label}
                </h3>
              </div>

              <p className="mt-1.5 sm:mt-2 text-xs leading-relaxed opacity-60 font-light">
                {stat.subtext}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}