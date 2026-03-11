import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  Plus,
  ArrowUpDown,
  ChevronDown,
  Edit2,
  Trash2,
  X,
  PanelLeftClose,
  PanelLeftOpen,
  GripVertical,
  ChevronRight,
  Check,
  LayoutTemplate,
  LogOut,
  User,
  LayoutDashboard,
  Box,
  Globe2,
  Layers,
  Activity,
  Zap,
  Layout,
  PanelLeft,
  Sun,
  Moon,
  Briefcase,
  Settings2,
} from "lucide-react";

// --- MOCK DATA ---
const topLevelNav = [
  "Dashboard",
  "Providers",
  "Interstitial Service",
  "Campaign Service",
];
const sgModules = [
  "SG - Broadband",
  "SG - Cancer insurance",
  "SG - Car loan",
  "SG - Credit cards",
  "SG - Crypto",
  "SG - Debt consolidation",
  "SG - Education loan",
  "SG - Fixed deposit",
];
const subMenuItems = [
  "Categories",
  "Products",
  "Promotions",
  "Sponsored Listings",
  "Recommended Products",
  "Feature Groups",
  "Settings",
];

const mockProviders = [
  {
    id: 1,
    name: "Standard Chartered",
    type: "Bank",
    status: "Active",
    color: "bg-[#B4C6FF] dark:bg-[#1E293B]",
  },
  {
    id: 2,
    name: "Citibank Singapore",
    type: "Bank",
    status: "Active",
    color: "bg-[#FFD1B4] dark:bg-[#332115]",
  },
  {
    id: 3,
    name: "DBS Bank",
    type: "Bank",
    status: "Maintenance",
    color: "bg-[#EAE8E3] dark:bg-[#1E293B]",
  },
  {
    id: 4,
    name: "HSBC",
    type: "Bank",
    status: "Active",
    color: "bg-[#C4F0D5] dark:bg-[#143321]",
  },
  {
    id: 5,
    name: "UOB",
    type: "Bank",
    status: "Active",
    color: "bg-[#F4D1EE] dark:bg-[#331C2D]",
  },
  {
    id: 6,
    name: "American Express",
    type: "Credit",
    status: "Active",
    color: "bg-[#B4E5FF] dark:bg-[#1A2E3D]",
  },
];

const mockCampaigns = [
  {
    id: 1,
    name: "Q4 Mega Cashback 2024",
    status: "Live",
    type: "Credit Cards",
    reach: "124.5k",
  },
  {
    id: 2,
    name: "Travel Insurance Promo",
    status: "Scheduled",
    type: "Insurance",
    reach: "Est. 50k",
  },
  {
    id: 3,
    name: "New User Sign-up Bonus",
    status: "Live",
    type: "Global",
    reach: "89.2k",
  },
];

// --- OFFICIAL LOGO COMPONENT ---
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

// --- MAIN APPLICATION ---
export default function App() {
  // Global State
  const [layout, setLayout] = useState("G"); // Defaulted to Layout G per request
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activePage, setActivePage] = useState("Categories");
  const [activeContext, setActiveContext] = useState("SG - Broadband");

  // UI State
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState(["SG - Broadband"]);
  const [isContextSelectorOpen, setIsContextSelectorOpen] = useState(false);

  // Role Admin Switcher State (For Layout G)
  const [activeRole, setActiveRole] = useState("Product Service Admin");
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  // Categories Specific State
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "All credit cards",
      slug: "best-credit-cards",
      description:
        "Compare all available credit cards in Singapore based on what you can get out of your spending.",
      isDefault: true,
    },
    {
      id: 2,
      name: "Overseas Spending",
      slug: "overseas-spending",
      description:
        "Save up to 10% or earn 5 Miles for every dollar spent on your overseas traveling expenses.",
      isDefault: false,
    },
    {
      id: 3,
      name: "Air Miles",
      slug: "air-miles",
      description:
        "If you love to travel, a good air miles credit card is a must-have. Compare and apply to earn miles.",
      isDefault: false,
    },
    {
      id: 4,
      name: "No Annual Fee",
      slug: "no-annual-fee",
      description:
        "Choosing a card with no annual fee does not mean you cannot enjoy the perks that come with owning a credit card.",
      isDefault: false,
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isReorderMode, setIsReorderMode] = useState(false);
  const dragItem = useRef();
  const dragOverItem = useRef();

  // Delete Action State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const isClientTheme = layout === "E" || layout === "F" || layout === "G";

  // --- DESIGN TOKENS (PIXEL PERFECT CALIBRATION) ---
  const tokens = {
    bgCanvas: isClientTheme
      ? "bg-[#F4F7F9] dark:bg-[#090A0E]"
      : "bg-[#F0EEE9] dark:bg-[#090A0E]",
    bgSurface: isClientTheme
      ? "bg-white dark:bg-[#13151A]"
      : "bg-[#FDFCFB] dark:bg-[#13151A]",
    bgPanel: isClientTheme
      ? "bg-[#F8FAFC] dark:bg-[#181A20]"
      : "bg-[#F8F7F4] dark:bg-[#181A20]",
    bgHover: isClientTheme
      ? "hover:bg-[#F1F5F9] dark:hover:bg-[#1A202C]"
      : "hover:bg-[#F4F3F0] dark:hover:bg-[#1F222A]",
    borderMain: isClientTheme
      ? "border-[#E2E8F0] dark:border-[#2A2E39]"
      : "border-[#EAE8E3] dark:border-[#2A2E39]",
    textPrimary: isClientTheme
      ? "text-[#333333] dark:text-[#FDFCFB]"
      : "text-[#1E1D1B] dark:text-[#FDFCFB]",
    textSecondary: isClientTheme
      ? "text-[#64748B] dark:text-[#A3C1E2]"
      : "text-[#8C8A84] dark:text-[#A8A6A1]",
    textTertiary: isClientTheme
      ? "text-[#94A3B8] dark:text-[#6A8CAF]"
      : "text-[#A8A6A1] dark:text-[#6B6964]",
    btnPrimary: isClientTheme
      ? "bg-[#EA2F5D] text-white hover:bg-[#D42A55] shadow-[0_4px_14px_rgba(234,47,93,0.25)] dark:shadow-none"
      : "bg-[#1E1D1B] text-[#FDFCFB] dark:bg-[#FDFCFB] dark:text-[#1E1D1B] hover:bg-[#33312E] dark:hover:bg-[#EAE8E3] shadow-[0_4px_14px_rgba(0,0,0,0.15)]",
    activeItem: isClientTheme
      ? "bg-[#18324C] text-white dark:bg-[#18324C]/40 dark:text-[#3DEDA4] dark:border dark:border-[#3DEDA4]/20"
      : "bg-[#1E1D1B] text-[#FDFCFB] dark:bg-[#FDFCFB] dark:text-[#1E1D1B]",
    blobGradient: isClientTheme
      ? "from-[#F4F7F9]/80 dark:from-[#18324C]/30 dark:to-transparent to-transparent"
      : "from-[#FFF3E6]/60 dark:from-[#B4C6FF]/5 to-[#E2E8FF]/20 dark:to-transparent",
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [activePage, layout]);

  const handleNavClick = (item, isSubMenu = false, parentModule = null) => {
    if (!isSubMenu) {
      if (topLevelNav.includes(item)) {
        setActivePage(item);
        setActiveContext(item);
      } else {
        if (expandedMenus.includes(item))
          setExpandedMenus(expandedMenus.filter((m) => m !== item));
        else {
          setExpandedMenus([...expandedMenus, item]);
          setActiveContext(item);
        }
      }
    } else {
      setActivePage(item);
      if (parentModule) setActiveContext(parentModule);
    }
  };

  const changeLayout = (newLayout) => {
    setLayout(newLayout);
    setIsProfileMenuOpen(false);
  };

  const confirmDelete = () => {
    if (categoryToDelete) {
      setCategories(categories.filter((c) => c.id !== categoryToDelete.id));
      setDeleteModalOpen(false);
      setCategoryToDelete(null);
    }
  };

  // --- REUSABLE COMPONENTS ---
  const DarkModeToggle = ({ isHeader = false }) => (
    <button
      onClick={() => setIsDarkMode(!isDarkMode)}
      className={`flex items-center justify-center rounded-full transition-all duration-300 ${isHeader ? `w-10 h-10 ${tokens.bgSurface} ${tokens.borderMain} border ${tokens.textSecondary} ${tokens.bgHover} shadow-sm dark:shadow-none` : "w-full px-4 py-3"}`}
    >
      {isHeader ? (
        isDarkMode ? (
          <Sun className="w-4 h-4" />
        ) : (
          <Moon className="w-4 h-4" />
        )
      ) : (
        <div
          className={`w-full flex items-center justify-between rounded-xl transition-all ${tokens.textSecondary}`}
        >
          <div className="flex items-center gap-3 text-[13px] font-medium">
            {isDarkMode ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}{" "}
            Dark Mode
          </div>
          <div
            className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-300 ${isDarkMode ? (isClientTheme ? "bg-[#3DEDA4]" : "bg-[#FDFCFB]") : "bg-[#EAE8E3]"}`}
          >
            <div
              className={`w-4 h-4 rounded-full transition-transform duration-300 ${isDarkMode ? `translate-x-4 ${isClientTheme ? "bg-[#18324C]" : "bg-[#1E1D1B]"}` : "translate-x-0 bg-white shadow-sm"}`}
            ></div>
          </div>
        </div>
      )}
    </button>
  );

  const UserDropdownMenu = ({ isDarkBg }) => (
    <div className="relative z-[999]">
      <button
        onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
        className="flex items-center gap-3 transition-all hover:opacity-80"
      >
        <span
          className={`text-[13px] hidden md:block tracking-wide font-medium ${isDarkBg ? "text-[#DCDAD4]" : tokens.textSecondary}`}
        >
          example@moneysmart.com
        </span>
        <div
          className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center font-serif-elegant font-medium text-sm transition-transform shadow-sm ${isProfileMenuOpen ? `scale-95 ring-2 ring-offset-2 ${isDarkMode ? "ring-[#FDFCFB] ring-offset-[#13151A]" : "ring-[#1E1D1B]"}` : ""} ${isDarkBg ? "bg-[#FDFCFB] text-[#1E1D1B]" : isClientTheme ? "bg-[#18324C] dark:bg-[#3DEDA4] text-white dark:text-[#090A0E]" : "bg-[#1E1D1B] dark:bg-[#FDFCFB] text-[#FDFCFB] dark:text-[#1E1D1B]"}`}
        >
          EX
        </div>
      </button>

      {isProfileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-[998]"
            onClick={() => setIsProfileMenuOpen(false)}
          ></div>
          <div
            className={`absolute right-0 top-12 md:top-14 w-64 md:w-72 ${tokens.bgSurface} border ${tokens.borderMain} shadow-[0_12px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.4)] rounded-[1.5rem] md:rounded-3xl p-2 z-[999] animate-in fade-in slide-in-from-top-2 origin-top-right`}
          >
            <div
              className={`px-5 py-4 border-b ${tokens.borderMain} mb-2 ${tokens.bgPanel} rounded-t-[1.1rem] md:rounded-t-[1.3rem]`}
            >
              <p
                className={`text-[9px] tracking-[0.2em] uppercase ${tokens.textSecondary} font-bold mb-1.5`}
              >
                Workspace User
              </p>
              <p
                className={`text-[14px] md:text-[15px] ${tokens.textPrimary} font-serif-elegant truncate`}
              >
                example@moneysmart.com
              </p>
            </div>

            <div className="px-1">
              <DarkModeToggle />
            </div>

            <div className="h-px w-auto mx-3 my-2 bg-gradient-to-r from-transparent via-[#EAE8E3] dark:via-[#2A2E39] to-transparent"></div>

            <div
              className={`px-4 py-2 md:py-3 text-[9px] tracking-[0.2em] uppercase ${tokens.textTertiary} font-bold mt-1`}
            >
              Interface Engine
            </div>
            <div className="space-y-1 px-1">
              {[
                { id: "A", icon: LayoutTemplate, name: "Editorial Tree" },
                { id: "B", icon: LayoutDashboard, name: "Modern Header" },
                { id: "C", icon: Layers, name: "Context Switcher" },
                { id: "D", icon: Layout, name: "Unified Header" },
                { id: "E", icon: Globe2, name: "Client Brand" },
                { id: "F", icon: Briefcase, name: "Enterprise Brand" },
                {
                  id: "G",
                  icon: Settings2,
                  name: "Client Brand Compact",
                  special: true,
                },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => changeLayout(opt.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 md:py-3 rounded-[1rem] md:rounded-2xl text-[12px] md:text-[13px] transition-all ${layout === opt.id ? `${tokens.bgPanel} ${tokens.textPrimary} font-semibold shadow-sm dark:shadow-none` : `${tokens.textSecondary} ${tokens.bgHover}`}`}
                >
                  <opt.icon
                    className={`w-4 h-4 ${opt.special && isClientTheme ? "text-[#EA2F5D] dark:text-[#3DEDA4]" : ""}`}
                  />{" "}
                  Layout {opt.id} ({opt.name})
                </button>
              ))}
            </div>
            <div
              className={`h-px ${tokens.borderMain} border-b my-2 md:my-3 mx-2`}
            ></div>
            <button
              className={`w-full flex items-center gap-3 px-4 md:px-5 py-2.5 md:py-3 rounded-[1rem] md:rounded-2xl text-[12px] md:text-[13px] text-[#E05252] dark:text-[#FCA5A5] hover:bg-[#FFF5F5] dark:hover:bg-[#3A1B16] transition-colors font-medium`}
            >
              <LogOut className="w-4 h-4" /> Secure Logout
            </button>
          </div>
        </>
      )}
    </div>
  );

  // --- PAGE VIEWS ---
  const DashboardView = ({ isLayoutC }) => (
    <div
      className={`animate-in fade-in slide-in-from-bottom-4 duration-700 ${isLayoutC ? "" : "p-6 md:p-10 lg:px-16 lg:py-8"} max-w-[1200px] w-full mx-auto`}
    >
      <div className="mb-8 md:mb-12">
        <p
          className={`text-[10px] md:text-[11px] tracking-[0.2em] uppercase ${tokens.textSecondary} font-semibold mb-3 md:mb-4`}
        >
          Wednesday, Oct 24
        </p>
        <h1
          className={`text-4xl md:text-5xl lg:text-6xl font-serif-elegant leading-tight tracking-tight ${tokens.textPrimary}`}
        >
          Good morning,
          <br className="hidden md:block" />
          Admin.
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 md:mb-16">
        {[
          {
            label: "Total Providers",
            value: "124",
            color: "bg-[#E2E8FF] dark:bg-[#1E293B]",
            icon: Globe2,
          },
          {
            label: "Active Campaigns",
            value: "32",
            color: "bg-[#FFE8E2] dark:bg-[#3A1B16]",
            icon: Zap,
          },
          {
            label: "SG Categories",
            value: "48",
            color: "bg-[#E2F5E9] dark:bg-[#143321]",
            icon: LayoutTemplate,
          },
          {
            label: "Pending Approvals",
            value: "5",
            color: "bg-[#F4F3F0] dark:bg-[#1F222A]",
            icon: Activity,
          },
        ].map((stat, idx) => (
          <div
            key={idx}
            className={`p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] ${tokens.bgSurface} border ${tokens.borderMain} shadow-[0_4px_20px_rgba(0,0,0,0.02)] dark:shadow-none flex flex-col justify-between h-[140px] md:h-[160px] group hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-500`}
          >
            <div className="flex justify-between items-start">
              <div
                className={`w-8 h-8 md:w-10 md:h-10 rounded-xl md:rounded-2xl ${stat.color} flex items-center justify-center shadow-inner dark:shadow-none`}
              >
                <stat.icon
                  className={`w-3.5 h-3.5 md:w-4 md:h-4 ${tokens.textPrimary} opacity-70`}
                />
              </div>
            </div>
            <div>
              <p
                className={`text-[9px] md:text-[10px] tracking-[0.15em] uppercase ${tokens.textSecondary} font-semibold mb-1`}
              >
                {stat.label}
              </p>
              <p
                className={`text-2xl md:text-3xl font-serif-elegant ${tokens.textPrimary}`}
              >
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2 order-2 lg:order-1">
          <h2
            className={`text-[9px] md:text-[10px] tracking-[0.2em] uppercase ${tokens.textSecondary} font-bold mb-4 md:mb-6 border-b ${tokens.borderMain} pb-4`}
          >
            Recent System Activity
          </h2>
          <div className="space-y-5 md:space-y-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex gap-4 md:gap-6 items-start group cursor-pointer"
              >
                <div
                  className={`w-2 h-2 rounded-full mt-1.5 md:mt-2 group-hover:scale-150 transition-transform flex-shrink-0 ${isClientTheme ? "bg-[#18324C] dark:bg-[#3DEDA4]" : "bg-[#1E1D1B] dark:bg-[#FDFCFB]"}`}
                ></div>
                <div>
                  <p
                    className={`text-[14px] md:text-[15px] font-medium leading-snug ${tokens.textPrimary}`}
                  >
                    Updated "Overseas Spending" category details.
                  </p>
                  <p
                    className={`text-[12px] md:text-[13px] ${tokens.textSecondary} mt-1 font-light`}
                  >
                    SG - Credit Cards • 2 hours ago
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          className={`${tokens.bgPanel} rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-8 border ${tokens.borderMain} order-1 lg:order-2`}
        >
          <h2
            className={`text-[9px] md:text-[10px] tracking-[0.2em] uppercase ${tokens.textSecondary} font-bold mb-5 md:mb-6`}
          >
            Quick Actions
          </h2>
          <button
            className={`w-full py-3 md:py-4 rounded-full text-[12px] md:text-[13px] font-medium mb-3 transition-all ${tokens.btnPrimary}`}
          >
            New Campaign
          </button>
          <button
            className={`w-full ${tokens.bgSurface} border ${tokens.borderMain} py-3 md:py-4 rounded-full text-[12px] md:text-[13px] font-medium ${tokens.bgHover} transition-all ${tokens.textPrimary}`}
          >
            Add Provider
          </button>
        </div>
      </div>
    </div>
  );

  const ProvidersView = ({ isLayoutC }) => (
    <div
      className={`animate-in fade-in slide-in-from-bottom-4 duration-700 flex flex-col h-full w-full ${isLayoutC ? "" : "p-6 md:p-10 lg:px-16 lg:py-8"} max-w-[1200px] mx-auto`}
    >
      <div className="mb-8 md:mb-10 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h1
            className={`text-4xl md:text-5xl font-serif-elegant leading-tight ${tokens.textPrimary}`}
          >
            Providers.
          </h1>
          <p
            className={`${tokens.textSecondary} mt-2 md:mt-3 font-light text-[14px] md:text-[15px]`}
          >
            Manage integrations with external banks and services.
          </p>
        </div>
        <button
          className={`flex items-center justify-center gap-2 px-6 py-3 md:py-3.5 rounded-full transition-all text-[13px] font-medium w-full sm:w-auto ${tokens.btnPrimary} hover:-translate-y-0.5`}
        >
          <Plus className="w-4 h-4" /> Add Provider
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 pb-12">
        {mockProviders.map((provider) => (
          <div
            key={provider.id}
            className={`${tokens.bgSurface} border ${tokens.borderMain} rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] dark:hover:shadow-none dark:hover:border-[#3DEDA4]/30 hover:-translate-y-1 transition-all duration-500 cursor-pointer group`}
          >
            <div className="flex justify-between items-start mb-8 md:mb-12">
              <div
                className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl ${provider.color} shadow-inner dark:shadow-none flex items-center justify-center font-serif-elegant text-lg ${tokens.textPrimary}`}
              >
                {provider.name.charAt(0)}
              </div>
              <span
                className={`px-2 md:px-3 py-1 text-[8px] md:text-[9px] uppercase tracking-widest font-bold rounded-md ${provider.status === "Active" ? "bg-[#E2F5E9] dark:bg-[#143321] text-[#137333] dark:text-[#6EE7B7]" : `${tokens.bgPanel} ${tokens.textSecondary}`}`}
              >
                {provider.status}
              </span>
            </div>
            <div>
              <p
                className={`text-[9px] md:text-[10px] tracking-[0.15em] uppercase ${tokens.textSecondary} font-semibold mb-1`}
              >
                {provider.type}
              </p>
              <h3
                className={`text-lg md:text-xl font-serif-elegant group-hover:text-[#EA2F5D] dark:group-hover:text-[#3DEDA4] transition-colors ${tokens.textPrimary}`}
              >
                {provider.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const CategoriesView = ({ isLayoutC }) => (
    <div
      className={`animate-in fade-in slide-in-from-bottom-4 duration-700 flex flex-col h-full w-full ${isLayoutC ? "" : "p-6 md:p-10 lg:px-16 lg:py-8"} max-w-[1200px] mx-auto`}
    >
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-5 mb-8 md:mb-10">
        <div>
          <div
            className={`text-[9px] md:text-[10px] tracking-[0.15em] uppercase ${tokens.textSecondary} font-semibold mb-2 md:mb-3 flex items-center gap-2`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${isClientTheme ? "bg-[#EA2F5D] dark:bg-[#3DEDA4]" : "bg-[#1E1D1B] dark:bg-[#FDFCFB]"}`}
            ></span>{" "}
            {activeContext}
          </div>
          <h1
            className={`text-4xl md:text-5xl font-serif-elegant leading-tight ${tokens.textPrimary}`}
          >
            Categories.
          </h1>
        </div>
        <div className="flex items-center gap-2 md:gap-3 w-full sm:w-auto flex-wrap">
          <button
            onClick={() => setIsReorderMode(!isReorderMode)}
            className={`flex-1 sm:flex-none justify-center flex items-center gap-2 px-4 md:px-5 py-3 rounded-full transition-all text-[12px] md:text-[13px] font-medium ${isReorderMode ? "bg-[#E2E8FF] text-[#4A5D96] border border-[#B4C6FF] dark:bg-[#1E2642] dark:text-[#82A0F5] dark:border-[#82A0F5]" : `bg-transparent border ${tokens.borderMain} ${tokens.textPrimary} ${tokens.bgHover}`}`}
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
            onClick={() => setIsDrawerOpen(true)}
            className={`flex-1 sm:flex-none justify-center flex items-center gap-2 px-4 md:px-6 py-3 rounded-full transition-all text-[12px] md:text-[13px] font-medium hover:-translate-y-0.5 ${tokens.btnPrimary}`}
          >
            <Plus className="w-4 h-4" /> Create new
          </button>
        </div>
      </div>

      <div className="w-full md:max-w-lg relative group mb-6">
        <Search
          className={`w-4 h-4 absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-[#A8A6A1] dark:text-[#64748B] transition-colors`}
        />
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full pl-10 md:pl-12 pr-4 md:pr-12 py-3.5 md:py-4 ${tokens.bgSurface} border ${tokens.borderMain} rounded-2xl focus:outline-none focus:ring-1 focus:ring-[#1E1D1B] dark:focus:ring-[#FDFCFB] transition-all text-[13px] md:text-[14px] shadow-sm dark:shadow-none placeholder:text-[#A8A6A1] dark:placeholder:text-[#64748B] placeholder:italic ${tokens.textPrimary} ${isClientTheme ? "focus:ring-[#18324C] dark:focus:ring-[#3DEDA4]/50 dark:focus:border-[#3DEDA4]/50" : ""}`}
        />
      </div>

      <div className="flex-1 pb-16">
        <div
          className={`hidden md:flex items-center justify-between text-[10px] tracking-[0.15em] uppercase ${tokens.textSecondary} font-medium pb-4 border-b ${tokens.borderMain}`}
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
                dragItem.current = index;
                e.currentTarget.classList.add("opacity-50", "scale-[0.98]");
              }}
              onDragEnter={(e) => (dragOverItem.current = index)}
              onDragEnd={(e) => {
                e.currentTarget.classList.remove("opacity-50", "scale-[0.98]");
                if (
                  dragItem.current !== null &&
                  dragOverItem.current !== null
                ) {
                  const copy = [...categories];
                  const item = copy[dragItem.current];
                  copy.splice(dragItem.current, 1);
                  copy.splice(dragOverItem.current, 0, item);
                  dragItem.current = null;
                  dragOverItem.current = null;
                  setCategories(copy);
                }
              }}
              onDragOver={(e) => e.preventDefault()}
              className={`flex flex-col md:flex-row md:items-start py-4 md:py-5 border md:border-b md:border-x-0 md:border-t-0 ${tokens.borderMain} ${tokens.bgHover} transition-all duration-300 md:-mx-4 md:px-4 p-4 md:p-0 rounded-[1rem] md:rounded-2xl ${tokens.bgSurface} md:bg-transparent shadow-sm md:shadow-none group ${isReorderMode ? "cursor-grab active:cursor-grabbing hover:-translate-y-0 hover:shadow-none" : ""}`}
            >
              <div className="w-full md:w-[30%] md:pl-2 flex flex-col gap-2 relative mb-2 md:mb-0">
                {isReorderMode && (
                  <div
                    className={`absolute -left-1 md:-left-3 top-0 md:top-1 text-[#C4C2BC] dark:text-[#64748B] cursor-grab ${tokens.bgSurface} p-1 rounded`}
                  >
                    <GripVertical className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                )}
                <div
                  className={`flex items-center gap-3 ${isReorderMode ? "ml-6 md:ml-4" : ""}`}
                >
                  <span
                    className={`font-serif-elegant text-lg transition-colors ${tokens.textPrimary} ${isClientTheme ? "group-hover:text-[#EA2F5D] dark:group-hover:text-[#3DEDA4]" : "group-hover:opacity-70"}`}
                  >
                    {category.name}
                  </span>
                </div>
                <div
                  className={`flex items-center gap-2 mt-0.5 ${isReorderMode ? "ml-6 md:ml-4" : ""}`}
                >
                  <span
                    className={`font-sans-clean text-[11px] md:text-[12px] tracking-wide ${tokens.textSecondary}`}
                  >
                    {category.slug}
                  </span>
                  {category.isDefault && (
                    <span
                      className={`inline-flex items-center px-2 py-[2px] rounded-[4px] text-[8px] md:text-[9px] font-bold uppercase tracking-widest ml-1 shadow-sm ${isClientTheme ? "bg-[#18324C] text-white dark:bg-[#18324C]/60 dark:text-[#3DEDA4]" : "bg-[#1E1D1B] text-[#FDFCFB] dark:bg-[#FDFCFB] dark:text-[#1E1D1B]"}`}
                    >
                      Default
                    </span>
                  )}
                </div>
              </div>
              <div className="w-full md:w-[50%] md:pr-8 mb-4 md:mb-0">
                <p
                  className={`text-[12px] md:text-[13px] leading-relaxed font-light ${tokens.textSecondary}`}
                >
                  {category.description}
                </p>
              </div>
              <div
                className={`w-full md:w-[20%] flex justify-end items-center md:items-start gap-2 md:pr-2 border-t md:border-0 pt-3 md:pt-0 ${tokens.borderMain}`}
              >
                <button
                  disabled={isReorderMode}
                  onClick={() => setIsDrawerOpen(true)}
                  className={`inline-flex items-center justify-center gap-2 px-3 py-1.5 md:p-0 md:w-9 md:h-9 rounded-full transition-all duration-300 ${isReorderMode ? "opacity-50 cursor-not-allowed" : `${tokens.bgPanel} md:bg-transparent ${tokens.textPrimary} hover:scale-105 ${tokens.bgHover}`}`}
                >
                  <Edit2
                    className="w-[14px] h-[14px] md:w-[16px] md:h-[16px]"
                    strokeWidth={1.5}
                  />
                  <span className="text-[12px] font-medium md:hidden">
                    Edit
                  </span>
                </button>
                <button
                  disabled={isReorderMode}
                  onClick={() => {
                    setCategoryToDelete(category);
                    setDeleteModalOpen(true);
                  }}
                  className={`inline-flex items-center justify-center gap-2 px-3 py-1.5 md:p-0 md:w-9 md:h-9 rounded-full transition-all duration-300 ${isReorderMode ? "opacity-50 cursor-not-allowed" : `${tokens.bgPanel} md:bg-transparent ${tokens.textSecondary} hover:text-[#EA2F5D] dark:hover:text-[#EA2F5D] hover:bg-[#EA2F5D]/10 hover:scale-105`}`}
                >
                  <Trash2
                    className="w-[14px] h-[14px] md:w-[16px] md:h-[16px]"
                    strokeWidth={1.5}
                  />
                  <span className="text-[12px] font-medium md:hidden">
                    Delete
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContent = (isLayoutC) => {
    switch (activePage) {
      case "Dashboard":
        return <DashboardView key="dash" isLayoutC={isLayoutC} />;
      case "Providers":
        return <ProvidersView key="prov" isLayoutC={isLayoutC} />;
      case "Categories":
        return <CategoriesView key="cat" isLayoutC={isLayoutC} />;
      default:
        return (
          <div
            className={`animate-in fade-in flex flex-col items-center justify-center h-full w-full text-center ${isLayoutC ? "" : "p-6 md:p-10"} max-w-[1200px] mx-auto`}
          >
            <div
              className={`w-14 h-14 md:w-16 md:h-16 rounded-[1rem] md:rounded-3xl ${tokens.bgPanel} flex items-center justify-center mb-4 md:mb-6 shadow-inner`}
            >
              <Layers
                className={`w-5 h-5 md:w-6 md:h-6 ${tokens.textTertiary}`}
              />
            </div>
            <h2
              className={`text-2xl md:text-3xl font-serif-elegant mb-2 md:mb-3 ${tokens.textPrimary}`}
            >
              {activePage}
            </h2>
            <p
              className={`text-[13px] md:text-[15px] max-w-sm font-light ${tokens.textSecondary}`}
            >
              This module is currently being configured.
            </p>
          </div>
        );
    }
  };

  return (
    <div className={`${isDarkMode ? "dark" : ""}`}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600;700&display=swap');
        .font-serif-elegant { font-family: 'Playfair Display', serif; }
        .font-sans-clean { font-family: 'Inter', sans-serif; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: ${isDarkMode ? "#2A2E39" : "#DCDAD4"}; border-radius: 10px; }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb { background: ${isDarkMode ? "#475569" : "#8C8A84"}; }
      `,
        }}
      />

      {/* Global Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm z-[190] md:hidden transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* ================= LAYOUT A (Editorial Tree) ================= */}
      {layout === "A" && (
        <div
          className={`flex h-[100dvh] w-screen font-sans-clean overflow-hidden ${tokens.textPrimary} ${tokens.bgCanvas}`}
        >
          <div
            className={`fixed inset-y-0 left-0 z-[200] md:relative flex-shrink-0 flex flex-col h-full text-[#8C8A84] dark:text-[#94A3B8] bg-[#111111] dark:bg-[#0A0A0A] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isMobileMenuOpen ? "translate-x-0 w-[280px]" : "-translate-x-full md:translate-x-0"} ${isSidebarCollapsed ? "md:w-[80px]" : "md:w-[280px]"}`}
          >
            <div className="h-16 md:h-20 flex items-center justify-between px-6 font-serif-elegant text-xl tracking-wide gap-3 border-b border-[#222]">
              <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
                {!isSidebarCollapsed || isMobileMenuOpen ? (
                  <MoneySmartLogo className="h-4 md:h-[18px]" />
                ) : (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#3DEDA4] flex-shrink-0"></div>
                )}
              </div>
              <button
                onClick={() =>
                  isMobileMenuOpen
                    ? setIsMobileMenuOpen(false)
                    : setIsSidebarCollapsed(!isSidebarCollapsed)
                }
                className="text-[#6B6964] hover:text-[#FDFCFB] transition-colors p-1 md:block hidden"
              >
                {isSidebarCollapsed ? (
                  <PanelLeftOpen className="w-5 h-5" />
                ) : (
                  <PanelLeftClose className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[#6B6964] hover:text-[#FDFCFB] transition-colors p-1 md:hidden"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
              {(!isSidebarCollapsed || isMobileMenuOpen) && (
                <div className="px-6 md:px-8 pb-3 md:pb-4 text-[9px] tracking-[0.2em] uppercase text-[#6B6964] dark:text-[#475569] font-bold">
                  Main Architecture
                </div>
              )}
              <ul className="space-y-1 px-3 mb-6">
                {topLevelNav.map((item, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() => {
                        handleNavClick(item);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 w-full text-left ${activePage === item && (!isSidebarCollapsed || isMobileMenuOpen) ? "text-[#FDFCFB] bg-[#1E1D1B] dark:bg-[#1A1A1A] font-medium shadow-md" : "hover:text-[#DCDAD4] hover:bg-[#161616]"} ${isSidebarCollapsed && !isMobileMenuOpen ? "justify-center" : ""}`}
                    >
                      {isSidebarCollapsed && !isMobileMenuOpen ? (
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center font-medium ${activePage === item ? "bg-[#1E1D1B] dark:bg-[#1A1A1A] text-[#FDFCFB]" : "bg-[#161616]"}`}
                        >
                          {item.substring(0, 1).toUpperCase()}
                        </div>
                      ) : (
                        <span className="truncate pr-2 text-[13px]">
                          {item}
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>

              {(!isSidebarCollapsed || isMobileMenuOpen) && (
                <div className="px-6 md:px-8 pb-3 md:pb-4 pt-4 text-[9px] tracking-[0.2em] uppercase text-[#6B6964] dark:text-[#475569] font-bold border-t border-[#222]/50">
                  Modules
                </div>
              )}
              <ul className="space-y-1 px-3 pb-8">
                {sgModules.map((item, idx) => {
                  const isExpanded = expandedMenus.includes(item);
                  const isContext = activeContext === item;
                  return (
                    <li key={idx} className="flex flex-col">
                      <button
                        onClick={() => handleNavClick(item)}
                        className={`flex items-center justify-between px-3 py-3 rounded-xl transition-all duration-300 w-full text-left ${isContext && (!isSidebarCollapsed || isMobileMenuOpen) ? "text-[#FDFCFB] bg-[#1E1D1B] dark:bg-[#1A1A1A] font-medium shadow-md" : "hover:text-[#DCDAD4] hover:bg-[#161616]"} ${isSidebarCollapsed && !isMobileMenuOpen ? "justify-center" : ""}`}
                      >
                        {isSidebarCollapsed && !isMobileMenuOpen ? (
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center font-medium text-[10px] ${isContext ? "bg-[#1E1D1B] dark:bg-[#1A1A1A] text-[#FDFCFB]" : "bg-[#161616]"}`}
                          >
                            SG
                          </div>
                        ) : (
                          <span className="truncate pr-2 text-[13px]">
                            {item}
                          </span>
                        )}
                        {(!isSidebarCollapsed || isMobileMenuOpen) &&
                          (isExpanded ? (
                            <ChevronDown className="w-3.5 h-3.5 opacity-50" />
                          ) : (
                            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                          ))}
                      </button>

                      {isExpanded &&
                        (!isSidebarCollapsed || isMobileMenuOpen) && (
                          <ul className="mt-2 mb-3 ml-5 pl-4 border-l border-[#2A2926] space-y-1.5 py-1">
                            {subMenuItems.map((subItem, subIdx) => (
                              <li key={subIdx}>
                                <a
                                  href="#"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleNavClick(subItem, true, item);
                                    setIsMobileMenuOpen(false);
                                  }}
                                  className={`block px-3 py-2 text-[12px] rounded-lg transition-colors ${activePage === subItem && isContext ? "text-[#B4C6FF] font-medium bg-[#1A1A1A] dark:bg-[#222]" : "text-[#6B6964] dark:text-[#94A3B8] hover:text-[#DCDAD4] hover:bg-[#1A1A1A]"}`}
                                >
                                  {subItem}
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div
            className={`flex-1 flex flex-col h-full min-w-0 sm:rounded-l-[2.5rem] shadow-[0_0_40px_rgba(0,0,0,0.5)] relative overflow-hidden ${tokens.bgSurface}`}
          >
            <div
              className={`absolute top-0 right-0 w-[300px] h-[300px] md:w-[600px] md:h-[400px] bg-gradient-to-bl ${tokens.blobGradient} pointer-events-none rounded-bl-full blur-3xl`}
            />
            <div
              className={`h-16 md:h-20 flex items-center justify-between px-5 md:px-10 flex-shrink-0 z-[100] relative border-b ${tokens.borderMain} md:border-transparent bg-white/80 dark:bg-[#13151A]/80 md:bg-transparent backdrop-blur-md md:backdrop-blur-none`}
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className={`md:hidden w-10 h-10 flex items-center justify-center -ml-2 rounded-full ${tokens.bgHover} ${tokens.textPrimary}`}
                >
                  <PanelLeft className="w-5 h-5" />
                </button>
                <div
                  className={`flex-1 text-[9px] md:text-[10px] tracking-[0.2em] uppercase ${tokens.textSecondary} font-bold flex items-center gap-1 md:gap-2`}
                >
                  <span className="hidden sm:block opacity-70">
                    {activeContext}
                  </span>
                  <span className="sm:hidden truncate max-w-[80px] opacity-70">
                    {activeContext.split(" ")[0]}
                  </span>
                  {activePage !== activeContext && (
                    <>
                      {" "}
                      <ChevronRight className="w-3 h-3 flex-shrink-0 opacity-50" />{" "}
                      <span
                        className={`truncate max-w-[100px] md:max-w-none ${tokens.textPrimary}`}
                      >
                        {activePage}
                      </span>{" "}
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 md:gap-4">
                <DarkModeToggle isHeader={true} />
                <UserDropdownMenu isDarkBg={false} />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto z-10 custom-scrollbar flex justify-center bg-transparent">
              {renderContent(false)}
            </div>
          </div>
        </div>
      )}

      {/* ================= LAYOUT B (Modern Header) ================= */}
      {layout === "B" && (
        <div
          className={`flex flex-col h-[100dvh] w-screen font-sans-clean overflow-hidden ${tokens.bgCanvas} ${tokens.textPrimary}`}
        >
          <div className="h-16 flex-shrink-0 bg-[#1E1D1B] dark:bg-[#060A0F] text-[#FDFCFB] flex items-center justify-between px-4 md:px-6 border-b border-[#33312E] dark:border-[#1A202C] z-[100] relative shadow-md">
            <div className="flex items-center gap-3 flex-shrink-0 md:mr-8">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#33312E] dark:hover:bg-[#1E293B] text-white"
              >
                <PanelLeft className="w-5 h-5" />
              </button>
              <MoneySmartLogo className="h-4 md:h-[18px] hidden sm:block" />
            </div>
            <div className="flex-1 overflow-x-auto custom-scrollbar flex items-center gap-1 mx-2 md:mx-4 h-full pt-1">
              {[...topLevelNav, ...sgModules].map((item, idx) => {
                const isActive = activeContext === item;
                return (
                  <button
                    key={idx}
                    onClick={() => handleNavClick(item)}
                    className={`whitespace-nowrap px-3 md:px-4 py-1.5 md:py-2 text-[12px] md:text-[13px] rounded-full transition-all flex-shrink-0 ${isActive ? "bg-[#FDFCFB] dark:bg-[#1E293B] text-[#1E1D1B] dark:text-[#F8FAFC] font-medium shadow-sm" : "text-[#8C8A84] dark:text-[#94A3B8] hover:text-[#DCDAD4] dark:hover:text-[#F1F5F9] hover:bg-[#33312E] dark:hover:bg-[#0F172A]"}`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
            <div className="flex-shrink-0 ml-2 md:ml-4 flex items-center gap-4">
              <UserDropdownMenu isDarkBg={true} />
            </div>
          </div>

          <div className="flex flex-1 overflow-hidden relative">
            <div
              className={`absolute top-0 right-0 w-[300px] h-[300px] md:w-[600px] md:h-[400px] bg-gradient-to-bl ${tokens.blobGradient} pointer-events-none rounded-bl-full blur-3xl z-0`}
            />

            <div
              className={`fixed inset-y-0 left-0 z-[200] md:relative w-[280px] flex-shrink-0 ${tokens.bgSurface} md:${tokens.bgPanel}/80 md:backdrop-blur-xl border-r ${tokens.borderMain} flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} ${sgModules.includes(activeContext) ? "md:translate-x-0" : "md:hidden"}`}
            >
              <div
                className={`md:hidden flex items-center justify-between p-5 border-b ${tokens.borderMain}`}
              >
                <h3 className="font-serif-elegant text-xl">Menu</h3>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`w-8 h-8 flex items-center justify-center rounded-full ${tokens.bgHover} shadow-sm ${tokens.textPrimary}`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Context Switcher Mobile Only */}
              <div
                className={`md:hidden p-5 relative z-[100] border-b ${tokens.borderMain}`}
              >
                <div
                  className={`text-[9px] tracking-[0.2em] uppercase ${tokens.textSecondary} font-bold mb-3 px-2`}
                >
                  Workspace Environment
                </div>
                <button
                  onClick={() =>
                    setIsContextSelectorOpen(!isContextSelectorOpen)
                  }
                  className={`w-full flex items-center justify-between p-3.5 rounded-[1.3rem] border transition-all duration-300 shadow-sm ${isContextSelectorOpen ? tokens.activeItem : `${tokens.bgSurface} ${tokens.borderMain} ${tokens.textPrimary}`}`}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div
                      className={`w-8 h-8 flex-shrink-0 rounded-[0.5rem] flex items-center justify-center font-serif-elegant text-md shadow-inner ${isContextSelectorOpen ? "bg-black/20 text-white" : `${tokens.bgHover} ${tokens.textPrimary}`}`}
                    >
                      {activeContext.substring(0, 1).toUpperCase()}
                    </div>
                    <div className="text-left truncate">
                      <div className="text-[13px] font-semibold truncate">
                        {activeContext}
                      </div>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${isContextSelectorOpen ? "rotate-180 opacity-70" : tokens.textSecondary}`}
                  />
                </button>

                {isContextSelectorOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-[90] bg-black/10 dark:bg-black/40 backdrop-blur-[2px]"
                      onClick={() => setIsContextSelectorOpen(false)}
                    ></div>
                    <div
                      className={`absolute top-[100px] left-4 w-[270px] ${tokens.bgSurface} rounded-[1.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.4)] border ${tokens.borderMain} z-[100] p-2 animate-in fade-in slide-in-from-top-4 origin-top-left`}
                    >
                      <div className="grid grid-cols-1 gap-1.5 max-h-[50vh] overflow-y-auto p-1 custom-scrollbar">
                        <div
                          className={`px-3 py-2 text-[9px] tracking-[0.2em] uppercase ${tokens.textSecondary} font-bold`}
                        >
                          Primary Nav
                        </div>
                        {topLevelNav.map((item, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              handleNavClick(item);
                              setIsContextSelectorOpen(false);
                              setIsMobileMenuOpen(false);
                            }}
                            className={`flex flex-col items-start gap-1 p-3.5 rounded-[1rem] text-left transition-colors ${item === activeContext ? tokens.activeItem : `${tokens.bgHover} ${tokens.textPrimary}`}`}
                          >
                            <div className="text-[12px] font-semibold leading-tight">
                              {item}
                            </div>
                          </button>
                        ))}
                        <div
                          className={`px-3 pt-4 pb-2 text-[9px] tracking-[0.2em] uppercase ${tokens.textSecondary} font-bold mt-2 border-t ${tokens.borderMain}`}
                        >
                          Modules
                        </div>
                        {sgModules.map((item, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              handleNavClick(item);
                              setIsContextSelectorOpen(false);
                            }}
                            className={`flex flex-col items-start gap-1 p-3 rounded-[1rem] text-left transition-colors ${item === activeContext ? tokens.activeItem : `${tokens.bgHover} ${tokens.textSecondary} hover:${tokens.textPrimary}`}`}
                          >
                            <div className="text-[11px] font-medium leading-tight">
                              {item}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div
                className={`hidden md:block p-6 md:p-8 border-b ${tokens.borderMain} bg-gradient-to-b ${isDarkMode ? "from-[#181A20] to-[#13151A]" : "from-[#F4F3F0] to-transparent"}`}
              >
                <div
                  className={`text-[9px] tracking-[0.2em] uppercase ${tokens.textSecondary} font-bold mb-2`}
                >
                  Module Active
                </div>
                <h2
                  className={`font-serif-elegant ${tokens.textPrimary} text-xl md:text-2xl leading-tight`}
                >
                  {activeContext}
                </h2>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-6 md:p-4 custom-scrollbar light-scrollbar pb-8">
                {sgModules.includes(activeContext) ? (
                  <div>
                    <div
                      className={`text-[9px] tracking-[0.2em] uppercase ${tokens.textSecondary} font-bold mb-4 px-2`}
                    >
                      SUB-MODULES ({activeContext.split(" ")[0]})
                    </div>
                    <ul className="space-y-1.5">
                      {subMenuItems.map((item, idx) => {
                        const isActive = item === activePage;
                        return (
                          <li key={idx}>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleNavClick(item, true, activeContext);
                                setIsMobileMenuOpen(false);
                              }}
                              className={`flex items-center justify-between px-4 md:px-5 py-3 md:py-3.5 rounded-[1rem] md:rounded-[1.2rem] text-[13px] md:text-[13.5px] font-medium transition-all duration-300 ${isActive ? tokens.activeItem : `${tokens.textSecondary} ${tokens.bgHover} hover:${tokens.textPrimary}`}`}
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
                  <div
                    className={`mt-8 px-4 text-center ${tokens.textSecondary} text-[12px] md:text-[13px] font-light`}
                  >
                    Select a module from the workspace dropdown to access deep
                    configurations.
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar light-scrollbar flex justify-center z-10 relative">
              <div className="w-full flex justify-center">
                {renderContent(false)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= LAYOUT C (Contextual Workspace) ================= */}
      {layout === "C" && (
        <div
          className={`flex h-[100dvh] w-screen font-sans-clean overflow-hidden ${tokens.textPrimary} ${tokens.bgCanvas} relative`}
        >
          <div
            className="absolute inset-0 opacity-[0.3] pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          ></div>

          <div
            className={`fixed inset-y-0 left-0 z-[200] md:relative w-[300px] md:w-[320px] flex-shrink-0 flex flex-col border-r ${tokens.borderMain} ${tokens.bgSurface} md:bg-transparent md:backdrop-blur-xl shadow-[4px_0_24px_rgba(0,0,0,0.02)] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
          >
            <div
              className={`h-20 md:h-24 flex items-center justify-between px-6 md:px-8 border-b ${isDarkMode ? tokens.borderMain : "border-[#1E1D1B]"} ${isDarkMode ? "" : "bg-[#1E1D1B]"}`}
            >
              <div className="flex items-center gap-3">
                <MoneySmartLogo className="h-4 md:h-[18px]" />
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className={`md:hidden w-8 h-8 rounded-full shadow-sm flex items-center justify-center transition-colors ${isDarkMode ? `${tokens.bgHover} ${tokens.textPrimary}` : "bg-white/10 hover:bg-white/20 text-white"}`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 md:p-6 relative z-[100]">
              <div
                className={`text-[9px] tracking-[0.2em] uppercase ${tokens.textSecondary} font-bold mb-3 px-2`}
              >
                Workspace Environment
              </div>
              <button
                onClick={() => setIsContextSelectorOpen(!isContextSelectorOpen)}
                className={`w-full flex items-center justify-between p-3.5 md:p-4 rounded-[1.3rem] border transition-all duration-300 shadow-sm ${isContextSelectorOpen ? tokens.activeItem : `${tokens.bgSurface} ${tokens.borderMain} ${tokens.bgHover} ${tokens.textPrimary}`}`}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div
                    className={`w-8 h-8 md:w-9 md:h-9 flex-shrink-0 rounded-[0.5rem] md:rounded-[0.6rem] flex items-center justify-center font-serif-elegant text-md md:text-lg shadow-inner ${isContextSelectorOpen ? "bg-black/20 text-white" : `${tokens.bgPanel} ${tokens.textPrimary}`}`}
                  >
                    {activeContext.substring(0, 1).toUpperCase()}
                  </div>
                  <div className="text-left truncate">
                    <div className="text-[13px] md:text-[14px] font-semibold truncate">
                      {activeContext}
                    </div>
                  </div>
                </div>
                <ChevronDown
                  className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${isContextSelectorOpen ? "rotate-180 opacity-70" : tokens.textSecondary}`}
                />
              </button>

              {isContextSelectorOpen && (
                <>
                  <div
                    className="fixed inset-0 z-[90] bg-black/10 dark:bg-black/40 backdrop-blur-[2px] md:backdrop-blur-none"
                    onClick={() => setIsContextSelectorOpen(false)}
                  ></div>
                  <div
                    className={`absolute top-[100px] md:top-[110px] left-4 md:left-6 w-[270px] md:w-[420px] ${tokens.bgSurface} rounded-[1.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.4)] border ${tokens.borderMain} z-[100] p-2 md:p-3 animate-in fade-in slide-in-from-top-4 origin-top-left`}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 max-h-[50vh] overflow-y-auto p-1 custom-scrollbar">
                      <div
                        className={`col-span-1 md:col-span-2 px-3 py-2 text-[9px] tracking-[0.2em] uppercase ${tokens.textSecondary} font-bold`}
                      >
                        Primary Nav
                      </div>
                      {topLevelNav.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            handleNavClick(item);
                            setIsContextSelectorOpen(false);
                            setIsMobileMenuOpen(false);
                          }}
                          className={`flex flex-col items-start gap-1 p-3.5 md:p-4 rounded-[1rem] text-left transition-colors ${item === activeContext ? tokens.activeItem : `${tokens.bgPanel} ${tokens.textPrimary}`}`}
                        >
                          <div className="text-[12px] md:text-[13px] font-semibold leading-tight">
                            {item}
                          </div>
                        </button>
                      ))}
                      <div
                        className={`col-span-1 md:col-span-2 px-3 pt-4 pb-2 text-[9px] tracking-[0.2em] uppercase ${tokens.textSecondary} font-bold mt-2 border-t ${tokens.borderMain}`}
                      >
                        Modules
                      </div>
                      {sgModules.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            handleNavClick(item);
                            setIsContextSelectorOpen(false);
                          }}
                          className={`flex flex-col items-start gap-1 p-3 md:p-3.5 rounded-[1rem] text-left transition-colors ${item === activeContext ? tokens.activeItem : `${tokens.bgHover} ${tokens.textSecondary} hover:${tokens.textPrimary}`}`}
                        >
                          <div className="text-[11px] md:text-[12px] font-medium leading-tight">
                            {item}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="flex-1 overflow-y-auto px-4 md:px-5 py-2 custom-scrollbar light-scrollbar pb-8">
              {sgModules.includes(activeContext) ? (
                <div>
                  <div
                    className={`text-[9px] tracking-[0.2em] uppercase ${tokens.textSecondary} font-bold mb-3 px-2 mt-4 md:mt-0`}
                  >
                    SUB-MODULES ({activeContext.split(" ")[0]})
                  </div>
                  <ul className="space-y-1.5">
                    {subMenuItems.map((item, idx) => {
                      const isActive = item === activePage;
                      return (
                        <li key={idx}>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handleNavClick(item, true, activeContext);
                              setIsMobileMenuOpen(false);
                            }}
                            className={`flex items-center justify-between px-4 md:px-5 py-3 md:py-3.5 rounded-[1rem] md:rounded-[1.2rem] text-[13px] md:text-[13.5px] font-medium transition-all duration-300 ${isActive ? tokens.activeItem : `${tokens.textSecondary} ${tokens.bgHover}`}`}
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
                <div
                  className={`mt-8 px-4 text-center ${tokens.textSecondary} text-[12px] md:text-[13px] font-light`}
                >
                  Select a module from the workspace dropdown to access deep
                  configurations.
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 flex flex-col h-full overflow-hidden relative z-10 p-3 sm:p-4 md:p-6 lg:p-8">
            <div className="h-14 flex items-center justify-between flex-shrink-0 z-[100] mb-3 md:mb-6 px-1 gap-4">
              <div className="flex items-center gap-3 flex-1">
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className={`md:hidden w-10 h-10 flex items-center justify-center ${tokens.bgSurface} border ${tokens.borderMain} rounded-full ${tokens.textPrimary} shadow-sm`}
                >
                  <PanelLeft className="w-5 h-5" />
                </button>
                <div className="hidden md:flex flex-1 max-w-md relative group">
                  <Search
                    className={`w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 ${tokens.textSecondary}`}
                  />
                  <input
                    type="text"
                    placeholder="Search across workspace..."
                    className={`w-full pl-11 pr-4 py-2 ${tokens.bgSurface} border ${tokens.borderMain} rounded-full focus:outline-none focus:ring-1 focus:ring-current transition-all text-[13.5px] ${tokens.textPrimary} shadow-sm`}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <DarkModeToggle isHeader={true} />
                <button
                  className={`hidden md:flex items-center gap-2 px-4 py-2 ${tokens.bgSurface} border ${tokens.borderMain} rounded-full text-[12px] font-medium ${tokens.textPrimary} ${tokens.bgHover} transition-all shadow-sm`}
                >
                  <Zap className={`w-3.5 h-3.5 text-current opacity-70`} />{" "}
                  What's New
                </button>
                <UserDropdownMenu isDarkBg={false} />
              </div>
            </div>
            <div
              className={`flex-1 ${tokens.bgSurface} rounded-[2rem] md:rounded-[3rem] shadow-sm md:shadow-[0_8px_40px_rgba(0,0,0,0.06)] border ${tokens.borderMain} overflow-hidden flex flex-col relative z-10`}
            >
              <div className="flex-1 overflow-y-auto custom-scrollbar p-5 sm:p-8 md:p-12 lg:p-16">
                {renderContent(true)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= LAYOUT D (Unified Workspace) ================= */}
      {layout === "D" && (
        <div
          className={`flex flex-col h-[100dvh] w-screen font-sans-clean overflow-hidden ${tokens.bgCanvas} ${tokens.textPrimary} relative`}
        >
          <div
            className="absolute inset-0 opacity-[0.3] pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          ></div>

          <header
            className={`h-[64px] md:h-[72px] flex-shrink-0 ${tokens.bgSurface} border-b ${tokens.borderMain} z-[100] relative px-4 md:px-8 flex items-center shadow-sm md:shadow-none`}
          >
            <div className="flex items-center gap-4 md:gap-6 flex-shrink-0 w-[240px] md:w-[300px]">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className={`md:hidden w-10 h-10 flex items-center justify-center rounded-full ${tokens.bgHover} ${tokens.textPrimary}`}
              >
                <PanelLeft className="w-5 h-5" />
              </button>

              <div
                className={`hidden sm:flex items-center justify-center h-10 px-4 rounded-[0.8rem] shadow-sm transition-colors ${isDarkMode ? "bg-[#181A20] border border-[#2A2E39]" : "bg-[#18324C]"}`}
              >
                <MoneySmartLogo className={`h-[14px] md:h-[15px]`} />
              </div>
              <div
                className={`w-px h-6 hidden sm:block ${tokens.borderMain} border-r ml-2`}
              ></div>
            </div>

            <div className="flex items-center justify-between flex-1">
              <div className="relative hidden md:block">
                <button
                  onClick={() =>
                    setIsContextSelectorOpen(!isContextSelectorOpen)
                  }
                  className={`flex items-center gap-1 md:gap-2 px-3 py-2 rounded-xl text-[13px] md:text-[14px] font-medium transition-colors ${isContextSelectorOpen ? tokens.bgPanel : tokens.bgHover} ${tokens.textPrimary}`}
                >
                  <span className="truncate max-w-[120px] md:max-w-none">
                    {activeContext}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 md:w-4 md:h-4 transition-transform flex-shrink-0 ${isContextSelectorOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isContextSelectorOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-[90] bg-black/10 dark:bg-black/40 backdrop-blur-[2px] md:backdrop-blur-none"
                      onClick={() => setIsContextSelectorOpen(false)}
                    ></div>
                    <div
                      className={`absolute top-[48px] md:top-[52px] -left-12 sm:left-0 w-[280px] md:w-[420px] ${tokens.bgSurface} rounded-[1.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.4)] border ${tokens.borderMain} z-[100] p-2 md:p-3 animate-in fade-in slide-in-from-top-4 origin-top-left`}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 max-h-[60vh] overflow-y-auto p-1 custom-scrollbar">
                        <div
                          className={`col-span-1 md:col-span-2 px-3 py-2 text-[9px] tracking-[0.2em] uppercase ${tokens.textSecondary} font-bold`}
                        >
                          Primary Nav
                        </div>
                        {topLevelNav.map((item, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              handleNavClick(item);
                              setIsContextSelectorOpen(false);
                            }}
                            className={`flex flex-col items-start gap-1 p-3 md:p-4 rounded-[1rem] text-left transition-colors ${item === activeContext ? tokens.activeItem : `${tokens.bgPanel} ${tokens.textPrimary}`}`}
                          >
                            <div className="text-[12px] md:text-[13px] font-semibold leading-tight">
                              {item}
                            </div>
                          </button>
                        ))}
                        <div
                          className={`col-span-1 md:col-span-2 px-3 pt-4 pb-2 text-[9px] tracking-[0.2em] uppercase ${tokens.textSecondary} font-bold mt-2 border-t ${tokens.borderMain}`}
                        >
                          Modules
                        </div>
                        {sgModules.map((item, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              handleNavClick(item);
                              setIsContextSelectorOpen(false);
                            }}
                            className={`flex flex-col items-start gap-1 p-3 md:p-3.5 rounded-[1rem] text-left transition-colors ${item === activeContext ? tokens.activeItem : `${tokens.bgHover} ${tokens.textSecondary} hover:${tokens.textPrimary}`}`}
                          >
                            <div className="text-[11px] md:text-[12px] font-medium leading-tight">
                              {item}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="hidden lg:flex flex-1 max-w-md relative group mx-4 lg:mx-8 xl:mx-12">
                <Search
                  className={`w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 ${tokens.textSecondary}`}
                />
                <input
                  type="text"
                  placeholder="Search across workspace..."
                  className={`w-full pl-11 pr-4 py-2.5 ${tokens.bgPanel} border border-transparent rounded-full focus:outline-none focus:ring-1 focus:ring-current focus:${tokens.bgSurface} focus:border-current transition-all text-[13.5px] ${tokens.textPrimary}`}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <kbd
                    className={`px-1.5 py-0.5 text-[10px] ${tokens.bgSurface} border ${tokens.borderMain} rounded-md ${tokens.textSecondary} font-sans font-medium shadow-sm`}
                  >
                    ⌘
                  </kbd>
                  <kbd
                    className={`px-1.5 py-0.5 text-[10px] ${tokens.bgSurface} border ${tokens.borderMain} rounded-md ${tokens.textSecondary} font-sans font-medium shadow-sm`}
                  >
                    K
                  </kbd>
                </div>
              </div>

              <div className="flex items-center gap-2 md:gap-4 justify-end flex-shrink-0">
                <DarkModeToggle isHeader={true} />
                <UserDropdownMenu isDarkBg={false} />
              </div>
            </div>
          </header>

          <div className="flex flex-1 overflow-hidden relative z-10">
            <div
              className={`fixed inset-y-0 left-0 z-[200] md:relative w-[280px] md:w-[320px] flex-shrink-0 border-r ${tokens.borderMain} ${tokens.bgSurface} md:${tokens.bgSurface}/80 md:backdrop-blur-xl flex flex-col transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} ${sgModules.includes(activeContext) ? "md:translate-x-0" : "md:hidden"}`}
            >
              <div
                className={`md:hidden flex items-center justify-between p-5 border-b ${tokens.borderMain}`}
              >
                <h3 className="font-serif-elegant text-xl">Menu</h3>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`w-8 h-8 flex items-center justify-center rounded-full ${tokens.bgHover} ${tokens.textPrimary}`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Context Switcher Mobile Only for D */}
              <div
                className={`md:hidden p-5 relative z-[100] border-b ${tokens.borderMain}`}
              >
                <div
                  className={`text-[9px] tracking-[0.2em] uppercase ${tokens.textSecondary} font-bold mb-3 px-2`}
                >
                  Workspace Environment
                </div>
                <button
                  onClick={() =>
                    setIsContextSelectorOpen(!isContextSelectorOpen)
                  }
                  className={`w-full flex items-center justify-between p-3.5 rounded-[1.3rem] border transition-all duration-300 shadow-sm ${isContextSelectorOpen ? tokens.activeItem : `${tokens.bgSurface} ${tokens.borderMain} ${tokens.textPrimary}`}`}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div
                      className={`w-8 h-8 flex-shrink-0 rounded-[0.5rem] flex items-center justify-center font-serif-elegant text-md shadow-inner ${isContextSelectorOpen ? "bg-black/20 text-white" : `${tokens.bgPanel} ${tokens.textPrimary}`}`}
                    >
                      {activeContext.substring(0, 1).toUpperCase()}
                    </div>
                    <div className="text-left truncate">
                      <div className="text-[13px] font-semibold truncate">
                        {activeContext}
                      </div>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${isContextSelectorOpen ? "rotate-180 opacity-70" : tokens.textSecondary}`}
                  />
                </button>

                {isContextSelectorOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-[90] bg-black/10 dark:bg-black/40 backdrop-blur-[2px]"
                      onClick={() => setIsContextSelectorOpen(false)}
                    ></div>
                    <div
                      className={`absolute top-[100px] left-4 w-[270px] ${tokens.bgSurface} rounded-[1.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.4)] border ${tokens.borderMain} z-[100] p-2 animate-in fade-in slide-in-from-top-4 origin-top-left`}
                    >
                      <div className="grid grid-cols-1 gap-1.5 max-h-[50vh] overflow-y-auto p-1 custom-scrollbar">
                        <div
                          className={`px-3 py-2 text-[9px] tracking-[0.2em] uppercase ${tokens.textSecondary} font-bold`}
                        >
                          Primary Nav
                        </div>
                        {topLevelNav.map((item, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              handleNavClick(item);
                              setIsContextSelectorOpen(false);
                              setIsMobileMenuOpen(false);
                            }}
                            className={`flex flex-col items-start gap-1 p-3.5 rounded-[1rem] text-left transition-colors ${item === activeContext ? tokens.activeItem : `${tokens.bgPanel} ${tokens.textPrimary}`}`}
                          >
                            <div className="text-[12px] font-semibold leading-tight">
                              {item}
                            </div>
                          </button>
                        ))}
                        <div
                          className={`px-3 pt-4 pb-2 text-[9px] tracking-[0.2em] uppercase ${tokens.textSecondary} font-bold mt-2 border-t ${tokens.borderMain}`}
                        >
                          Modules
                        </div>
                        {sgModules.map((item, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              handleNavClick(item);
                              setIsContextSelectorOpen(false);
                            }}
                            className={`flex flex-col items-start gap-1 p-3 rounded-[1rem] text-left transition-colors ${item === activeContext ? tokens.activeItem : `${tokens.bgHover} ${tokens.textSecondary} hover:${tokens.textPrimary}`}`}
                          >
                            <div className="text-[11px] font-medium leading-tight">
                              {item}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="flex-1 overflow-y-auto px-4 md:px-6 py-6 md:py-8 custom-scrollbar light-scrollbar">
                {sgModules.includes(activeContext) ? (
                  <div>
                    <div
                      className={`text-[9px] tracking-[0.2em] uppercase ${tokens.textSecondary} font-bold mb-4 px-2`}
                    >
                      SUB-MODULES ({activeContext.split(" ")[0]})
                    </div>
                    <ul className="space-y-1.5">
                      {subMenuItems.map((item, idx) => {
                        const isActive = item === activePage;
                        return (
                          <li key={idx}>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleNavClick(item, true, activeContext);
                                setIsMobileMenuOpen(false);
                              }}
                              className={`flex items-center justify-between px-4 py-3 md:py-3.5 rounded-[1rem] md:rounded-[1.2rem] text-[13px] md:text-[13.5px] font-medium transition-all duration-300 ${isActive ? tokens.activeItem : `${tokens.textSecondary} ${tokens.bgHover} hover:${tokens.textPrimary}`}`}
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
                  <div
                    className={`mt-8 px-4 text-center ${tokens.textSecondary} text-[12px] md:text-[13px] font-light`}
                  >
                    Select a module from the workspace dropdown to access deep
                    configurations.
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 flex flex-col h-full overflow-hidden relative z-10 p-3 sm:p-4 md:p-6 lg:p-8">
              <div
                className={`flex-1 ${tokens.bgSurface} rounded-[2rem] md:rounded-[2.5rem] shadow-sm md:shadow-[0_8px_40px_rgba(0,0,0,0.05)] border ${tokens.borderMain} overflow-hidden flex flex-col relative z-10`}
              >
                <div className="flex-1 overflow-y-auto custom-scrollbar light-scrollbar p-5 sm:p-8 md:p-12 lg:p-16">
                  {renderContent(true)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= LAYOUT E (Client Theme Floating) ================= */}
      {layout === "E" && (
        <div
          className={`flex h-[100dvh] w-screen font-sans-clean overflow-hidden ${tokens.bgCanvas} ${tokens.textPrimary} relative`}
        >
          <div
            className={`fixed inset-y-0 left-0 z-[200] md:relative w-[300px] md:w-[320px] flex-shrink-0 flex flex-col border-r ${tokens.borderMain} ${tokens.bgSurface} transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-sm ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
          >
            <div
              className={`h-20 md:h-24 flex items-center justify-between px-6 md:px-8 border-b ${isDarkMode ? tokens.borderMain : "border-[#18324C]"} ${isDarkMode ? "" : "bg-[#18324C]"}`}
            >
              <div className={`flex items-center gap-3`}>
                <MoneySmartLogo className="h-4 md:h-[18px]" />
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className={`md:hidden w-8 h-8 rounded-full shadow-sm flex items-center justify-center transition-colors ${isDarkMode ? `${tokens.bgPanel} ${tokens.textPrimary}` : "bg-white/10 hover:bg-white/20 text-white"}`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 md:p-6 relative z-[100]">
              <div
                className={`text-[9px] tracking-[0.2em] uppercase ${tokens.textSecondary} font-bold mb-3 px-2`}
              >
                Workspace Environment
              </div>
              <button
                onClick={() => setIsContextSelectorOpen(!isContextSelectorOpen)}
                className={`w-full flex items-center justify-between p-3.5 md:p-4 rounded-[1.3rem] border transition-all duration-300 shadow-sm ${isContextSelectorOpen ? tokens.activeItem : `${tokens.bgSurface} ${tokens.borderMain} ${tokens.bgHover} ${tokens.textPrimary}`}`}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div
                    className={`w-8 h-8 md:w-9 md:h-9 flex-shrink-0 rounded-[0.5rem] md:rounded-[0.6rem] flex items-center justify-center font-serif-elegant text-md md:text-lg shadow-inner ${isContextSelectorOpen ? "bg-black/20 text-white" : `${tokens.bgPanel} ${tokens.textPrimary}`}`}
                  >
                    {activeContext.substring(0, 1).toUpperCase()}
                  </div>
                  <div className="text-left truncate">
                    <div className="text-[13px] md:text-[14px] font-semibold truncate">
                      {activeContext}
                    </div>
                  </div>
                </div>
                <ChevronDown
                  className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${isContextSelectorOpen ? "rotate-180 opacity-70" : tokens.textSecondary}`}
                />
              </button>

              {isContextSelectorOpen && (
                <>
                  <div
                    className="fixed inset-0 z-[90] bg-black/10 dark:bg-black/40 backdrop-blur-[2px] md:backdrop-blur-none"
                    onClick={() => setIsContextSelectorOpen(false)}
                  ></div>
                  <div
                    className={`absolute top-[100px] md:top-[110px] left-4 md:left-6 w-[270px] md:w-[420px] ${tokens.bgSurface} rounded-[1.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.4)] border ${tokens.borderMain} z-[100] p-2 md:p-3 animate-in fade-in slide-in-from-top-4 origin-top-left`}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 max-h-[50vh] overflow-y-auto p-1 custom-scrollbar">
                      <div
                        className={`col-span-1 md:col-span-2 px-3 py-2 text-[9px] tracking-[0.2em] uppercase ${tokens.textSecondary} font-bold`}
                      >
                        Primary Nav
                      </div>
                      {topLevelNav.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            handleNavClick(item);
                            setIsContextSelectorOpen(false);
                            setIsMobileMenuOpen(false);
                          }}
                          className={`flex flex-col items-start gap-1 p-3.5 md:p-4 rounded-[1rem] text-left transition-colors ${item === activeContext ? tokens.activeItem : `${tokens.bgPanel} ${tokens.textPrimary}`}`}
                        >
                          <div className="text-[12px] md:text-[13px] font-semibold leading-tight">
                            {item}
                          </div>
                        </button>
                      ))}
                      <div
                        className={`col-span-1 md:col-span-2 px-3 pt-4 pb-2 text-[9px] tracking-[0.2em] uppercase ${tokens.textSecondary} font-bold mt-2 border-t ${tokens.borderMain}`}
                      >
                        Modules
                      </div>
                      {sgModules.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            handleNavClick(item);
                            setIsContextSelectorOpen(false);
                          }}
                          className={`flex flex-col items-start gap-1 p-3 md:p-3.5 rounded-[1rem] text-left transition-colors ${item === activeContext ? tokens.activeItem : `${tokens.bgHover} ${tokens.textSecondary} hover:${tokens.textPrimary}`}`}
                        >
                          <div className="text-[11px] md:text-[12px] font-medium leading-tight">
                            {item}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="flex-1 overflow-y-auto px-4 md:px-5 py-2 custom-scrollbar light-scrollbar pb-8">
              {sgModules.includes(activeContext) ? (
                <div>
                  <div
                    className={`text-[9px] tracking-[0.2em] uppercase ${tokens.textSecondary} font-bold mb-3 px-2 mt-4 md:mt-0`}
                  >
                    SUB-MODULES ({activeContext.split(" ")[0]})
                  </div>
                  <ul className="space-y-1.5">
                    {subMenuItems.map((item, idx) => {
                      const isActive = item === activePage;
                      return (
                        <li key={idx}>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handleNavClick(item, true, activeContext);
                              setIsMobileMenuOpen(false);
                            }}
                            className={`flex items-center justify-between px-4 md:px-5 py-3 md:py-3.5 rounded-[1rem] md:rounded-[1.2rem] text-[13px] md:text-[13.5px] font-medium transition-all duration-300 ${isActive ? tokens.activeItem : `${tokens.textSecondary} ${tokens.bgHover} hover:${tokens.textPrimary}`}`}
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
                <div
                  className={`mt-8 px-4 text-center ${tokens.textSecondary} text-[12px] md:text-[13px] font-light`}
                >
                  Select a module from the workspace dropdown to access deep
                  configurations.
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 flex flex-col h-full overflow-hidden relative z-10 p-3 sm:p-4 md:p-6 lg:p-8">
            <div className="h-14 flex items-center justify-between flex-shrink-0 z-[100] mb-3 md:mb-6 px-1 gap-4">
              <div className="flex items-center gap-3 flex-1">
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className={`md:hidden w-10 h-10 flex items-center justify-center ${tokens.bgSurface} border ${tokens.borderMain} rounded-full ${tokens.textPrimary} shadow-sm`}
                >
                  <PanelLeft className="w-5 h-5" />
                </button>
                <div className="hidden md:flex flex-1 max-w-md relative group">
                  <Search
                    className={`w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 ${tokens.textSecondary}`}
                  />
                  <input
                    type="text"
                    placeholder="Search records..."
                    className={`w-full pl-11 pr-4 py-2 ${tokens.bgSurface} border ${tokens.borderMain} rounded-full focus:outline-none focus:ring-2 focus:ring-[#18324C]/20 dark:focus:ring-[#3DEDA4]/40 focus:border-[#18324C] dark:focus:border-[#3DEDA4] transition-all text-[13.5px] ${tokens.textPrimary} shadow-sm`}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 md:gap-4">
                <DarkModeToggle isHeader={true} />
                <button
                  className={`hidden md:flex items-center gap-2 px-4 py-2 ${tokens.bgSurface} border ${tokens.borderMain} rounded-full text-[12px] font-medium ${tokens.textPrimary} ${tokens.bgHover} transition-all shadow-sm`}
                >
                  <Zap className="w-3.5 h-3.5 text-[#EA2F5D]" /> Announcements
                </button>
                <UserDropdownMenu isDarkBg={false} />
              </div>
            </div>
            <div
              className={`flex-1 ${tokens.bgSurface} rounded-[2rem] md:rounded-[3rem] shadow-sm border ${tokens.borderMain} overflow-hidden flex flex-col relative z-10`}
            >
              <div className="flex-1 overflow-y-auto custom-scrollbar p-5 sm:p-8 md:p-12 lg:p-16">
                {renderContent(true)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= LAYOUT F (Enterprise Brand Sidebar Header) ================= */}
      {layout === "F" && (
        <div
          className={`flex h-[100dvh] w-screen font-sans-clean overflow-hidden ${tokens.bgCanvas} ${tokens.textPrimary}`}
        >
          <div
            className={`fixed inset-y-0 left-0 z-[200] md:relative w-[280px] md:w-[320px] flex-shrink-0 flex flex-col border-r ${tokens.borderMain} ${tokens.bgSurface} transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-sm md:shadow-none ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
          >
            <div
              className={`h-[72px] flex-shrink-0 flex items-center justify-between px-6 md:px-8 bg-[#18324C] dark:bg-[#13151A] border-b ${isDarkMode ? tokens.borderMain : "border-transparent"}`}
            >
              <div className={`flex items-center gap-3`}>
                <MoneySmartLogo className="h-4 md:h-[18px]" />
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className={`md:hidden w-8 h-8 rounded-full shadow-sm flex items-center justify-center transition-colors ${isDarkMode ? `${tokens.bgPanel} ${tokens.textPrimary}` : "bg-white/10 hover:bg-white/20 text-white"}`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar light-scrollbar flex flex-col">
              <div className="p-5 md:p-6 relative z-[100]">
                <div
                  className={`text-[9px] tracking-[0.2em] uppercase ${tokens.textSecondary} font-bold mb-3 px-2`}
                >
                  Workspace Environment
                </div>
                <button
                  onClick={() =>
                    setIsContextSelectorOpen(!isContextSelectorOpen)
                  }
                  className={`w-full flex items-center justify-between p-3.5 md:p-4 rounded-[1.3rem] border transition-all duration-300 shadow-sm ${isContextSelectorOpen ? tokens.activeItem : `${tokens.bgSurface} ${tokens.borderMain} ${tokens.bgHover} ${tokens.textPrimary}`}`}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div
                      className={`w-8 h-8 md:w-9 md:h-9 flex-shrink-0 rounded-[0.5rem] md:rounded-[0.6rem] flex items-center justify-center font-serif-elegant text-md md:text-lg shadow-inner ${isContextSelectorOpen ? "bg-black/20 text-white" : `${tokens.bgPanel} ${tokens.textPrimary}`}`}
                    >
                      {activeContext.substring(0, 1).toUpperCase()}
                    </div>
                    <div className="text-left truncate">
                      <div className="text-[13px] md:text-[14px] font-semibold truncate">
                        {activeContext}
                      </div>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${isContextSelectorOpen ? "rotate-180 opacity-70" : tokens.textSecondary}`}
                  />
                </button>

                {isContextSelectorOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-[90] bg-black/10 dark:bg-black/40 backdrop-blur-[2px] md:backdrop-blur-none"
                      onClick={() => setIsContextSelectorOpen(false)}
                    ></div>
                    <div
                      className={`absolute top-[100px] md:top-[110px] left-4 md:left-6 w-[270px] md:w-[420px] ${tokens.bgSurface} rounded-[1.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.4)] border ${tokens.borderMain} z-[100] p-2 md:p-3 animate-in fade-in slide-in-from-top-4 origin-top-left`}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 max-h-[50vh] overflow-y-auto p-1 custom-scrollbar">
                        <div
                          className={`col-span-1 md:col-span-2 px-3 py-2 text-[9px] tracking-[0.2em] uppercase ${tokens.textSecondary} font-bold`}
                        >
                          Primary Nav
                        </div>
                        {topLevelNav.map((item, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              handleNavClick(item);
                              setIsContextSelectorOpen(false);
                              setIsMobileMenuOpen(false);
                            }}
                            className={`flex flex-col items-start gap-1 p-3.5 md:p-4 rounded-[1rem] text-left transition-colors ${item === activeContext ? tokens.activeItem : `${tokens.bgPanel} ${tokens.textPrimary}`}`}
                          >
                            <div className="text-[12px] md:text-[13px] font-semibold leading-tight">
                              {item}
                            </div>
                          </button>
                        ))}
                        <div
                          className={`col-span-1 md:col-span-2 px-3 pt-4 pb-2 text-[9px] tracking-[0.2em] uppercase ${tokens.textSecondary} font-bold mt-2 border-t ${tokens.borderMain}`}
                        >
                          Modules
                        </div>
                        {sgModules.map((item, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              handleNavClick(item);
                              setIsContextSelectorOpen(false);
                            }}
                            className={`flex flex-col items-start gap-1 p-3 md:p-3.5 rounded-[1rem] text-left transition-colors ${item === activeContext ? tokens.activeItem : `${tokens.bgHover} ${tokens.textSecondary} hover:${tokens.textPrimary}`}`}
                          >
                            <div className="text-[11px] md:text-[12px] font-medium leading-tight">
                              {item}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="flex-1 px-4 md:px-5 py-2 pb-8">
                {sgModules.includes(activeContext) ? (
                  <div>
                    <div
                      className={`text-[9px] tracking-[0.2em] uppercase ${tokens.textSecondary} font-bold mb-3 px-2 mt-4 md:mt-0`}
                    >
                      SUB-MODULES ({activeContext.split(" ")[0]})
                    </div>
                    <ul className="space-y-1.5">
                      {subMenuItems.map((item, idx) => {
                        const isActive = item === activePage;
                        return (
                          <li key={idx}>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleNavClick(item, true, activeContext);
                                setIsMobileMenuOpen(false);
                              }}
                              className={`flex items-center justify-between px-4 md:px-5 py-3 md:py-3.5 rounded-[1rem] md:rounded-[1.2rem] text-[13px] md:text-[13.5px] font-medium transition-all duration-300 ${isActive ? tokens.activeItem : `${tokens.textSecondary} ${tokens.bgHover} hover:${tokens.textPrimary}`}`}
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
                  <div
                    className={`mt-8 px-4 text-center ${tokens.textSecondary} text-[12px] md:text-[13px] font-light`}
                  >
                    Select a module from the workspace dropdown to access deep
                    configurations.
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col h-full overflow-hidden relative z-10">
            {/* Enterprise Top Header */}
            <header
              className={`h-[72px] flex-shrink-0 ${tokens.bgSurface} border-b ${tokens.borderMain} z-[100] relative px-4 md:px-8 flex items-center justify-between shadow-sm md:shadow-none`}
            >
              <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className={`md:hidden w-10 h-10 flex items-center justify-center rounded-full ${tokens.bgHover} ${tokens.textPrimary}`}
                >
                  <PanelLeft className="w-5 h-5" />
                </button>
                <div
                  className={`hidden md:flex items-center gap-2 ${tokens.textSecondary} text-[13px] font-medium`}
                >
                  <span className="truncate max-w-[150px] opacity-70">
                    {activeContext}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                  <span className={`${tokens.textPrimary} opacity-100`}>
                    {activePage}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 md:gap-5 justify-end flex-1">
                <div className="hidden lg:flex max-w-[300px] w-full relative group">
                  <Search
                    className={`w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 ${tokens.textSecondary}`}
                  />
                  <input
                    type="text"
                    placeholder="Search..."
                    className={`w-full pl-11 pr-4 py-2 ${tokens.bgPanel} border border-transparent rounded-full focus:outline-none focus:ring-1 focus:ring-current focus:${tokens.bgSurface} focus:border-current transition-all text-[13px] ${tokens.textPrimary}`}
                  />
                </div>
                <DarkModeToggle isHeader={true} />
                <button
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${tokens.bgSurface} border ${tokens.borderMain} ${tokens.bgHover} ${tokens.textPrimary} shadow-sm dark:shadow-none transition-colors`}
                >
                  <Zap
                    className={`w-4 h-4 ${isClientTheme ? "text-[#EA2F5D]" : "opacity-70"}`}
                  />
                </button>
                <UserDropdownMenu isDarkBg={false} />
              </div>
            </header>

            <div
              className={`flex-1 ${tokens.bgCanvas} overflow-y-auto custom-scrollbar light-scrollbar`}
            >
              {renderContent(true)}
            </div>
          </div>
        </div>
      )}

      {/* ================= LAYOUT G (Client Brand Compact) ================= */}
      {layout === "G" && (
        <div
          className={`flex h-[100dvh] w-screen font-sans-clean overflow-hidden ${tokens.bgCanvas} ${tokens.textPrimary} relative`}
        >
          <div
            className={`fixed inset-y-0 left-0 z-[200] md:relative w-[300px] md:w-[320px] flex-shrink-0 flex flex-col border-r ${tokens.borderMain} ${tokens.bgSurface} transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-sm ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
          >
            <div
              className={`relative z-[110] flex items-start justify-between py-5 md:py-6 px-6 md:px-8 border-b ${isDarkMode ? tokens.borderMain : "border-[#18324C]"} ${isDarkMode ? "" : "bg-[#18324C]"}`}
            >
              <div className={`flex flex-col items-start gap-2.5`}>
                <MoneySmartLogo className="h-4 md:h-[18px]" />

                <div className="relative">
                  <button
                    onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                    className={`flex items-center gap-1.5 text-[9px] tracking-[0.15em] font-bold uppercase transition-colors ${isDarkMode ? "text-[#94A3B8] hover:text-white" : "text-[#A3C1E2] hover:text-white"}`}
                  >
                    {activeRole}{" "}
                    <ChevronDown
                      className={`w-3 h-3 transition-transform ${isRoleDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isRoleDropdownOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-[90]"
                        onClick={() => setIsRoleDropdownOpen(false)}
                      ></div>
                      <div
                        className={`absolute top-full left-0 mt-2 w-[240px] ${tokens.bgSurface} border ${tokens.borderMain} rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.15)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] p-1.5 z-[100] animate-in fade-in slide-in-from-top-2`}
                      >
                        {[
                          "Product Service Admin",
                          "Promotion Admin",
                          "System Admin",
                        ].map((role) => (
                          <button
                            key={role}
                            onClick={() => {
                              setActiveRole(role);
                              setIsRoleDropdownOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2.5 rounded-lg text-[12px] font-semibold transition-colors ${activeRole === role ? tokens.activeItem : `${tokens.bgHover} ${tokens.textSecondary} hover:${tokens.textPrimary}`}`}
                          >
                            {role}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className={`md:hidden w-8 h-8 rounded-full shadow-sm flex items-center justify-center transition-colors ${isDarkMode ? `${tokens.bgPanel} ${tokens.textPrimary}` : "bg-white/10 hover:bg-white/20 text-white"}`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 md:p-6 relative z-[100]">
              <div
                className={`text-[9px] tracking-[0.2em] uppercase ${tokens.textSecondary} font-bold mb-3 px-2`}
              >
                Workspace Environment
              </div>
              <button
                onClick={() => setIsContextSelectorOpen(!isContextSelectorOpen)}
                className={`w-full flex items-center justify-between p-3.5 md:p-4 rounded-[1.3rem] border transition-all duration-300 shadow-sm ${isContextSelectorOpen ? tokens.activeItem : `${tokens.bgSurface} ${tokens.borderMain} ${tokens.bgHover} ${tokens.textPrimary}`}`}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div
                    className={`w-8 h-8 md:w-9 md:h-9 flex-shrink-0 rounded-[0.5rem] md:rounded-[0.6rem] flex items-center justify-center font-serif-elegant text-md md:text-lg shadow-inner ${isContextSelectorOpen ? "bg-black/20 text-white" : `${tokens.bgPanel} ${tokens.textPrimary}`}`}
                  >
                    {activeContext.substring(0, 1).toUpperCase()}
                  </div>
                  <div className="text-left truncate">
                    <div className="text-[13px] md:text-[14px] font-semibold truncate">
                      {activeContext}
                    </div>
                  </div>
                </div>
                <ChevronDown
                  className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${isContextSelectorOpen ? "rotate-180 opacity-70" : tokens.textSecondary}`}
                />
              </button>

              {isContextSelectorOpen && (
                <>
                  <div
                    className="fixed inset-0 z-[90] bg-black/10 dark:bg-black/40 backdrop-blur-[2px] md:backdrop-blur-none"
                    onClick={() => setIsContextSelectorOpen(false)}
                  ></div>
                  <div
                    className={`absolute top-[100px] md:top-[110px] left-4 md:left-6 w-[270px] md:w-[420px] ${tokens.bgSurface} rounded-[1.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.4)] border ${tokens.borderMain} z-[100] p-2 md:p-3 animate-in fade-in slide-in-from-top-4 origin-top-left`}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 max-h-[50vh] overflow-y-auto p-1 custom-scrollbar">
                      <div
                        className={`col-span-1 md:col-span-2 px-3 py-2 text-[9px] tracking-[0.2em] uppercase ${tokens.textSecondary} font-bold`}
                      >
                        Primary Nav
                      </div>
                      {topLevelNav.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            handleNavClick(item);
                            setIsContextSelectorOpen(false);
                            setIsMobileMenuOpen(false);
                          }}
                          className={`flex flex-col items-start gap-1 p-3.5 md:p-4 rounded-[1rem] text-left transition-colors ${item === activeContext ? tokens.activeItem : `${tokens.bgPanel} ${tokens.textPrimary}`}`}
                        >
                          <div className="text-[12px] md:text-[13px] font-semibold leading-tight">
                            {item}
                          </div>
                        </button>
                      ))}
                      <div
                        className={`col-span-1 md:col-span-2 px-3 pt-4 pb-2 text-[9px] tracking-[0.2em] uppercase ${tokens.textSecondary} font-bold mt-2 border-t ${tokens.borderMain}`}
                      >
                        Modules
                      </div>
                      {sgModules.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            handleNavClick(item);
                            setIsContextSelectorOpen(false);
                          }}
                          className={`flex flex-col items-start gap-1 p-3 md:p-3.5 rounded-[1rem] text-left transition-colors ${item === activeContext ? tokens.activeItem : `${tokens.bgHover} ${tokens.textSecondary} hover:${tokens.textPrimary}`}`}
                        >
                          <div className="text-[11px] md:text-[12px] font-medium leading-tight">
                            {item}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="flex-1 overflow-y-auto px-4 md:px-5 py-2 custom-scrollbar light-scrollbar pb-8">
              {sgModules.includes(activeContext) ? (
                <div>
                  <div
                    className={`text-[9px] tracking-[0.2em] uppercase ${tokens.textSecondary} font-bold mb-3 px-2 mt-4 md:mt-0`}
                  >
                    SUB-MODULES ({activeContext.split(" ")[0]})
                  </div>
                  <ul className="space-y-1.5">
                    {subMenuItems.map((item, idx) => {
                      const isActive = item === activePage;
                      return (
                        <li key={idx}>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handleNavClick(item, true, activeContext);
                              setIsMobileMenuOpen(false);
                            }}
                            className={`flex items-center justify-between px-4 md:px-5 py-3 md:py-3.5 rounded-[1rem] md:rounded-[1.2rem] text-[13px] md:text-[13.5px] font-medium transition-all duration-300 ${isActive ? tokens.activeItem : `${tokens.textSecondary} ${tokens.bgHover} hover:${tokens.textPrimary}`}`}
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
                <div
                  className={`mt-8 px-4 text-center ${tokens.textSecondary} text-[12px] md:text-[13px] font-light`}
                >
                  Select a module from the workspace dropdown to access deep
                  configurations.
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 flex flex-col h-full overflow-hidden relative z-10 p-4">
            <div className="h-14 flex items-center justify-between flex-shrink-0 z-[100] px-1 gap-4">
              <div className="flex items-center gap-3 flex-1">
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className={`md:hidden w-10 h-10 flex items-center justify-center ${tokens.bgSurface} border ${tokens.borderMain} rounded-full ${tokens.textPrimary} shadow-sm`}
                >
                  <PanelLeft className="w-5 h-5" />
                </button>
                <div
                  className={`hidden md:flex items-center gap-2 ${tokens.textSecondary} text-[13px] font-medium`}
                >
                  <span className="truncate max-w-[150px] opacity-70">
                    {activeContext}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                  <span className={`${tokens.textPrimary} opacity-100`}>
                    {activePage}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 md:gap-4">
                <UserDropdownMenu isDarkBg={false} />
              </div>
            </div>

            {/* The Compact Canvas */}
            <div
              className={`flex-1 ${tokens.bgSurface} rounded-[1.5rem] shadow-sm md:shadow-[0_8px_40px_rgba(0,0,0,0.06)] border ${tokens.borderMain} overflow-hidden flex flex-col relative z-10`}
            >
              <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
                {renderContent(true)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= GLOBAL DRAWER (For Create/Edit) ================= */}
      <div
        className={`fixed inset-0 z-[1000] transition-all duration-500 ${isDrawerOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <div
          className={`absolute inset-0 bg-[#111111]/40 dark:bg-[#000000]/60 backdrop-blur-sm md:backdrop-blur-md transition-opacity duration-500 ${isDrawerOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setIsDrawerOpen(false)}
        />

        <div
          className={`fixed z-[1001] ${tokens.bgSurface} transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] flex flex-col 
          bottom-0 left-0 right-0 h-[90vh] rounded-t-[2rem] border-t ${tokens.borderMain} shadow-[0_-20px_80px_rgba(0,0,0,0.15)] dark:shadow-[0_-20px_80px_rgba(0,0,0,0.4)]
          md:top-0 md:bottom-0 md:left-auto md:right-0 md:h-full md:w-[500px] md:rounded-none md:border-t-0 md:border-l md:shadow-[-20px_0_80px_rgba(0,0,0,0.15)] 
          ${isDrawerOpen ? "translate-y-0 md:translate-x-0" : "translate-y-full md:translate-x-full md:translate-y-0"}`}
        >
          <div
            className="md:hidden flex items-center justify-center pt-4 pb-2"
            onClick={() => setIsDrawerOpen(false)}
          >
            <div
              className={`w-12 h-1.5 ${tokens.borderMain} border-b-0 bg-current opacity-20 rounded-full`}
            ></div>
          </div>

          <div
            className={`flex items-center justify-between px-6 md:px-12 py-4 md:py-10 border-b ${tokens.borderMain}`}
          >
            <h2
              className={`text-3xl md:text-4xl font-serif-elegant ${tokens.textPrimary}`}
            >
              Create.
            </h2>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full ${tokens.bgHover} ${tokens.textSecondary} hover:${tokens.textPrimary} transition-all duration-300 hover:scale-105 md:-mr-4`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 md:px-12 py-8 md:py-10 custom-scrollbar light-scrollbar flex flex-col gap-8 md:gap-10">
            <p
              className={`${tokens.textSecondary} text-[14px] md:text-[15px] font-light md:-mt-4 mb-2`}
            >
              Configure the details for your new system entity below.
            </p>
            <div className="flex flex-col gap-2.5 md:gap-3 group">
              <label
                className={`text-[9px] tracking-[0.2em] uppercase ${tokens.textSecondary} font-bold transition-colors group-focus-within:${tokens.textPrimary}`}
              >
                Name
              </label>
              <input
                type="text"
                className={`w-full px-5 md:px-6 py-4 md:py-5 ${tokens.bgPanel} border ${tokens.borderMain} rounded-2xl md:rounded-3xl focus:outline-none focus:ring-1 focus:ring-current transition-all text-[14px] md:text-[15px] shadow-sm dark:shadow-none ${tokens.textPrimary} ${isClientTheme ? "dark:focus:ring-[#3DEDA4]/50" : ""}`}
                placeholder="e.g. Standard Chartered"
              />
            </div>
            <div className="flex flex-col gap-2.5 md:gap-3 group">
              <label
                className={`text-[9px] tracking-[0.2em] uppercase ${tokens.textSecondary} font-bold transition-colors group-focus-within:${tokens.textPrimary}`}
              >
                Description
              </label>
              <textarea
                rows={5}
                className={`w-full px-5 md:px-6 py-4 md:py-5 ${tokens.bgPanel} border ${tokens.borderMain} rounded-2xl md:rounded-3xl focus:outline-none focus:ring-1 focus:ring-current transition-all text-[14px] md:text-[15px] leading-relaxed resize-none shadow-sm dark:shadow-none ${tokens.textPrimary} ${isClientTheme ? "dark:focus:ring-[#3DEDA4]/50" : ""}`}
                placeholder="Add descriptive details..."
              />
            </div>
          </div>

          <div
            className={`p-6 md:p-10 border-t ${tokens.borderMain} flex flex-row items-center justify-end gap-3 md:gap-4 shadow-sm`}
          >
            <button
              onClick={() => setIsDrawerOpen(false)}
              className={`px-6 md:px-8 py-3.5 md:py-4 rounded-full font-medium text-[13px] md:text-[14px] ${tokens.bgHover} transition-colors w-full md:w-auto text-center ${tokens.textPrimary}`}
            >
              Cancel
            </button>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className={`px-8 md:px-10 py-3.5 md:py-4 rounded-full font-medium text-[13px] md:text-[14px] transition-all duration-300 w-full md:w-auto text-center ${tokens.btnPrimary}`}
            >
              Save Configuration
            </button>
          </div>
        </div>
      </div>

      {/* ================= GLOBAL DELETE MODAL ================= */}
      <div
        className={`fixed inset-0 z-[1100] flex items-center justify-center p-4 sm:p-6 transition-all duration-300 ${deleteModalOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <div
          className="absolute inset-0 bg-[#111111]/60 dark:bg-[#000000]/80 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setDeleteModalOpen(false)}
        />

        <div
          className={`relative w-full max-w-[420px] ${tokens.bgSurface} border ${tokens.borderMain} rounded-[2rem] shadow-[0_20px_80px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_80px_rgba(0,0,0,0.6)] p-6 sm:p-8 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] flex flex-col items-center text-center ${deleteModalOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-8"}`}
        >
          <div className="w-16 h-16 rounded-full bg-[#EA2F5D]/10 flex items-center justify-center mb-6">
            <Trash2 className="w-8 h-8 text-[#EA2F5D]" strokeWidth={1.5} />
          </div>

          <h3
            className={`text-2xl md:text-3xl font-serif-elegant ${tokens.textPrimary} mb-2`}
          >
            Delete Category
          </h3>

          <p
            className={`text-[14px] md:text-[15px] ${tokens.textSecondary} mb-8 leading-relaxed`}
          >
            Are you sure you want to delete{" "}
            <span className="font-semibold text-[#EA2F5D]">
              "{categoryToDelete?.name}"
            </span>
            ? This action cannot be undone.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
            <button
              onClick={() => setDeleteModalOpen(false)}
              className={`flex-1 w-full py-3.5 rounded-full font-medium text-[13px] md:text-[14px] ${tokens.bgHover} transition-colors ${tokens.textPrimary}`}
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className={`flex-1 w-full py-3.5 rounded-full font-medium text-[13px] md:text-[14px] text-white bg-[#EA2F5D] hover:bg-[#D42A55] shadow-[0_4px_14px_rgba(234,47,93,0.25)] hover:shadow-[0_6px_20px_rgba(234,47,93,0.3)] hover:-translate-y-0.5 transition-all duration-300`}
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
