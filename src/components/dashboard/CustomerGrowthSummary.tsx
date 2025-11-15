"use client";

import React from "react";
import WidgetChartBars from "../widgets/WidgetChartBars";

const data = [
  { label: "شنبه", booking: 806, visitors: 584 },
  { label: "یکشنبه", booking: 740, visitors: 923 },
  { label: "دوشنبه", booking: 627, visitors: 784 },
  { label: "سه‌شنبه", booking: 915, visitors: 759 },
  { label: "چهارشنبه", booking: 850, visitors: 923 },
  { label: "پنج‌شنبه", booking: 703, visitors: 587 },
  { label: "جمعه", booking: 923, visitors: 805 },
];

const COLORS = { visitors: "#2B7F75", booking: "#FFD66B" };
const totalToday = data.reduce((acc, d) => acc + d.booking, 0);

function DropdownAction() {
  return (
    <select className="rounded-md border border-gray-300 bg-white px-2 py-1 text-sm dark:border-gray-700 dark:bg-gray-900" defaultValue="daily" dir="rtl">
      <option value="daily">روزانه</option>
      <option value="monthly">ماهانه</option>
    </select>
  );
}

export default function CustomerGrowthSummary({ className }: { className?: string }) {
  return (
    <WidgetChartBars
      title="خلاصه رشد مشتریان"
      totalText="+۲۸٫۰۰٪"
      totalValue={totalToday}
      data={data}
      xKey="label"
      series={[
        { key: "visitors", label: "بازدیدکنندگان", color: COLORS.visitors },
        { key: "booking", label: "رزرو امروز", color: COLORS.booking },
      ]}
      legendsOrder={["first", "second"]}
      dropdown={<DropdownAction />}
      className={className}
    />
  );
}
