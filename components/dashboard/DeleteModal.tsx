"use client";

import { Trash2 } from "lucide-react";
import { Category } from "./DataTable";

interface DeleteModalProps {
  isOpen: boolean;
  category: Category | null;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteModal({
  isOpen,
  category,
  onClose,
  onConfirm,
}: DeleteModalProps) {
  return (
    <div
      className={`fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6 transition-all duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className="absolute inset-0 bg-[#111111]/60 dark:bg-[#000000]/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      <div
        className={`relative z-[90] w-full max-w-[420px] bg-surface border border-border rounded-[2rem] shadow-[0_20px_80px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_80px_rgba(0,0,0,0.6)] p-6 sm:p-8 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] flex flex-col items-center text-center ${
          isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-8"
        }`}
      >
        <div className="w-16 h-16 rounded-full bg-[#EA2F5D]/10 flex items-center justify-center mb-6">
          <Trash2 className="w-8 h-8 text-[#EA2F5D]" strokeWidth={1.5} />
        </div>

        <h3 className="text-2xl md:text-3xl font-serif text-foreground mb-2">
          Delete Category
        </h3>

        <p className="text-[14px] md:text-[15px] text-muted-foreground mb-8 leading-relaxed">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-[#EA2F5D]">
            &quot;{category?.name}&quot;
          </span>
          ? This action cannot be undone.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
          <button
            onClick={onClose}
            className="flex-1 w-full py-3.5 rounded-full font-medium text-[13px] md:text-[14px] bg-[#F4F7F9] hover:bg-[#EAEFF4] dark:bg-[#1E293B] dark:hover:bg-[#334155] transition-colors text-foreground"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 w-full py-3.5 rounded-full font-medium text-[13px] md:text-[14px] text-white bg-[#EA2F5D] hover:bg-[#D42A55] shadow-[0_4px_14px_rgba(234,47,93,0.25)] hover:shadow-[0_6px_20px_rgba(234,47,93,0.3)] hover:-translate-y-0.5 transition-all duration-300 dark:shadow-none"
          >
            Delete Category
          </button>
        </div>
      </div>
    </div>
  );
}
