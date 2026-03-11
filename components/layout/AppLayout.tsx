"use client";

import { ReactNode, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface AppLayoutProps {
  children: ReactNode;
  activeContext: string;
  activePage: string;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  handleNavClick: (item: string, isSubMenu?: boolean, parentModule?: string | null) => void;
}

export function AppLayout({
  children,
  activeContext,
  activePage,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  handleNavClick,
}: AppLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-[100dvh] w-screen font-sans overflow-hidden bg-background text-foreground relative">
      {/* Global Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm z-20 md:hidden transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div
        className={`transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] flex-shrink-0 ${
          isSidebarCollapsed ? "md:w-0" : "md:w-[280px]"
        }`}
      >
        <Sidebar
          isMobileOpen={isMobileMenuOpen}
          isCollapsed={isSidebarCollapsed}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
          activeContext={activeContext}
          activePage={activePage}
          handleNavClick={handleNavClick}
        />
      </div>

      <div className="flex-1 flex flex-col h-full overflow-hidden relative z-10 p-4">
        <Header
          onOpenMobileSidebar={() => setIsMobileMenuOpen(true)}
          onCloseMobileSidebar={() => setIsMobileMenuOpen(false)}
          onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          isSidebarCollapsed={isSidebarCollapsed}
          isMobileMenuOpen={isMobileMenuOpen}
          activeContext={activeContext}
          activePage={activePage}
        />

        {/* The Compact Canvas */}
        <div className="flex-1 bg-surface rounded-3xl shadow-sm md:shadow-[0_8px_40px_rgba(0,0,0,0.06)] border border-border overflow-hidden flex flex-col relative z-10">
          <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
