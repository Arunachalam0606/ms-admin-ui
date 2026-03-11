"use client";

import { useState, useRef } from "react";
import { Search, Plus, ArrowUpDown, Check } from "lucide-react";
import { AppLayout } from "./layout/AppLayout";
import { DataTable, Category } from "./dashboard/DataTable";
import { CreateDrawer } from "./dashboard/CreateDrawer";
import { DeleteModal } from "./dashboard/DeleteModal";

// EXACT layout G mock data
const INITIAL_CATEGORIES: Category[] = [
  {
    id: 1,
    name: "Broadband",
    slug: "broadband",
    description: "High-speed internet plans for home and business use.",
    isDefault: true,
  },
  {
    id: 2,
    name: "Cancer insurance",
    slug: "cancer-insurance",
    description: "Specialized insurance coverage for cancer treatment and care.",
    isDefault: false,
  },
  {
    id: 3,
    name: "Car loan",
    slug: "car-loan",
    description: "Financing options for new and used vehicles.",
    isDefault: false,
  },
  {
    id: 4,
    name: "Credit cards",
    slug: "credit-cards",
    description: "Various credit card options including rewards and cashback.",
    isDefault: false,
  },
  {
    id: 5,
    name: "Crypto",
    slug: "crypto",
    description: "Cryptocurrency exchanges, wallets, and trading platforms.",
    isDefault: false,
  },
];

export default function DemoLayoutG() {
  const [activePage, setActivePage] = useState("Categories");
  const [activeContext, setActiveContext] = useState("SG - Broadband");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Categories View State
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [searchTerm, setSearchTerm] = useState("");
  const [isReorderMode, setIsReorderMode] = useState(false);

  // Modals state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const handleNavClick = (
    item: string,
    isSubMenu = false,
    parentModule: string | null = null
  ) => {
    if (isSubMenu) {
      setActivePage(item);
      if (parentModule) setActiveContext(parentModule);
    } else {
      setActiveContext(item);
      setActivePage(""); // Clear active sub-page when module changes
    }
  };

  const handleDragStart = (index: number, e: React.DragEvent) => {
    dragItem.current = index;
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/html", e.currentTarget.innerHTML);
    }
  };

  const handleDragEnter = (index: number) => {
    dragOverItem.current = index;
  };

  const handleDragEnd = () => {
    if (dragItem.current !== null && dragOverItem.current !== null) {
      const newItems = [...categories];
      const draggedItemContent = newItems[dragItem.current];
      newItems.splice(dragItem.current, 1);
      newItems.splice(dragOverItem.current, 0, draggedItemContent);
      dragItem.current = null;
      dragOverItem.current = null;
      setCategories(newItems);
    }
  };

  const confirmDelete = () => {
    if (categoryToDelete) {
      setCategories(categories.filter((c) => c.id !== categoryToDelete.id));
      setDeleteModalOpen(false);
      setCategoryToDelete(null);
    }
  };

  // Filter categories based on search
  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <AppLayout
        activeContext={activeContext}
        activePage={activePage}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        handleNavClick={handleNavClick}
      >
        <div className="flex flex-col h-full relative">
          {activePage === "" ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-12 text-center h-full min-h-[400px]">
              <div className="w-16 md:w-20 h-16 md:w-20 rounded-full bg-primary/10 dark:bg-accent/10 flex items-center justify-center mb-6">
                <Search className="w-8 md:w-10 h-8 md:w-10 text-primary dark:text-accent opacity-80" strokeWidth={1.5} />
              </div>
              <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-3">
                Select a Sub-Module
              </h2>
              <p className="text-[14px] md:text-[15px] text-muted-foreground font-light max-w-sm mb-8">
                Choose a configuration view from the sidebar to manage {activeContext.split(" ")[0]} settings and content.
              </p>
            </div>
          ) : (
            <>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 mb-6 md:mb-10 z-10 shrink-0">
                <div>
                  <h1 className="text-4xl md:text-5xl lg:text-[56px] font-serif text-foreground mb-3 leading-none tracking-tight">
                    {activePage}.
                  </h1>
                  <p className="text-muted-foreground text-[14px] md:text-[15px] font-light max-w-xl">
                    Manage and organize the hierarchical taxonomy for {activeContext}.
                  </p>
                </div>

                <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto">
                  <button
                    onClick={() => setIsReorderMode(!isReorderMode)}
                    className={`flex-1 sm:flex-none justify-center flex items-center gap-2 px-4 md:px-5 py-3 rounded-full transition-all text-[12px] md:text-[13px] font-medium ${
                      isReorderMode
                        ? "bg-[#E2E8FF] text-[#4A5D96] border border-[#B4C6FF] dark:bg-[#1E2642] dark:text-[#82A0F5] dark:border-[#82A0F5]"
                        : "bg-transparent border border-border text-foreground hover:bg-[#F4F3F0] dark:hover:bg-[#1F222A]"
                    }`}
                  >
                    {isReorderMode ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <ArrowUpDown className="w-4 h-4" />
                    )}{" "}
                    <span className="hidden sm:inline">
                      {isReorderMode ? "Save order" : "Reorder"}
                    </span>
                  </button>

                  <button
                    disabled={isReorderMode}
                    onClick={() => setIsDrawerOpen(true)}
                    className={`flex-1 sm:flex-none justify-center flex items-center gap-2 px-4 md:px-6 py-3 rounded-full transition-all text-[12px] md:text-[13px] font-medium hover:-translate-y-0.5 ${
                      isReorderMode
                        ? "opacity-50 cursor-not-allowed bg-[#EA2F5D] text-white"
                        : "bg-[#EA2F5D] text-white hover:bg-[#D42A55] shadow-[0_4px_14px_rgba(234,47,93,0.25)] dark:shadow-none"
                    }`}
                  >
                    <Plus className="w-4 h-4" /> Create new
                  </button>
                </div>
              </div>

              <div className="w-full md:max-w-lg relative group mb-6">
                <Search
                  className="w-4 h-4 absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-[#A8A6A1] dark:text-[#64748B] transition-colors"
                />
                <input
                  type="text"
                  disabled={isReorderMode}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 md:pl-12 pr-4 md:pr-12 py-3.5 md:py-4 bg-[#FFFFFF] dark:bg-[#13151A] border border-[#EBEAE5] dark:border-[#334155] rounded-2xl focus:outline-none focus:ring-1 focus:ring-[#1E1D1B] dark:focus:ring-[#FDFCFB] transition-all text-[13px] md:text-[14px] shadow-sm dark:shadow-none placeholder:text-[#A8A6A1] dark:placeholder:text-[#64748B] placeholder:italic text-[#1E1D1B] dark:text-[#FDFCFB] focus:ring-[#18324C] dark:focus:ring-[#3DEDA4]/50 dark:focus:border-[#3DEDA4]/50 ${
                    isReorderMode ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  placeholder="Search categories..."
                />
              </div>

              <DataTable
                categories={filteredCategories}
                isReorderMode={isReorderMode}
                onDragStart={handleDragStart}
                onDragEnter={handleDragEnter}
                onDragEnd={handleDragEnd}
                onEdit={() => setIsDrawerOpen(true)}
                onDelete={(cat) => {
                  setCategoryToDelete(cat);
                  setDeleteModalOpen(true);
                }}
              />
            </>
          )}
        </div>
      </AppLayout>

      <CreateDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />

      <DeleteModal
        isOpen={deleteModalOpen}
        category={categoryToDelete}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
}
