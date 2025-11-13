// app/(app)/sales/campaigns/page.tsx
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { campaigns, type CampaignRow, type CampaignStatus, type CampaignType } from "@/data/campaigns";

const toFa = (n: number) => n.toLocaleString("fa-IR");
const fmtDate = (iso?: string) => (iso ? new Date(iso).toLocaleDateString("fa-IR") : "—");
const fmtRate = (r: number) => `${(r * 100).toFixed(1)}٪`;

type SortKey = keyof Pick<
  CampaignRow,
  "name" | "type" | "status" | "startAt" | "endAt" | "participantsTotal" | "participantsToday" | "conversionRate"
>;

export default function CampaignsPage() {
  const [q, setQ] = useState("");
  const [type, setType] = useState<CampaignType | "همه">("همه");
  const [status, setStatus] = useState<CampaignStatus | "همه">("همه");
  const [sortKey, setSortKey] = useState<SortKey>("startAt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
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
  const data = sorted.slice(clampedPage * pageSize, clampedPage * pageSize + pageSize);
  const exportCSV = () => {
    const header = ["نام کمپین","نوع","وضعیت","تاریخ شروع","تاریخ پایان","تعداد شرکت‌کننده (کل/امروز)","نرخ تبدیل"];
    const rows = sorted.map((r) => [
      r.name,
      r.type,
      r.status,
      fmtDate(r.startAt),
      fmtDate(r.endAt),
      `${toFa(r.participantsTotal)} / ${toFa(r.participantsToday)}`,
      fmtRate(r.conversionRate),
    ]);
    const csvBody = [header, ...rows].map((row) => row.map((x) => `"${String(x).replace(/"/g,'""')}"`).join(",")).join("\n");
    const bom = "\uFEFF";
    const blob = new Blob([bom + csvBody], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "campaigns.csv"; a.click(); URL.revokeObjectURL(url);
  };
  const exportPDF = () => {
    const w = window.open("", "_blank"); if (!w) return;
    w.document.write(`
      <html lang="fa" dir="rtl"><head><meta charset="utf-8" />
      <title>لیست کمپین‌ها</title>
      <style>body{font-family:sans-serif;direction:rtl}table{border-collapse:collapse;width:100%}th,td{border:1px solid #ddd;padding:10px;font-size:16px}th{background:#f3f4f6}</style>
      </head><body><h3>لیست کمپین‌ها</h3>
      <table><thead><tr>
        <th>نام کمپین</th><th>نوع</th><th>وضعیت</th><th>تاریخ شروع</th><th>تاریخ پایان</th><th>شرکت‌کننده (کل/امروز)</th><th>نرخ تبدیل</th>
      </tr></thead><tbody>
      ${sorted.map(r => `<tr>
        <td>${r.name}</td>
        <td>${r.type}</td>
        <td>${r.status}</td>
        <td>${fmtDate(r.startAt)}</td>
        <td>${fmtDate(r.endAt)}</td>
        <td>${toFa(r.participantsTotal)} / ${toFa(r.participantsToday)}</td>
        <td>${fmtRate(r.conversionRate)}</td>
      </tr>`).join("")}
      </tbody></table></body></html>
    `);
    w.document.close(); w.focus(); w.print();
  };

  return (
    <main className="p-4 sm:p-6 text-[20px]">
      <section className="rounded-xl border border-gray-200 bg-white text-gray-800 shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100">
        <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-[22px] font-semibold">لیست کمپین‌ها</h2>
          <div className="flex flex-wrap items-center gap-3 text-[16px]">
            <input dir="rtl" value={q} onChange={(e)=>{setQ(e.target.value); setPage(0);}} placeholder="جستجو در نام/نوع/وضعیت…" className="h-11 w-80 rounded-md border border-gray-300 bg-white px-4 text-[16px] outline-none placeholder:text-gray-500 dark:border-gray-700 dark:bg-gray-950" />
            <select value={type} onChange={(e)=>{setType(e.target.value as any); setPage(0);}} className="h-11 rounded-md border border-gray-300 bg-white px-3 text-[16px] dark:border-gray-700 dark:bg-gray-950">
              <option value="همه">نوع: همه</option>
              <option value="تخفیف">تخفیف</option>
              <option value="امتیاز دوبل">امتیاز دوبل</option>
              <option value="هدیه">هدیه</option>
              <option value="چالش">چالش</option>
            </select>
            <select value={status} onChange={(e)=>{setStatus(e.target.value as any); setPage(0);}} className="h-11 rounded-md border border-gray-300 bg-white px-3 text-[16px] dark:border-gray-700 dark:bg-gray-950">
              <option value="همه">وضعیت: همه</option>
              <option value="فعال">فعال</option>
              <option value="زمان‌بندی">زمان‌بندی</option>
              <option value="تمام‌شده">تمام‌شده</option>
              <option value="متوقف">متوقف</option>
            </select>
            <button onClick={exportCSV} className="h-11 rounded-md bg-sky-600 px-4 text-[16px] font-semibold text-white hover:bg-sky-700">خروجی اکسل</button>
            <button onClick={exportPDF} className="h-11 rounded-md bg-emerald-600 px-4 text-[16px] font-semibold text-white hover:bg-emerald-700">خروجی PDF</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-y border-gray-200 bg-gray-50 text-[16px] text-gray-700 dark:border-gray-800 dark:bg-gray-800/60 dark:text-gray-200">
                {[
                  { key: "name" as SortKey, label: "نام کمپین" },
                  { key: "type" as SortKey, label: "نوع" },
                  { key: "status" as SortKey, label: "وضعیت" },
                  { key: "startAt" as SortKey, label: "تاریخ شروع" },
                  { key: "endAt" as SortKey, label: "تاریخ پایان" },
                  { key: "participantsTotal" as SortKey, label: "شرکت‌کننده (کل/امروز)" },
                  { key: "conversionRate" as SortKey, label: "نرخ تبدیل" },
                  { key: null, label: "عملیات" },
                ].map((c) => (
                  <th
                    key={c.label}
                    onClick={() => c.key && handleSort(c.key)}
                    className={[
                      "select-none px-6 py-4 text-right",
                      c.key ? "cursor-pointer hover:text-sky-600 dark:hover:text-sky-300" : "cursor-default",
                    ].join(" ")}
                    title={c.key ? `مرتب‌سازی بر اساس ${c.label}` : ""}
                  >
                    <span className="inline-flex items-center gap-1">
                      {c.label}
                      {c.key && sortKey === c.key && <span className="text-[12px]">{sortDir === "asc" ? "▲" : "▼"}</span>}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-[18px]">
              {data.map((r) => (
                <tr key={r.id} className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-6 py-4">
                    <Link href={r.href} className="text-sky-700 hover:underline dark:text-sky-300">
                      {r.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4">{r.type}</td>
                  <td className="px-6 py-4">
                    <span
                      className={[
                        "rounded-full px-3 py-1 text-[14px]",
                        r.status === "فعال"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : r.status === "زمان‌بندی"
                          ? "bg-sky-500/10 text-sky-600 dark:text-sky-300"
                          : r.status === "تمام‌شده"
                          ? "bg-gray-500/10 text-gray-600 dark:text-gray-300"
                          : "bg-rose-500/10 text-rose-600 dark:text-rose-400",
                      ].join(" ")}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{fmtDate(r.startAt)}</td>
                  <td className="px-6 py-4">{fmtDate(r.endAt)}</td>
                  <td className="px-6 py-4">
                    {toFa(r.participantsTotal)} <span className="text-[14px] text-gray-500">/ {toFa(r.participantsToday)} امروز</span>
                  </td>
                  <td className="px-6 py-4">{fmtRate(r.conversionRate)}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap items-center gap-2 text-[16px]">
                      <Link href={r.href} className="inline-flex h-10 items-center rounded border border-gray-300 px-3 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
                        جزئیات
                      </Link>
                      <button className="inline-flex h-10 items-center rounded border border-gray-300 px-3 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
                        توقف
                      </button>
                      <button className="inline-flex h-10 items-center rounded border border-gray-300 px-3 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
                        کپی
                      </button>
                      <button className="inline-flex h-10 items-center rounded border border-gray-300 px-3 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
                        گزارش
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-[16px] text-gray-500">
                    نتیجه‌ای یافت نشد
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 px-5 py-5 sm:flex-row">
          <div className="text-[14px] text-gray-500">
            نمایش {toFa(clampedPage * pageSize + Math.min(1, data.length))} تا {toFa(clampedPage * pageSize + data.length)} از {toFa(total)}
          </div>
          <div className="flex items-center gap-3">
            <select
              value={pageSize}
              onChange={(e) => { setPageSize(Number(e.target.value)); setPage(0); }}
              className="h-10 rounded border border-gray-300 bg-white px-3 text-[14px] dark:border-gray-700 dark:bg-gray-950"
            >
              {[10, 25, 50, 100].map((n) => (
                <option key={n} value={n}>{toFa(n)} در صفحه</option>
              ))}
            </select>
            <div className="flex items-center gap-2">
              <button onClick={() => setPage(0)} disabled={clampedPage === 0} className="h-10 rounded border border-gray-300 bg-white px-3 text-[14px] disabled:opacity-50 dark:border-gray-700 dark:bg-gray-950">« اول</button>
              <button onClick={() => setPage(Math.max(0, clampedPage - 1))} disabled={clampedPage === 0} className="h-10 rounded border border-gray-300 bg-white px-3 text-[14px] disabled:opacity-50 dark:border-gray-700 dark:bg-gray-950">‹ قبلی</button>
              <span className="px-3 text-[14px]">صفحه {toFa(clampedPage + 1)} از {toFa(pages)}</span>
              <button onClick={() => setPage(Math.min(pages - 1, clampedPage + 1))} disabled={clampedPage >= pages - 1} className="h-10 rounded border border-gray-300 bg-white px-3 text-[14px] disabled:opacity-50 dark:border-gray-700 dark:bg-gray-950">بعدی ›</button>
              <button onClick={() => setPage(pages - 1)} disabled={clampedPage >= pages - 1} className="h-10 rounded border border-gray-300 bg-white px-3 text-[14px] disabled:opacity-50 dark:border-gray-700 dark:bg-gray-950">آخر »</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
