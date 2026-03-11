"use client";

import { X, ChevronRight } from "lucide-react";
import { AdminRoleDropdown } from "./AdminRoleDropdown";
import { WorkspaceDropdown } from "./WorkspaceDropdown";
import { useEffect, useState } from "react";

// Exact mock data matches
const SUB_MENU_ITEMS = [
  "Categories",
  "Products",
  "Promotions",
  "Sponsored Listings",
  "Recommended Products",
  "Feature Groups",
  "Settings",
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

const MoneySmartLogo = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 309 33"
    className={className}
  >
    <defs>
      <mask
        id="mask-moneysmart"
        x="159.64"
        y="0"
        width="22.87"
        height="33"
        maskUnits="userSpaceOnUse"
      >
        <g>
          <path
            d="M159.64,0h22.87V33H159.64Z"
            fill="#FFFFFF"
            fillRule="evenodd"
          />
        </g>
      </mask>
    </defs>
    <g mask="url(#mask-moneysmart)">
      <path
        d="M166.39,23.07c.09,2.05,1.7,3.87,4.73,3.87,2.7,0,4.59-1.31,4.64-3.4,0-1.45-.6-2.71-3.82-3.64l-3.81-1.07c-7-2.19-8.17-6.34-8.17-9.23,0-5.73,4.82-9.6,10.88-9.6s10.7,3.68,10.7,9.83h-6.7c0-2.14-1.43-3.63-4.09-3.63-2.34,0-4.09,1.3-4.09,3.21,0,.84.33,2.38,3.4,3.27l3.76,1.21c7.67,2.24,8.78,6.62,8.68,9.69C182.41,30,176.72,33,171.12,33c-6.89,0-11.48-4.15-11.48-9.93Z"
        fill="#FFFFFF"
        fillRule="evenodd"
      />
    </g>
    <path
      d="M214,.37l-9.46,20.7L195,.37H189.4l-3.9,32.12h6.75l2.24-19.25,7.44,15.56h5.19l7.39-15.56,2.21,19.25h6.74L219.61.37Z"
      fill="#FFFFFF"
      fillRule="evenodd"
    />
    <path
      d="M237.13.37,225.37,32.49h7.17l2.8-7.6h10.92l2.8,7.6h7.07L244.43.37Zm3.62,7.41L244.11,19h-6.57Z"
      fill="#FFFFFF"
      fillRule="evenodd"
    />
    <path
      d="M282.27,10.91c0-5.27-3.35-10.54-10.51-10.54H258.82V32.49h6.74V21.39h1.52l7.07,11.1h8.08l-7.85-11.38c5.42-1.16,7.89-5.64,7.89-10.2m-11,4.52h-5.7v-9h5.88c2.53,0,3.81,2.51,3.81,4.52s-1.38,4.52-4,4.52"
      fill="#FFFFFF"
      fillRule="evenodd"
    />
    <path
      d="M284.55.37V6.53h8.54v26h6.8v-26h8.54V.37Z"
      fill="#FFFFFF"
      fillRule="evenodd"
    />
    <path
      d="M28.46.81,19,21.51,9.46.81H3.9L0,32.93H6.75L9,13.68l7.44,15.56h5.18L29,13.68l2.21,19.25H38L34.11.81Z"
      fill="#3DEDA4"
      fillRule="evenodd"
    />
    <path
      d="M55.59,26.19A9.49,9.49,0,0,0,65,16.5a9.35,9.35,0,1,0-18.69,0,9.45,9.45,0,0,0,9.32,9.69M55.59,0A16.19,16.19,0,0,1,71.66,16.5a16,16,0,1,1-32.09,0A16.18,16.18,0,0,1,55.59,0"
      fill="#3DEDA4"
      fillRule="evenodd"
    />
    <path
      d="M92.13.37V19.58L81.3.37H75.15V32.49h6.7V13.05l11,19.44h6V.37Z"
      fill="#3DEDA4"
      fillRule="evenodd"
    />
    <path
      d="M105.46.37V32.49h20.43v-6H112.16V19.62h11.66V13.7H112.16V6.39h13.32v-6Z"
      fill="#3DEDA4"
      fillRule="evenodd"
    />
    <path
      d="M131.3.27h6a34,34,0,0,1,5.16,7.24,41.71,41.71,0,0,0-3.3,10.12,28.34,28.34,0,0,0-9.47-15.42L127.43.27Zm14,7.24A33.69,33.69,0,0,1,150.45.27h9.84l-2.24,1.94a28.38,28.38,0,0,0-9.46,15.42,63.36,63.36,0,0,0-1.41,14.86h-6.64c0-8.36.73-15.54,3.32-21.91a31.67,31.67,0,0,1,1.43-3.07Z"
      fill="#3DEDA4"
      fillRule="evenodd"
    />
  </svg>
);

interface SidebarProps {
  isMobileOpen: boolean;
  isCollapsed: boolean;
  onCloseMobile: () => void;
  activeContext: string;
  activePage: string;
  handleNavClick: (
    item: string,
    isSubMenu?: boolean,
    parentModule?: string | null,
  ) => void;
}

export function Sidebar({
  isMobileOpen,
  isCollapsed,
  onCloseMobile,
  activeContext,
  activePage,
  handleNavClick,
}: SidebarProps) {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof document !== "undefined") {
      setIsDark(document.documentElement.classList.contains("dark"));
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === "class") {
            setIsDark(document.documentElement.classList.contains("dark"));
          }
        });
      });
      observer.observe(document.documentElement, { attributes: true });
      return () => observer.disconnect();
    }
  }, []);

  return (
    <div
      className={`fixed inset-y-0 h-full left-0 z-30 md:relative w-[280px] flex-shrink-0 flex flex-col border-r border-border bg-surface shadow-sm transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
        isMobileOpen
          ? "translate-x-0"
          : isCollapsed
            ? "-translate-x-full"
            : "-translate-x-full md:translate-x-0"
      }`}
    >
      <div
        className={`relative z-20 flex items-start justify-between py-5 md:py-6 px-6 md:px-8 border-b ${
          mounted && isDark
            ? "border-border bg-transparent"
            : "border-primary bg-primary"
        }`}
      >
        <div className="flex flex-col items-start gap-2.5">
          <MoneySmartLogo className="h-4 md:h-[18px]" />

          <div className="relative">
            <AdminRoleDropdown />
          </div>
        </div>
        <button
          onClick={onCloseMobile}
          className={`md:hidden w-8 h-8 rounded-full shadow-sm flex items-center justify-center transition-colors ${
            mounted && isDark
              ? "bg-panel text-foreground"
              : "bg-white/10 hover:bg-white/20 text-white"
          }`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div
        className={`p-5 md:p-6 relative z-10 ${isCollapsed ? "md:hidden" : ""}`}
      >
        <WorkspaceDropdown
          activeContext={activeContext}
          handleNavClick={handleNavClick}
          onCloseMobile={onCloseMobile}
        />
      </div>

      <div
        className={`flex-1 overflow-y-auto px-4 md:px-5 py-2 custom-scrollbar pb-8 ${isCollapsed ? "md:hidden" : ""}`}
      >
        {SG_MODULES.includes(activeContext) ? (
          <div>
            <div className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground font-bold mb-3 px-2 mt-4 md:mt-0">
              SUB-MODULES ({activeContext.split(" ")[0]})
            </div>
            <ul className="space-y-1.5">
              {SUB_MENU_ITEMS.map((item, idx) => {
                const isActive = item === activePage;
                return (
                  <li key={idx}>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item, true, activeContext);
                        onCloseMobile();
                      }}
                      className={`flex items-center justify-between px-4 md:px-5 py-3 md:py-3.5 rounded-2xl text-sm font-medium transition-all duration-300 cursor-pointer ${
                        isActive
                          ? "bg-primary text-white dark:bg-primary/40 dark:text-accent dark:border dark:border-accent/20"
                          : "text-muted-foreground hover:bg-hover hover:text-foreground"
                      }`}
                    >
                      {item}{" "}
                      {isActive && (
                        <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <div className="mt-8 px-4 text-center text-muted-foreground text-xs font-light">
            Select a module from the workspace dropdown to access deep
            configurations.
          </div>
        )}
      </div>
    </div>
  );
}
