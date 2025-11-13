// components/widgets/IranMapCard.tsx
"use client";

import dynamic from "next/dynamic";
import { iranProvincesData } from "@/data/map";
const IranMap = dynamic(() => import("react-iran-map").then(m => m.IranMap), { ssr: false });

export default function IranMapCard() {
  const total = Object.values(iranProvincesData).reduce((a, b) => a + b, 0);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold">کاربران فعال</h2>
        <span className="text-xs text-emerald-600">{total.toLocaleString("fa-IR")}</span>
      </div>

      <div className="w-full overflow-x-auto">
        <div className="mx-auto w-100 lg:w-full max-h-svh md:h-screen">
          <IranMap
            data={iranProvincesData}
            colorRange="20, 120, 150"
            width={900}
            textColor="#ffffff"
            defaultSelectedProvince=""
            deactiveProvinceColor="#f1f5f9"
            selectedProvinceColor="#10b981"
            tooltipTitle="فعال:"
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-6 text-xs">
        <div className="flex items-center gap-1"><span className="inline-block size-2.5 rounded-full bg-[#10b981]" /><span>بالا</span></div>
        <div className="flex items-center gap-1"><span className="inline-block size-2.5 rounded-full bg-[#3b82f6]" /><span>متوسط</span></div>
        <div className="flex items-center gap-1"><span className="inline-block size-2.5 rounded-full bg-[#fca5a5]" /><span>پایین</span></div>
      </div>
    </div>
  );
}
