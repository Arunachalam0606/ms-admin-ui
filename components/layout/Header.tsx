"use client";

import { Menu, PanelLeft, PanelLeftClose, ChevronRight } from "lucide-react";
import { UserDropdownMenu } from "./UserDropdownMenu";

interface HeaderProps {
  onOpenMobileSidebar: () => void;
  onCloseMobileSidebar: () => void;
  onToggleSidebar: () => void;
  isSidebarCollapsed: boolean;
  isMobileMenuOpen: boolean;
  activeContext: string;
  activePage: string;
}

export function Header({
  onOpenMobileSidebar,
  onToggleSidebar,
  isSidebarCollapsed,
  activeContext,
  activePage,
}: HeaderProps) {
  return (
    <div className="h-14 flex items-center justify-between flex-shrink-0 z-20 px-1 gap-4">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* ── MOBILE: hamburger only, no breadcrumb (matches overall.tsx) ── */}
        <button
          onClick={onOpenMobileSidebar}
          className="md:hidden w-10 h-10 flex-shrink-0 flex items-center justify-center bg-surface border border-border rounded-full text-foreground shadow-sm hover:bg-hover transition-colors cursor-pointer"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* ── collapse toggle  ── */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Desktop sidebar collapse/expand toggle */}
          <button
            onClick={onToggleSidebar}
            className="hidden md:flex w-9 h-9 flex-shrink-0 flex items-center justify-center bg-surface border border-border rounded-full text-muted-foreground shadow-sm hover:bg-hover hover:text-foreground transition-colors cursor-pointer"
            aria-label={
              isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
            }
          >
            {isSidebarCollapsed ? (
              <PanelLeft className="w-4 h-4" />
            ) : (
              <PanelLeftClose className="w-4 h-4" />
            )}
          </button>

          {/* Desktop breadcrumb */}
          <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium min-w-0 overflow-x-scroll">
            <span className="truncate max-w-[150px] opacity-70">
              {activeContext}
            </span>
            <ChevronRight className="w-3.5 h-3.5 opacity-50 flex-shrink-0" />
            <span className="text-foreground opacity-100 truncate">
              {activePage}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
        <UserDropdownMenu />
      </div>
    </div>
  );
}
