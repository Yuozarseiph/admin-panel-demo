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
} from "lucide-react";
import { useEffect } from "react";

const items = [
  { label: "داشبورد", href: "/", icon: HomeIcon },
  { label: "هوش مصنوعی", href: "/ai", icon: BrainCircuit },
  { label: "مشتریان", href: "/customers", icon: Users },
  { label: "کمپین‌های فروش", href: "/sales/campaigns", icon: Megaphone },
  {
    label: "فروش و بازاریابی",
    href: "/sales-marketing",
    icon: PresentationIcon,
  },
  { label: "امتیازدهی و سطح‌بندی", href: "/scoring", icon: Medal },
  { label: "گزارشات فروش", href: "/sales/reports", icon: FileBarChart2 },
];
const settings = [{ label: "تنظیمات", href: "/settings", icon: Settings }];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  // قفل اسکرول در موبایل وقتی منو باز است
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const NavItem = ({ href, label, Icon, badge }: any) => {
    const active =
      pathname === href || (href !== "/" && pathname.startsWith(href + "/"));
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
          <Icon
            size={18}
            className="block text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
          />
          <span className="block truncate">{label}</span>
        </Link>
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
            {items.map((i) => (
              <NavItem
                key={i.href}
                href={i.href}
                label={i.label}
                Icon={i.icon}
                badge={(i as any).badge}
              />
            ))}
          </ul>

          <div className="my-4 h-px bg-gray-200 dark:bg-gray-800" />

          <ul className="space-y-1">
            {settings.map((i) => (
              <NavItem
                key={i.href}
                href={i.href}
                label={i.label}
                Icon={i.icon}
              />
            ))}
          </ul>

          <div className="mt-auto pt-3">
            <Link
              href="/logout"
              className="group gap-2 flex items-center rounded-lg px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
            >
              <LogOut
                size={18}
                className=" shrink-0 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
              />
              <span className="truncate">خروج</span>
            </Link>
          </div>
        </nav>
      </aside>
    </>
  );
}
