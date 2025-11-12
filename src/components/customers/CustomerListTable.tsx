// components/customers/CustomerListTable.tsx
"use client";

import Image from "next/image";
import * as React from "react";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

type Row = {
  ratingLabel: "عالی" | "خیلی خوب" | "خوب" | "بد" | "خیلی بد";
  projectValue: string;
  type: string;
  repName: string;
  repAvatar: string;
};

const rows: Row[] = [
  { ratingLabel: "عالی", projectValue: "$1.87M", type: "پلاتینیوم", repName: "گینا ون‌لوون", repAvatar: "/avatars/1.png" },
  { ratingLabel: "خیلی خوب", projectValue: "$1.87M", type: "پلاتینیوم", repName: "گینا ون‌لوون", repAvatar: "/avatars/2.png" },
  { ratingLabel: "خوب", projectValue: "$1.87M", type: "پلاتینیوم", repName: "گینا ون‌لوون", repAvatar: "/avatars/3.png" },
  { ratingLabel: "بد", projectValue: "$1.87M", type: "پلاتینیوم", repName: "گینا ون‌لوون", repAvatar: "/avatars/4.png" },
  { ratingLabel: "خیلی بد", projectValue: "$1.87M", type: "پلاتینیوم", repName: "گینا ون‌لوون", repAvatar: "/avatars/5.png" },
];

function RatingBar({ label }: { label: Row["ratingLabel"] }) {
  const seg = 5;
  const active = label === "عالی" ? 5 : label === "خیلی خوب" ? 4 : label === "خوب" ? 3 : label === "بد" ? 2 : 1;
  const color = active >= 3 ? "bg-emerald-500" : "bg-orange-500";
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-2">
        {Array.from({ length: seg }).map((_, i) => (
          <span key={i} className={`inline-block h-2 w-8 rounded ${i < active ? color : "bg-gray-700/30 dark:bg-gray-700/50"}`} />
        ))}
      </div>
      <span className="text-xs text-gray-400">{label}</span>
    </div>
  );
}

const columns: ColumnDef<Row>[] = [
  { header: "امتیاز", cell: ({ row }) => <RatingBar label={row.original.ratingLabel} /> },
  { accessorKey: "projectValue", header: "ارزش پروژه" },
  { accessorKey: "type", header: "نوع" },
  {
    id: "rep",
    header: "نماینده فروش",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span>{row.original.repName}</span>
        <Image src={row.original.repAvatar} alt={row.original.repName} width={28} height={28} className="rounded-md" />
      </div>
    ),
  },
  { id: "post", header: "محتوای پست", cell: () => <button className="rounded-md border border-gray-200 px-2 py-1 text-xs hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-gray-800">مشاهده</button> },
];

export default function CustomerListTable() {
  const table = useReactTable({ data: rows, columns, getCoreRowModel: getCoreRowModel() });
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold">فهرست مشتریان</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] table-fixed text-sm">
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id} className="text-right text-xs text-gray-500 dark:text-gray-400">
                {hg.headers.map((h) => (
                  <th key={h.id} className="border-b border-gray-200 px-3 py-2 font-medium dark:border-gray-800">
                    {flexRender(h.column.columnDef.header, h.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="[&>tr:not(:last-child)>td]:border-b [&>tr:not(:last-child)>td]:border-gray-100 dark:[&>tr:not(:last-child)>td]:border-gray-800">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
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
