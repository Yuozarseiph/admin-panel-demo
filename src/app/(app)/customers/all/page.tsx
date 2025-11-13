// app/(app)/customers/all/page.tsx
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  customersAll,
  type CustomerRow,
  type MemberLevel,
  type MemberStatus,
} from "@/data/customers-list";

const toFa = (n: number) => n.toLocaleString("fa-IR");
const fmtMoney = (n?: number) => (typeof n === "number" ? `${toFa(n)} تومان` : "—");
const fmtDate = (iso?: string) => (iso ? new Date(iso).toLocaleDateString("fa-IR") : "—");

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

export default function CustomersAllPage() {
  const [q, setQ] = useState("");
  const [level, setLevel] = useState<MemberLevel | "همه">("همه");
  const [status, setStatus] = useState<MemberStatus | "همه">("همه");
  const [sortKey, setSortKey] = useState<SortKey>("createdAt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
  };

  const filtered = useMemo(() => {
    const qn = q.trim();
    return customersAll.filter((r) => {
      const byLevel = level === "همه" ? true : r.level === level;
      const byStatus = status === "همه" ? true : r.status === status;
      const hay = `${r.fullName} ${r.mobile ?? ""} ${r.email ?? ""} ${r.code} ${r.level} ${r.status} ${r.totalPoints} ${r.usablePoints} ${r.lastPurchaseAmount ?? ""} ${r.lastPurchaseDate ?? ""} ${r.createdAt}`.toLowerCase();
      const okQ = qn ? hay.includes(qn.toLowerCase()) : true;
      return byLevel && byStatus && okQ;
    });
  }, [q, level, status]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    arr.sort((a, b) => {
      const va = a[sortKey], vb = b[sortKey];
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
    const header = ["نام و نام خانوادگی","موبایل/ایمیل","کد عضویت","سطح عضویت","امتیاز کل","امتیاز قابل استفاده","آخرین خرید (تاریخ)","آخرین خرید (مبلغ)","تاریخ ثبت‌نام","وضعیت"];
    const rows = sorted.map((r) => [
      r.fullName,
      `${r.mobile ?? ""}${r.email ? (r.mobile ? " / " : "") + r.email : ""}`,
      r.code,
      r.level,
      String(r.totalPoints),
      String(r.usablePoints),
      fmtDate(r.lastPurchaseDate),
      String(r.lastPurchaseAmount ?? ""),
      fmtDate(r.createdAt),
      r.status,
    ]);
    const csvBody = [header, ...rows].map((row) => row.map((x) => `"${String(x).replace(/"/g,'""')}"`).join(",")).join("\n");
    const bom = "\uFEFF";
    const blob = new Blob([bom + csvBody], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "customers.csv"; a.click(); URL.revokeObjectURL(url);
  };

  const exportPDF = () => {
    const w = window.open("", "_blank"); if (!w) return;
    w.document.write(`
      <html lang="fa" dir="rtl"><head><meta charset="utf-8" />
      <title>لیست مشتریان</title>
      <style>body{font-family:sans-serif;direction:rtl}table{border-collapse:collapse;width:100%}th,td{border:1px solid #ddd;padding:10px;font-size:16px}th{background:#f3f4f6}</style>
      </head><body><h3>لیست کامل مشتریان</h3>
      <table><thead><tr>
      <th>نام و نام خانوادگی</th><th>موبایل/ایمیل</th><th>کد عضویت</th><th>سطح عضویت</th><th>امتیاز کل</th><th>امتیاز قابل استفاده</th><th>آخرین خرید (تاریخ)</th><th>آخرین خرید (مبلغ)</th><th>تاریخ ثبت‌نام</th><th>وضعیت</th>
      </tr></thead><tbody>
      ${sorted.map((r)=>`<tr><td>${r.fullName}</td><td>${r.mobile ?? ""}${r.email ? (r.mobile ? " / " : "") + r.email : ""}</td><td>${r.code}</td><td>${r.level}</td><td>${toFa(r.totalPoints)}</td><td>${toFa(r.usablePoints)}</td><td>${fmtDate(r.lastPurchaseDate)}</td><td>${r.lastPurchaseAmount ? toFa(r.lastPurchaseAmount) : "—"}</td><td>${fmtDate(r.createdAt)}</td><td>${r.status}</td></tr>`).join("")}
      </tbody></table></body></html>`);
    w.document.close(); w.focus(); w.print();
  };

  return (
    <main className="p-4 sm:p-6 text-[20px]">
      <section className="rounded-xl border border-gray-200 bg-white text-gray-800 shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100">
        <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-[22px] font-semibold">لیست کامل مشتریان (جدول هوشمند)</h2>
          <div className="flex flex-wrap items-center gap-3 text-[16px]">
            <input dir="rtl" value={q} onChange={(e)=>{setQ(e.target.value);setPage(0);}} placeholder="جستجو در همه فیلدها…" className="h-11 w-72 rounded-md border border-gray-300 bg-white px-4 text-[16px] outline-none placeholder:text-gray-500 dark:border-gray-700 dark:bg-gray-950" />
            <select value={level} onChange={(e)=>{setLevel(e.target.value as any);setPage(0);}} className="h-11 rounded-md border border-gray-300 bg-white px-3 text-[16px] dark:border-gray-700 dark:bg-gray-950">
              <option value="همه">سطح: همه</option><option value="برنز">برنز</option><option value="نقره">نقره</option><option value="طلا">طلا</option><option value="الماس">الماس</option>
            </select>
            <select value={status} onChange={(e)=>{setStatus(e.target.value as any);setPage(0);}} className="h-11 rounded-md border border-gray-300 bg-white px-3 text-[16px] dark:border-gray-700 dark:bg-gray-950">
              <option value="همه">وضعیت: همه</option><option value="فعال">فعال</option><option value="غیرفعال">غیرفعال</option><option value="مسدود">مسدود</option>
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
                  { key: "fullName" as SortKey, label: "نام و نام خانوادگی" },
                  { key: null, label: "موبایل / ایمیل" },
                  { key: "code" as SortKey, label: "کد عضویت" },
                  { key: "level" as SortKey, label: "سطح عضویت" },
                  { key: "totalPoints" as SortKey, label: "امتیاز کل" },
                  { key: "usablePoints" as SortKey, label: "امتیاز قابل استفاده" },
                  { key: "lastPurchaseDate" as SortKey, label: "آخرین خرید" },
                  { key: "createdAt" as SortKey, label: "تاریخ ثبت‌نام" },
                  { key: "status" as SortKey, label: "وضعیت" },
                  { key: null, label: "جزئیات" },
                ].map((c)=>(
                  <th key={c.label} onClick={()=>c.key && handleSort(c.key)} className={["select-none px-6 py-4 text-right", c.key ? "cursor-pointer hover:text-sky-600 dark:hover:text-sky-300" : "cursor-default"].join(" ")} title={c.key ? `مرتب‌سازی بر اساس ${c.label}` : ""}>
                    <span className="inline-flex items-center gap-1">{c.label}{c.key && sortKey===c.key && <span className="text-[12px]">{sortDir==="asc"?"▲":"▼"}</span>}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-[18px]">
              {data.map((r)=>(
                <tr key={r.id} className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-6 py-4"><Link href={`/customers/profile/${r.id}`} className="text-sky-700 hover:underline dark:text-sky-300">{r.fullName}</Link></td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      {r.mobile && <a className="text-gray-800 hover:underline dark:text-gray-100" href={`tel:${r.mobile}`}>{r.mobile}</a>}
                      {r.email && <a className="text-[16px] text-gray-500 hover:underline dark:text-gray-400" href={`mailto:${r.email}`}>{r.email}</a>}
                    </div>
                  </td>
                  <td className="px-6 py-4">{r.code}</td>
                  <td className="px-6 py-4">{r.level}</td>
                  <td className="px-6 py-4">{toFa(r.totalPoints)}</td>
                  <td className="px-6 py-4">{toFa(r.usablePoints)}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span>{fmtDate(r.lastPurchaseDate)}</span>
                      <span className="text-[14px] text-gray-500">{fmtMoney(r.lastPurchaseAmount)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{fmtDate(r.createdAt)}</td>
                  <td className="px-6 py-4">
                    <span className={["rounded-full px-3 py-1 text-[14px]", r.status==="فعال" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : r.status==="غیرفعال" ? "bg-amber-500/10 text-amber-600 dark:text-amber-400" : "bg-rose-500/10 text-rose-600 dark:text-rose-400"].join(" ")}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link href={`/customers/profile/${r.id}`} className="inline-flex h-10 items-center rounded border border-gray-300 px-4 text-[16px] hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
                      جزئیات
                    </Link>
                  </td>
                </tr>
              ))}
              {data.length===0 && (<tr><td colSpan={10} className="px-6 py-12 text-center text-[16px] text-gray-500">نتیجه‌ای یافت نشد</td></tr>)}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 px-5 py-5 sm:flex-row">
          <div className="text-[14px] text-gray-500">
            نمایش {toFa(clampedPage*pageSize + Math.min(1,data.length))} تا {toFa(clampedPage*pageSize + data.length)} از {toFa(total)}
          </div>
          <div className="flex items-center gap-3">
            <select value={pageSize} onChange={(e)=>{setPageSize(Number(e.target.value));setPage(0);}} className="h-10 rounded border border-gray-300 bg-white px-3 text-[14px] dark:border-gray-700 dark:bg-gray-950">
              {[10,25,50,100].map((n)=>(<option key={n} value={n}>{toFa(n)} در صفحه</option>))}
            </select>
            <div className="flex items-center gap-2">
              <button onClick={()=>setPage(0)} disabled={clampedPage===0} className="h-10 rounded border border-gray-300 bg-white px-3 text-[14px] disabled:opacity-50 dark:border-gray-700 dark:bg-gray-950">« اول</button>
              <button onClick={()=>setPage(Math.max(0,clampedPage-1))} disabled={clampedPage===0} className="h-10 rounded border border-gray-300 bg-white px-3 text-[14px] disabled:opacity-50 dark:border-gray-700 dark:bg-gray-950">‹ قبلی</button>
              <span className="px-3 text-[14px]">صفحه {toFa(clampedPage+1)} از {toFa(pages)}</span>
              <button onClick={()=>setPage(Math.min(pages-1,clampedPage+1))} disabled={clampedPage>=pages-1} className="h-10 rounded border border-gray-300 bg-white px-3 text-[14px] disabled:opacity-50 dark:border-gray-700 dark:bg-gray-950">بعدی ›</button>
              <button onClick={()=>setPage(pages-1)} disabled={clampedPage>=pages-1} className="h-10 rounded border border-gray-300 bg-white px-3 text-[14px] disabled:opacity-50 dark:border-gray-700 dark:bg-gray-950">آخر »</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
