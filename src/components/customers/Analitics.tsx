// components/widgets/PatientAppointmentFaJalali.tsx
"use client";

import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
const monthsFa = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];
const data = [
  { month: monthsFa[0],  newPatients: 570, returningPatients: 290 },
  { month: monthsFa[1],  newPatients: 500, returningPatients: 300 },
  { month: monthsFa[2],  newPatients: 550, returningPatients: 400 },
  { month: monthsFa[3],  newPatients: 520, returningPatients: 370 },
  { month: monthsFa[4],  newPatients: 700, returningPatients: 560 },
  { month: monthsFa[5],  newPatients: 740, returningPatients: 520 },
  { month: monthsFa[6],  newPatients: 820, returningPatients: 580 },
  { month: monthsFa[7],  newPatients: 720, returningPatients: 440 },
  { month: monthsFa[8],  newPatients: 680, returningPatients: 500 },
  { month: monthsFa[9],  newPatients: 530, returningPatients: 320 },
  { month: monthsFa[10], newPatients: 530, returningPatients: 320 },
  { month: monthsFa[11], newPatients: 610, returningPatients: 290 },
];

const COLORS = {
  primary: "#2B7F75",
  muted: "#DFDFDF",
};

function cn(...inputs: Array<string | undefined | null | false>) {
  return inputs.filter(Boolean).join(" ");
}
function formatFa(n: number) {
  return new Intl.NumberFormat("fa-IR").format(n);
}

function Card({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={cn("rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900", className)}>
      {children}
    </div>
  );
}

function HeaderFa({
  onRangeChange,
  total = 2834,
  growth = "۳۲٫۴۰٪",
}: {
  onRangeChange: (v: string) => void;
  total?: number;
  growth?: string;
}) {
  return (
    <div className="mb-3 flex items-center justify-between" dir="rtl">
      <div className="flex items-center gap-6">
        <select
          className="rounded-md border border-gray-300 bg-white px-2 py-1 text-sm dark:border-gray-700 dark:bg-gray-900"
          defaultValue="روزانه"
          onChange={(e) => onRangeChange(e.target.value)}
          aria-label="انتخاب بازه"
        >
          <option value="روزانه">روزانه</option>
          <option value="ماهانه">ماهانه</option>
        </select>

        <div className="flex items-center gap-5 text-gray-600 dark:text-gray-300">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS.muted }} />
            <span>بیماران بازگشتی</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS.primary }} />
            <span>بیماران جدید</span>
          </div>
        </div>
      </div>

      <div className="text-left">
        <div className="text-xs text-gray-500 dark:text-gray-400">نوبت‌ها بر اساس نوع بیمار</div>
        <div className="mt-1 flex items-center justify-start gap-2">
          <span className="text-sm font-semibold text-emerald-600">+{growth}</span>
          <svg className="h-4 w-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 17l6-6 4 4 7-7" />
            <path strokeWidth="2" strokeLinecap="round" d="M21 7h-5M21 7v5" />
          </svg>
          <span className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">{formatFa(total)}</span>
        </div>
      </div>
    </div>
  );
}

function TooltipFa({
  active,
  label,
  payload,
}: {
  active?: boolean;
  label?: string;
  payload?: any[];
}) {
  if (!active) return null;
  return (
    <div className="rounded-md border border-gray-300 bg-white text-gray-800 shadow-2xl dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200" dir="rtl">
      <div className="bg-gray-100 px-2.5 py-2 text-center text-xs font-semibold text-gray-600 dark:bg-gray-800 dark:text-gray-300">
        {label}
      </div>
      <div className="px-3 py-2 text-xs">
        {payload?.map((item: any, idx: number) => (
          <div key={idx} className="flex items-center gap-2 py-1.5">
            <span className="inline-block h-2 w-2 rounded-full" style={{ background: item.stroke }} />
            <span className="text-gray-800 dark:text-gray-200">
              {item.dataKey === "newPatients" ? "بیماران جدید" : "بیماران بازگشتی"}:{" "}
              <span className="font-medium">{formatFa(Number(item.value))}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Dot({ cx, cy, color }: any) {
  return (
    <svg x={cx - 7} y={cy - 9} width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" fill={color} stroke="white" strokeWidth="3" />
    </svg>
  );
}

export default function PatientAppointmentFaJalali({ className }: { className?: string }) {
  function handleRangeChange(v: string) {
    console.log("بازه:", v);
  }

  return (
    <Card className={cn("lg:h-100", className)}>
      <HeaderFa onRangeChange={handleRangeChange} />

      <div className="custom-scrollbar -mb-2 overflow-x-auto pb-2">
        <div className="h-[19rem] w-full min-w-[700px] pe-1 pt-6" dir="rtl">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
              className="[&_.recharts-cartesian-axis-tick-value]:fill-gray-500 dark:[&_.recharts-cartesian-axis-tick-value]:fill-gray-400"
            >
              <defs>
                <linearGradient id="gradPrimary" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={COLORS.primary} stopOpacity={0.18} />
                  <stop offset="100%" stopColor={COLORS.primary} stopOpacity={0.03} />
                </linearGradient>
                <linearGradient id="gradMuted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={COLORS.muted} stopOpacity={0.16} />
                  <stop offset="100%" stopColor={COLORS.muted} stopOpacity={0.02} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="8 10" strokeOpacity={0.38} className="dark:stroke-white/20" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tickMargin={16} />
              <YAxis axisLine={false} tickLine={false} tickMargin={16} tickFormatter={(v) => formatFa(Number(v))} />
              <Tooltip content={<TooltipFa />} />

              <Area
                dataKey="newPatients"
                stroke={COLORS.primary}
                strokeWidth={3.5}
                fill="url(#gradPrimary)"
                dot={<Dot color={COLORS.primary} />}
                activeDot={<Dot color={COLORS.primary} />}
              />
              <Area
                dataKey="returningPatients"
                stroke={COLORS.muted}
                strokeWidth={3}
                fill="url(#gradMuted)"
                dot={<Dot color={COLORS.muted} />}
                activeDot={<Dot color={COLORS.muted} />}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}
