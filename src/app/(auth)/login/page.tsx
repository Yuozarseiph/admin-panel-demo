// app/(auth)/login/page.tsx
"use client";

import { useState } from "react";

export default function LoginPage() {
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/demo-login", { method: "POST" });
      window.location.href = "/";
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-dvh overflow-hidden">
      {/* اول بک‌گراند تا فرم همیشه روی آن باشد */}
      <FullScreenBackground />

      {/* فرم دقیقاً سمت راست */}
      <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-7xl items-center justify-start px-4 sm:px-6">
        <div className="me-4 w-full max-w-sm rounded-2xl bg-white/90 p-5 shadow-2xl backdrop-blur md:me-10 dark:bg-gray-900/90">
          <div className="mb-4 flex items-center justify-center">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-sky-600 text-white shadow-lg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Z" fill="currentColor" />
                <path d="M4 20a8 8 0 1 1 16 0Z" fill="currentColor" opacity="0.85" />
              </svg>
            </div>
          </div>

          <div className="mb-1 text-center text-xl font-extrabold">باشگاه مشتریان</div>
          <div className="mb-6 text-center text-xs text-gray-600 dark:text-gray-400">
            به حساب کاربری خود وارد شوید
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-3 flex items-center justify-center gap-2">
              <span className="h-1 w-8 rounded-full bg-gray-300 dark:bg-gray-700" />
              <span className="h-1 w-8 rounded-full bg-sky-600" />
              <span className="h-1 w-8 rounded-full bg-gray-300 dark:bg-gray-700" />
            </div>

            <div className="mb-1 text-sm font-semibold">ورود به حساب کاربری</div>
            <div className="mb-3 text-xs text-gray-500 dark:text-gray-400">شماره موبایل خود را وارد کنید</div>

            <form onSubmit={onSubmit} className="space-y-3" dir="rtl">
              <label className="block text-xs text-gray-500 dark:text-gray-400">شماره موبایل</label>
              <input
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="09xxxxxxxxx"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none ring-0 transition placeholder:text-gray-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-gray-700 dark:bg-gray-950"
              />
              <button
                type="submit"
                disabled={loading || mobile.length < 10}
                className="mt-2 w-full rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "در حال بررسی..." : "ادامه"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

function FullScreenBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-tr from-sky-800 via-sky-500/70 to-white dark:from-[#0B2A3A] dark:via-[#0A3A4A] dark:to-[#0a0f14]" />
      <svg viewBox="0 0 1200 1200" className="absolute inset-0 h-full w-full opacity-70 dark:opacity-60" preserveAspectRatio="xMidYMid slice">
        <g>
          <polygon points="0,0 300,0 150,260" fill="#2E7BA6" opacity="0.28" className="dark:opacity-20" />
          <polygon points="300,0 600,0 450,260" fill="#6BB6DF" opacity="0.28" className="dark:opacity-20" />
          <polygon points="150,260 450,260 300,520" fill="#7EC3EA" opacity="0.28" className="dark:opacity-20" />
          <polygon points="0,390 300,520 0,840" fill="#2E7BA6" opacity="0.24" className="dark:opacity-18" />
          <polygon points="300,520 650,650 300,980" fill="#6BB6DF" opacity="0.24" className="dark:opacity-18" />
          <polygon points="0,1000 300,980 0,1200" fill="#2E7BA6" opacity="0.22" className="dark:opacity-16" />
        </g>
        <defs>
          <linearGradient id="fadeR" x1="0" x2="1" y1="0" y2="0">
            <stop offset="65%" stopColor="white" stopOpacity="0" />
            <stop offset="100%" stopColor="white" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="fadeRDark" x1="0" x2="1" y1="0" y2="0">
            <stop offset="65%" stopColor="#0a0f14" stopOpacity="0" />
            <stop offset="100%" stopColor="#0a0f14" stopOpacity="1" />
          </linearGradient>
        </defs>
        <rect x="600" y="0" width="600" height="1200" fill="url(#fadeR)" className="dark:hidden" />
        <rect x="600" y="0" width="600" height="1200" fill="url(#fadeRDark)" className="hidden dark:block" />
      </svg>
      <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_-10%_-10%,rgba(0,0,0,0.12),transparent),radial-gradient(1200px_600px_at_110%_110%,rgba(0,0,0,0.12),transparent)] dark:bg-[radial-gradient(1200px_600px_at_-10%_-10%,rgba(0,0,0,0.25),transparent),radial-gradient(1200px_600px_at_110%_110%,rgba(0,0,0,0.25),transparent)]" />
    </div>
  );
}
