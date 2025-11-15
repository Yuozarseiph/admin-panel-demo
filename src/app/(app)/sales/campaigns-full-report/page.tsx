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
import {
  campaignsTopSummary,
  campaignsStats,
  campaignsSeries,
} from "@/data/campaigns-full-report";

const toFa = (n: number) => n.toLocaleString("fa-IR");

function IconCard({
  title,
  valueText,
  tint = "bg-sky-50 text-sky-600 dark:bg-sky-900/30 dark:text-sky-300",
  Icon,
}: {
  title: string;
  valueText: string;
  tint?: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 text-[13px] sm:text-[14px] shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className={`rounded-full p-2 ${tint}`}>
        <Icon size={18} />
      </div>
      <div className="text-right">
        <div className="text-[12px] sm:text-[13px] text-gray-600 dark:text-gray-400">
          {title}
        </div>
        <div className="mt-1 text-[18px] sm:text-[20px] font-bold text-gray-900 dark:text-gray-100">
          {valueText}
        </div>
      </div>
    </div>
  );
}

function Circle({
  value,
  color,
  track = "#E5E7EB",
  size = 56,
}: {
  value: number;
  color: string;
  track?: string;
  size?: number;
}) {
  return (
    <div style={{ width: size, height: size }}>
      <CircularProgressbar
        value={value}
        text={`${Math.round(value)}%`}
        strokeWidth={9}
        styles={buildStyles({
          textSize: "24px",
          pathColor: color,
          trailColor: track,
          textColor: "#374151", // text-gray-700
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
}: {
  title: string;
  valueText: string;
  percent: number;
  color: string;
  track?: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 text-[13px] sm:text-[14px] text-gray-800 shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100">
      <Circle value={percent} color={color} track={track} />
      <div className="grow">
        <div className="text-[12px] sm:text-[13px] text-gray-600 dark:text-gray-400">
          {title}
        </div>
        <div className="mt-1 text-[18px] sm:text-[20px] font-bold text-gray-900 dark:text-gray-100">
          {valueText}
        </div>
      </div>
    </div>
  );
}

export default function CampaignsFullReport() {
  const top = campaignsTopSummary;
  const stats = campaignsStats;
  const series = campaignsSeries;

  return (
    <main className="p-4 sm:p-6 text-[13px] sm:text-[14px]">
      <section className="mb-4">
        <h2 className="mb-3 text-[15px] sm:text-[16px] font-semibold text-gray-800 dark:text-gray-100">
          تعداد کل
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <IconCard
            title="کمپین‌های فعال"
            valueText={toFa(top.active)}
            Icon={PlayCircle}
            tint="bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
          />
          <IconCard
            title="کمپین‌ها تمام شده"
            valueText={toFa(top.finished)}
            Icon={CheckCircle2}
            tint="bg-slate-100 text-slate-700 dark:bg-slate-800/60 dark:text-slate-200"
          />
          <IconCard
            title="در حال اجرا"
            valueText={toFa(top.running)}
            Icon={Loader2}
            tint="bg-sky-50 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300"
          />
          <IconCard
            title="کمپین‌های پر بازده"
            valueText={toFa(top.highROI)}
            Icon={TrendingUp}
            tint="bg-amber-50 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
          />
        </div>
      </section>
      <section className="rounded-xl">
        <div className="py-5">
          <h2 className="mb-4 text-[15px] sm:text-[16px] font-semibold text-gray-800 dark:text-gray-100">
            تعداد کل فروش در کمپین‌ها
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <KPIWithCircle
              title="تعداد کل سفارشات"
              valueText={toFa(stats.ordersCount)}
              percent={stats.ordersPercent}
              color="#ef4444" 
              track="#FEE2E2" 
            />
            <KPIWithCircle
              title="مبلغ کل"
              valueText={`${toFa(stats.totalAmount)} تومان`}
              percent={stats.amountPercent}
              color="#2563EB" 
              track="#DBEAFE" 
            />
          </div>
        </div>
      </section>

      <section className="mt-4">
        <h2 className="mb-3 text-[15px] sm:text-[16px] font-semibold text-gray-800 dark:text-gray-100">
          گزارش کلی کمپین‌ها
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <OverviewCardRe
            title="موجودی"
            color="#7C3AED"
            fill="rgba(124,58,237,0.14)"
            data={series.inventory}
          />
          <OverviewCardRe
            title="مشتری"
            color="#E11D48"
            fill="rgba(225,29,72,0.14)"
            data={series.customer}
          />
          <OverviewCardRe
            title="سود"
            color="#059669"
            fill="rgba(5,150,105,0.14)"
            data={series.profit}
          />
          <OverviewCardRe
            title="فروش"
            color="#2563EB"
            fill="rgba(37,99,235,0.14)"
            data={series.sales}
          />
        </div>
      </section>
    </main>
  );
}
