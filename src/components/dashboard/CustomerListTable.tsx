// components/customers/CustomerListTable.tsx
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

type Row = {
  ratingLabel: "عالی" | "خیلی خوب" | "خوب" | "بد" | "خیلی بد";
  projectValue: string;
  type: string;
  repName: string;
  repAvatar: string;
};

const rows: Row[] = [
  {
    ratingLabel: "عالی",
    projectValue: "$1.87M",
    type: "پلاتینیوم",
    repName: "گینا ون‌لوون",
    repAvatar: "/avatars/1.png",
  },
  {
    ratingLabel: "خیلی خوب",
    projectValue: "$1.87M",
    type: "پلاتینیوم",
    repName: "گینا ون‌لوون",
    repAvatar: "/avatars/2.png",
  },
  {
    ratingLabel: "خوب",
    projectValue: "$1.87M",
    type: "پلاتینیوم",
    repName: "گینا ون‌لوون",
    repAvatar: "/avatars/3.png",
  },
  {
    ratingLabel: "بد",
    projectValue: "$1.87M",
    type: "پلاتینیوم",
    repName: "گینا ون‌لوون",
    repAvatar: "/avatars/4.png",
  },
  {
    ratingLabel: "خیلی بد",
    projectValue: "$1.87M",
    type: "پلاتینیوم",
    repName: "گینا ون‌لوون",
    repAvatar: "/avatars/5.png",
  },
];

function RatingBar({ label }: { label: Row["ratingLabel"] }) {
  const seg = 5;
  const active =
    label === "عالی"
      ? 5
      : label === "خیلی خوب"
        ? 4
        : label === "خوب"
          ? 3
          : label === "بد"
            ? 2
            : 1;

  const color = active >= 3 ? "bg-emerald-500" : "bg-orange-500";

  return (
    <div className="flex items-center justify-center gap-3">
      <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
      <div className="flex gap-1">
        {Array.from({ length: seg }).map((_, i) => (
          <span
            key={i}
            className={`inline-block h-2 w-6 rounded-full ${
              i < active ? color : "bg-gray-200 dark:bg-gray-700/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

const columns: ColumnDef<Row>[] = [
  {
    id: "rep",
    header: "نماینده فروش",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Image
          src={row.original.repAvatar}
          alt={row.original.repName}
          width={32}
          height={32}
          className="h-8 w-8 rounded-lg object-cover"
        />
        <span className="text-sm text-gray-900 dark:text-gray-100">
          {row.original.repName}
        </span>
      </div>
    ),
  },
  {
    id: "rating",
    header: "امتیاز",
    cell: ({ row }) => <RatingBar label={row.original.ratingLabel} />,
  },
  {
    accessorKey: "projectValue",
    header: "ارزش پروژه",
  },
  {
    accessorKey: "type",
    header: "نوع",
  },
  {
    id: "post",
    header: "محتوای پست",
    cell: () => (
      <button className="rounded-md border border-gray-200 px-3 py-1 text-xs text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800">
        مشاهده
      </button>
    ),
  },
];

export default function CustomerListTable() {
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 5;

  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));

  const paginatedRows = useMemo(() => {
    const start = pageIndex * pageSize;
    return rows.slice(start, start + pageSize);
  }, [pageIndex]);

  const table = useReactTable({
    data: paginatedRows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const canPrev = pageIndex > 0;
  const canNext = pageIndex < pageCount - 1;

  const startItem = pageIndex * pageSize + 1;
  const endItem = Math.min((pageIndex + 1) * pageSize, rows.length);

  return (
    <div
      dir="rtl"
      className="h-100 rounded-xl border border-gray-200 bg-white p-4 text-gray-900 shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100"
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold">فهرست مشتریان</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id} className="bg-gray-50 dark:bg-gray-900/70">
                {hg.headers.map((h) => (
                  <th
                    key={h.id}
                    className="border-b border-gray-200 px-4 py-2 text-center text-[11px] font-medium text-gray-500 dark:border-gray-800 dark:text-gray-400"
                  >
                    {flexRender(h.column.columnDef.header, h.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50/80 dark:border-gray-800 dark:hover:bg-gray-800/70"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-3 align-middle text-center text-sm text-gray-800 dark:text-gray-100"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {rows.length > pageSize && (
        <div className="mt-4 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>
            نمایش {startItem.toLocaleString("fa-IR")} تا{" "}
            {endItem.toLocaleString("fa-IR")} از{" "}
            {rows.length.toLocaleString("fa-IR")} رکورد
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => canPrev && setPageIndex((p) => p - 1)}
              disabled={!canPrev}
              className="rounded border border-gray-200 px-2 py-1 text-xs text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              قبلی
            </button>
            <span>
              صفحه {pageIndex + 1} از {pageCount}
            </span>
            <button
              type="button"
              onClick={() => canNext && setPageIndex((p) => p + 1)}
              disabled={!canNext}
              className="rounded border border-gray-200 px-2 py-1 text-xs text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              بعدی
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
