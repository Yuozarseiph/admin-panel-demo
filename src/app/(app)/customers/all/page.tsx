// app/(app)/customers/all/page.tsx
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { FileText, Download } from "lucide-react";
import {
  customersAll,
  type CustomerRow,
  type MemberLevel,
  type MemberStatus,
} from "@/data/customers-list";

const toFa = (n: number) => n.toLocaleString("fa-IR");
const fmtMoney = (n?: number) =>
  typeof n === "number" ? `${toFa(n)} تومان` : "—";
const fmtDate = (iso?: string) =>
  iso ? new Date(iso).toLocaleDateString("fa-IR") : "—";
const fmtTime = (iso?: string) => {
  if (!iso) return "";
  const date = new Date(iso);
  const hour = date.getHours();
  const minute = date.getMinutes();
  return `${hour > 12 ? "PM" : "AM"} ${toFa(minute)}:${toFa(
    hour > 12 ? hour - 12 : hour
  )}`;
};

const getAvatarUrl = (name: string, id: string) => {
  const num = parseInt(id) % 50;
  return `https://i.pravatar.cc/80?img=${num}`;
};

type SortKey = keyof Pick<
  CustomerRow,
  | "fullName"
  | "code"
  | "level"
  | "totalPoints"
  | "usablePoints"
  | "lastPurchaseAmount"
  | "lastPurchaseDate"
  | "createdAt"
  | "status"
>;

export default function CustomersListPage() {
  const [q, setQ] = useState("");
  const [level, setLevel] = useState<MemberLevel | "همه">("همه");
  const [status, setStatus] = useState<MemberStatus | "همه">("همه");
  const [sortKey, setSortKey] = useState<SortKey>("createdAt");
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
    const qn = q.trim();
    return customersAll.filter((r) => {
      const byLevel = level === "همه" ? true : r.level === level;
      const byStatus = status === "همه" ? true : r.status === status;
      const hay = `${r.fullName} ${r.mobile ?? ""} ${r.email ?? ""} ${
        r.code
      } ${r.level} ${r.status}`.toLowerCase();
      const okQ = qn ? hay.includes(qn.toLowerCase()) : true;
      return byLevel && byStatus && okQ;
    });
  }, [q, level, status]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    arr.sort((a, b) => {
      const va = a[sortKey],
        vb = b[sortKey];
      let res = 0;
      if (typeof va === "number" && typeof vb === "number") res = va - vb;
      else res = String(va ?? "").localeCompare(String(vb ?? ""), "fa");
      return sortDir === "asc" ? res : -res;
    });
    return arr;
  }, [filtered, sortKey, sortDir]);

  const hasSearch = q.trim() !== "" || level !== "همه" || status !== "همه";
  const limitedData = hasSearch ? sorted : sorted.slice(0, 30);

  const total = limitedData.length;
  const totalAll = sorted.length;
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const clampedPage = Math.min(page, pages - 1);
  const data = limitedData.slice(
    clampedPage * pageSize,
    clampedPage * pageSize + pageSize
  );

  // Export to Excel (CSV)
  const exportCSV = () => {
    const header = [
      "نام مشتری",
      "کد عضویت",
      "سطح",
      "امتیاز کل",
      "امتیاز قابل استفاده",
      "آخرین خرید",
      "مبلغ خرید",
      "تاریخ ثبت‌نام",
      "وضعیت",
    ];
    const rows = sorted.map((r) => [
      r.fullName,
      r.code,
      r.level,
      toFa(r.totalPoints),
      toFa(r.usablePoints),
      fmtDate(r.lastPurchaseDate),
      fmtMoney(r.lastPurchaseAmount),
      fmtDate(r.createdAt),
      r.status,
    ]);
    const csvBody = [header, ...rows]
      .map((row) =>
        row.map((x) => `"${String(x).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");
    const bom = "\uFEFF";
    const blob = new Blob([bom + csvBody], {
      type: "text/csv;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "customers-list.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Export to PDF
  const exportPDF = () => {
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(`
      <html lang="fa" dir="rtl">
      <head>
        <meta charset="utf-8" />
        <title>لیست مشتریان</title>
        <style>
          body { font-family: Tahoma, Arial, sans-serif; direction: rtl; padding: 20px; }
          h2 { text-align: center; margin-bottom: 30px; }
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #ddd; padding: 8px; font-size: 12px; text-align: right; }
          th { background: #f3f4f6; font-weight: bold; }
          @media print { body { padding: 0; } }
        </style>
      </head>
      <body>
        <h2>لیست مشتریان</h2>
        <table>
          <thead>
            <tr>
              <th>نام مشتری</th>
              <th>کد عضویت</th>
              <th>سطح</th>
              <th>امتیاز کل</th>
              <th>امتیاز قابل استفاده</th>
              <th>آخرین خرید</th>
              <th>مبلغ خرید</th>
              <th>تاریخ ثبت‌نام</th>
              <th>وضعیت</th>
            </tr>
          </thead>
          <tbody>
            ${sorted
              .map(
                (r) => `
              <tr>
                <td>${r.fullName}</td>
                <td>${r.code}</td>
                <td>${r.level}</td>
                <td>${toFa(r.totalPoints)}</td>
                <td>${toFa(r.usablePoints)}</td>
                <td>${fmtDate(r.lastPurchaseDate)}</td>
                <td>${fmtMoney(r.lastPurchaseAmount)}</td>
                <td>${fmtDate(r.createdAt)}</td>
                <td>${r.status}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </body>
      </html>
    `);
    w.document.close();
    w.focus();
    w.print();
  };

  return (
    <main className="min-h-screen bg-gray-50 p-4 dark:bg-gray-950 sm:p-6">
      <div className="mx-auto max-w-[1600px]">
        <section className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
          {/* Header */}
          <div className="flex flex-col gap-4 border-b border-gray-200 px-5 py-5 dark:border-gray-800 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={level}
                onChange={(e) => {
                  setLevel(e.target.value as any);
                  setPage(0);
                }}
                className="h-9 rounded-lg border border-gray-300 bg-white px-3 text-[13px] outline-none dark:border-gray-700 dark:bg-gray-950 sm:h-10"
              >
                <option value="همه">سطح: همه</option>
                <option value="برنز">برنز</option>
                <option value="نقره">نقره</option>
                <option value="طلا">طلا</option>
                <option value="الماس">الماس</option>
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
                <option value="غیرفعال">غیرفعال</option>
                <option value="مسدود">مسدود</option>
              </select>

              <input
                dir="rtl"
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setPage(0);
                }}
                placeholder="جستجو بر اساس نام مشتری…"
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

              {/* دکمه‌های خروجی */}
              <button
                onClick={exportCSV}
                className="flex h-9 items-center gap-2 rounded-lg bg-emerald-600 px-3 text-[13px] font-medium text-white hover:bg-emerald-700 sm:h-10"
              >
                <Download className="h-4 w-4" />
                <span>خروجی اکسل</span>
              </button>

              <button
                onClick={exportPDF}
                className="flex h-9 items-center gap-2 rounded-lg bg-sky-600 px-3 text-[13px] font-medium text-white hover:bg-sky-700 sm:h-10"
              >
                <FileText className="h-4 w-4" />
                <span>خروجی PDF</span>
              </button>
            </div>
          </div>

          {/* Info Bar */}
          {!hasSearch && totalAll > 30 && (
            <div className="border-b border-gray-200 bg-amber-50 px-5 py-3 text-[13px] text-amber-700 dark:border-gray-800 dark:bg-amber-900/20 dark:text-amber-400">
              نمایش 30 مشتری اول از {toFa(totalAll)} مشتری - برای دیدن بیشتر از
              جستجو استفاده کنید
            </div>
          )}

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* همان thead و tbody قبلی... */}
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-[13px] dark:border-gray-800 dark:bg-gray-800/60">
                  <th
                    onClick={() => handleSort("fullName")}
                    className="cursor-pointer select-none px-6 py-4 text-right font-medium text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400"
                  >
                    <span className="inline-flex items-center gap-1">
                      مشتری
                      {sortKey === "fullName" && (
                        <span className="text-[11px]">
                          {sortDir === "asc" ? "▲" : "▼"}
                        </span>
                      )}
                    </span>
                  </th>
                  <th
                    onClick={() => handleSort("code")}
                    className="cursor-pointer select-none px-6 py-4 text-right font-medium text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400"
                  >
                    <span className="inline-flex items-center gap-1">
                      کد عضویت
                      {sortKey === "code" && (
                        <span className="text-[11px]">
                          {sortDir === "asc" ? "▲" : "▼"}
                        </span>
                      )}
                    </span>
                  </th>
                  <th
                    onClick={() => handleSort("level")}
                    className="cursor-pointer select-none px-6 py-4 text-right font-medium text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400"
                  >
                    <span className="inline-flex items-center gap-1">
                      سطح عضویت
                      {sortKey === "level" && (
                        <span className="text-[11px]">
                          {sortDir === "asc" ? "▲" : "▼"}
                        </span>
                      )}
                    </span>
                  </th>
                  <th
                    onClick={() => handleSort("totalPoints")}
                    className="cursor-pointer select-none px-6 py-4 text-right font-medium text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400"
                  >
                    <span className="inline-flex items-center gap-1">
                      امتیاز کل
                      {sortKey === "totalPoints" && (
                        <span className="text-[11px]">
                          {sortDir === "asc" ? "▲" : "▼"}
                        </span>
                      )}
                    </span>
                  </th>
                  <th
                    onClick={() => handleSort("usablePoints")}
                    className="cursor-pointer select-none px-6 py-4 text-right font-medium text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400"
                  >
                    <span className="inline-flex items-center gap-1">
                      امتیاز قابل استفاده
                      {sortKey === "usablePoints" && (
                        <span className="text-[11px]">
                          {sortDir === "asc" ? "▲" : "▼"}
                        </span>
                      )}
                    </span>
                  </th>
                  <th
                    onClick={() => handleSort("lastPurchaseDate")}
                    className="cursor-pointer select-none px-6 py-4 text-right font-medium text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400"
                  >
                    <span className="inline-flex items-center gap-1">
                      آخرین خرید
                      {sortKey === "lastPurchaseDate" && (
                        <span className="text-[11px]">
                          {sortDir === "asc" ? "▲" : "▼"}
                        </span>
                      )}
                    </span>
                  </th>
                  <th
                    onClick={() => handleSort("createdAt")}
                    className="cursor-pointer select-none px-6 py-4 text-right font-medium text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400"
                  >
                    <span className="inline-flex items-center gap-1">
                      تاریخ ثبت‌نام
                      {sortKey === "createdAt" && (
                        <span className="text-[11px]">
                          {sortDir === "asc" ? "▲" : "▼"}
                        </span>
                      )}
                    </span>
                  </th>
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
                </tr>
              </thead>

              <tbody className="text-[14px]">
                {data.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-gray-200 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800/40"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={getAvatarUrl(row.fullName, row.id)}
                          alt={row.fullName}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        <div className="flex flex-col">
                          <Link
                            href={row.profileUrl}
                            className="font-medium text-gray-900 hover:text-emerald-600 dark:text-gray-100 dark:hover:text-emerald-400"
                          >
                            {row.fullName}
                          </Link>
                          <span className="text-[12px] text-gray-500 dark:text-gray-400">
                            {row.email || row.mobile}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-[13px] text-gray-700 dark:text-gray-300">
                        {row.code}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={[
                          "inline-flex rounded-full px-2.5 py-1 text-[12px] font-medium",
                          row.level === "الماس"
                            ? "bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400"
                            : row.level === "طلا"
                            ? "bg-yellow-50 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400"
                            : row.level === "نقره"
                            ? "bg-gray-100 text-gray-700 dark:bg-gray-500/10 dark:text-gray-400"
                            : "bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400",
                        ].join(" ")}
                      >
                        {row.level}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">
                      {toFa(row.totalPoints)}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">
                      {toFa(row.usablePoints)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-[13px] text-gray-900 dark:text-gray-100">
                          {fmtDate(row.lastPurchaseDate)}
                        </span>
                        <span className="text-[12px] text-gray-500 dark:text-gray-400">
                          {fmtMoney(row.lastPurchaseAmount)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-[13px] text-gray-900 dark:text-gray-100">
                          {fmtDate(row.createdAt)}
                        </span>
                        <span className="text-[12px] text-gray-500 dark:text-gray-400">
                          {fmtTime(row.createdAt)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={[
                          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-medium",
                          row.status === "فعال"
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                            : row.status === "غیرفعال"
                            ? "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                            : "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400",
                        ].join(" ")}
                      >
                        <span
                          className={[
                            "h-1.5 w-1.5 rounded-full",
                            row.status === "فعال"
                              ? "bg-emerald-500"
                              : row.status === "غیرفعال"
                              ? "bg-amber-500"
                              : "bg-rose-500",
                          ].join(" ")}
                        />
                        {row.status}
                      </span>
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
              تا {toFa(clampedPage * pageSize + data.length)} از {toFa(total)}
              {!hasSearch && totalAll > 30 && ` (محدود به 30 از ${toFa(totalAll)})`}
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
