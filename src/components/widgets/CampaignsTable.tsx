// components/widgets/CampaignsTable.tsx
"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

type Campaign = {
  name: string;
  createdAt: string;
  type: "ایمیل" | "اس‌ام‌اس" | "تبلیغات" | "پوش‌نوتیفیکیشن";
  runtime: string;
  status: "در حال اجرا" | "برنامه‌ریزی" | "متوقف" | "اتمام";
};

const columns: ColumnDef<Campaign>[] = [
  { accessorKey: "name", header: "نام" },
  { accessorKey: "createdAt", header: "تاریخ ایجاد" },
  { accessorKey: "type", header: "نوع کمپین" },
  { accessorKey: "runtime", header: "زمان اجرا" },
  {
    accessorKey: "status",
    header: "وضعیت",
    cell: ({ getValue }) => {
      const v = getValue() as Campaign["status"];
      const cls =
        v === "در حال اجرا"
          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200"
          : v === "برنامه‌ریزی"
          ? "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200"
          : v === "اتمام"
          ? "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200"
          : "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200";
      return <span className={`inline-flex rounded-full px-2 py-0.5 text-xs ${cls}`}>{v}</span>;
    },
  },
  {
    id: "actions",
    header: "جزئیات",
    cell: ({ row }) => (
      <button className="rounded-md border border-gray-200 px-2 py-1 text-xs hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-gray-800">
        بیشتر
      </button>
    ),
  },
];

const data: Campaign[] = [
  { name: "بازگشت مشتریان پاییز", createdAt: "1404/08/20", type: "ایمیل", runtime: "۳ روز", status: "در حال اجرا" },
  { name: "تخفیف آخر هفته", createdAt: "1404/08/18", type: "اس‌ام‌اس", runtime: "۱ ساعت و ۳۰ دقیقه", status: "برنامه‌ریزی" },
  { name: "بلک فرایدی", createdAt: "1404/08/15", type: "تبلیغات", runtime: "۷ روز", status: "اتمام" },
  { name: "اطلاع‌رسانی آپدیت", createdAt: "1404/08/10", type: "پوش‌نوتیفیکیشن", runtime: "۱۰ دقیقه", status: "متوقف" },
];

export default function CampaignsTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold">آخرین کمپین‌ها</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] table-fixed text-sm">
          <thead>
            {table.getHeaderGroups().map(hg => (
              <tr key={hg.id} className="text-right text-xs text-gray-500 dark:text-gray-400">
                {hg.headers.map(h => (
                  <th key={h.id} onClick={h.column.getToggleSortingHandler()} className="select-none border-b border-gray-200 px-3 py-2 font-medium dark:border-gray-800">
                    {flexRender(h.column.columnDef.header, h.getContext())}
                    {{"asc":" ▲","desc":" ▼"}[h.column.getIsSorted() as string] ?? ""}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="[&>tr:not(:last-child)>td]:border-b [&>tr:not(:last-child)>td]:border-gray-100 dark:[&>tr:not(:last-child)>td]:border-gray-800">
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-3 py-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
