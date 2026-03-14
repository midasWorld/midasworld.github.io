"use client";

import { useTheme } from "next-themes";
import { useMounted } from "@/hooks/useMounted";

interface ThemeToggleButtonProps {
  className?: string;
}

export function ThemeToggleButton({ className = "" }: ThemeToggleButtonProps) {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`p-1.5 rounded-md hover:bg-[var(--bg-hover)] transition-colors ${className}`}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
