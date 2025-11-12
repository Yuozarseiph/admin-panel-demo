// components/customers/RatingAnalyticsRings.tsx
"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
const counts = { star5: 8530, star4: 6304, star3: 2723 };
const total = counts.star5 + counts.star4 + counts.star3;

const pct = {
  star5: (counts.star5 / total) * 100,
  star4: (counts.star4 / total) * 100,
  star3: (counts.star3 / total) * 100,
};

export default function RatingAnalyticsRings() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-3 text-sm font-semibold">تحلیل امتیازدهی</div>

      <div className="grid items-center gap-4 md:grid-cols-2">
        <div className="order-2 space-y-5 md:order-1">
          {[
            { label: "ستاره ۵", value: counts.star5, color: "#10B981" },
            { label: "ستاره ۴", value: counts.star4, color: "#60A5FA" },
            { label: "ستاره ۳", value: counts.star3, color: "#F59E0B" },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span>{row.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold">
                  +{row.value.toLocaleString("fa-IR")}
                </span>
                <span className="inline-block size-2.5 rounded-full" style={{ background: row.color }} />
              </div>
            </div>
          ))}
        </div>

        <div className="order-1 md:order-2">
          <div className="relative h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={[{ name: "t", value: 100 }]} dataKey="value" startAngle={90} endAngle={-270} innerRadius={90} outerRadius={110} stroke="none">
                  <Cell fill="rgba(148,163,184,0.2)" />
                </Pie>
                <Pie data={[{ name: "s5", value: pct.star5 }]} dataKey="value" startAngle={90} endAngle={-270} innerRadius={90} outerRadius={110} stroke="none">
                  <Cell fill="#10B981" />
                </Pie>

                <Pie data={[{ name: "t", value: 100 }]} dataKey="value" startAngle={90} endAngle={-270} innerRadius={64} outerRadius={84} stroke="none">
                  <Cell fill="rgba(148,163,184,0.2)" />
                </Pie>
                <Pie data={[{ name: "s4", value: pct.star4 }]} dataKey="value" startAngle={90} endAngle={-270} innerRadius={64} outerRadius={84} stroke="none">
                  <Cell fill="#60A5FA" />
                </Pie>

                <Pie data={[{ name: "t", value: 100 }]} dataKey="value" startAngle={90} endAngle={-270} innerRadius={40} outerRadius={58} stroke="none">
                  <Cell fill="rgba(148,163,184,0.2)" />
                </Pie>
                <Pie data={[{ name: "s3", value: pct.star3 }]} dataKey="value" startAngle={90} endAngle={-270} innerRadius={40} outerRadius={58} stroke="none">
                  <Cell fill="#F59E0B" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="size-28 rounded-full bg-gray-900/80 dark:bg-gray-900" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
