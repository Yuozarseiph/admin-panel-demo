// components/customers/RevenueGrowthLine.tsx
"use client";

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { سال: "۲۰۱۶", درآمد: 900 },
  { سال: "۲۰۱۷", درآمد: 920 },
  { سال: "۲۰۱۸", درآمد: 1200 },
  { سال: "۲۰۱۹", درآمد: 950 },
  { سال: "۲۰۲۰", درآمد: 1080 },
  { سال: "۲۰۲۱", درآمد: 1300 },
  { سال: "۲۰۲۲", درآمد: 1250 },
  { سال: "۲۰۲۳", درآمد: 1180 },
  { سال: "۲۰۲۴", درآمد: 900 },
];

export default function RevenueGrowthLine() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900 h-[360px]">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold">رشد درآمد</h2>
        <span className="text-xs text-gray-500 dark:text-gray-400">گزارش سالانه</span>
      </div>
      <ResponsiveContainer width="100%" height="80%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="سال" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="درآمد" stroke="#f59e0b" fill="url(#g)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
