interface AmbientLightProps {
  position?: "top-left" | "top-right" | "center" | "bottom-left" | "bottom-right";
  color?: "indigo" | "violet" | "cyan" | "rose" | "neutral";
  size?: "sm" | "md" | "lg" | "xl";
  darkMode?: boolean;
  className?: string;
}

export default function AmbientLight({
  position = "center",
  color = "indigo",
  size = "md",
  darkMode = true,
  className = "",
}: AmbientLightProps) {
  const positionClasses = {
    "top-left": "-top-32 -left-32",
    "top-right": "-top-32 -right-32",
    center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    "bottom-left": "-bottom-32 -left-32",
    "bottom-right": "-bottom-32 -right-32",
  }[position];

  const sizeClasses = {
    sm: "w-64 h-64 blur-2xl",
    md: "w-96 h-96 blur-3xl",
    lg: "w-[500px] h-[500px] blur-[120px]",
    xl: "w-[700px] h-[700px] blur-[160px]",
  }[size];

  const colorClasses = {
    indigo: darkMode ? "bg-indigo-600/15" : "bg-indigo-400/12",
    violet: darkMode ? "bg-purple-600/15" : "bg-purple-400/12",
    cyan: darkMode ? "bg-cyan-500/12" : "bg-teal-400/10",
    rose: darkMode ? "bg-pink-600/12" : "bg-pink-400/10",
    neutral: darkMode ? "bg-white/[0.04]" : "bg-black/[0.03]",
  }[color];

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full ${positionClasses} ${sizeClasses} ${colorClasses} ${className}`}
    />
  );
}
