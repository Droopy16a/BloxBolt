"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const resolvedTheme = savedTheme ?? (prefersDark ? "dark" : "light");

    setTheme(resolvedTheme);
    document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
    document.documentElement.style.colorScheme = resolvedTheme;
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    document.documentElement.style.colorScheme = newTheme;
  };

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200/70 bg-white/80 text-neutral-700 shadow-sm transition-all hover:bg-neutral-100 hover:text-neutral-900 active:scale-95 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-white"
      aria-label="Toggle Theme"
      aria-pressed={isDark}
      type="button"
    >
      {mounted ? (
        isDark ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )
      ) : (
        <div className="h-4 w-4" />
      )}
    </button>
  );
}
