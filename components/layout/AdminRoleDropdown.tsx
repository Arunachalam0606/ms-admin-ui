"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const ROLES = [
  "Product Service Admin",
  "Promotion Admin",
  "System Admin",
];

export function AdminRoleDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeRole, setActiveRole] = useState(ROLES[0]);
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
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 text-[9px] tracking-[0.15em] font-bold uppercase transition-colors text-[#A3C1E2] dark:text-[#94A3B8] hover:text-white"
      >
        {activeRole} <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-[40]" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 mt-2 w-[240px] bg-surface text-foreground border border-border rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.15)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] p-1.5 z-[50] animate-in fade-in slide-in-from-top-2">
            {ROLES.map((role) => (
              <button
                key={role}
                onClick={() => {
                  setActiveRole(role);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-[12px] font-semibold transition-colors ${
                  activeRole === role 
                    ? "bg-primary text-white dark:bg-primary/40 dark:text-accent dark:border dark:border-accent/20" 
                    : "hover:bg-hover text-muted-foreground hover:text-foreground"
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
