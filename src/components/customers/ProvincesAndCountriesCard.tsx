// components/customers/ProvincesAndCountriesCard.tsx
"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import { provincesCustomers } from "@/data/customers";

const IranMap = dynamic(() => import("react-iran-map").then((m) => m.IranMap), {
  ssr: false,
});

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

export default function ProvincesAndCountriesCard() {
  const total = useMemo(
    () => Object.values(provincesCustomers).reduce((a, b) => a + b, 0),
    []
  );

  const topProvinces = useMemo(() => {
    return Object.entries(provincesCustomers)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([key, val]) => ({
        key,
        name: provinceDisplayNames[key] ?? key,
        value: val,
      }));
  }, []);

  const mapWrapRef = useRef<HTMLDivElement | null>(null);
  const [mapWidth, setMapWidth] = useState(560);

  useEffect(() => {
    if (!mapWrapRef.current) return;
    const el = mapWrapRef.current;

    let t: any;
    const ro = new ResizeObserver((entries) => {
      clearTimeout(t);
      t = setTimeout(() => {
        for (const entry of entries) {
          const w = Math.floor(entry.contentRect.width);
          const clamped = Math.max(360, Math.min(w, 720));
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
    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
      <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <section>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-sm font-semibold">مشتریان بر اساس استان‌ها</h2>
            <span className="text-xs text-emerald-500">{total.toLocaleString("fa-IR")}</span>
          </div>

          <div ref={mapWrapRef} className="relative w-full">
            <div className="relative w-full" style={{ aspectRatio: "5 / 3" }}>
              <div className="absolute inset-0 overflow-hidden p-1">
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

        <section>
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-semibold">مشتریان بر اساس استان</h3>
            <span className="rounded-full border border-emerald-600 px-2 py-0.5 text-[11px] text-emerald-500">
              مشاهده همه
            </span>
          </div>

          <div className="space-y-4">
            {topProvinces.map((p) => {
              const percent = Math.round((p.value / topProvinces[0].value) * 100);
              return (
                <div key={p.key}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="text-gray-400">{p.value.toLocaleString("fa-IR")}</span>
                    <span className="text-gray-300">{p.name}</span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-gray-800">
                    <div
                      className="h-3 rounded-full bg-emerald-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
