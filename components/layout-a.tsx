"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronRight, Menu, Search, Bell } from "lucide-react";
import Image from "next/image";

// --- Types ---
export type NavItemType = {
  id: string;
  title: string;
  icon?: React.ElementType;
  children?: NavItemType[];
  isActive?: boolean;
};

export type UserProfile = {
  name: string;
  email: string;
  avatarUrl: string;
};

export type LayoutAProps = {
  companyName?: string;
  userProfile: UserProfile;
  navItems: NavItemType[];
  children?: React.ReactNode;
  headerRight?: React.ReactNode;
};

// --- Subcomponents ---
const NavItem = ({
  item,
  depth = 0,
  isSidebarOpen,
}: {
  item: NavItemType;
  depth?: number;
  isSidebarOpen: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const Icon = item.icon;
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div className="flex flex-col">
      <button
        onClick={() => hasChildren && setIsOpen(!isOpen)}
        className={`group flex items-center justify-between py-2.5 px-3 mb-1 rounded-xl transition-all duration-200 cursor-pointer w-full
          ${item.isActive ? "bg-[#1E1D1B] text-white font-medium shadow-sm" : "text-[#8C8A84] hover:bg-[#1A1A1A] hover:text-[#D4D3CD]"}
        `}
        style={{ paddingLeft: isSidebarOpen ? `${depth * 16 + 12}px` : "12px" }}
        title={!isSidebarOpen ? item.title : undefined}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          {Icon && (
            <Icon
              size={18}
              strokeWidth={item.isActive ? 2.5 : 2}
              className={`min-w-[18px] transition-colors ${item.isActive ? "text-white" : "text-[#8C8A84] group-hover:text-[#D4D3CD]"}`}
            />
          )}
          {isSidebarOpen && (
            <span className="truncate text-[13px] tracking-wide">
              {item.title}
            </span>
          )}
        </div>
        {isSidebarOpen && hasChildren && (
          <div className="ml-2">
            {isOpen ? (
              <ChevronDown size={14} className="text-[#66645E]" />
            ) : (
              <ChevronRight size={14} className="text-[#66645E]" />
            )}
          </div>
        )}
      </button>

      {/* Children Dropdown */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${isOpen && isSidebarOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          {item.children?.map((child) => (
            <NavItem
              key={child.id}
              item={child}
              depth={depth + 1}
              isSidebarOpen={isSidebarOpen}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const DefaultHeaderRight = ({
  userProfile,
}: {
  userProfile: UserProfile;
}) => (
  <div className="flex items-center gap-5">
    <button className="relative p-2 rounded-full hover:bg-black/5 text-[#8C8A84] hover:text-[#111111] transition-colors">
      <Search size={18} />
    </button>
    <button className="relative p-2 rounded-full hover:bg-black/5 text-[#8C8A84] hover:text-[#111111] transition-colors">
      <Bell size={18} />
      <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-[#B4C6FF] rounded-full border border-white" />
    </button>
    <div className="w-10 h-10 rounded-full border border-[#EAE8E3] overflow-hidden ml-2 ring-2 ring-white shadow-sm cursor-pointer relative">
      <Image
        src={userProfile.avatarUrl}
        alt="User avatar"
        fill
        className="object-cover"
      />
    </div>
  </div>
);

export default function LayoutA({
  companyName = "Company Name",
  userProfile,
  navItems,
  children,
  headerRight,
}: LayoutAProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="h-screen w-screen flex bg-[#111111] overflow-hidden font-sans selection:bg-[#B4C6FF]/30">
      {/* --- LEFT SIDEBAR --- */}
      <aside
        className={`flex flex-col transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
          isSidebarOpen ? "w-[280px]" : "w-[80px]"
        }`}
      >
        {/* Logo Area */}
        <div className="h-20 flex items-center shrink-0 px-6 border-b border-[#222222]/50">
          <div className="flex items-center gap-3 w-full">
            <div className="w-8 h-8 rounded-full bg-[#1E1D1B] border border-[#2A2A2A] flex items-center justify-center shrink-0 shadow-inner">
              <div className="w-2 h-2 rounded-full bg-[#B4C6FF] shadow-[0_0_8px_rgba(180,198,255,0.6)]" />
            </div>
            <div
              className={`flex-1 overflow-hidden transition-all duration-300 ${isSidebarOpen ? "opacity-100 w-auto" : "opacity-0 w-0"}`}
            >
              <h1 className="font-serif text-[#FDFCFB] text-xl tracking-wide select-none truncate">
                {companyName}
              </h1>
            </div>
          </div>
        </div>

        {/* Navigation Wrapper with ultra-thin scrollbar */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-8 [&::-webkit-scrollbar]:w-[2px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#333] [&::-webkit-scrollbar-thumb]:rounded-full">
          <div>
            <div
              className={`px-3 mb-4 transition-all duration-300 ${isSidebarOpen ? "opacity-100 h-auto" : "opacity-0 h-0 overflow-hidden mb-0"}`}
            >
              <h2 className="text-[9px] tracking-[0.2em] uppercase text-[#66645E] font-semibold">
                Main Menu
              </h2>
            </div>
            <div className="space-y-1">
              {navItems?.map((item) => (
                <NavItem
                  key={item.id}
                  item={item}
                  isSidebarOpen={isSidebarOpen}
                />
              ))}
            </div>
          </div>
        </div>

        {/* User Profile / Footer line */}
        <div className="p-4 border-t border-[#222222]/50">
          <button className="flex items-center gap-3 w-full p-2 rounded-xl text-[#8C8A84] hover:bg-[#1A1A1A] hover:text-white transition-colors">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#333] to-[#111] border border-[#333] shrink-0 overflow-hidden relative">
              <Image
                src={userProfile.avatarUrl}
                alt="Profile mini"
                fill
                className="object-cover opacity-50 block mix-blend-luminosity hover:opacity-100"
              />
            </div>
            {isSidebarOpen && (
              <div className="flex flex-col items-start truncate overflow-hidden">
                <span className="text-[13px] text-[#FDFCFB] font-medium">
                  {userProfile.name}
                </span>
                <span className="text-[11px] text-[#66645E] truncate w-full text-left">
                  {userProfile.email}
                </span>
              </div>
            )}
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT (RIGHT) --- */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#FDFCFB] rounded-l-[2.5rem] shadow-[-10px_0_40px_rgba(0,0,0,0.5)] overflow-hidden relative transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
        {/* Soft, blurred radial gradient overlay */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-[#FFF3E6]/40 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

        {/* Top Navigation Bar */}
        <header className="h-20 shrink-0 border-b border-[#EAE8E3]/60 flex flex-row items-center justify-between px-8 bg-white/50 backdrop-blur-xl z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-full hover:bg-black/5 text-neutral-500 transition-colors"
            >
              <Menu size={18} />
            </button>

            <div className="h-4 w-px bg-[#EAE8E3]" />

            <nav className="flex items-center gap-2 text-[13px]">
              <span className="text-[#8C8A84] hover:text-[#111111] cursor-pointer transition-colors">
                Overview
              </span>
              <ChevronRight size={14} className="text-[#C8C6C1]" />
              <span className="text-[#111111] font-medium">Dashboard</span>
            </nav>
          </div>

          {headerRight || <DefaultHeaderRight userProfile={userProfile} />}
        </header>

        {/* Dynamic Content Area */}
        <div className="flex-1 overflow-y-auto p-10 [&::-webkit-scrollbar]:w-[3px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-neutral-200 [&::-webkit-scrollbar-thumb]:rounded-full z-10 relative">
          <div className="max-w-5xl mx-auto space-y-8">{children}</div>
        </div>
      </main>
    </div>
  );
}
