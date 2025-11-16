// components/customers/CustomerKPIs.tsx
"use client";

import { customerKPI } from "@/data/customers";
import {
  TrendingUp,
  TrendingDown,
  XCircle,
  Clock,
  CheckCircle,
  Calendar,
} from "lucide-react";

const getIcon = (title: string) => {
  switch (title) {
    case "لغو شده":
      return XCircle;
    case "لیست انتظار":
      return Clock;
    case "مشتریان زمان‌بندی شده":
      return CheckCircle;
    case "کل مشتریان":
      return Calendar;
    default:
      return Calendar;
  }
};

export default function CustomerKPIs() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {customerKPI.map((c, index) => {
        const IconComponent = getIcon(c.title);

        const rawDelta = c.delta.trim();
        const signChar = rawDelta.charAt(0);
        const isIncrease =
          signChar === "+" || c.ok === true;

        const numericPart = rawDelta
          .slice(1)
          .replace("٪", "")
          .trim();

        const percentageToDisplay = numericPart || "0";

        const isFirstCard = index === 0;

        return (
          <div
            key={c.title}
            className={`group rounded-[14px] border px-6 py-7 ${
              isFirstCard
                ? "border-[#2B7F75] bg-[#2B7F75]"
                : "border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-900"
            }`}
          >
            <div className="mb-4 flex items-center gap-5">
              <span
                className={`flex rounded-[14px] p-2.5 ${
                  isFirstCard
                    ? "bg-white text-[#2B7F75]"
                    : "bg-[#2B7F75] text-white"
                }`}
              >
                <IconComponent className="h-[30px] w-[30px]" />
              </span>

              <div className="space-y-1.5 text-right">
                <p
                  className={`font-medium ${
                    isFirstCard
                      ? "text-gray-100"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {c.title}
                </p>
                <p
                  className={`text-[20px] font-bold 3xl:text-3xl ${
                    isFirstCard
                      ? "text-white"
                      : "text-gray-900 dark:text-gray-100"
                  }`}
                >
                  {c.value}
                </p>
                {c.note && (
                  <p
                    className={`text-xs ${
                      isFirstCard
                        ? "text-gray-100/80"
                        : "text-gray-400 dark:text-gray-500"
                    }`}
                  >
                    {c.note}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-1">
                <span
                  className={`flex rounded-full px-2.5 py-1.5 ${
                    isFirstCard
                      ? "bg-white text-emerald-700"
                      : isIncrease
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30"
                      : "bg-rose-100 text-rose-700 dark:bg-rose-900/30"
                  }`}
                >
                  {isIncrease ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                </span>
                <span
                  className={`font-semibold leading-none ${
                    isFirstCard
                      ? "text-white"
                      : isIncrease
                      ? "text-emerald-700 dark:text-emerald-400"
                      : "text-rose-700 dark:text-rose-400"
                  }`}
                >
                  {signChar}
                  {percentageToDisplay}
                  %
                </span>
              </div>
              <span
                className={`truncate text-sm leading-none ${
                  isFirstCard
                    ? "text-gray-100"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {isIncrease ? "افزایش" : "کاهش"} نسبت به ماه گذشته
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
