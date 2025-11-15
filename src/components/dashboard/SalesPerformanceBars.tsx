// components/customers/SalesPerformanceBars.tsx
"use client";

import React from "react";
import WidgetChartBars from "../widgets/WidgetChartBars";

const data = [
  { روز: "دوشنبه", مقدار: 180, هدف: 400 },
  { روز: "سه‌شنبه", مقدار: 320, هدف: 400 },
  { روز: "چهارشنبه", مقدار: 200, هدف: 400 },
  { روز: "پنج‌شنبه", مقدار: 300, هدف: 400 },
  { روز: "جمعه", مقدار: 190, هدف: 400 },
  { روز: "شنبه", مقدار: 170, هدف: 400 },
  { روز: "یکشنبه", مقدار: 360, هدف: 400 },
];

const COLORS = { value: "#10b981", target: "#4B5563" };
const weeklyTotal = data.reduce((a, d) => a + d.مقدار, 0);

export default function SalesPerformanceBars({ className }: { className?: string }) {
  return (
    <WidgetChartBars
      title="عملکرد فروش هفتگی"
      totalText="+۱۲٫۵۰٪"
      totalValue={weeklyTotal}
      data={data}
      xKey="روز"
      series={[
        { key: "مقدار", label: "مقدار", color: COLORS.value },
        { key: "هدف", label: "هدف", color: COLORS.target },
      ]}
      legendsOrder={["first", "second"]}
      className={className}
    />
  );
}
