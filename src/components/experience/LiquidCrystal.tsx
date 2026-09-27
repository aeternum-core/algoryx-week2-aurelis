import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../../hooks/useMediaQuery";

interface LiquidCrystalProps {
  darkMode?: boolean;
  intensity?: "subtle" | "medium" | "accent";
  className?: string;
}

export default function LiquidCrystal({
  darkMode = true,
  intensity = "subtle",
  className = "",
}: LiquidCrystalProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let time = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      if (!reducedMotion) {
        time += 0.008;
      }

      // Base coordinates for organic fluid crystal orbs
      const cx1 = w * 0.35 + Math.sin(time * 0.7) * (w * 0.12);
      const cy1 = h * 0.4 + Math.cos(time * 0.5) * (h * 0.15);
      const r1 = Math.min(w, h) * 0.45;

      const cx2 = w * 0.7 + Math.cos(time * 0.6) * (w * 0.15);
      const cy2 = h * 0.6 + Math.sin(time * 0.8) * (h * 0.12);
      const r2 = Math.min(w, h) * 0.4;

      const cx3 = w * 0.5 + Math.sin(time * 0.4) * (w * 0.1);
      const cy3 = h * 0.3 + Math.cos(time * 0.6) * (h * 0.1);
      const r3 = Math.min(w, h) * 0.35;

      // Color paletting depending on theme & intensity
      const baseAlpha = intensity === "accent" ? 0.38 : intensity === "medium" ? 0.28 : 0.18;
      const alpha1 = darkMode ? (intensity === "accent" ? 0.35 : intensity === "medium" ? 0.22 : 0.14) : baseAlpha;
      const alpha2 = darkMode ? (intensity === "accent" ? 0.30 : intensity === "medium" ? 0.18 : 0.12) : baseAlpha * 0.9;
      const alpha3 = darkMode ? (intensity === "accent" ? 0.26 : intensity === "medium" ? 0.16 : 0.10) : baseAlpha * 0.85;

      // Primary Indigo/Violet orb
      const grad1 = ctx.createRadialGradient(cx1, cy1, 0, cx1, cy1, r1);
      if (darkMode) {
        grad1.addColorStop(0, `rgba(99, 102, 241, ${alpha1})`);
        grad1.addColorStop(0.5, `rgba(139, 92, 246, ${alpha1 * 0.5})`);
        grad1.addColorStop(1, "rgba(99, 102, 241, 0)");
      } else {
        // Multi-layered Royal Indigo & Iris Violet in light mode
        grad1.addColorStop(0, `rgba(99, 102, 241, ${alpha1 * 0.95})`);
        grad1.addColorStop(0.4, `rgba(129, 140, 248, ${alpha1 * 0.65})`);
        grad1.addColorStop(0.7, `rgba(168, 85, 247, ${alpha1 * 0.35})`);
        grad1.addColorStop(1, "rgba(99, 102, 241, 0)");
      }

      ctx.fillStyle = grad1;
      ctx.beginPath();
      ctx.arc(cx1, cy1, r1, 0, Math.PI * 2);
      ctx.fill();

      // Secondary Cyan/Teal crystal refraction
      const grad2 = ctx.createRadialGradient(cx2, cy2, 0, cx2, cy2, r2);
      if (darkMode) {
        grad2.addColorStop(0, `rgba(6, 182, 212, ${alpha2})`);
        grad2.addColorStop(0.6, `rgba(59, 130, 246, ${alpha2 * 0.3})`);
        grad2.addColorStop(1, "rgba(6, 182, 212, 0)");
      } else {
        // Vivid Capri Cyan & Azure Sky in light mode
        grad2.addColorStop(0, `rgba(6, 182, 212, ${alpha2 * 0.9})`);
        grad2.addColorStop(0.4, `rgba(56, 189, 248, ${alpha2 * 0.6})`);
        grad2.addColorStop(0.75, `rgba(99, 102, 241, ${alpha2 * 0.25})`);
        grad2.addColorStop(1, "rgba(6, 182, 212, 0)");
      }

      ctx.fillStyle = grad2;
      ctx.beginPath();
      ctx.arc(cx2, cy2, r2, 0, Math.PI * 2);
      ctx.fill();

      // Tertiary Rose/Amethyst refraction
      const grad3 = ctx.createRadialGradient(cx3, cy3, 0, cx3, cy3, r3);
      if (darkMode) {
        grad3.addColorStop(0, `rgba(236, 72, 153, ${alpha3 * 0.7})`);
        grad3.addColorStop(0.6, `rgba(168, 85, 247, ${alpha3 * 0.2})`);
        grad3.addColorStop(1, "rgba(236, 72, 153, 0)");
      } else {
        // Radiant Neon Rose & Luminous Fuchsia in light mode
        grad3.addColorStop(0, `rgba(244, 63, 94, ${alpha3 * 0.9})`);
        grad3.addColorStop(0.45, `rgba(236, 72, 153, ${alpha3 * 0.6})`);
        grad3.addColorStop(0.8, `rgba(168, 85, 247, ${alpha3 * 0.25})`);
        grad3.addColorStop(1, "rgba(236, 72, 153, 0)");
      }

      ctx.fillStyle = grad3;
      ctx.beginPath();
      ctx.arc(cx3, cy3, r3, 0, Math.PI * 2);
      ctx.fill();

      // 4. Fourth Chromatic Violet Depth Orb
      const cx4 = w * 0.75 + Math.sin(time * 0.5) * (w * 0.1);
      const cy4 = h * 0.35 + Math.cos(time * 0.7) * (h * 0.12);
      const r4 = Math.min(w, h) * 0.38;
      const grad4 = ctx.createRadialGradient(cx4, cy4, 0, cx4, cy4, r4);
      if (darkMode) {
        grad4.addColorStop(0, `rgba(147, 51, 234, ${alpha3 * 0.4})`);
        grad4.addColorStop(1, "rgba(147, 51, 234, 0)");
      } else {
        grad4.addColorStop(0, `rgba(168, 85, 247, ${alpha3 * 0.85})`);
        grad4.addColorStop(0.5, `rgba(217, 70, 239, ${alpha3 * 0.45})`);
        grad4.addColorStop(1, "rgba(168, 85, 247, 0)");
      }
      ctx.fillStyle = grad4;
      ctx.beginPath();
      ctx.arc(cx4, cy4, r4, 0, Math.PI * 2);
      ctx.fill();

      // 5. Fifth Ambient Solar Warmth Orb (Light mode only)
      if (!darkMode) {
        const cx5 = w * 0.2 + Math.cos(time * 0.4) * (w * 0.1);
        const cy5 = h * 0.75 + Math.sin(time * 0.6) * (h * 0.12);
        const r5 = Math.min(w, h) * 0.35;
        const grad5 = ctx.createRadialGradient(cx5, cy5, 0, cx5, cy5, r5);
        grad5.addColorStop(0, `rgba(251, 146, 60, ${alpha3 * 0.6})`);
        grad5.addColorStop(0.5, `rgba(244, 63, 94, ${alpha3 * 0.3})`);
        grad5.addColorStop(1, "rgba(251, 146, 60, 0)");
        ctx.fillStyle = grad5;
        ctx.beginPath();
        ctx.arc(cx5, cy5, r5, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, [darkMode, intensity, reducedMotion]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none inset-0 overflow-hidden ${className || "absolute"}`}
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full opacity-90 blur-[70px] md:blur-[100px]"
      />
    </div>
  );
}
