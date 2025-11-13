// components/customers/SalesPerformanceBars.tsx
"use client";

import React from "react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

/* داده‌های هفتگی (می‌توان با API جایگزین کرد) */
const data = [
  { روز: "دوشنبه", مقدار: 180, هدف: 400 },
  { روز: "سه‌شنبه", مقدار: 320, هدف: 400 },
  { روز: "چهارشنبه", مقدار: 200, هدف: 400 },
  { روز: "پنج‌شنبه", مقدار: 300, هدف: 400 },
  { روز: "جمعه", مقدار: 190, هدف: 400 },
  { روز: "شنبه", مقدار: 170, هدف: 400 },
  { روز: "یکشنبه", مقدار: 360, هدف: 400 },
];

const COLORS = {
  value: "#10b981", // مقدار (سبز)
  target: "#4B5563", // هدف (خاکستری)
};

function cn(...inputs: Array<string | undefined | null | false>) {
  return inputs.filter(Boolean).join(" ");
}
function formatFa(n: number) {
  return new Intl.NumberFormat("fa-IR").format(n);
}

/* آیکن صعود کوچک (اختیاری برای هدر) */
function TrendingUpIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 17l6-6 4 4 7-7" />
      <path strokeWidth="2" strokeLinecap="round" d="M21 7h-5M21 7v5" />
    </svg>
  );
}

/* کارت ساده هماهنگ با Summary */
function WidgetCard({
  title,
  action,
  children,
  className,
  headerClassName,
  titleClassName,
}: React.PropsWithChildren<{
  title?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  headerClassName?: string;
  titleClassName?: string;
}>) {
  return (
    <div className={cn("rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900 lg:p-7", className)}>
      <div className={cn("mb-3 flex items-start justify-between", headerClassName)}>
        <h3 className={cn("text-base font-semibold sm:text-lg", titleClassName)}>{title}</h3>
        {action ? <div className="ps-2">{action}</div> : null}
      </div>
      {children}
    </div>
  );
}

/* Tooltip فارسی */
function TooltipFa({ active, label, payload }: { active?: boolean; label?: string; payload?: any[] }) {
  if (!active) return null;
  return (
    <div className="rounded-md border border-gray-300 bg-white text-gray-800 shadow-2xl dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200" dir="rtl">
      <div className="bg-gray-100 px-2.5 py-2 text-center text-xs font-semibold text-gray-600 dark:bg-gray-800 dark:text-gray-300">
        {label}
      </div>
      <div className="px-3 py-2 text-xs">
        {payload?.map((item: any, idx: number) => (
          <div key={idx} className="flex items-center gap-2 py-1.5">
            <span className="inline-block h-2 w-2 rounded-full" style={{ background: item.fill ?? item.stroke }} />
            <span className="text-gray-800 dark:text-gray-200">
              {item.dataKey}: <span className="font-medium">{formatFa(Number(item.value))}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* لیبل کپسولی سفید بالای هر میله */
function CustomizedLabelFa(props: any) {
  const { x, y, width, value } = props;
  const radius = 8;
  return (
    <g>
      <rect x={x + 3} y={y + 3} width={width - 6} height={20} rx={radius} fill="#ffffff" />
      <text
        x={x + width / 2}
        y={y + 14}
        fill="#111827"
        fontSize="12"
        fontWeight={600}
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {formatFa(Number(value))}
      </text>
    </g>
  );
}

const weeklyTotal = data.reduce((a, d) => a + d.مقدار, 0);

export default function SalesPerformanceBars({ className }: { className?: string }) {
  return (
    <WidgetCard
      title="عملکرد فروش هفتگی"
      titleClassName="text-gray-700 font-normal sm:text-sm"
      headerClassName="items-center"
      action={
        <div className="flex items-center gap-5" dir="rtl">
          {/* لگند مثل Summary */}
          <div className="hidden items-center gap-4 @[28rem]:flex">
            <div className="flex items-center gap-1.5">
              <span className="-mt-0.5 h-3 w-3 rounded-full" style={{ backgroundColor: COLORS.value }} />
              <span className="text-sm text-gray-700 dark:text-gray-200">مقدار</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="-mt-0.5 h-3 w-3 rounded-full" style={{ backgroundColor: COLORS.target }} />
              <span className="text-sm text-gray-700 dark:text-gray-200">هدف</span>
            </div>
          </div>
        </div>
      }
      className={cn("lg:h-100 @container", className)}
    >
      {/* مجموع و درصد نمایشی */}
      <div className="mb-4 mt-1 flex items-center gap-2" dir="rtl">
        <h2 className="font-bold leading-none">{formatFa(weeklyTotal)}</h2>
        <span className="flex items-center gap-1 text-emerald-600">
          <TrendingUpIcon className="h-5 w-5" />
          <span className="font-semibold leading-none">+۱۲٫۵۰٪</span>
        </span>
      </div>

      {/* لگند موبایل */}
      <div className="mb-4 mt-0 inline-flex items-center gap-4 @[28rem]:hidden" dir="rtl">
        <div className="flex items-center gap-1.5">
          <span className="-mt-0.5 h-3 w-3 rounded-full" style={{ backgroundColor: COLORS.value }} />
          <span className="text-sm text-gray-700 dark:text-gray-200">مقدار</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="-mt-0.5 h-3 w-3 rounded-full" style={{ backgroundColor: COLORS.target }} />
          <span className="text-sm text-gray-700 dark:text-gray-200">هدف</span>
        </div>
      </div>

      {/* چارت با اسکرول افقی موبایل مثل Summary */}
      <div className="custom-scrollbar -mb-3 overflow-x-auto pb-3">
        <div className="h-[18rem] w-full min-w-[800px] pt-1">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={data}
              barGap={8}
              margin={{ left: -15, top: 20 }}
              className="[&_.recharts-tooltip-cursor]:fill-opacity-20 dark:[&_.recharts-tooltip-cursor]:fill-opacity-10 [&_.recharts-cartesian-axis-tick-value]:fill-gray-500 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12 [&_.recharts-xAxis.xAxis]:translate-y-2.5 [&_path.recharts-rectangle]:!stroke-none"
            >
              <CartesianGrid vertical={false} strokeOpacity={0.435} strokeDasharray="8 10" />
              <XAxis dataKey="روز" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} tickFormatter={(v) => formatFa(Number(v))} />
              <Tooltip content={<TooltipFa />} cursor={false} />

              {/* مقدار (سبز) */}
              <Bar dataKey="مقدار" fill={COLORS.value} stroke={COLORS.value} barSize={40} radius={10}>
                <LabelList dataKey="مقدار" content={<CustomizedLabelFa />} />
              </Bar>

              {/* هدف (خاکستری) */}
              <Bar dataKey="هدف" fill={COLORS.target} stroke={COLORS.target} barSize={40} radius={10}>
                <LabelList dataKey="هدف" content={<CustomizedLabelFa />} />
              </Bar>
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </WidgetCard>
  );
}
