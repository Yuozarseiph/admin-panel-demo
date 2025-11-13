// components/customers/ProvincesAndCountriesCard.tsx
"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import { provincesCustomers } from "@/data/customers";

const IranMap = dynamic(() => import("react-iran-map").then((m) => m.IranMap), { ssr: false });

const provinceDisplayNames: Record<string, string> = {
  tehran: "تهران",
  alborz: "البرز",
  isfahan: "اصفهان",
  khorasanRazavi: "خراسان رضوی",
  fars: "فارس",
  mazandaran: "مازندران",
  gilan: "گیلان",
  eastAzerbaijan: "آذربایجان شرقی",
  westAzerbaijan: "آذربایجان غربی",
  kerman: "کرمان",
  khuzestan: "خوزستان",
  qom: "قم",
  yazd: "یزد",
  bushehr: "بوشهر",
  hormozgan: "هرمزگان",
  zanjan: "زنجان",
  qazvin: "قزوین",
  markazi: "مرکزی",
  kermanshah: "کرمانشاه",
  kurdistan: "کردستان",
  lorestan: "لرستان",
  kohgiluyehAndBoyerAhmad: "کهگیلویه و بویراحمد",
  chaharmahalAndBakhtiari: "چهارمحال و بختیاری",
  sistanAndBaluchestan: "سیستان و بلوچستان",
  northKhorasan: "خراسان شمالی",
  southKhorasan: "خراسان جنوبی",
  golestan: "گلستان",
  semnan: "سمنان",
  ilam: "ایلام",
  ardabil: "اردبیل",
  hamedan: "همدان",
};

export default function ProvincesAndCountriesCard({ className = "" }: { className?: string }) {
  const total = useMemo(() => Object.values(provincesCustomers).reduce((a, b) => a + b, 0), []);

  // فقط 4 استان برتر
  const topProvinces = useMemo(() => {
    return Object.entries(provincesCustomers)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([key, val]) => ({
        key,
        name: provinceDisplayNames[key] ?? key,
        value: val,
      }));
  }, []);

  // اندازه نقشه کوچک‌تر + اسکرول
  const mapWrapRef = useRef<HTMLDivElement | null>(null);
  const [mapWidth, setMapWidth] = useState(420); // کوچکتر از قبل

  useEffect(() => {
    if (!mapWrapRef.current) return;
    const el = mapWrapRef.current;

    let t: any;
    const ro = new ResizeObserver((entries) => {
      clearTimeout(t);
      t = setTimeout(() => {
        for (const entry of entries) {
          const w = Math.floor(entry.contentRect.width);
          // محدودیت جدید کوچک‌تر و اجازه برای اسکرول افقی
          const clamped = Math.max(320, Math.min(w, 520));
          setMapWidth(clamped - 24);
        }
      }, 80);
    });
    ro.observe(el);
    return () => {
      clearTimeout(t);
      ro.disconnect();
    };
  }, []);

  return (
    <div className={`rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900 lg:h-100 ${className}`}>
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-sm font-semibold">مشتریان بر اساس استان‌ها</h2>
        <span className="text-xs text-emerald-500">{total.toLocaleString("fa-IR")}</span>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
        {/* ستون Progress فقط ۴ تا */}
        <section className="order-2 space-y-6 lg:order-1">
          {topProvinces.map((p, idx) => {
            const max = topProvinces[0].value || 1;
            const percent = Math.round((p.value / max) * 100);
            const colors = ["#46BFDA", "#29CCB1", "#F3CC5C", "#59A7FF"];
            const color = colors[idx % colors.length];
            return (
              <div key={p.key}>
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="text-gray-400">{p.value.toLocaleString("fa-IR")}</span>
                  <span className="text-gray-300">{p.name}</span>
                </div>
                <div className="h-3 w-full rounded-full bg-gray-100 dark:bg-gray-800">
                  <div
                    className="relative h-3 rounded-full"
                    style={{ width: `${percent}%`, backgroundColor: color }}
                  >
                    <span className="absolute end-1 top-1/2 size-2 -translate-y-1/2 rounded-full bg-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* ستون نقشه با اسکرول (افقی و عمودی) */}
        <section className="order-1 lg:order-2">
          <div
            ref={mapWrapRef}
            className="relative max-h-[260px] w-full overflow-auto rounded-lg border border-transparent"
          >
            <div className="min-w-[520px]"> {/* مجبور به اسکرول افقی در عرض کم */}
              <div className="w-full" style={{ aspectRatio: "5 / 3" }}>
                <div className="absolute inset-0 overflow-visible p-1">
                  <div className="mx-auto" style={{ width: mapWidth }}>
                    <IranMap
                      data={provincesCustomers}
                      width={mapWidth}
                      textColor="#A1A1AA"
                      colorRange="40, 120, 200"
                      deactiveProvinceColor="#0b1220"
                      selectedProvinceColor="#22c55e"
                      defaultSelectedProvince="tehran"
                      tooltipTitle="تعداد:"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* لِجند */}
          <div className="mt-3 flex items-center justify-center gap-6 text-xs">
            <div className="flex items-center gap-1">
              <span className="inline-block size-2.5 rounded-full bg-emerald-500" />
              <span>بالا</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="inline-block size-2.5 rounded-full bg-sky-500" />
              <span>متوسط</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="inline-block size-2.5 rounded-full bg-rose-400" />
              <span>پایین</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
