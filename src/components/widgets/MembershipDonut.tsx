// components/widgets/MembershipDonut.tsx
"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const palette = {
  active: "#14B8A6",
  semi: "#38BDF8",
  ghost: "#F59E0B",
  track: "rgba(148,163,184,0.25)",
};
const values = { active: 1000, semi: 900, ghost: 800 };
const total = values.active + values.semi + values.ghost;

export default function MembershipDonut() {
  const ghostPct = (values.ghost / total) * 100;
  const semiPct = (values.semi / total) * 100;
  const activePct = (values.active / total) * 100;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold">نوع عضویت باشگاه</h2>
        <div className="text-xs text-emerald-600">+۳۲٫۴٪ • {total.toLocaleString("fa-IR")}</div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={[{ name: "t", value: 100 }]} dataKey="value" startAngle={90} endAngle={-270} innerRadius={100} outerRadius={120} stroke="none">
                <Cell fill={palette.track} />
              </Pie>
              <Pie data={[{ name: "ghost", value: ghostPct }]} dataKey="value" startAngle={90} endAngle={-270} innerRadius={100} outerRadius={120} stroke="none">
                <Cell fill={palette.ghost} />
              </Pie>

              <Pie data={[{ name: "t", value: 100 }]} dataKey="value" startAngle={90} endAngle={-270} innerRadius={70} outerRadius={95} stroke="none">
                <Cell fill={palette.track} />
              </Pie>
              <Pie data={[{ name: "semi", value: semiPct }]} dataKey="value" startAngle={90} endAngle={-270} innerRadius={70} outerRadius={95} stroke="none">
                <Cell fill={palette.semi} />
              </Pie>

              <Pie data={[{ name: "t", value: 100 }]} dataKey="value" startAngle={90} endAngle={-270} innerRadius={40} outerRadius={62} stroke="none">
                <Cell fill={palette.track} />
              </Pie>
              <Pie data={[{ name: "active", value: activePct }]} dataKey="value" startAngle={90} endAngle={-270} innerRadius={40} outerRadius={62} stroke="none">
                <Cell fill={palette.active} />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-3">
          {[
            { label: "فعال", value: values.active, color: palette.active },
            { label: "نیمه‌فعال", value: values.semi, color: palette.semi },
            { label: "روح", value: values.ghost, color: palette.ghost },
          ].map((r) => (
            <div key={r.label} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="inline-block size-2.5 rounded-full" style={{ background: r.color }} />
                <span className="text-gray-600 dark:text-gray-300">{r.label}</span>
              </div>
              <span className="font-medium">{r.value.toLocaleString("fa-IR")}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
