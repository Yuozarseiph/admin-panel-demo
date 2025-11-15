// app/(app)/settings/page.tsx
"use client";

import { useState } from "react";
import {
  Check,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  Loader2,
  XCircle,
} from "lucide-react";

const toFa = (n: number | string) =>
  n.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]);

type TestId = "connection" | "handshake" | "sync";
type TestStatus = "success" | "error";

interface TestItem {
  id: TestId;
  title: string;
  duration: number;
  description: string;
  status: TestStatus;
}

type StepActionState = {
  status: "idle" | "loading" | "success" | "error";
  duration?: number;
};

// ====== داده تستی برای لیست تست‌ها ======
const createRandomTests = (): TestItem[] => {
  const makeStatus = (): TestStatus =>
    Math.random() < 0.8 ? "success" : "error";

  const makeDuration = (min: number, max: number) =>
    Number((Math.random() * (max - min) + min).toFixed(1));

  const testsBase: { id: TestId; title: string; min: number; max: number }[] =
    [
      {
        id: "connection",
        title: "تست اتصال به سرور (Connection Test)",
        min: 0.1,
        max: 1.2,
      },
      {
        id: "handshake",
        title: "تست ارتباط اولیه با سرور (Handshake Test)",
        min: 5,
        max: 15,
      },
      {
        id: "sync",
        title: "تست همگام سازی با سرور",
        min: 1,
        max: 6,
      },
    ];

  return testsBase.map((base) => {
    const status = makeStatus();
    const duration = makeDuration(base.min, base.max);

    let description = "";
    if (status === "success") {
      if (base.id === "connection") {
        description = "اتصال به سرور با موفقیت انجام شد.";
      } else if (base.id === "handshake") {
        description = "ارتباط اولیه با سرور بدون مشکل برقرار شد.";
      } else {
        description = "همگام سازی با سرور با موفقیت انجام شد.";
      }
    } else {
      if (base.id === "connection") {
        description =
          "اتصال به سرور برقرار نشد. تنظیمات شبکه یا فایروال را بررسی کنید.";
      } else if (base.id === "handshake") {
        description =
          "Handshake با سرور ناموفق بود. احتمالاً کلید یا آدرس اشتباه است.";
      } else {
        description =
          "همگام سازی با سرور انجام نشد. بعد از برطرف شدن مشکل دوباره تلاش کنید.";
      }
    }

    return {
      id: base.id,
      title: base.title,
      duration,
      description,
      status,
    };
  });
};

export default function SettingsPage() {
  const [selectedServer, setSelectedServer] = useState("auto");
  const [openTest, setOpenTest] = useState<TestId | null>("sync");
  const [tests, setTests] = useState<TestItem[]>(() => createRandomTests());

  // وضعیت تستی برای دکمه‌های بالا
  const [serverAction, setServerAction] = useState<StepActionState>({
    status: "idle",
  });
  const [debugAction, setDebugAction] = useState<StepActionState>({
    status: "idle",
  });

  const rerunTests = () => {
    setTests(createRandomTests());
    setOpenTest("sync");
  };

  const runStepAction = (type: "server" | "debug") => {
    const setState = type === "server" ? setServerAction : setDebugAction;
    const start = performance.now();

    setState({ status: "loading" });

    const delay = 700 + Math.random() * 1400; // 0.7 تا 2.1 ثانیه
    setTimeout(() => {
      const end = performance.now();
      const duration = Number(((end - start) / 1000).toFixed(1));
      const success = Math.random() < 0.8;

      setState({
        status: success ? "success" : "error",
        duration,
      });
    }, delay);
  };

  // ===== اتصال کلی به سرور (برای کارت سوم) =====
  const connectionTest = tests.find((t) => t.id === "connection");
  const isConnectionOk =
    (connectionTest?.status ?? "success") === "success" &&
    serverAction.status !== "error";

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-gray-50 p-6 text-right dark:bg-gray-950"
    >
      <div className="mx-auto max-w-[1600px]">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            همگام سازی با سرور
          </h1>

          <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
            <span>همگام سازی با سرور</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-400 text-xs">
              ؟
            </span>
          </button>
        </div>

        {/* گرید اصلی: LTR برای جابه‌جایی ستون‌ها */}
        <div className="grid gap-6 lg:grid-cols-[220px_1fr]" dir="ltr">
          {/* Sidebar - ستون چپ در تصویر */}
          <aside dir="rtl" className="space-y-4">
            <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-gray-900 text-center py-9">
              <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                ارتباط اولیه
              </div>
              <div className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                موفق
              </div>
            </div>

            <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-gray-900 text-center py-9">
              <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                آخرین همگام سازی
              </div>
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {toFa("5 ساعت قبل")}
              </div>
            </div>

            <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-gray-900 text-center py-9">
              <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                نسخه فعلی افزونه
              </div>
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {toFa("2.6.7")}
              </div>
            </div>

            <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-gray-900 text-center py-9">
              <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                آخرین نسخه افزونه
              </div>
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {toFa("2.6.7")}
              </div>
            </div>
          </aside>

          {/* Main Content - ستون راست در تصویر */}
          <div dir="rtl" className="space-y-6">
            {/* Steps row: سه کارت هم‌اندازه + فلش بینشان */}
            <div className="grid items-stretch gap-4 xl:grid-cols-[2fr_64px_1.5fr_64px_1fr]">
              {/* Step 1 */}
              <div className="flex flex-row-reverse h-full min-h-[180px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <div className="flex-1 p-5">
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <button
                      className="inline-flex items-center gap-2 rounded-md bg-emerald-500 px-6 py-2 text-sm font-medium text-white hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-80"
                      disabled={serverAction.status === "loading"}
                      onClick={() => runStepAction("server")}
                    >
                      {serverAction.status === "loading" && (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      )}
                      <span>ذخیره و تغییر سرور</span>
                    </button>

                    <select
                      value={selectedServer}
                      onChange={(e) => setSelectedServer(e.target.value)}
                      className="h-9 rounded border border-gray-300 bg-white px-3 text-xs text-gray-700 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-0 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
                    >
                      <option value="auto">انتخاب خودکار</option>
                      <option value="server1">سرور ۱</option>
                      <option value="server2">سرور ۲</option>
                    </select>
                  </div>

                  <p className="mb-2 text-xs leading-relaxed text-gray-600 dark:text-gray-400">
                    در صورت بروز مشکل در ارتباط با سرور و عدم فعال‌سازی محصولات،
                    با همگام‌سازی دستی اقدام به تغییر سرور نمایید.
                  </p>

                  {/* نتیجه تستی */}
                  {serverAction.status === "loading" && (
                    <p className="text-xs text-amber-600 dark:text-amber-400">
                      در حال تست اتصال به سرور...
                    </p>
                  )}
                  {serverAction.status === "success" && (
                    <p className="text-xs text-emerald-600 dark:text-emerald-400">
                      تست تغییر سرور با موفقیت در{" "}
                      {toFa(serverAction.duration ?? 0)} ثانیه انجام شد.
                    </p>
                  )}
                  {serverAction.status === "error" && (
                    <p className="text-xs text-red-600 dark:text-red-400">
                      تست تغییر سرور ناموفق بود؛ لطفاً دوباره تلاش کنید.
                    </p>
                  )}
                </div>
                <div className="flex w-20 items-center justify-center bg-gray-50 dark:bg-gray-800">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-2xl font-bold text-gray-600 dark:bg-gray-700 dark:text-gray-500">
                    {toFa(1)}
                  </div>
                </div>
              </div>

              {/* Arrow 1-2 */}
              <div className="hidden items-center justify-center xl:flex">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-500 bg-white text-emerald-500 shadow-sm dark:bg-gray-900">
                  <ChevronLeft className="h-4 w-4" />
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-row-reverse h-full min-h-[180px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                {/* محتوا */}
                <div className="flex-1 p-5">
                  <button
                    className="mb-3 inline-flex items-center gap-2 rounded-md bg-emerald-500 px-7 py-2 text-sm font-medium text-white hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-80"
                    disabled={debugAction.status === "loading"}
                    onClick={() => runStepAction("debug")}
                  >
                    {debugAction.status === "loading" && (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    )}
                    <span>اشکال زدایی</span>
                  </button>
                  <p className="mb-2 text-xs leading-relaxed text-gray-600 dark:text-gray-400">
                    برای ارتباط با سرور و همگام‌سازی محصولات، در صورت بروز خطا
                    از این بخش برای اشکال‌زدایی استفاده کنید.
                  </p>

                  {debugAction.status === "loading" && (
                    <p className="text-xs text-amber-600 dark:text-amber-400">
                      در حال اجرای مراحل اشکال زدایی...
                    </p>
                  )}
                  {debugAction.status === "success" && (
                    <p className="text-xs text-emerald-600 dark:text-emerald-400">
                      اشکال زدایی با موفقیت در{" "}
                      {toFa(debugAction.duration ?? 0)} ثانیه انجام شد.
                    </p>
                  )}
                  {debugAction.status === "error" && (
                    <p className="text-xs text-red-600 dark:text-red-400">
                      اشکال زدایی ناموفق بود؛ لاگ‌ها را بررسی کرده و دوباره تلاش
                      کنید.
                    </p>
                  )}
                </div>

                {/* ستون شماره در چپ کارت */}
                <div className="flex w-20 items-center justify-center bg-gray-50 dark:bg-gray-800">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-2xl font-bold text-gray-600 dark:bg-gray-700 dark:text-gray-500">
                    {toFa(2)}
                  </div>
                </div>
              </div>

              {/* Arrow 2-3 */}
              <div className="hidden items-center justify-center xl:flex">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-500 bg-white text-emerald-500 shadow-sm dark:bg-gray-900">
                  <ChevronLeft className="h-4 w-4" />
                </div>
              </div>

              {/* Step 3 - وضعیت کلی اتصال بر اساس isConnectionOk */}
              <div
                className={`flex h-full min-h-[180px] flex-col items-center justify-center rounded-2xl px-4 py-6 text-sm shadow-sm ${
                  isConnectionOk
                    ? "border border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/15 dark:text-emerald-300"
                    : "border border-red-300 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-900/15 dark:text-red-300"
                }`}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-inner dark:bg-gray-900/40">
                  {isConnectionOk ? (
                    <Check className="h-9 w-9 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <XCircle className="h-9 w-9 text-red-600 dark:text-red-400" />
                  )}
                </div>
                <p className="mt-3 max-w-[200px] text-center">
                  {isConnectionOk
                    ? "اتصال با سرور برقرار است."
                    : "اتصال با سرور برقرار نیست."}
                </p>
              </div>
            </div>

            {/* Tests panel با داده‌ی رندوم */}
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-gray-900">
              <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 dark:border-gray-800">
                <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                  تست اتصال پنل با سایت
                </h2>
                <button
                  type="button"
                  onClick={rerunTests}
                  className="text-xs text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                >
                  اجرای مجدد تست‌ها
                </button>
              </div>

              {tests.map((test) => {
                const isOpen = openTest === test.id;
                const statusLabel =
                  test.status === "success" ? "موفق" : "ناموفق";

                const statusClasses =
                  test.status === "success"
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                    : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300";

                return (
                  <div
                    key={test.id}
                    className="border-b border-gray-100 last:border-b-0 dark:border-gray-800"
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() =>
                        setOpenTest((prev) =>
                          prev === test.id ? null : test.id
                        )
                      }
                      className={`grid w-full grid-cols-[1fr_auto_auto_40px] items-center gap-3 px-6 py-4 text-right transition hover:bg-gray-50 dark:hover:bg-gray-900/60 ${
                        isOpen ? "bg-gray-50/80 dark:bg-gray-900/60" : ""
                      }`}
                    >
                      <span className="truncate text-sm text-gray-800 dark:text-gray-200">
                        {test.title}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {toFa(test.duration)}
                      </span>
                      <span
                        className={`rounded-full px-4 py-1 text-center text-xs font-medium ${statusClasses}`}
                      >
                        {statusLabel}
                      </span>
                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded bg-gray-100 text-gray-600 transition-transform dark:bg-gray-800 dark:text-gray-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-4 text-xs text-gray-500 dark:text-gray-400">
                        {test.description}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
