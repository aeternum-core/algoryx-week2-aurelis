import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { useIsTouchDevice, usePrefersReducedMotion } from "../../hooks/useMediaQuery";

export default function ExperienceCursor() {
  const isTouch = useIsTouchDevice();
  const prefersReduced = usePrefersReducedMotion();

  const [cursorState, setCursorState] = useState<{
    text: string;
    variant: "default" | "hover" | "view" | "drag" | "link";
  }>({
    text: "",
    variant: "default",
  });

  const [isVisible, setIsVisible] = useState(false);

  // Smooth springs for high-framerate fluid cursor follow
  const cursorX = useSpring(0, { stiffness: 450, damping: 28, mass: 0.2 });
  const cursorY = useSpring(0, { stiffness: 450, damping: 28, mass: 0.2 });

  useEffect(() => {
    if (isTouch || prefersReduced) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Track data-cursor attributes on hover targets
    const handleElementHover = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("[data-cursor]") as HTMLElement | null;
      if (target) {
        const cursorType = target.getAttribute("data-cursor");
        const cursorText = target.getAttribute("data-cursor-text") || "";

        if (cursorType === "view") {
          setCursorState({ text: cursorText || "VIEW", variant: "view" });
        } else if (cursorType === "drag") {
          setCursorState({ text: cursorText || "DRAG", variant: "drag" });
        } else if (cursorType === "hover") {
          setCursorState({ text: cursorText, variant: "hover" });
        } else {
          setCursorState({ text: "", variant: "default" });
        }
      } else {
        const isInteractive = (e.target as HTMLElement)?.closest("a, button, input, select, textarea, [role='button']");
        if (isInteractive) {
          setCursorState({ text: "", variant: "hover" });
        } else {
          setCursorState({ text: "", variant: "default" });
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleElementHover, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleElementHover);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, isTouch, isVisible, prefersReduced]);

  if (isTouch || prefersReduced || !isVisible) {
    return null;
  }

  const isTextMode = cursorState.variant === "view" || cursorState.variant === "drag";

  return (
    <div className="pointer-events-none fixed inset-0 z-[999] overflow-hidden">
      {/* Outer Follower Ring / Badge */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isTextMode ? 72 : cursorState.variant === "hover" ? 44 : 28,
          height: isTextMode ? 72 : cursorState.variant === "hover" ? 44 : 28,
          backgroundColor: isTextMode
            ? "rgba(99, 102, 241, 0.95)"
            : cursorState.variant === "hover"
            ? "rgba(99, 102, 241, 0.15)"
            : "rgba(255, 255, 255, 0.05)",
          borderColor: isTextMode
            ? "rgba(255, 255, 255, 0.8)"
            : cursorState.variant === "hover"
            ? "rgba(99, 102, 241, 0.6)"
            : "rgba(255, 255, 255, 0.25)",
        }}
        transition={{ type: "spring", stiffness: 380, damping: 25 }}
        className="flex items-center justify-center rounded-full border backdrop-blur-xs transition-colors duration-200"
      >
        {isTextMode && (
          <span className="text-[10px] font-bold tracking-widest text-white uppercase select-none">
            {cursorState.text}
          </span>
        )}
      </motion.div>

      {/* Inner Dot (hidden when expanded with text) */}
      {!isTextMode && (
        <motion.div
          style={{
            x: cursorX,
            y: cursorY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{
            scale: cursorState.variant === "hover" ? 0.6 : 1,
            opacity: isVisible ? 1 : 0,
          }}
          className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
        />
      )}
    </div>
  );
}
