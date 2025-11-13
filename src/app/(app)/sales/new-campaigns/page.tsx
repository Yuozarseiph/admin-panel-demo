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
    <main className="p-4 sm:p-6 text-[20px]">
      <section className="rounded-xl border border-gray-200 bg-white text-gray-800 shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100">
        <header className="border-b border-gray-200 bg-gray-50 px-5 py-4 text-[16px] text-gray-600 dark:border-gray-800 dark:bg-gray-800/60 dark:text-gray-300">
          ایجاد کمپین جدید (فرم هوشمند)
        </header>

        <div className="px-5 py-5">
          <div className="mb-4 text-[16px] text-gray-600">قدم ۱: نوع کمپین</div>

          <ul className="space-y-3">
            {[
              "تخفیف درصدی/مبلغی",
              "امتیاز دوبل (2x)",
              "هدیه با خرید (مثلاً: خرید بالای ۵۰۰ هزار → کیف پول)",
              "کوپن تولد",
              "چالش خرید (۵ خرید در ۳۰ روز؛ جایزه)",
              "معرفی دوست",
            ].map((label) => {
              const value =
                label.startsWith("تخفیف") ? ("تخفیف درصدی/مبلغی" as CampaignKind)
                : label.startsWith("امتیاز") ? ("امتیاز دوبل (2x)" as CampaignKind)
                : label.startsWith("هدیه") ? ("هدیه با خرید" as CampaignKind)
                : label.startsWith("کوپن") ? ("کوپن تولد" as CampaignKind)
                : label.startsWith("چالش") ? ("چالش خرید" as CampaignKind)
                : ("معرفی دوست" as CampaignKind);
              const checked = kind === value;
              return (
                <li key={label} className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="kind"
                    checked={checked}
                    onChange={() => setKind(value)}
                    className="mt-1 h-5 w-5 accent-sky-600"
                  />
                  <span className="leading-8">{label}</span>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 flex items-center gap-3">
            <button
              disabled={!kind}
              className="h-11 rounded-md bg-sky-600 px-5 text-[16px] font-semibold text-white enabled:hover:bg-sky-700 disabled:opacity-50"
              onClick={() => alert(`نوع انتخاب شده: ${kind}`)}
            >
              ادامه
            </button>
            <Link
              href="/sales/campaigns"
              className="h-11 rounded-md border border-gray-300 px-5 text-[16px] hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              بازگشت به لیست کمپین‌ها
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
