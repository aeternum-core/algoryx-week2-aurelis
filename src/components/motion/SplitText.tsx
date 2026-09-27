import { motion, type Variants } from "framer-motion";
import { usePrefersReducedMotion } from "../../hooks/useMediaQuery";

interface SplitTextProps {
  children: string;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  delay?: number;
  stagger?: number;
  mode?: "words" | "chars";
  highlightWords?: string[];
  highlightClass?: string;
}

export default function SplitText({
  children,
  className = "",
  tag = "h2",
  delay = 0,
  stagger = 0.04,
  mode = "words",
  highlightWords = [],
  highlightClass = "bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent",
}: SplitTextProps) {
  const prefersReduced = usePrefersReducedMotion();

  const Tag = motion[tag] as typeof motion.div;

  if (prefersReduced) {
    return <Tag className={className}>{children}</Tag>;
  }

  const items = mode === "words" ? children.split(" ") : children.split("");

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: "110%",
      rotateX: -30,
    },
    visible: {
      opacity: 1,
      y: "0%",
      rotateX: 0,
      transition: {
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <Tag
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={`inline-block perspective-1000 ${className}`}
    >
      {items.map((item, index) => {
        const cleanWord = item.replace(/[^a-zA-Z0-9]/g, "");
        const isHighlighted = highlightWords.some(
          (hw) => hw.toLowerCase() === cleanWord.toLowerCase()
        );

        return (
          <span
            key={index}
            className="inline-block overflow-hidden align-top py-1"
          >
            <motion.span
              variants={itemVariants}
              className={`inline-block ${
                isHighlighted ? highlightClass : ""
              }`}
            >
              {item}
            </motion.span>
            {mode === "words" && index < items.length - 1 && (
              <span className="inline-block">&nbsp;</span>
            )}
          </span>
        );
      })}
    </Tag>
  );
}
