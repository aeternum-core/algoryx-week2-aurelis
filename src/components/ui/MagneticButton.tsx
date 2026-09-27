import { type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import Magnetic from "../motion/Magnetic";

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: boolean;
  className?: string;
  cursorText?: string;
}

export default function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  icon = true,
  className = "",
}: MagneticButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-xs gap-1.5",
    md: "px-6 py-3 text-sm gap-2",
    lg: "px-8 py-4 text-base gap-2.5",
  }[size];

  const variantClasses = {
    primary:
      "bg-black text-white dark:bg-white dark:text-black hover:shadow-[0_0_25px_rgba(99,102,241,0.3)] border border-transparent",
    secondary:
      "bg-indigo-600 text-white hover:bg-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.4)] border border-indigo-400/30",
    outline:
      "border border-current/15 hover:border-current/40 hover:bg-current/[0.04] backdrop-blur-md",
    ghost:
      "border-transparent hover:bg-current/[0.05] opacity-80 hover:opacity-100",
  }[variant];

  const content = (
    <div
      className={`group relative inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 ${sizeClasses} ${variantClasses} ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon && (
          <ArrowUpRight
            size={size === "sm" ? 14 : size === "lg" ? 18 : 16}
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        )}
      </span>
    </div>
  );

  return (
    <Magnetic strength={0.25}>
      {href ? (
        <a href={href} onClick={onClick} className="inline-block focus-visible:outline-2 focus-visible:outline-indigo-500">
          {content}
        </a>
      ) : (
        <button
          type="button"
          onClick={onClick}
          className="inline-block focus-visible:outline-2 focus-visible:outline-indigo-500"
        >
          {content}
        </button>
      )}
    </Magnetic>
  );
}
