// components/customers/PlatformsDonut.tsx
"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { platformShare } from "@/data/customers";

export default function PlatformsDonut() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900 lg:h-100">
      <div className="mb-3 text-sm font-semibold">منطقه مشتریان بر اساس پلتفرم</div>
      <div className="h-[380px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={platformShare} dataKey="value" nameKey="name" innerRadius={90} outerRadius={110} startAngle={90} endAngle={-270}>
              {platformShare.map((d, i) => <Cell key={`o-${i}`} fill={d.color} />)}
            </Pie>
            <Pie data={platformShare.slice(0, 2)} dataKey="value" nameKey="name" innerRadius={60} outerRadius={80} startAngle={90} endAngle={-270}>
              {platformShare.slice(0, 2).map((d, i) => <Cell key={`m-${i}`} fill={d.color} />)}
            </Pie>
            <Pie data={[{ name: "mid", value: 100 }]} dataKey="value" innerRadius={40} outerRadius={50} fill="#0f172a" />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-xs">
        {platformShare.map((d) => (
          <div key={d.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-block size-2.5 rounded-full" style={{ background: d.color }} />
              <span>{d.name}</span>
            </div>
            <span className="font-medium">{d.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
