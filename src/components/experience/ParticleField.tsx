import { useEffect, useRef } from "react";
import { usePrefersReducedMotion, useIsMobile } from "../../hooks/useMediaQuery";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
}

interface ParticleFieldProps {
  darkMode?: boolean;
  density?: "low" | "medium" | "high";
  interactive?: boolean;
  className?: string;
}

export default function ParticleField({
  darkMode = true,
  density = "medium",
  interactive = true,
  className = "",
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false,
  });

  const isMobile = useIsMobile();
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let particles: Particle[] = [];

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const initParticles = (width: number, height: number) => {
      const baseCount = isMobile
        ? density === "high" ? 30 : density === "medium" ? 20 : 12
        : density === "high" ? 65 : density === "medium" ? 45 : 25;

      particles = [];
      for (let i = 0; i < baseCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * (reducedMotion ? 0.05 : 0.35),
          vy: (Math.random() - 0.5) * (reducedMotion ? 0.05 : 0.35),
          radius: Math.random() * 1.5 + 1,
          baseAlpha: Math.random() * 0.35 + 0.15,
          alpha: Math.random() * 0.35 + 0.15,
        });
      }
    };

    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      initParticles(rect.width, rect.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive || !canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    if (interactive) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      document.addEventListener("mouseleave", handleMouseLeave);
    }

    const connectionDist = isMobile ? 80 : 120;
    const mouseRadius = 140;

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      const nodeColor = darkMode ? "255, 255, 255" : "79, 70, 229";
      const lineColor = darkMode ? "165, 180, 252" : "99, 102, 241";

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!reducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = w;
          if (p.x > w) p.x = 0;
          if (p.y < 0) p.y = h;
          if (p.y > h) p.y = 0;

          // Mouse interaction (soft repulsion)
          if (mouseRef.current.active) {
            const dx = p.x - mouseRef.current.x;
            const dy = p.y - mouseRef.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < mouseRadius && dist > 0) {
              const force = (1 - dist / mouseRadius) * 1.5;
              p.x += (dx / dist) * force;
              p.y += (dy / dist) * force;
            }
          }
        }

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${nodeColor}, ${darkMode ? p.alpha : p.alpha * 0.75})`;
        ctx.fill();

        // Connect nearest nodes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            const opacity = (1 - dist / connectionDist) * (darkMode ? 0.18 : 0.22);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${lineColor}, ${opacity})`;
            ctx.lineWidth = darkMode ? 0.7 : 0.85;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      if (interactive) {
        window.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseleave", handleMouseLeave);
      }
      observer.disconnect();
    };
  }, [darkMode, density, interactive, isMobile, reducedMotion]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none inset-0 overflow-hidden ${className || "absolute"}`}
    >
      <canvas ref={canvasRef} className="h-full w-full opacity-75" />
    </div>
  );
}
