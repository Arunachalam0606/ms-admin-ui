"use client";

import { useState, useRef, useEffect } from "react";
import { LogOut } from "lucide-react";
import { DarkModeToggle } from "./DarkModeToggle";

export function UserDropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative z-50" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 hover:opacity-80 transition-all cursor-pointer"
      >
        {/* Email label - desktop only */}
        <span className="text-sm hidden md:block tracking-wide font-medium text-muted-foreground">
          example@moneysmart.com
        </span>
        {/* Avatar circle */}
        <div
          className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center font-serif font-medium text-sm transition-transform shadow-sm bg-primary dark:bg-accent text-white dark:text-primary ${
            isOpen ? "scale-95 ring-2 ring-offset-2 ring-primary dark:ring-accent dark:ring-offset-surface" : ""
          }`}
        >
          EX
        </div>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-12 md:top-14 w-64 md:w-72 bg-surface border border-border shadow-[0_12px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.4)] rounded-3xl p-2 z-50 animate-in fade-in slide-in-from-top-2 origin-top-right">
            {/* User info header */}
            <div className="px-5 py-4 border-b border-border mb-2 bg-panel rounded-t-2xl">
              <p className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground font-bold mb-1.5">
                Workspace User
              </p>
              <p className="text-base md:text-lg font-serif text-foreground truncate">
                example@moneysmart.com
              </p>
            </div>

            {/* Dark mode toggle */}
            <div className="px-1">
              <DarkModeToggle />
            </div>

            {/* Divider */}
            <div className="h-px w-auto mx-3 my-2 bg-gradient-to-r from-transparent via-border to-transparent" />

            {/* Sign out */}
            <button
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center gap-3 px-4 md:px-5 py-2.5 md:py-3 rounded-2xl text-sm font-medium text-[#E05252] dark:text-[#FCA5A5] hover:bg-[#FFF5F5] dark:hover:bg-[#3A1B16] transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" /> Secure Logout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
