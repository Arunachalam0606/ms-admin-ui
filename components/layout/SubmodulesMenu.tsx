"use client";

import { ChevronRight } from "lucide-react";
import { useState } from "react";

const SUBMODULES = [
  "Categories",
  "Products",
  "Promotions",
  "Sponsored Listings",
  "Recommended Products",
  "Feature Groups",
  "Settings",
];

export function SubmodulesMenu() {
  const [activeSubmodule, setActiveSubmodule] = useState("Categories");

  return (
    <div>
      <div className="text-[9px] tracking-[0.2em] uppercase text-muted font-bold mb-3 px-2 mt-4 md:mt-0">
        SUB-MODULES (SG)
      </div>
      <ul className="space-y-1.5">
        {SUBMODULES.map((item) => {
          const isActive = item === activeSubmodule;
          return (
            <li key={item}>
              <button
                onClick={() => setActiveSubmodule(item)}
                className={`w-full flex items-center justify-between px-4 md:px-5 py-3 md:py-3.5 rounded-[1rem] md:rounded-[1.2rem] text-[13px] md:text-[13.5px] font-medium transition-all duration-300 ${
                  isActive 
                    ? "bg-primary text-white dark:bg-primary/40 dark:text-accent dark:border dark:border-accent/20" 
                    : "text-muted hover:bg-surface hover:text-foreground"
                }`}
              >
                {item}
                {isActive && <ChevronRight className="w-3.5 h-3.5 opacity-60" />}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
