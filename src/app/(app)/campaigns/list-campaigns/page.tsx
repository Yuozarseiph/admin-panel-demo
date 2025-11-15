// app/(app)/sales/campaigns/page.tsx
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  campaigns,
  type CampaignRow,
  type CampaignStatus,
  type CampaignType,
} from "@/data/campaigns";

const toFa = (n: number) => n.toLocaleString("fa-IR");
const fmtDate = (iso?: string) =>
  iso ? new Date(iso).toLocaleDateString("fa-IR") : "—";
const fmtRate = (r: number) => `${(r * 100).toFixed(1)}٪`;

type SortKey = keyof Pick<
  CampaignRow,
  | "name"
  | "type"
  | "status"
  | "startAt"
  | "endAt"
  | "participantsTotal"
  | "participantsToday"
  | "conversionRate"
>;

export default function CampaignsPage() {
  const [q, setQ] = useState("");
  const [type, setType] = useState<CampaignType | "همه">("همه");
  const [status, setStatus] = useState<CampaignStatus | "همه">("همه");
  const [sortKey, setSortKey] = useState<SortKey>("startAt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(0);
  const pageSize = 10;

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const filtered = useMemo(() => {
    const qn = q.trim().toLowerCase();
    return campaigns.filter((r) => {
      const okType = type === "همه" ? true : r.type === type;
      const okStatus = status === "همه" ? true : r.status === status;
      const hay = `${r.id} ${r.name} ${r.type} ${r.status}`.toLowerCase();
      const okQ = qn ? hay.includes(qn) : true;
      return okType && okStatus && okQ;
    });
  }, [q, type, status]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    arr.sort((a, b) => {
      const va = a[sortKey] as any;
      const vb = b[sortKey] as any;
      let res = 0;
      if (typeof va === "number" && typeof vb === "number") res = va - vb;
      else res = String(va ?? "").localeCompare(String(vb ?? ""), "fa");
      return sortDir === "asc" ? res : -res;
    });
    return arr;
  }, [filtered, sortKey, sortDir]);

  const total = sorted.length;
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const clampedPage = Math.min(page, pages - 1);
  const data = sorted.slice(
    clampedPage * pageSize,
    clampedPage * pageSize + pageSize
  );

  return (
    <main className="min-h-screen bg-gray-50 p-4 dark:bg-gray-950 sm:p-6">
      <div className="mx-auto max-w-[1600px]">
        <section className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
          {/* Header */}
          <div className="flex flex-col gap-4 border-b border-gray-200 px-5 py-5 dark:border-gray-800 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={type}
                onChange={(e) => {
                  setType(e.target.value as any);
                  setPage(0);
                }}
                className="h-9 rounded-lg border border-gray-300 bg-white px-3 text-[13px] outline-none dark:border-gray-700 dark:bg-gray-950 sm:h-10"
              >
                <option value="همه">نوع: همه</option>
                <option value="تخفیف">تخفیف</option>
                <option value="امتیاز دوبل">امتیاز دوبل</option>
                <option value="هدیه">هدیه</option>
                <option value="چالش">چالش</option>
              </select>

              <select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value as any);
                  setPage(0);
                }}
                className="h-9 rounded-lg border border-gray-300 bg-white px-3 text-[13px] outline-none dark:border-gray-700 dark:bg-gray-950 sm:h-10"
              >
                <option value="همه">وضعیت: همه</option>
                <option value="فعال">فعال</option>
                <option value="زمان‌بندی">زمان‌بندی</option>
                <option value="تمام‌شده">تمام‌شده</option>
                <option value="متوقف">متوقف</option>
              </select>

              <input
                dir="rtl"
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setPage(0);
                }}
                placeholder="جستجو در نام/نوع/وضعیت…"
                className="h-9 w-64 rounded-lg border border-gray-300 bg-white px-3 text-[13px] outline-none placeholder:text-gray-500 dark:border-gray-700 dark:bg-gray-950 sm:h-10"
              />

              <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 sm:h-10 sm:w-10">
                <svg
                  className="h-4 w-4 text-gray-600 dark:text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-[13px] dark:border-gray-800 dark:bg-gray-800/60">
                  {/* ستون 1: نام کمپین */}
                  <th
                    onClick={() => handleSort("name")}
                    className="cursor-pointer select-none px-6 py-4 text-right font-medium text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400"
                  >
                    <span className="inline-flex items-center gap-1">
                      نام کمپین
                      {sortKey === "name" && (
                        <span className="text-[11px]">
                          {sortDir === "asc" ? "▲" : "▼"}
                        </span>
                      )}
                    </span>
                  </th>

                  {/* ستون 2: نوع */}
                  <th
                    onClick={() => handleSort("type")}
                    className="cursor-pointer select-none px-6 py-4 text-right font-medium text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400"
                  >
                    <span className="inline-flex items-center gap-1">
                      نوع
                      {sortKey === "type" && (
                        <span className="text-[11px]">
                          {sortDir === "asc" ? "▲" : "▼"}
                        </span>
                      )}
                    </span>
                  </th>

                  {/* ستون 3: وضعیت */}
                  <th
                    onClick={() => handleSort("status")}
                    className="cursor-pointer select-none px-6 py-4 text-right font-medium text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400"
                  >
                    <span className="inline-flex items-center gap-1">
                      وضعیت
                      {sortKey === "status" && (
                        <span className="text-[11px]">
                          {sortDir === "asc" ? "▲" : "▼"}
                        </span>
                      )}
                    </span>
                  </th>

                  {/* ستون 4: تاریخ شروع */}
                  <th
                    onClick={() => handleSort("startAt")}
                    className="cursor-pointer select-none px-6 py-4 text-right font-medium text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400"
                  >
                    <span className="inline-flex items-center gap-1">
                      تاریخ شروع
                      {sortKey === "startAt" && (
                        <span className="text-[11px]">
                          {sortDir === "asc" ? "▲" : "▼"}
                        </span>
                      )}
                    </span>
                  </th>

                  {/* ستون 5: تاریخ پایان */}
                  <th
                    onClick={() => handleSort("endAt")}
                    className="cursor-pointer select-none px-6 py-4 text-right font-medium text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400"
                  >
                    <span className="inline-flex items-center gap-1">
                      تاریخ پایان
                      {sortKey === "endAt" && (
                        <span className="text-[11px]">
                          {sortDir === "asc" ? "▲" : "▼"}
                        </span>
                      )}
                    </span>
                  </th>

                  {/* ستون 6: شرکت‌کننده */}
                  <th
                    onClick={() => handleSort("participantsTotal")}
                    className="cursor-pointer select-none px-6 py-4 text-right font-medium text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400"
                  >
                    <span className="inline-flex items-center gap-1">
                      شرکت‌کننده
                      {sortKey === "participantsTotal" && (
                        <span className="text-[11px]">
                          {sortDir === "asc" ? "▲" : "▼"}
                        </span>
                      )}
                    </span>
                  </th>

                  {/* ستون 7: نرخ تبدیل */}
                  <th
                    onClick={() => handleSort("conversionRate")}
                    className="cursor-pointer select-none px-6 py-4 text-right font-medium text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400"
                  >
                    <span className="inline-flex items-center gap-1">
                      نرخ تبدیل
                      {sortKey === "conversionRate" && (
                        <span className="text-[11px]">
                          {sortDir === "asc" ? "▲" : "▼"}
                        </span>
                      )}
                    </span>
                  </th>

                  {/* ستون 8: عملیات */}
                  <th className="px-6 py-4 text-right font-medium text-gray-700 dark:text-gray-300">
                    عملیات
                  </th>
                </tr>
              </thead>

              <tbody className="text-[14px]">
                {data.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-gray-200 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800/40"
                  >
                    {/* ستون 1: نام کمپین */}
                    <td className="px-6 py-4">
                      <Link
                        href={row.href}
                        className="font-medium text-gray-900 hover:text-emerald-600 dark:text-gray-100 dark:hover:text-emerald-400"
                      >
                        {row.name}
                      </Link>
                    </td>

                    {/* ستون 2: نوع */}
                    <td className="px-6 py-4">
                      <span
                        className={[
                          "inline-flex rounded-full px-2.5 py-1 text-[12px] font-medium",
                          row.type === "تخفیف"
                            ? "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
                            : row.type === "امتیاز دوبل"
                            ? "bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400"
                            : row.type === "هدیه"
                            ? "bg-pink-50 text-pink-700 dark:bg-pink-500/10 dark:text-pink-400"
                            : "bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400",
                        ].join(" ")}
                      >
                        {row.type}
                      </span>
                    </td>

                    {/* ستون 3: وضعیت */}
                    <td className="px-6 py-4">
                      <span
                        className={[
                          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-medium",
                          row.status === "فعال"
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                            : row.status === "زمان‌بندی"
                            ? "bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-400"
                            : row.status === "تمام‌شده"
                            ? "bg-gray-100 text-gray-700 dark:bg-gray-500/10 dark:text-gray-400"
                            : "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400",
                        ].join(" ")}
                      >
                        <span
                          className={[
                            "h-1.5 w-1.5 rounded-full",
                            row.status === "فعال"
                              ? "bg-emerald-500"
                              : row.status === "زمان‌بندی"
                              ? "bg-sky-500"
                              : row.status === "تمام‌شده"
                              ? "bg-gray-500"
                              : "bg-rose-500",
                          ].join(" ")}
                        />
                        {row.status}
                      </span>
                    </td>

                    {/* ستون 4: تاریخ شروع */}
                    <td className="px-6 py-4 text-[13px] text-gray-900 dark:text-gray-100">
                      {fmtDate(row.startAt)}
                    </td>

                    {/* ستون 5: تاریخ پایان */}
                    <td className="px-6 py-4 text-[13px] text-gray-900 dark:text-gray-100">
                      {fmtDate(row.endAt)}
                    </td>

                    {/* ستون 6: شرکت‌کننده */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          {toFa(row.participantsTotal)}
                        </span>
                        <span className="text-[12px] text-gray-500 dark:text-gray-400">
                          {toFa(row.participantsToday)} امروز
                        </span>
                      </div>
                    </td>

                    {/* ستون 7: نرخ تبدیل */}
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">
                      {fmtRate(row.conversionRate)}
                    </td>

                    {/* ستون 8: عملیات */}
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <Link
                          href={row.href}
                          className="inline-flex h-9 items-center rounded-lg border border-gray-300 px-3 text-[12px] hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                        >
                          جزئیات
                        </Link>
                        <button className="inline-flex h-9 items-center rounded-lg border border-gray-300 px-3 text-[12px] hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
                          توقف
                        </button>
                        <button className="inline-flex h-9 items-center rounded-lg border border-gray-300 px-3 text-[12px] hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
                          کپی
                        </button>
                        <button className="inline-flex h-9 items-center rounded-lg border border-gray-300 px-3 text-[12px] hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
                          گزارش
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {data.length === 0 && (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-6 py-12 text-center text-[14px] text-gray-500"
                    >
                      نتیجه‌ای یافت نشد
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-200 px-5 py-4 dark:border-gray-800 sm:flex-row">
            <div className="text-[13px] text-gray-600 dark:text-gray-400">
              نمایش {toFa(clampedPage * pageSize + Math.min(1, data.length))}{" "}
              تا {toFa(clampedPage * pageSize + data.length)} از {toFa(total)}{" "}
              نتیجه
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(0)}
                disabled={clampedPage === 0}
                className="flex h-9 items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 text-[13px] transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-950 dark:hover:bg-gray-800"
              >
                <span>«</span>
                <span>اول</span>
              </button>

              <button
                onClick={() => setPage(Math.max(0, clampedPage - 1))}
                disabled={clampedPage === 0}
                className="flex h-9 items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 text-[13px] transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-950 dark:hover:bg-gray-800"
              >
                <span>‹</span>
                <span>قبلی</span>
              </button>

              <div className="flex items-center gap-1 px-2 text-[13px] text-gray-700 dark:text-gray-300">
                <span>صفحه</span>
                <span className="font-medium">{toFa(clampedPage + 1)}</span>
                <span>از</span>
                <span className="font-medium">{toFa(pages)}</span>
              </div>

              <button
                onClick={() => setPage(Math.min(pages - 1, clampedPage + 1))}
                disabled={clampedPage >= pages - 1}
                className="flex h-9 items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 text-[13px] transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-950 dark:hover:bg-gray-800"
              >
                <span>بعدی</span>
                <span>›</span>
              </button>

              <button
                onClick={() => setPage(pages - 1)}
                disabled={clampedPage >= pages - 1}
                className="flex h-9 items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 text-[13px] transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-950 dark:hover:bg-gray-800"
              >
                <span>آخر</span>
                <span>»</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
