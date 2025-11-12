// components/customers/SalesPerformanceBars.tsx
"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { روز: "دوشنبه", مقدار: 180, هدف: 400 },
  { روز: "سه‌شنبه", مقدار: 320, هدف: 400 },
  { روز: "چهارشنبه", مقدار: 200, هدف: 400 },
  { روز: "پنج‌شنبه", مقدار: 300, هدف: 400 },
  { روز: "جمعه", مقدار: 190, هدف: 400 },
  { روز: "شنبه", مقدار: 170, هدف: 400 },
  { روز: "یکشنبه", مقدار: 360, هدف: 400 },
];

export default function SalesPerformanceBars() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900 h-[360px]">
      <div className="mb-3 text-sm font-semibold">عملکرد فروش هفتگی</div>
      <ResponsiveContainer width="100%" height="80%">
        <BarChart data={data}>
          <XAxis dataKey="روز" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="هدف" fill="#374151" radius={[6, 6, 0, 0]} />
          <Bar dataKey="مقدار" fill="#10b981" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
