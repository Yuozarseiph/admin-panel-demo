// app/(app)/sales/campaigns-full-report/page.tsx
"use client";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  PlayCircle, 
  CheckCircle2,
  Loader2, 
  TrendingUp,
} from "lucide-react";

import OverviewCardRe from "@/components/reports/OverviewCardRe";

const toFa = (n: number) => n.toLocaleString("fa-IR");
function IconCard({
  title,
  valueText,
  tint = "bg-sky-50 text-sky-600 dark:bg-sky-900/20 dark:text-sky-300",
  Icon,
}: {
  title: string;
  valueText: string;
  tint?: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className={`rounded-full p-2 ${tint}`}><Icon size={18} /></div>
      <div className="text-right">
        <div className="text-[14px] text-gray-500">{title}</div>
        <div className="mt-1 text-[22px] font-bold">{valueText}</div>
      </div>
    </div>
  );
}
function Circle({ value, color, track = "#E8EEFC", size = 56 }: { value: number; color: string; track?: string; size?: number }) {
  return (
    <div style={{ width: size, height: size }}>
      <CircularProgressbar
        value={value}
        text={`${Math.round(value)}%`}
        strokeWidth={10}
        styles={buildStyles({
          textSize: "28px",
          pathColor: color,
          trailColor: track,
          textColor: "#6b7280",
        })}
      />
    </div>
  );
}

function KPIWithCircle({
  title,
  valueText,
  percent,
  color,
  track,
}: { title: string; valueText: string; percent: number; color: string; track?: string }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white text-gray-800 shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100 p-4">
      <Circle value={percent} color={color} track={track} />
      <div className="grow">
        <div className="text-[14px] text-gray-500">{title}</div>
        <div className="mt-1 text-[22px] font-bold">{valueText}</div>
      </div>
    </div>
  );
}

export default function CampaignsFullReport() {
  const top = { active: 32, finished: 187, running: 18, highROI: 9 };
  const stats = {
    ordersCount: 38900,
    ordersPercent: 89,
    totalAmount: 98543000000,
    amountPercent: 54,
  };
  const series = {
    inventory: [
      { name: "دوشنبه", value: 40 }, { name: "سه‌شنبه", value: 95 }, { name: "چهارشنبه", value: 70 },
      { name: "پنج‌شنبه", value: 105 }, { name: "جمعه", value: 50 }, { name: "یکشنبه", value: 72 },
    ],
    customer: [
      { name: "دوشنبه", value: 35 }, { name: "سه‌شنبه", value: 88 }, { name: "چهارشنبه", value: 63 },
      { name: "پنج‌شنبه", value: 100 }, { name: "جمعه", value: 52 }, { name: "یکشنبه", value: 70 },
    ],
    profit: [
      { name: "دوشنبه", value: 42 }, { name: "سه‌شنبه", value: 92 }, { name: "چهارشنبه", value: 69 },
      { name: "پنج‌شنبه", value: 108 }, { name: "جمعه", value: 53 }, { name: "یکشنبه", value: 73 },
    ],
    sales: [
      { name: "دوشنبه", value: 41 }, { name: "سه‌شنبه", value: 96 }, { name: "چهارشنبه", value: 71 },
      { name: "پنج‌شنبه", value: 109 }, { name: "جمعه", value: 51 }, { name: "یکشنبه", value: 74 },
    ],
  };

  return (
    <main className="p-4 sm:p-6 text-[20px]">
      <section className="mb-4">
        <h2 className="mb-3 text-[16px] font-semibold text-gray-700 dark:text-gray-200">تعداد کل</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <IconCard title="کمپین‌های فعال" valueText={toFa(top.active)} Icon={PlayCircle} tint="bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-300" />
          <IconCard title="کمپین‌ها تمام شده" valueText={toFa(top.finished)} Icon={CheckCircle2} tint="bg-gray-100 text-gray-600 dark:bg-gray-800/40 dark:text-gray-300" />
          <IconCard title="در حال اجرا" valueText={toFa(top.running)} Icon={Loader2} tint="bg-sky-50 text-sky-600 dark:bg-sky-900/20 dark:text-sky-300" />
          <IconCard title="کمپین‌های پر بازده" valueText={toFa(top.highROI)} Icon={TrendingUp} tint="bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-300" />
        </div>
      </section>
      <section className="rounded-xl ">
        <div className=" py-5">
          <h2 className="mb-4 text-[16px] font-semibold text-gray-700 dark:text-gray-200">تعداد کل فروش در کمپین‌ها</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <KPIWithCircle title="تعداد کل سفارشات" valueText={toFa(stats.ordersCount)} percent={stats.ordersPercent} color="#ef4444" track="#FFE9E9" />
            <KPIWithCircle title="مبلغ کل" valueText={`${toFa(stats.totalAmount)} تومان`} percent={stats.amountPercent} color="#3b82f6" track="#E8EEFC" />
          </div>
        </div>
      </section>
      <section className="mt-4">
        <h2 className="mb-3 text-[16px] font-semibold text-gray-700 dark:text-gray-200">گزارش کلی کمپین‌ها</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <OverviewCardRe title="موجودی" color="#8b5cf6" fill="rgba(139,92,246,0.12)" data={series.inventory} />
          <OverviewCardRe title="مشتری" color="#f43f5e" fill="rgba(244,63,94,0.12)" data={series.customer} />
          <OverviewCardRe title="سود" color="#10b981" fill="rgba(16,185,129,0.12)" data={series.profit} />
          <OverviewCardRe title="فروش" color="#3b82f6" fill="rgba(59,130,246,0.12)" data={series.sales} />
        </div>
      </section>
    </main>
  );
}
