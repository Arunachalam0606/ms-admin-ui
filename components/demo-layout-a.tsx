"use client";

import React from "react";
import {
  Home,
  PieChart,
  Users,
  Settings,
  FolderOpen,
  FileText,
} from "lucide-react";
import LayoutA, { NavItemType, UserProfile } from "./layout-a";

export default function DemoLayoutA() {
  // --- Mock Data ---
  const MOCK_USER: UserProfile = {
    name: "Eleanor Pena",
    email: "eleanor@example.io",
    avatarUrl: "https://i.pravatar.cc/150?u=eleanor",
  };

  const MOCK_NAV_ITEMS: NavItemType[] = [
    { id: "home", title: "Overview", icon: Home, isActive: true },
    {
      id: "analytics",
      title: "Analytics",
      icon: PieChart,
      children: [
        { id: "reports", title: "Monthly Reports" },
        { id: "performance", title: "Performance" },
      ],
    },
    {
      id: "audience",
      title: "Audience",
      icon: Users,
      children: [
        { id: "subscribers", title: "Subscribers" },
        { id: "demographics", title: "Demographics" },
      ],
    },
    {
      id: "content",
      title: "Content",
      icon: FolderOpen,
      children: [
        { id: "drafts", title: "Drafts", icon: FileText },
        { id: "published", title: "Published", icon: FileText },
      ],
    },
    { id: "settings", title: "Settings", icon: Settings },
  ];

  return (
    <LayoutA
      companyName="MoneySmart"
      userProfile={MOCK_USER}
      navItems={MOCK_NAV_ITEMS}
    >
      <div className="space-y-2">
        <h1 className="font-serif text-4xl text-[#111111] tracking-tight">
          Good morning, {MOCK_USER.name.split(' ')[0]}
        </h1>
        <p className="text-[#8C8A84]">
          Here&apos;s what&apos;s happening with your portfolio today.
        </p>
      </div>

      {/* Analytics Skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="h-40 rounded-3xl bg-white border border-[#EAE8E3]/60 shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-6 flex flex-col justify-between">
          <div className="w-8 h-8 rounded-full bg-orange-50/50 flex items-center justify-center">
            <PieChart size={16} className="text-orange-500" />
          </div>
          <div>
            <h3 className="text-[13px] text-[#8C8A84] font-medium mb-1">
              Total Balance
            </h3>
            <p className="font-serif text-2xl text-[#111111]">$142,390.00</p>
          </div>
        </div>
        <div className="h-40 rounded-3xl bg-white border border-[#EAE8E3]/60 shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-6 flex flex-col justify-between">
          <div className="w-8 h-8 rounded-full bg-blue-50/50 flex items-center justify-center">
            <Users size={16} className="text-blue-500" />
          </div>
          <div>
            <h3 className="text-[13px] text-[#8C8A84] font-medium mb-1">
              Active Subscribers
            </h3>
            <p className="font-serif text-2xl text-[#111111]">12,543</p>
          </div>
        </div>
        <div className="h-40 rounded-3xl bg-[#111111] rounded-tl-[1rem] shadow-[0_10px_30px_rgba(0,0,0,0.1)] p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute right-0 top-0 w-32 h-32 bg-[#B4C6FF]/20 rounded-full blur-2xl translate-x-10 -translate-y-10" />
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            <FileText size={16} className="text-white" />
          </div>
          <div>
            <h3 className="text-[13px] text-[#8C8A84] font-medium mb-1">
              New Content
            </h3>
            <p className="font-serif text-2xl text-[#FDFCFB]">8 Drafts</p>
          </div>
        </div>
      </div>

      {/* Detailed Activity List */}
      <div className="min-h-[500px] rounded-3xl bg-white border border-[#EAE8E3]/60 shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-serif text-xl text-[#111111]">
            Recent Activity
          </h2>
          <button className="text-[13px] font-medium text-[#111111] hover:underline">
            View All
          </button>
        </div>
        <div className="space-y-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="flex items-center gap-4 pb-6 border-b border-[#EAE8E3]/40 last:border-0 last:pb-0"
            >
              <div className="w-10 h-10 rounded-full bg-[#FAFAFA] border border-[#EAE8E3] flex items-center justify-center shrink-0">
                <span className="text-[11px] font-medium text-[#8C8A84] uppercase">
                  T{i}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-[14px] text-[#111111] font-medium mb-0.5">
                  Transaction process completed
                </p>
                <p className="text-[13px] text-[#8C8A84]">
                  Via Stripe • {i * 2} mins ago
                </p>
              </div>
              <div className="text-right">
                <p className="text-[14px] text-[#111111] font-medium font-serif">
                  +${(i * 145.2).toFixed(2)}
                </p>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-medium">
                  Success
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </LayoutA>
  );
}
