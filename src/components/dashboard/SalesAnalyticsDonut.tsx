// components/customers/SalesAnalyticsDonut.tsx
"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Label } from "recharts";

const data = [
  { name: "بازگشت", value: 150, color: "#22c55e" },
  { name: "توزیع", value: 250, color: "#60a5fa" },
  { name: "فروش", value: 600, color: "#34d399" },
];

export default function SalesAnalyticsDonut() {
  const total = data.reduce((a, b) => a + b.value, 0);
  return (
    <div className="relative rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900 h-100">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold">تحلیل فروش</h2>
        <div className="text-xs text-gray-500 dark:text-gray-400">روزانه</div>
      </div>
      <ResponsiveContainer width="100%" height="80%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={70} outerRadius={110} startAngle={90} endAngle={-270}>
            {data.map((d, i) => <Cell key={i} fill={d.color} />)}
            <Label position="center" value={`کل فروش\n${total}`} className="fill-gray-200 text-sm" />
          </Pie>
          <Legend verticalAlign="bottom" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
