// components/reports/OverviewCardRe.tsx
"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Settings2, Receipt, Banknote, Wallet, FileText } from "lucide-react";

type Pt = { name: string; value: number };

export default function OverviewCardRe({
  title,
  color = "#6366F1",
  fill = "rgba(99,102,241,0.15)",
  data,
}: {
  title: string;
  color?: string;
  fill?: string;
  data: Pt[];
}) {
  const gradId = `grad-${title}`;
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-3 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-1 flex items-center justify-between">
        <button
          className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="filter"
        >
          <Settings2 size={16} />
        </button>
        <div className="text-[16px] font-semibold">{title}</div>
      </div>
      <div className="mb-1 text-center text-[12px] text-gray-500">
        این هفته جذب شده 67٪
      </div>

      <div className="h-[160px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={fill} />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#9ca3af" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#9ca3af" }}
              domain={[0, 120]}
            />
            <Tooltip
              contentStyle={{ fontSize: 12 }}
              cursor={{ stroke: color, strokeDasharray: "3 3" }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              fill={`url(#${gradId})`}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-2 text-[12px]">
        <MiniStat
          label="سود"
          value="$2780.00"
          Icon={Wallet}
          tint="bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-300"
        />
        <MiniStat
          label="درآمد"
          value="$2780.00"
          Icon={Banknote}
          tint="bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-300"
        />
        <MiniStat
          label="هزینه"
          value="$2780.00"
          Icon={Receipt}
          tint="bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-300"
        />
        <MiniStat
          label="صورتحساب‌ها"
          value="$2780.00"
          Icon={FileText}
          tint="bg-sky-50 text-sky-600 dark:bg-sky-900/20 dark:text-sky-300"
        />
      </div>
    </div>
  );
}

function MiniStat({
  label,
  value,
  Icon,
  tint,
}: {
  label: string;
  value: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  tint: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-200 p-2 dark:border-gray-800">
      <div>
        <div className="text-gray-500">{label}</div>
        <div className="font-semibold">{value}</div>
      </div>
      <span className={`rounded-lg p-1.5 ${tint}`}>
        <Icon size={16} />
      </span>
    </div>
  );
}
