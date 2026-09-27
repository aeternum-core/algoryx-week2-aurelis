import { useState, useEffect } from "react";

export interface MousePosition {
  x: number;
  y: number;
  normalizedX: number; // -1 to 1
  normalizedY: number; // -1 to 1
  isInside: boolean;
}

export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
    isInside: false,
  });

  useEffect(() => {
    let animationFrameId: number;

    const handleMouseMove = (event: MouseEvent) => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        const { clientX, clientY } = event;
        const { innerWidth, innerHeight } = window;

        const normalizedX = (clientX / innerWidth) * 2 - 1;
        const normalizedY = (clientY / innerHeight) * 2 - 1;

        setPosition({
          x: clientX,
          y: clientY,
          normalizedX,
          normalizedY,
          isInside: true,
        });
      });
    };

    const handleMouseLeave = () => {
      setPosition((prev) => ({ ...prev, isInside: false }));
    };

    const handleMouseEnter = () => {
      setPosition((prev) => ({ ...prev, isInside: true }));
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  return position;
}
