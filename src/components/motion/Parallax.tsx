import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePrefersReducedMotion, useIsMobile } from "../../hooks/useMediaQuery";

interface ParallaxProps {
  children: ReactNode;
  offset?: number; // Distance in pixels to travel
  clamp?: boolean;
  className?: string;
}

export default function Parallax({
  children,
  offset = 50,
  className = "",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const prefersReduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const effectiveOffset = isMobile ? offset * 0.4 : offset;
  const y = useTransform(scrollYProgress, [0, 1], [-effectiveOffset, effectiveOffset]);

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div style={{ y }} className="w-full h-full">
        {children}
      </motion.div>
    </div>
  );
}
