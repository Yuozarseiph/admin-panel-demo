// components/widgets/SalesMonthlyChart.tsx
"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const faMonths = ["فروردین","اردیبهشت","خرداد","تیر","مرداد","شهریور","مهر","آبان","آذر","دی","بهمن","اسفند"];

const data = faMonths.map((m, i) => ({
  ماه: m,
  فروش_بازگشتی: 80 + ((i * 11) % 50),
  فروش_جدید: 60 + ((i * 7) % 40),
}));

export default function SalesMonthlyChart() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold">وضعیت فروش براساس ماه</h2>
        <span className="text-xs text-emerald-600">+۳۲٪</span>
      </div>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 8 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-800" />
            <XAxis dataKey="ماه" tickMargin={8} />
            <YAxis />
            <Tooltip />
            <Legend formatter={(value) => value === "فروش_بازگشتی" ? "مشتریان بازگشتی" : "مشتریان جدید"} />
            <Line type="monotone" dataKey="فروش_بازگشتی" stroke="#0E766E" dot={{ r: 4 }} />
            <Line type="monotone" dataKey="فروش_جدید" stroke="#059669" dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
