// app/(app)/support/open/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Trash2,
  Pencil,
  UserCircle2,
  Tag as TagIcon,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

import { openTicketsData, type Priority } from "@/data/support-open-tickets";

const toFa = (n: number) => n.toLocaleString("fa-IR");

const fmtDate = (ts: number) =>
  new Date(ts).toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const fmtTime = (ts: number) =>
  new Date(ts).toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
  });

const priorityBadge = (p: Priority) => {
  switch (p) {
    case "کم":
      return "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300";
    case "متوسط":
      return "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300";
    case "زیاد":
      return "bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300";
    case "فوری":
      return "bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300";
  }
};

const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);

export default function OpenTicketsPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggleRow = (id: string) =>
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

  const allChecked =
    openTicketsData.length > 0 && openTicketsData.every((t) => checked[t.id]);

  const toggleAll = () => {
    if (allChecked) {
      setChecked({});
    } else {
      const next: Record<string, boolean> = {};
      openTicketsData.forEach((t) => {
        next[t.id] = true;
      });
      setChecked(next);
    }
  };

  return (
    <main dir="rtl" className="p-4 sm:p-6 text-[13px] sm:text-[14px]">
      <section className="rounded-xl border border-gray-200 bg-white text-gray-800 shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 px-5 py-3 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <Link
              href="/support/tickets"
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            >
              <ArrowRight size={18} />
            </Link>
            <h1 className="text-[15px] sm:text-[16px] font-semibold">
              تیکت‌های باز
            </h1>
          </div>
          <Link
            href="/support/new"
            className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-[12px] sm:text-[13px] font-semibold text-white hover:bg-sky-700"
          >
            <Plus size={16} />
            <span>ایجاد تیکت</span>
          </Link>
        </div>
        <div className="border-b border-gray-100 px-5 py-3 text-[12px] sm:text-[13px] dark:border-gray-800">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
            <span className="rounded-full bg-white/80 px-1.5 py-0.5 text-[11px] text-gray-800 dark:bg-gray-900 dark:text-gray-100">
              {toFa(openTicketsData.length)}
            </span>
            <span>تیکت باز</span>
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-right">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-[12px] sm:text-[13px] text-gray-600 dark:border-gray-800 dark:bg-gray-800/60 dark:text-gray-200">
                <th className="px-4 py-3">مشتری</th>
                <th className="px-4 py-3">تاریخ آخرین فعالیت</th>
                <th className="px-4 py-3">برچسب / اولویت</th>
                <th className="px-4 py-3">موضوع تیکت</th>
                <th className="px-4 py-3 text-center">عملیات</th>
              </tr>
            </thead>
            <tbody className="text-[13px] sm:text-[14px]">
              {openTicketsData.map((t) => {
                const dateStr = fmtDate(t.timestamp);
                const timeStr = fmtTime(t.timestamp);
                return (
                  <tr
                    key={t.id}
                    className="border-b border-gray-200 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800/60"
                  >
                    <td className="px-4 py-3 align-top">
                      <div className="flex items-center justify-start gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 text-[11px] font-semibold text-sky-700 dark:bg-sky-900/50 dark:text-sky-200">
                          {initials(t.customerName)}
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[13px] font-medium text-gray-800 dark:text-gray-100">
                            {t.customerName}
                          </span>
                          <span className="flex items-center gap-1 text-[11px] text-gray-500 dark:text-gray-400">
                            <UserCircle2 size={12} />
                            <span>{t.customerEmail}</span>
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 align-top">
                      <div className="flex flex-col items-start gap-0.5">
                        <span className="text-[13px] font-medium text-gray-800 dark:text-gray-100">
                          {dateStr}
                        </span>
                        <span className="text-[11px] text-gray-400">
                          {timeStr}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 align-top">
                      <div className="flex flex-col items-start gap-1">
                        <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-[11px] text-gray-700 dark:bg-gray-800 dark:text-gray-200">
                          <TagIcon size={12} />
                          <span>{t.tag}</span>
                        </span>
                        <span
                          className={[
                            "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px]",
                            priorityBadge(t.priority),
                          ].join(" ")}
                        >
                          <span>اولویت:</span>
                          <span>{t.priority}</span>
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-3 align-top">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="truncate text-[13px] font-semibold text-gray-800 dark:text-gray-100">
                            {t.title}
                          </span>
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                            باز
                          </span>
                        </div>
                        <span className="inline-flex items-center gap-1 text-[11px] text-gray-500 dark:text-gray-400">
                          <MessageCircle size={12} />
                          <span>{t.channel}</span>
                          <span className="text-gray-400">•</span>
                          <span>{t.shortDate}</span>
                        </span>
                        <p className="line-clamp-2 text-[12px] leading-5 text-gray-500 dark:text-gray-300">
                          {t.snippet}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 text-gray-500 hover:bg-red-50 hover:text-red-600 dark:border-gray-700 dark:text-gray-400 dark:hover:border-red-500 dark:hover:bg-red-950/40 dark:hover:text-red-300"
                        >
                          <Trash2 size={14} />
                        </button>
                        <button
                          type="button"
                          className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
                        >
                          <Pencil size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
