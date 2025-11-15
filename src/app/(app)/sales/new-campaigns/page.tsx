// app/(app)/sales/new-campaigns/page.tsx
"use client";

import Link from "next/link";
import { useState } from "react";

type CampaignKind =
  | "تخفیف درصدی/مبلغی"
  | "امتیاز دوبل (2x)"
  | "هدیه با خرید"
  | "کوپن تولد"
  | "چالش خرید"
  | "معرفی دوست";

export default function NewCampaignPage() {
  const [kind, setKind] = useState<CampaignKind | null>(null);

  return (
    <main className="p-4 sm:p-6 text-[13px] sm:text-[14px]">
      <section className="rounded-xl border border-gray-200 bg-white text-gray-800 shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100">
        <header className="border-b border-gray-200 bg-gray-50 px-5 py-4 text-[14px] sm:text-[15px] font-semibold text-gray-700 dark:border-gray-800 dark:bg-gray-800/60 dark:text-gray-200">
          ایجاد کمپین جدید (فرم هوشمند)
        </header>

        <div className="px-5 py-5">
          <div className="mb-4 text-[13px] sm:text-[14px] text-gray-600 dark:text-gray-400">
            قدم ۱: نوع کمپین
          </div>

          <ul className="space-y-3 text-[13px] sm:text-[14px]">
            {[
              "تخفیف درصدی/مبلغی",
              "امتیاز دوبل (2x)",
              "هدیه با خرید (مثلاً: خرید بالای ۵۰۰ هزار → کیف پول)",
              "کوپن تولد",
              "چالش خرید (۵ خرید در ۳۰ روز؛ جایزه)",
              "معرفی دوست",
            ].map((label) => {
              const value =
                label.startsWith("تخفیف")
                  ? ("تخفیف درصدی/مبلغی" as CampaignKind)
                  : label.startsWith("امتیاز")
                  ? ("امتیاز دوبل (2x)" as CampaignKind)
                  : label.startsWith("هدیه")
                  ? ("هدیه با خرید" as CampaignKind)
                  : label.startsWith("کوپن")
                  ? ("کوپن تولد" as CampaignKind)
                  : label.startsWith("چالش")
                  ? ("چالش خرید" as CampaignKind)
                  : ("معرفی دوست" as CampaignKind);
              const checked = kind === value;
              return (
                <li key={label} className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="kind"
                    checked={checked}
                    onChange={() => setKind(value)}
                    className="mt-1 h-4 w-4 accent-sky-600"
                  />
                  <span className="leading-7 sm:leading-8 text-gray-800 dark:text-gray-100">
                    {label}
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-[12px] sm:text-[13px]">
            <button
              disabled={!kind}
              className="h-10 sm:h-11 rounded-md bg-sky-600 px-4 sm:px-5 text-[12px] sm:text-[13px] font-semibold text-white enabled:hover:bg-sky-700 disabled:opacity-50"
              onClick={() => alert(`نوع انتخاب شده: ${kind}`)}
            >
              ادامه
            </button>
            <Link
              href="/sales/campaigns"
              className="inline-flex h-10 sm:h-11 items-center rounded-md border border-gray-300 px-4 sm:px-5 text-[12px] sm:text-[13px] text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              بازگشت به لیست کمپین‌ها
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}