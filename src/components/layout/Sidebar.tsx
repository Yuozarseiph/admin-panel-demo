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
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type NavIcon = React.ComponentType<{ size?: number; className?: string }>;
type NavLeaf = { label: string; href: string; icon?: NavIcon; badge?: string };
type NavGroup = { label: string; href: string; icon: NavIcon; children?: NavLeaf[] };
type NavItem = NavLeaf | NavGroup;

const items: NavItem[] = [
  { label: "داشبورد", href: "/", icon: HomeIcon },
  { label: "هوش مصنوعی", href: "/ai", icon: BrainCircuit },
  {
    label: "مشتریان",
    href: "/customers",
    icon: Users,
    children: [
      { label: "همه مشتریان", href: "/customers/all" },
      // بعداً اینجا زیرمنوهای بیشتری اضافه می‌شود
    ],
  },
  { label: "کمپین‌های فروش", href: "/sales/campaigns", icon: Megaphone },
  { label: "فروش و بازاریابی", href: "/sales-marketing", icon: PresentationIcon },
  { label: "امتیازدهی و سطح‌بندی", href: "/scoring", icon: Medal },
  { label: "گزارشات فروش", href: "/sales/reports", icon: FileBarChart2 },
];

const settings: NavLeaf[] = [{ label: "تنظیمات", href: "/settings", icon: Settings }];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  // قفل اسکرول در موبایل وقتی منو باز است
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // باز/بسته بودن گروه‌ها بر اساس مسیر فعلی
  const initiallyOpen = useMemo(() => {
    const map = new Map<string, boolean>();
    items.forEach((it) => {
      if ("children" in it && it.children?.length) {
        const activeUnderGroup =
          pathname === it.href || pathname.startsWith(it.href + "/");
        map.set(it.href, activeUnderGroup);
      }
    });
    return map;
  }, [pathname]);

  const [openGroups, setOpenGroups] = useState(initiallyOpen);
  useEffect(() => setOpenGroups(initiallyOpen), [initiallyOpen]);

  const toggleGroup = (href: string) =>
    setOpenGroups((m) => new Map(m).set(href, !m.get(href)));

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
    const active = pathname === href || (href !== "/" && pathname.startsWith(href + "/"));
    return (
      <li>
        <Link
          href={href}
          onClick={onClose}
          aria-current={active ? "page" : undefined}
          className={[
            "flex items-center justify-start gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
            active
              ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white",
          ].join(" ")}
        >
          {Icon ? (
            <Icon
              size={18}
              className="block text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
            />
          ) : null}
          <span className="block truncate">{label}</span>
          {badge ? (
            <span className="ms-auto rounded-full bg-sky-100 px-2 py-0.5 text-[10px] text-sky-700 dark:bg-sky-900/30 dark:text-sky-300">
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
    const expanded = openGroups.get(href) ?? false;
    const groupActive =
      pathname === href ||
      pathname.startsWith(href + "/") ||
      children.some((c) => pathname.startsWith(c.href));
    return (
      <li>
        <button
          onClick={() => toggleGroup(href)}
          className={[
            "w-full flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
            groupActive
              ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white",
          ].join(" ")}
          aria-expanded={expanded}
          aria-controls={`grp-${href}`}
        >
          <span className="flex items-center gap-2">
            <Icon
              size={18}
              className="text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
            />
            <span className="truncate">{label}</span>
          </span>
          <ChevronDown
            size={16}
            className={["transition-transform", expanded ? "rotate-180" : "rotate-0"].join(" ")}
          />
        </button>

        <ul
          id={`grp-${href}`}
          className={[
            "ms-8 mt-1 space-y-1 overflow-hidden transition-[max-height]",
            expanded ? "max-h-96" : "max-h-0",
          ].join(" ")}
        >
          {children.map((c) => (
            <NavLeafItem key={c.href} href={c.href} label={c.label} Icon={null} />
          ))}
        </ul>
      </li>
    );
  };

  return (
    <>
      {/* Overlay برای موبایل */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={[
          "fixed right-0 top-0 z-50 h-full w-64 transform border-l border-gray-200 bg-white transition-transform duration-300 ease-in-out dark:border-gray-800 dark:bg-gray-900",
          "lg:static lg:translate-x-0", // دسکتاپ: همیشه نمایان
          open ? "translate-x-0" : "translate-x-full", // موبایل: اسلاید
        ].join(" ")}
        aria-hidden={!open}
      >
        <nav className="flex h-full flex-col p-3">
          {/* دکمه بستن فقط موبایل */}
          <div className="mb-4 flex items-center justify-between lg:hidden">
            <button
              onClick={onClose}
              aria-label="بستن منو"
              className="rounded-lg p-1.5 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mb-2 px-2 text-[10px] font-medium tracking-widest text-gray-500 dark:text-gray-400">
            نمای کلی
          </div>

          <ul className="space-y-1">
            {items.map((i) =>
              "children" in i && i.children?.length ? (
                <NavGroupItem
                  key={i.href}
                  label={i.label}
                  href={i.href}
                  Icon={(i as NavGroup).icon}         // پاس صریح آیکن
                  children={(i as NavGroup).children}
                />
              ) : (
                <NavLeafItem
                  key={(i as NavLeaf).href}
                  href={(i as NavLeaf).href}
                  label={(i as NavLeaf).label}
                  Icon={(i as NavLeaf).icon ?? null}   // پاس صریح آیکن
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
              className="group gap-2 flex items-center rounded-lg px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
            >
              <LogOut
                size={18}
                className="shrink-0 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
              />
              <span className="truncate">خروج</span>
            </Link>
          </div>
        </nav>
      </aside>
    </>
  );
}
