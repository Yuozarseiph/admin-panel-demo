// components/layout/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
    href: "/sales",
    icon: Megaphone,
    children: [
      { label: "لیست کمپین ها", href: "/sales/campaigns", icon: ListChecks },
      { label: "کمپین جدید", href: "/sales/new-campaigns", icon: PlusCircle },
      {
        label: "ساخت کمپین با هوش مصنوعی",
        href: "/sales/new-campaigns-ai",
        icon: Bot,
      },
      {
        label: "گزارش کلی کمپین ها",
        href: "/sales/campaigns-full-report",
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
      {
        label: "هوش مصنوعی بازاریابی",
        href: "/sales-marketing/ai",
        icon: Bot,
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
];

const settings: NavLeaf[] = [
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

  const groupKeys = useMemo(
    () =>
      items
        .filter(
          (it): it is NavGroup => "children" in it && !!it.children?.length
        )
        .map((g) => g.href),
    []
  );

  const defaultOpenKey = useMemo(() => {
    const hit = groupKeys.find(
      (g) => pathname === g || pathname.startsWith(g + "/")
    );
    return hit ?? null;
  }, [pathname, groupKeys]);

  const [openKey, setOpenKey] = useState<string | null>(defaultOpenKey);
  useEffect(() => setOpenKey(defaultOpenKey), [defaultOpenKey]);

  const toggleGroup = (href: string) =>
    setOpenKey((cur) => (cur === href ? null : href));

  const NavLeafItem = ({
    href,
    label,
    Icon,
    badge,
  }: {
    href: string;
    label: string;
    Icon?: NavIcon | null;
    badge?: string;
  }) => {
    const active =
      pathname === href || (href !== "/" && pathname.startsWith(href + "/"));
    return (
      <li>
        <Link
          href={href}
          onClick={onClose}
          aria-current={active ? "page" : undefined}
          className={[
            "group flex items-center justify-start gap-2 rounded-lg px-3 py-2.5 text-[16px] transition-colors",
            active
              ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white"
              : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white",
          ].join(" ")}
        >
          {Icon ? (
            <Icon
              size={20}
              className="block text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
            />
          ) : null}
          <span className="block truncate leading-6">{label}</span>
          {badge ? (
            <span className="ms-auto rounded-full bg-sky-100 px-2.5 py-0.5 text-[12px] text-sky-700 dark:bg-sky-900/30 dark:text-sky-300">
              {badge}
            </span>
          ) : null}
        </Link>
      </li>
    );
  };

  const NavGroupItem = ({
    label,
    href,
    Icon,
    children = [],
  }: {
    label: string;
    href: string;
    Icon: NavIcon;
    children?: NavLeaf[];
  }) => {
    const expanded = openKey === href;
    const groupActive =
      pathname === href ||
      pathname.startsWith(href + "/") ||
      children.some((c) => pathname.startsWith(c.href));

    return (
      <li>
        <button
          onClick={() => toggleGroup(href)}
          className={[
            "group w-full flex items-center justify-between rounded-lg px-3 py-2.5 text-[16px] transition-colors",
            groupActive
              ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white"
              : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white",
          ].join(" ")}
          aria-expanded={expanded}
          aria-controls={`grp-${href}`}
        >
          <span className="flex items-center gap-2">
            <Icon
              size={20}
              className="text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
            />
            <span className="truncate leading-6">{label}</span>
          </span>
          <ChevronDown
            size={18}
            className={[
              "transition-transform duration-200",
              expanded ? "rotate-180" : "rotate-0",
            ].join(" ")}
          />
        </button>

        {/* رپر انیمیشنی با Framer Motion */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key={href}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <ul
                id={`grp-${href}`}
                className={[
                  "ms-8 mt-1 space-y-1 overflow-hidden",
                  "transition-[max-height] duration-300 ease-out",
                  expanded ? "max-h-96" : "max-h-0",
                ].join(" ")}
              >
                {children.map((c) => (
                  <NavLeafItem
                    key={c.href}
                    href={c.href}
                    label={c.label}
                    Icon={c.icon ?? null}
                  />
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </li>
    );
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={[
          "fixed right-0 top-0 z-50 h-full w-72 transform border-l border-gray-200 bg-white transition-transform duration-300 ease-in-out dark:border-gray-800 dark:bg-gray-900",
          "lg:static lg:translate-x-0",
          open ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
        aria-hidden={!open}
      >
        <nav className="flex h-full flex-col p-3">
          <div className="mb-4 flex items-center justify-between lg:hidden">
            <button
              onClick={onClose}
              aria-label="بستن منو"
              className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            >
              <X size={20} />
            </button>
          </div>

          <div className="mb-2 px-2 text-[12px] font-medium tracking-widest text-gray-500 dark:text-gray-400">
            نمای کلی
          </div>

          <ul className="space-y-1">
            {items.map((i) =>
              "children" in i && i.children?.length ? (
                <NavGroupItem
                  key={i.href}
                  label={i.label}
                  href={i.href}
                  Icon={(i as NavGroup).icon}
                  children={(i as NavGroup).children}
                />
              ) : (
                <NavLeafItem
                  key={(i as NavLeaf).href}
                  href={(i as NavLeaf).href}
                  label={(i as NavLeaf).label}
                  Icon={(i as NavLeaf).icon ?? null}
                  badge={(i as NavLeaf).badge}
                />
              )
            )}
          </ul>

          <div className="my-4 h-px bg-gray-200 dark:bg-gray-800" />

          <ul className="space-y-1">
            {settings.map((i) => (
              <NavLeafItem
                key={i.href}
                href={i.href}
                label={i.label}
                Icon={i.icon ?? null}
              />
            ))}
          </ul>

          <div className="mt-auto pt-3">
            <Link
              href="/logout"
              onClick={onClose}
              className="group flex items-center gap-2 rounded-lg px-3 py-2.5 text-[16px] text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
            >
              <LogOut
                size={20}
                className="shrink-0 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
              />
              <span className="truncate leading-6">خروج</span>
            </Link>
          </div>
        </nav>
      </aside>
    </>
  );
}
