// components/layout/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Collapse } from "rizzui";
import { cn } from "@/lib/utils";
import {
  X,
  BrainCircuit,
  Users,
  Megaphone,
  PresentationIcon,
  Medal,
  FileBarChart2,
  Settings,
  LogOut,
  HomeIcon,
  ChevronDown,
  MessageSquare,
  BellRing,
  Percent as PercentIcon,
  Flashlight,
  ListChecks,
  Bot,
  Gift,
  Wand2,
  UserPlus,
  UsersRound,
  PlusCircle,
  BarChart3,
  Ticket,
  TicketCheck,
  TicketPlus,
} from "lucide-react";
import { useEffect } from "react";

type NavIcon = React.ComponentType<{ size?: number; className?: string }>;
type NavLeaf = { label: string; href: string; icon?: NavIcon; badge?: string };
type NavGroup = {
  label: string;
  href: string;
  icon: NavIcon;
  children?: NavLeaf[];
};
type NavItem = NavLeaf | NavGroup;

const items: NavItem[] = [
  { label: "داشبورد", href: "/", icon: HomeIcon },
  { label: "هوش مصنوعی", href: "/ai", icon: BrainCircuit },

  {
    label: "مشتریان",
    href: "/customers",
    icon: Users,
    children: [
      { label: "همه مشتریان", href: "/customers/all", icon: UsersRound },
      { label: "افزودن مشتری", href: "/customers/new", icon: UserPlus },
    ],
  },

  {
    label: "کمپین‌های فروش",
    href: "/campaigns",
    icon: Megaphone,
    children: [
      {
        label: "لیست کمپین ها",
        href: "/campaigns/list-campaigns",
        icon: ListChecks,
      },
      {
        label: "کمپین جدید",
        href: "/campaigns/new-campaigns",
        icon: PlusCircle,
      },
      {
        label: "ایجاد کمپین با هوش مصنوعی",
        href: "/campaigns/new-campaigns-ai",
        icon: Bot,
      },
      {
        label: "گزارش کلی کمپین ها",
        href: "/campaigns/campaigns-full-report",
        icon: BarChart3,
      },
    ],
  },

  {
    label: "فروش و بازاریابی",
    href: "/sales-marketing",
    icon: PresentationIcon,
    children: [
      {
        label: "اطلاع رسانی سریع",
        href: "/sales-marketing/quick-broadcast",
        icon: BellRing,
      },
      {
        label: "پروموشن و تخفیف",
        href: "/sales-marketing/promotions",
        icon: PercentIcon,
      },
      {
        label: "آفرهای لحظه ای",
        href: "/sales-marketing/flash-offers",
        icon: Flashlight,
      },
      {
        label: "ساخت لیست ارسال",
        href: "/sales-marketing/send-lists",
        icon: ListChecks,
      },
    ],
  },

  {
    label: "امتیازدهی و پاداش",
    href: "/rewards",
    icon: Medal,
    children: [
      { label: "ایجاد امتیاز و پاداش", href: "/rewards/new", icon: Gift },
      { label: "ایجاد با هوش مصنوعی", href: "/rewards/new-ai", icon: Wand2 },
    ],
  },

  { label: "گزارشات فروش", href: "/sales/reports", icon: FileBarChart2 },

  {
    label: "تیکت و پشتیبانی",
    href: "/support",
    icon: MessageSquare,
    children: [
      { label: "همه تیکت‌ها", href: "/support/tickets", icon: Ticket },
      { label: "تیکت‌های باز", href: "/support/open", icon: TicketCheck },
      { label: "ایجاد تیکت", href: "/support/new", icon: TicketPlus },
    ],
  },
  { label: "تنظیمات", href: "/settings", icon: Settings },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const NavLeafItem = ({
    href,
    label,
    icon: Icon,
    badge,
    isChild = false,
  }: NavLeaf & { icon?: NavIcon; isChild?: boolean }) => {
    const active =
      pathname === href || (href !== "/" && pathname.startsWith(href + "/"));

    return (
      <Link
        href={href}
        onClick={onClose}
        className={cn(
          "group relative flex items-center justify-between rounded-md px-3 py-2 font-medium capitalize transition-colors duration-200",
          isChild
            ? "mx-3.5 mb-0.5 last-of-type:mb-1 lg:last-of-type:mb-2 2xl:mx-5"
            : "mx-3 my-0.5 lg:my-1 2xl:mx-5 2xl:my-2",
          active
            ? `${!isChild ? "before:top-2/5 before:absolute before:-start-3 before:block before:h-4/5 before:w-1 before:rounded-ee-md before:rounded-se-md before:bg-emerald-500 2xl:before:-start-5" : ""} text-emerald-600 dark:text-emerald-400`
            : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200"
        )}
      >
        <div className="flex items-center truncate">
          {Icon ? (
            <span
              className={cn(
                "inline-flex items-center justify-center rounded-md",
                isChild
                  ? cn(
                      "me-[18px] ms-1 h-1 w-1 rounded-full bg-current transition-all duration-200",
                      active
                        ? "bg-emerald-500 ring-[1px] ring-emerald-500"
                        : "opacity-40"
                    )
                  : cn(
                      "me-2 size-5 [&>svg]:size-5",
                      active
                        ? "text-emerald-500"
                        : "text-gray-800 dark:text-gray-200 dark:group-hover:text-gray-700"
                    )
              )}
            >
              {!isChild && <Icon size={20} />}
            </span>
          ) : null}
          <span className="truncate">{label}</span>
        </div>

        {badge ? (
          <span className="ms-auto rounded-full bg-sky-100 px-2 py-0.5 text-xs text-sky-700 dark:bg-sky-900/30 dark:text-sky-300">
            {badge}
          </span>
        ) : null}
      </Link>
    );
  };

  const NavGroupItem = ({
    label,
    href,
    icon: Icon,
    children = [],
  }: NavGroup) => {
    const isDropdownOpen =
      pathname === href ||
      pathname.startsWith(href + "/") ||
      children?.some((c) => pathname.startsWith(c.href));

    return (
      <Collapse
        defaultOpen={isDropdownOpen}
        header={({ open, toggle }) => (
          <div
            onClick={toggle}
            className={cn(
              "group relative mx-3 flex cursor-pointer items-center justify-between rounded-md px-3 py-2 font-medium lg:my-1 2xl:mx-5 2xl:my-2",
              isDropdownOpen
                ? "before:top-2/5 text-emerald-600 dark:text-emerald-400 before:absolute before:-start-3 before:block before:h-4/5 before:w-1 before:rounded-ee-md before:rounded-se-md before:bg-emerald-500 2xl:before:-start-5"
                : "text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-200 dark:hover:text-gray-700"
            )}
          >
            <span className="flex items-center">
              {Icon && (
                <span
                  className={cn(
                    "me-2 inline-flex h-5 w-5 items-center justify-center rounded-md [&>svg]:h-[20px] [&>svg]:w-[20px]",
                    isDropdownOpen
                      ? "text-emerald-500"
                      : "text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-700"
                  )}
                >
                  <Icon size={20} />
                </span>
              )}
              {label}
            </span>

            <ChevronDown
              strokeWidth={3}
              className={cn(
                "h-3.5 w-3.5 -rotate-90 text-gray-500 transition-transform duration-200 rtl:rotate-90",
                open && "rotate-0 rtl:rotate-0"
              )}
            />
          </div>
        )}
      >
        {children?.map((dropdownItem) => (
          <NavLeafItem
            key={dropdownItem.href}
            href={dropdownItem.href}
            label={dropdownItem.label}
            icon={dropdownItem.icon}
            badge={dropdownItem.badge}
            isChild={true}
          />
        ))}
      </Collapse>
    );
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed right-0 top-0 z-50 h-full w-72 border-l border-gray-200 bg-white shadow-xl transition-transform duration-300 ease-in-out dark:border-gray-800 dark:bg-gray-900",
          "lg:static lg:translate-x-0 lg:shadow-none",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex h-full flex-col p-3 text-sm">
          <div className="mb-4 flex items-center justify-between lg:hidden">
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mb-2 px-4 text-xs font-medium tracking-widest text-gray-500 dark:text-gray-400">
            نمای کلی
          </div>

          <div className="mt-4 pb-3 3xl:mt-6 flex-1 overflow-y-auto">
            {items.map((item) =>
              "children" in item ? (
                <NavGroupItem
                  key={item.href}
                  label={item.label}
                  href={item.href}
                  icon={item.icon}
                  children={item.children}
                />
              ) : (
                <NavLeafItem
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  icon={item.icon}
                />
              )
            )}
          </div>

          <div className="my-4 h-px bg-gray-200 dark:bg-gray-800" />

          <div className="mt-auto pt-3">
            <Link
              href="/logout"
              onClick={onClose}
              className="group mx-3 flex items-center gap-2 rounded-md px-3 py-2.5 font-medium text-gray-700 transition-colors duration-200 hover:bg-red-50 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-900/10 dark:hover:text-red-400 2xl:mx-5"
            >
              <LogOut
                size={18}
                className="text-gray-400 transition-colors group-hover:text-red-500 dark:text-gray-500 dark:group-hover:text-red-400"
              />
              <span className="truncate">خروج</span>
            </Link>
          </div>
        </nav>
      </aside>
    </>
  );
}
