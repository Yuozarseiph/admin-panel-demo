// components/widgets/WidgetChartBars.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
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

type SeriesDef = { key: string; label: string; color: string };

type WidgetChartBarsProps = {
  title: string;
  totalText?: string;
  totalValue?: string | number;
  data: any[];
  xKey: string;
  series: [SeriesDef, SeriesDef];
  legendsOrder?: ("first" | "second")[];
  className?: string;
  dropdown?: React.ReactNode;
};

function cn(...inputs: Array<string | undefined | null | false>) {
  return inputs.filter(Boolean).join(" ");
}
function formatFa(n: number) {
  return new Intl.NumberFormat("fa-IR").format(Number(n));
}

function TooltipFa({ active, label, payload }: any) {
  if (!active) return null;
  return (
    <div className="rounded-md border border-gray-300 bg-white text-gray-800 shadow-2xl dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200" dir="rtl">
      <div className="bg-gray-100 px-2.5 py-2 text-center text-xs font-semibold text-gray-600 dark:bg-gray-800 dark:text-gray-300">
        {label}
      </div>
      <div className="px-3 py-2 text-xs">
        {payload?.map((p: any, i: number) => (
          <div key={i} className="flex items-center gap-2 py-1.5">
            <span className="inline-block h-2 w-2 rounded-full" style={{ background: p.fill ?? p.stroke }} />
            <span className="text-gray-800 dark:text-gray-200">
              {p.name}: <span className="font-medium">{formatFa(Number(p.value))}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CustomizedLabelFa(props: any) {
  const { x, y, width, value } = props;
  return (
    <g>
      <rect x={x + 3} y={y + 3} width={width - 6} height={20} rx={8} fill="#ffffff" />
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

/* کارت واحد با h-100 و layout ستونی */
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
    <div className={cn("h-100 flex flex-col rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900 lg:p-7", className)}>
      <div className={cn("mb-3 flex shrink-0 items-center justify-between", headerClassName)}>
        <h3 className={cn("text-sm text-gray-400", titleClassName)}>{title}</h3>
        {action ? <div className="ps-2">{action}</div> : null}
      </div>
      <div className="min-h-0 flex-1">{children}</div>
    </div>
  );
}

export default function WidgetChartBars({
  title,
  totalText,
  totalValue,
  data,
  xKey,
  series,
  legendsOrder,
  className,
  dropdown,
}: WidgetChartBarsProps) {
  const [mounted, setMounted] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const holderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // اگر والد هنگام mount ابعاد صفر داشت، با ResizeObserver یک رندر مجدد انجام بده
  useEffect(() => {
    if (!holderRef.current) return;
    const el = holderRef.current;
    let t: any;
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) {
        const { width, height } = e.contentRect;
        if (width > 10 && height > 10) {
          clearTimeout(t);
          t = setTimeout(() => setRefreshKey((k) => k + 1), 10);
        }
      }
    });
    ro.observe(el);
    return () => {
      clearTimeout(t);
      ro.disconnect();
    };
  }, []);

  const [s1, s2] = series;
  const legends =
    legendsOrder?.length === 2
      ? legendsOrder.map((ord) => (ord === "first" ? s1 : s2))
      : [s1, s2];

  return (
    <WidgetCard
      title={title}
      headerClassName="items-center"
      action={
        <div className="flex items-center gap-6" dir="rtl">
          <div className="hidden items-center gap-5 @[28rem]:flex">
            {legends.map((l) => (
              <div key={l.key} className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: l.color }} />
                <span className="text-sm text-gray-300">{l.label}</span>
              </div>
            ))}
          </div>
          {dropdown}
        </div>
      }
      className={cn("h-full lg:h-100 @container", className)}
    >
      {(totalText || totalValue) && (
        <div className="mb-2 mt-1 flex items-center gap-2" dir="rtl">
          {totalValue !== undefined && (
            <h2 className="text-base font-bold leading-none">
              {typeof totalValue === "number" ? formatFa(Number(totalValue)) : totalValue}
            </h2>
          )}
          {totalText && <span className="flex items-center gap-1 text-emerald-500">{totalText}</span>}
        </div>
      )}

      {/* لگند موبایل */}
      <div className="mb-4 mt-0 inline-flex items-center gap-5 @[28rem]:hidden" dir="rtl">
        {legends.map((l) => (
          <div key={l.key} className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: l.color }} />
            <span className="text-sm text-gray-300">{l.label}</span>
          </div>
        ))}
      </div>

      {/* بدنه چارت */}
      <div ref={holderRef} className="custom-scrollbar min-h-0 flex-1 overflow-x-auto pb-3">
        <div className="h-70 min-w-[800px] pt-1">
          {!mounted ? (
            // گِیت اولیه برای SSR
            <div className="h-70 w-full" />
          ) : (
            <ResponsiveContainer key={refreshKey} width="100%" height="100%">
              <ComposedChart
                data={data}
                barGap={12}
                barCategoryGap="20%"
                margin={{ left: -10, right: 0, top: 18, bottom: 0 }}
                className="[&_.recharts-tooltip-cursor]:fill-opacity-20 dark:[&_.recharts-tooltip-cursor]:fill-opacity-10 [&_.recharts-cartesian-axis-tick-value]:fill-gray-500 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12 [&_.recharts-xAxis.xAxis]:translate-y-2.5 [&_path.recharts-rectangle]:!stroke-none"
              >
                <CartesianGrid vertical={false} strokeOpacity={0.435} strokeDasharray="8 10" />
                <XAxis dataKey={xKey} axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(v) => formatFa(Number(v))} />
                <Tooltip content={<TooltipFa />} cursor={false} />

                {/* سری اول */}
                <Bar dataKey={s1.key} name={s1.label} fill={s1.color} stroke={s1.color} barSize={40} radius={10}>
                  <LabelList dataKey={s1.key} content={<CustomizedLabelFa />} />
                </Bar>

                {/* سری دوم */}
                <Bar dataKey={s2.key} name={s2.label} fill={s2.color} stroke={s2.color} barSize={40} radius={10}>
                  <LabelList dataKey={s2.key} content={<CustomizedLabelFa />} />
                </Bar>
              </ComposedChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </WidgetCard>
  );
}
