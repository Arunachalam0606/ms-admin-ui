"use client";

import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

interface DarkModeToggleProps {
  isHeader?: boolean;
}

export function DarkModeToggle({ isHeader = false }: DarkModeToggleProps) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof document !== "undefined") {
      const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const localTheme = localStorage.getItem("theme");
      const currentDark = localTheme === "dark" || (!localTheme && isSystemDark);
      
      setIsDark(currentDark);
      if (currentDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  const toggleDark = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Prevent hydration mismatch
  if (!mounted) {
    if (isHeader) {
      return <div className="w-10 h-10 rounded-full bg-surface border border-border shadow-sm"></div>;
    }
    return <div className="w-full h-12 rounded-xl"></div>;
  }

  return (
    <button
      onClick={toggleDark}
      className={`flex items-center justify-center rounded-full transition-all duration-300 ${
        isHeader 
          ? "w-10 h-10 bg-surface border-border border text-muted-foreground hover:bg-panel shadow-sm dark:shadow-none" 
          : "w-full px-4 py-3"
      }`}
    >
      {isHeader ? (
        isDark ? (
          <Sun className="w-4 h-4" />
        ) : (
          <Moon className="w-4 h-4" />
        )
      ) : (
        <div className="w-full flex items-center justify-between rounded-xl transition-all text-muted-foreground">
          <div className="flex items-center gap-3 text-sm font-medium cursor-pointer">
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />} Dark Mode
          </div>
          <div
            className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-300 ${
              isDark ? "bg-[#3DEDA4]" : "bg-[#EAE8E3]"
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full transition-transform duration-300 ${
                isDark ? "translate-x-4 bg-[#18324C]" : "translate-x-0 bg-white shadow-sm"
              }`}
            ></div>
          </div>
        </div>
      )}
    </button>
  );
}
