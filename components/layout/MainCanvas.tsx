"use client";

import { ReactNode } from "react";

interface MainCanvasProps {
  children: ReactNode;
}

export function MainCanvas({ children }: MainCanvasProps) {
  return (
    <div className="flex-1 bg-surface rounded-[1.5rem] shadow-sm md:shadow-[0_8px_40px_rgba(0,0,0,0.06)] border border-border overflow-hidden flex flex-col relative z-10">
      <div className="flex-1 overflow-y-auto custom-scrollbar p-5 sm:p-8">
        <div className="max-w-[1200px] w-full mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
          {children}
        </div>
      </div>
    </div>
  );
}
