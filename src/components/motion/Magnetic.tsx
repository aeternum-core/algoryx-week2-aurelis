import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { useIsTouchDevice, usePrefersReducedMotion } from "../../hooks/useMediaQuery";

interface MagneticProps {
  children: ReactNode;
  strength?: number; // 0.1 to 0.5
  className?: string;
}

export default function Magnetic({
  children,
  strength = 0.3,
  className = "",
}: MagneticProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isTouch = useIsTouchDevice();
  const prefersReduced = usePrefersReducedMotion();

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isTouch || prefersReduced || !ref.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();

    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    setPosition({
      x: middleX * strength,
      y: middleY * strength,
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  if (isTouch || prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{
        type: "spring",
        stiffness: 350,
        damping: 20,
        mass: 0.15,
      }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
