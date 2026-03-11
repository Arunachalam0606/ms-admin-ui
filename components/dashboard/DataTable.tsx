"use client";

import { GripVertical, Edit2, Trash2, ArrowUpDown } from "lucide-react";

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  isDefault: boolean;
}

interface DataTableProps {
  categories: Category[];
  isReorderMode: boolean;
  onDragStart: (index: number, e: React.DragEvent) => void;
  onDragEnter: (index: number) => void;
  onDragEnd: (e: React.DragEvent) => void;
  onEdit: (cat: Category) => void;
  onDelete: (cat: Category) => void;
}

export function DataTable({
  categories,
  isReorderMode,
  onDragStart,
  onDragEnter,
  onDragEnd,
  onEdit,
  onDelete,
}: DataTableProps) {
  return (
    <div className="flex-1 pb-16">
      <div
        className="hidden md:flex items-center justify-between text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-medium pb-4 border-b border-border"
      >
        <div className="w-[30%] pl-4 flex items-center gap-2">
          {isReorderMode && <div className="w-5"></div>} Name & Slug
        </div>
        <div className="w-[50%]">Description</div>
        <div className="w-[20%] text-right pr-4">Actions</div>
      </div>

      <div className="flex flex-col relative pt-2 gap-3 md:gap-0">
        {categories.map((category, index) => (
          <div
            key={category.id}
            draggable={isReorderMode}
            onDragStart={(e) => {
              onDragStart(index, e);
              e.currentTarget.classList.add("opacity-50", "scale-[0.98]");
            }}
            onDragEnter={() => onDragEnter(index)}
            onDragEnd={(e) => {
              e.currentTarget.classList.remove("opacity-50", "scale-[0.98]");
              onDragEnd(e);
            }}
            onDragOver={(e) => e.preventDefault()}
            className={`flex flex-col md:flex-row md:items-start py-4 md:py-5 border md:border-b md:border-x-0 md:border-t-0 border-border hover:bg-hover transition-all duration-300 md:-mx-4 md:px-4 p-4 md:p-0 rounded-[1rem] md:rounded-2xl bg-surface md:bg-transparent shadow-sm md:shadow-none group ${
              isReorderMode
                ? "cursor-grab active:cursor-grabbing hover:-translate-y-0 hover:shadow-none"
                : ""
            }`}
          >
            <div className="w-full md:w-[30%] md:pl-2 flex flex-col gap-2 relative mb-2 md:mb-0">
              {isReorderMode && (
                <div
                  className="absolute -left-1 md:-left-3 top-0 md:top-1 text-muted-foreground cursor-grab bg-surface p-1 rounded"
                >
                  <GripVertical className="w-4 h-4 md:w-5 md:h-5" />
                </div>
              )}
              <div
                className={`flex items-center gap-3 ${isReorderMode ? "ml-6 md:ml-4" : ""}`}
              >
                <span
                  className="font-serif text-lg transition-colors text-foreground group-hover:text-[#EA2F5D] dark:group-hover:text-accent"
                >
                  {category.name}
                </span>
              </div>
              <div
                className={`flex items-center gap-2 mt-0.5 ${isReorderMode ? "ml-6 md:ml-4" : ""}`}
              >
                <span
                  className="font-sans text-[11px] md:text-[12px] tracking-wide text-muted-foreground"
                >
                  {category.slug}
                </span>
                {category.isDefault && (
                  <span
                    className="inline-flex items-center px-2 py-[2px] rounded-[4px] text-[8px] md:text-[9px] font-bold uppercase tracking-widest ml-1 shadow-sm bg-primary text-white dark:bg-primary/60 dark:text-accent"
                  >
                    Default
                  </span>
                )}
              </div>
            </div>
            <div className="w-full md:w-[50%] md:pr-8 mb-4 md:mb-0">
              <p
                className="text-[12px] md:text-[13px] leading-relaxed font-light text-muted-foreground"
              >
                {category.description}
              </p>
            </div>
            <div
              className="w-full md:w-[20%] flex justify-end items-center md:items-start gap-2 md:pr-2 border-t md:border-0 pt-3 md:pt-0 border-border"
            >
              <button
                disabled={isReorderMode}
                onClick={() => onEdit(category)}
                className={`inline-flex items-center justify-center gap-2 px-3 py-1.5 md:p-0 md:w-9 md:h-9 rounded-full transition-all duration-300 cursor-pointer ${
                  isReorderMode
                    ? "opacity-50 cursor-not-allowed"
                    : "bg-panel md:bg-transparent text-foreground hover:scale-105 hover:bg-hover"
                }`}
              >
                <Edit2
                  className="w-[14px] h-[14px] md:w-[16px] md:h-[16px]"
                  strokeWidth={1.5}
                />
                <span className="text-xs font-medium md:hidden">Edit</span>
              </button>
              <button
                disabled={isReorderMode}
                onClick={() => onDelete(category)}
                className={`inline-flex items-center justify-center gap-2 px-3 py-1.5 md:p-0 md:w-9 md:h-9 rounded-full transition-all duration-300 cursor-pointer ${
                  isReorderMode
                    ? "opacity-50 cursor-not-allowed"
                    : "bg-panel md:bg-transparent text-muted-foreground hover:text-[#EA2F5D] dark:hover:text-[#EA2F5D] hover:bg-[#EA2F5D]/10 hover:scale-105"
                }`}
              >
                <Trash2
                  className="w-[14px] h-[14px] md:w-[16px] md:h-[16px]"
                  strokeWidth={1.5}
                />
                <span className="text-[12px] font-medium md:hidden">Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
