// components/customers/CustomerActivityGauge.tsx
"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const segments = {
  star3: { value: 15.51, color: "#F59E0B", label: "ستاره ۳" },
  star4: { value: 35.91, color: "#60A5FA", label: "ستاره ۴" },
  star5: { value: 48.58, color: "#10B981", label: "ستاره ۵" },
};

export default function CustomerActivityGauge() {
  return (
    <div className="relative isolate rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-3 text-sm font-semibold">فعالیت مشتریان</div>

      <div className="relative h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={[{ name: "s5", value: segments.star5.value }]}
              dataKey="value"
              startAngle={180}
              endAngle={0}
              innerRadius={120}
              outerRadius={138}
              cx="50%"
              cy="85%"
              stroke="none"
            >
              <Cell fill={segments.star5.color} />
            </Pie>

            <Pie
              data={[{ name: "s4", value: segments.star4.value }]}
              dataKey="value"
              startAngle={180}
              endAngle={0}
              innerRadius={100}
              outerRadius={118}
              cx="50%"
              cy="85%"
              stroke="none"
            >
              <Cell fill={segments.star4.color} />
            </Pie>

            <Pie
              data={[{ name: "s3", value: segments.star3.value }]}
              dataKey="value"
              startAngle={180}
              endAngle={0}
              innerRadius={82}
              outerRadius={98}
              cx="50%"
              cy="85%"
              stroke="none"
            >
              <Cell fill={segments.star3.color} />
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="pointer-events-none absolute left-1/2 top-[80%] -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-3xl font-extrabold">100%</div>
          <div className="text-xs text-gray-400">تکمیل شده</div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="inline-block size-2.5 rounded-sm" style={{ background: segments.star5.color }} />
          <span>{segments.star5.label}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block size-2.5 rounded-sm" style={{ background: segments.star4.color }} />
          <span>{segments.star4.label}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block size-2.5 rounded-sm" style={{ background: segments.star3.color }} />
          <span>{segments.star3.label}</span>
        </div>
      </div>

      <div className="mt-2 grid grid-cols-3 text-center text-xs text-gray-400">
        <span>{segments.star5.value}%</span>
        <span>{segments.star4.value}%</span>
        <span>{segments.star3.value}%</span>
      </div>
    </div>
  );
}
