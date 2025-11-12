// components/customers/CustomerGrowthSummary.tsx
"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const months = ["ژان", "فور", "مار", "آپر", "می", "جون", "جول", "آگو", "سپ", "اکت", "نو", "دس"];
const data = months.map((m, i) => ({
  ماه: m,
  هدف: 900 + ((i * 30) % 200),
  مقدار: 600 + ((i * 70) % 350),
}));

export default function CustomerGrowthSummary() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900 h-[360px]">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold">خلاصه رشد مشتریان</h2>
        <div className="text-xs text-gray-500 dark:text-gray-400">۲۰۲۵</div>
      </div>
      <ResponsiveContainer width="100%" height="80%">
        <BarChart data={data}>
          <XAxis dataKey="ماه" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="هدف" fill="#374151" radius={[6, 6, 0, 0]} />
          <Bar dataKey="مقدار" fill="#10b981" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
