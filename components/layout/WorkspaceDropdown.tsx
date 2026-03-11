"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const TOP_LEVEL_NAV = [
  "Dashboard",
  "Providers",
  "Interstitial Service",
  "Campaign Service",
];

const SG_MODULES = [
  "SG - Broadband",
  "SG - Cancer insurance",
  "SG - Car loan",
  "SG - Credit cards",
  "SG - Crypto",
  "SG - Debt consolidation",
  "SG - Education loan",
  "SG - Fixed deposit",
];

interface WorkspaceDropdownProps {
  activeContext: string;
  handleNavClick: (
    item: string,
    isSubMenu?: boolean,
    parentModule?: string | null,
  ) => void;
  onCloseMobile: () => void;
}

export function WorkspaceDropdown({
  activeContext,
  handleNavClick,
  onCloseMobile,
}: WorkspaceDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground font-bold mb-3 px-2">
        Workspace Environment
      </div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between p-3.5 md:p-4 rounded-[1.3rem] border transition-all duration-300 shadow-sm cursor-pointer ${
          isOpen
            ? "bg-primary text-white dark:bg-primary/40 dark:text-accent dark:border dark:border-accent/20"
            : "bg-surface border-border hover:bg-hover text-foreground"
        }`}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <div
            className={`w-8 h-8 md:w-9 md:h-9 flex-shrink-0 rounded-[0.5rem] md:rounded-[0.6rem] flex items-center justify-center font-serif text-base md:text-lg shadow-inner ${
              isOpen ? "bg-black/20 text-white" : "bg-panel text-foreground"
            }`}
          >
            {activeContext.substring(0, 1).toUpperCase()}
          </div>
          <div className="text-left truncate">
            <div className="text-sm font-semibold truncate">
              {activeContext}
            </div>
          </div>
        </div>
        <ChevronDown
          className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180 opacity-70" : "text-muted-foreground"
          }`}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-[40] bg-black/10 dark:bg-black/40 backdrop-blur-[2px] md:backdrop-blur-none"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-[100px] md:top-[110px] left-4 md:left-6 w-[270px] md:w-[420px] bg-surface rounded-[1.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.4)] border border-border z-[50] p-2 md:p-3 animate-in fade-in slide-in-from-top-4 origin-top-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 max-h-[50vh] overflow-y-auto p-1 custom-scrollbar">
              <div className="col-span-1 md:col-span-2 px-3 py-2 text-[9px] tracking-[0.2em] uppercase text-muted-foreground font-bold">
                Primary Nav
              </div>
              {TOP_LEVEL_NAV.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    handleNavClick(item);
                    setIsOpen(false);
                    onCloseMobile();
                  }}
                  className={`flex flex-col items-start gap-1 p-3.5 md:p-4 rounded-2xl text-left transition-colors cursor-pointer ${
                    item === activeContext
                      ? "bg-primary text-white dark:bg-primary/40 dark:text-accent dark:border dark:border-accent/20"
                      : "bg-panel text-foreground"
                  }`}
                >
                  <div className="text-[12px] md:text-[13px] font-semibold leading-tight">
                    {item}
                  </div>
                </button>
              ))}
              <div className="col-span-1 md:col-span-2 px-3 pt-4 pb-2 text-[9px] tracking-[0.2em] uppercase text-muted-foreground font-bold mt-2 border-t border-border">
                Modules
              </div>
              {SG_MODULES.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    handleNavClick(item);
                    // Automatically trigger the first sub-module for mobile views
                    if (window.innerWidth < 768) {
                      handleNavClick("Credit cards", true, item);
                      onCloseMobile();
                    }
                    setIsOpen(false);
                  }}
                  className={`flex flex-col items-start gap-1 p-3 md:p-3.5 rounded-[1rem] text-left transition-colors ${
                    item === activeContext
                      ? "bg-primary text-white dark:bg-primary/40 dark:text-accent dark:border dark:border-accent/20"
                      : "hover:bg-hover hover:cursor-pointer text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <div className="text-[11px] md:text-[12px] font-medium leading-tight">
                    {item}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
