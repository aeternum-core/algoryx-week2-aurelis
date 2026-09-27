import { type ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { usePrefersReducedMotion } from "../../hooks/useMediaQuery";

interface RevealProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right" | "scale" | "clip" | "none";
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
}

export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.75,
  threshold = 0.15,
  once = true,
  className = "",
  ...props
}: RevealProps) {
  const prefersReduced = usePrefersReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  const getVariants = () => {
    switch (direction) {
      case "up":
        return {
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0 },
        };
      case "down":
        return {
          hidden: { opacity: 0, y: -40 },
          visible: { opacity: 1, y: 0 },
        };
      case "left":
        return {
          hidden: { opacity: 0, x: 50 },
          visible: { opacity: 1, x: 0 },
        };
      case "right":
        return {
          hidden: { opacity: 0, x: -50 },
          visible: { opacity: 1, x: 0 },
        };
      case "scale":
        return {
          hidden: { opacity: 0, scale: 0.92 },
          visible: { opacity: 1, scale: 1 },
        };
      case "clip":
        return {
          hidden: { opacity: 0, clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", y: 20 },
          visible: { opacity: 1, clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)", y: 0 },
        };
      case "none":
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        };
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={getVariants()}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // Custom polished cubic bezier
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
