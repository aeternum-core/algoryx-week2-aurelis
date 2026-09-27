import { useSyncExternalStore } from "react";

export function useMediaQuery(query: string): boolean {
  const subscribe = (callback: () => void) => {
    const mediaQuery = window.matchMedia(query);
    mediaQuery.addEventListener("change", callback);
    return () => {
      mediaQuery.removeEventListener("change", callback);
    };
  };

  const getSnapshot = () => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  };

  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function useIsTouchDevice(): boolean {
  return useMediaQuery("(hover: none) and (pointer: coarse)");
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 768px)");
}
