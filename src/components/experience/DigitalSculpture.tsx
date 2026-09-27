import { useEffect, useRef } from "react";
import { usePrefersReducedMotion, useIsMobile } from "../../hooks/useMediaQuery";

interface DigitalSculptureProps {
  darkMode?: boolean;
  className?: string;
  size?: number;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
}

export default function DigitalSculpture({
  darkMode = true,
  className = "",
  size = 440,
}: DigitalSculptureProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef<{ targetX: number; targetY: number; currentX: number; currentY: number }>({
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
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
    let rotX = 0.3;
    let rotY = 0.4;
    let rotZ = 0.1;

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Mathematical vertices of an icosahedron / multifaceted crystal
    const phi = (1 + Math.sqrt(5)) / 2;
    const baseVertices: Point3D[] = [
      { x: -1, y: phi, z: 0 },
      { x: 1, y: phi, z: 0 },
      { x: -1, y: -phi, z: 0 },
      { x: 1, y: -phi, z: 0 },
      { x: 0, y: -1, z: phi },
      { x: 0, y: 1, z: phi },
      { x: 0, y: -1, z: -phi },
      { x: 0, y: 1, z: -phi },
      { x: phi, y: 0, z: -1 },
      { x: phi, y: 0, z: 1 },
      { x: -phi, y: 0, z: -1 },
      { x: -phi, y: 0, z: 1 },
    ];

    // Normalize vertices
    const radius = 1.6;
    const vertices: Point3D[] = baseVertices.map((v) => {
      const len = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
      return {
        x: (v.x / len) * radius,
        y: (v.y / len) * radius,
        z: (v.z / len) * radius,
      };
    });

    // 20 Triangular Faces of an Icosahedron
    const faces: [number, number, number][] = [
      [0, 11, 5],
      [0, 5, 1],
      [0, 1, 7],
      [0, 7, 10],
      [0, 10, 11],
      [1, 5, 9],
      [5, 11, 4],
      [11, 10, 2],
      [10, 7, 6],
      [7, 1, 8],
      [3, 9, 4],
      [3, 4, 2],
      [3, 2, 6],
      [3, 6, 8],
      [3, 8, 9],
      [4, 9, 5],
      [2, 4, 11],
      [6, 2, 10],
      [8, 6, 7],
      [9, 8, 1],
    ];

    // Inner Core vertices
    const innerRadius = 0.85;
    const innerVertices: Point3D[] = baseVertices.map((v) => {
      const len = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
      return {
        x: (v.x / len) * innerRadius,
        y: (v.y / len) * innerRadius,
        z: (v.z / len) * innerRadius,
      };
    });

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      mouseRef.current.targetX = (e.clientX - centerX) / (rect.width / 2);
      mouseRef.current.targetY = (e.clientY - centerY) / (rect.height / 2);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const resize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const rotatePoint = (
      p: Point3D,
      rx: number,
      ry: number,
      rz: number
    ): Point3D => {
      // Rotate Y
      let x = p.x * Math.cos(ry) + p.z * Math.sin(ry);
      let z = -p.x * Math.sin(ry) + p.z * Math.cos(ry);
      let y = p.y;

      // Rotate X
      const y1 = y * Math.cos(rx) - z * Math.sin(rx);
      z = y * Math.sin(rx) + z * Math.cos(rx);
      y = y1;

      // Rotate Z
      const x2 = x * Math.cos(rz) - y * Math.sin(rz);
      y = x * Math.sin(rz) + y * Math.cos(rz);
      x = x2;

      return { x, y, z };
    };

    const project = (
      p: Point3D,
      fov: number,
      center: number
    ): { x: number; y: number; z: number; scale: number } => {
      const distance = 4.2;
      const scale = fov / (distance + p.z);
      return {
        x: p.x * scale + center,
        y: p.y * scale + center,
        z: p.z,
        scale,
      };
    };

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, size, size);

      // Smooth mouse interpolation
      mouseRef.current.currentX +=
        (mouseRef.current.targetX - mouseRef.current.currentX) * 0.05;
      mouseRef.current.currentY +=
        (mouseRef.current.targetY - mouseRef.current.currentY) * 0.05;

      if (!reducedMotion) {
        rotY += 0.007 + mouseRef.current.currentX * 0.006;
        rotX += 0.004 + mouseRef.current.currentY * 0.006;
        rotZ += 0.002;
      }

      const center = size / 2;
      const fov = isMobile ? size * 0.42 : size * 0.48;

      // Outer Transformed Vertices
      const projectedVertices = vertices.map((v) => {
        const rotated = rotatePoint(v, rotX, rotY, rotZ);
        return project(rotated, fov, center);
      });

      // Inner Core Vertices
      const projectedInner = innerVertices.map((v) => {
        const rotated = rotatePoint(v, -rotX * 1.3, -rotY * 1.3, rotZ * 1.2);
        return project(rotated, fov, center);
      });

      // Sort faces by average depth (Z-buffer painter's algorithm)
      const sortedFaces = faces
        .map((face, index) => {
          const v0 = projectedVertices[face[0]];
          const v1 = projectedVertices[face[1]];
          const v2 = projectedVertices[face[2]];
          const avgZ = (v0.z + v1.z + v2.z) / 3;

          // Compute normal for lighting
          const ax = v1.x - v0.x;
          const ay = v1.y - v0.y;
          const bx = v2.x - v0.x;
          const by = v2.y - v0.y;
          const crossZ = ax * by - ay * bx;

          return { face, avgZ, isFront: crossZ > 0, index };
        })
        .sort((a, b) => a.avgZ - b.avgZ);

      // 1. Draw subtle ambient refractive background halo
      const glowGrad = ctx.createRadialGradient(
        center,
        center,
        10,
        center,
        center,
        size * 0.44
      );
      if (darkMode) {
        glowGrad.addColorStop(0, "rgba(99, 102, 241, 0.16)");
        glowGrad.addColorStop(0.5, "rgba(168, 85, 247, 0.08)");
        glowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      } else {
        // Luminous optical crystal halo in light mode
        glowGrad.addColorStop(0, "rgba(99, 102, 241, 0.15)");
        glowGrad.addColorStop(0.4, "rgba(236, 72, 153, 0.08)");
        glowGrad.addColorStop(0.7, "rgba(6, 182, 212, 0.05)");
        glowGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
      }
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(center, center, size * 0.44, 0, Math.PI * 2);
      ctx.fill();

      // 2. Draw Inner Core (Crystalline geometry pulsing inside)
      ctx.strokeStyle = darkMode
        ? "rgba(165, 180, 252, 0.3)"
        : "rgba(99, 102, 241, 0.35)";
      ctx.lineWidth = 1;
      for (const [i0, i1, i2] of faces) {
        const p0 = projectedInner[i0];
        const p1 = projectedInner[i1];
        const p2 = projectedInner[i2];
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.closePath();
        ctx.stroke();
      }

      // 3. Draw Outer Faces & Refractions
      for (const { face, isFront, avgZ } of sortedFaces) {
        const p0 = projectedVertices[face[0]];
        const p1 = projectedVertices[face[1]];
        const p2 = projectedVertices[face[2]];

        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.closePath();

        // Facet fill calculation
        const lightFactor = Math.max(0.1, (avgZ + 1.6) / 3.2);

        if (isFront) {
          if (darkMode) {
            const r = Math.floor(80 + lightFactor * 80);
            const g = Math.floor(90 + lightFactor * 100);
            const b = Math.floor(220 + lightFactor * 35);
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.12 + lightFactor * 0.18})`;
          } else {
            // Prismatic glass facet refraction in light mode
            const r = Math.floor(110 + lightFactor * 70);
            const g = Math.floor(120 + lightFactor * 70);
            const b = Math.floor(255);
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.08 + lightFactor * 0.14})`;
          }
          ctx.fill();

          // Highlighted crisp edge
          ctx.strokeStyle = darkMode
            ? `rgba(255, 255, 255, ${0.2 + lightFactor * 0.4})`
            : `rgba(79, 70, 229, ${0.48 + lightFactor * 0.4})`;
          ctx.lineWidth = darkMode ? 1.2 : 1.4;
          ctx.stroke();
        } else {
          // Back-facing translucent mesh wire
          ctx.strokeStyle = darkMode
            ? "rgba(148, 163, 184, 0.09)"
            : "rgba(99, 102, 241, 0.18)";
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // 4. Draw Vertex Nodes with specular sparkles
      for (const p of projectedVertices) {
        const nodeAlpha = Math.max(0.2, (p.z + 1.6) / 3.2);
        if (darkMode) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, isMobile ? 2 : 2.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${nodeAlpha * 0.85})`;
          ctx.fill();
        } else {
          // Outer subtle sapphire halo
          ctx.beginPath();
          ctx.arc(p.x, p.y, isMobile ? 3 : 4.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(99, 102, 241, ${nodeAlpha * 0.15})`;
          ctx.fill();

          // Inner sapphire node
          ctx.beginPath();
          ctx.arc(p.x, p.y, isMobile ? 1.8 : 2.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(79, 70, 229, ${nodeAlpha * 0.85})`;
          ctx.fill();

          // Specular glint
          ctx.beginPath();
          ctx.arc(p.x - 0.5, p.y - 0.5, 0.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${nodeAlpha * 0.95})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, [darkMode, isMobile, reducedMotion, size]);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size, maxWidth: "100%" }}
    >
      <canvas
        ref={canvasRef}
        style={{ width: size, height: size, maxWidth: "100%", maxHeight: "100%" }}
        className="pointer-events-none drop-shadow-xl"
      />
    </div>
  );
}
