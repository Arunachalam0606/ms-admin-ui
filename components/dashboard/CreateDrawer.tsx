"use client";

import { X } from "lucide-react";

interface CreateDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isClientTheme?: boolean;
}

export function CreateDrawer({ isOpen, onClose }: CreateDrawerProps) {
  return (
    <div
      className={`fixed inset-0 z-[60] transition-all duration-500 ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <div
        className={`absolute inset-0 bg-[#111111]/40 dark:bg-[#000000]/60 backdrop-blur-sm md:backdrop-blur-md transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed z-[70] bg-surface text-foreground transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] flex flex-col bottom-0 left-0 right-0 h-[90vh] rounded-t-[2rem] border-t border-border shadow-[0_-20px_80px_rgba(0,0,0,0.15)] dark:shadow-[0_-20px_80px_rgba(0,0,0,0.4)] md:top-0 md:bottom-0 md:left-auto md:right-0 md:h-full md:w-[500px] md:rounded-none md:border-t-0 md:border-l md:shadow-[-20px_0_80px_rgba(0,0,0,0.15)] ${
          isOpen ? "translate-y-0 md:translate-x-0" : "translate-y-full md:translate-x-full md:translate-y-0"
        }`}
      >
        <div
          className="md:hidden flex items-center justify-center pt-4 pb-2"
          onClick={onClose}
        >
          <div className="w-12 h-1.5 border-border border-b-0 bg-current opacity-20 rounded-full"></div>
        </div>

        <div className="flex items-center justify-between px-6 md:px-12 py-4 md:py-10 border-b border-border">
          <h2 className="text-3xl md:text-4xl font-serif text-foreground">
            Create.
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full hover:bg-hover text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105 md:-mr-4"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 md:px-12 py-8 md:py-10 custom-scrollbar light-scrollbar flex flex-col gap-8 md:gap-10">
          <p className="text-muted-foreground text-[14px] md:text-[15px] font-light md:-mt-4 mb-2">
            Configure the details for your new system entity below.
          </p>
          <div className="flex flex-col gap-2.5 md:gap-3 group">
            <label className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground font-bold transition-colors group-focus-within:text-foreground">
              Name
            </label>
            <input
              type="text"
              className="w-full px-5 md:px-6 py-4 md:py-5 bg-panel border border-border rounded-2xl md:rounded-3xl focus:outline-none focus:ring-1 focus:ring-current transition-all text-[14px] md:text-[15px] shadow-sm dark:shadow-none text-foreground dark:focus:ring-accent/50"
              placeholder="e.g. Standard Chartered"
            />
          </div>
          <div className="flex flex-col gap-2.5 md:gap-3 group">
            <label className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground font-bold transition-colors group-focus-within:text-foreground">
              Description
            </label>
            <textarea
              rows={5}
              className="w-full px-5 md:px-6 py-4 md:py-5 bg-panel border border-border rounded-2xl md:rounded-3xl focus:outline-none focus:ring-1 focus:ring-current transition-all text-[14px] md:text-[15px] leading-relaxed resize-none shadow-sm dark:shadow-none text-foreground dark:focus:ring-accent/50"
              placeholder="Add descriptive details..."
            />
          </div>
        </div>

        <div className="p-6 md:p-10 border-t border-border flex flex-row items-center justify-end gap-3 md:gap-4 shadow-sm">
          <button
            onClick={onClose}
            className="px-6 md:px-8 py-3.5 md:py-4 rounded-full font-medium text-[13px] md:text-[14px] bg-[#F4F7F9] hover:bg-[#EAEFF4] dark:bg-[#1E293B] dark:hover:bg-[#334155] transition-colors w-full md:w-auto text-center text-foreground"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-8 md:px-10 py-3.5 md:py-4 rounded-full font-medium text-[13px] md:text-[14px] transition-all duration-300 w-full md:w-auto text-center bg-[#EA2F5D] text-white hover:bg-[#D42A55] shadow-[0_4px_14px_rgba(234,47,93,0.25)] dark:shadow-none"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
}
