// app/(app)/ai/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import {
  MessageCircle,
  Send,
  Phone,
  Megaphone,
  Download,
  Clock,
} from "lucide-react";

type Filters = {
  province?: string[];
  lastPurchaseDays?: number;
  tags?: string[];
};
type HistoryItem = { id: string; title: string; summary: string; time: string };

export default function AiActionsPage() {
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; text: string }[]
  >([
    {
      role: "assistant",
      text: "سلام! پیام بازاریابی‌ات رو بنویس تا سگمنت آماده کنم.",
    },
  ]);
  const [segment, setSegment] = useState<{
    filters: Filters;
    count: number;
    summary?: string;
  } | null>(null);

  const chatScrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  async function analyzeWithAI(text: string) {
    const res = await fetch("/api/ai/segment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: text }),
    });
    if (!res.ok) {
      let msg = `HTTP ${res.status}`;
      try {
        const j = await res.json();
        if (j?.error) msg += ` – ${j.error}`;
      } catch {}
      throw new Error(msg);
    }
    return (await res.json()) as {
      filters: Filters;
      count: number;
      summary?: string;
    };
  }

  async function send() {
    const text = input.trim();
    if (!text || busy) return;
    setBusy(true);
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");

    try {
      const out = await analyzeWithAI(text);
      setSegment(out);
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text:
            `سگمنت آماده شد: ${out.summary || "خلاصه موجود نیست"} — ` +
            `${out.count.toLocaleString("fa-IR")} نفر. یکی از گزینه‌ها را انتخاب کن.`,
        },
      ]);
    } catch (e: any) {
      setSegment(null);
      const hint = e?.message?.includes("422")
        ? "برای سگمنت، یکی از این‌ها را بگو: استان (مثلاً تهران)، فاصله خرید (مثلاً ۳۰ روز)، یا برچسب (مثلاً VIP)."
        : "خطا در تحلیل؛ دوباره تلاش کن.";
      setMessages((m) => [
        ...m,
        { role: "assistant", text: `خطا: ${e?.message}. ${hint}` },
      ]);
    } finally {
      requestAnimationFrame(() => {
        const el = chatScrollRef.current;
        if (el) el.scrollTop = el.scrollHeight;
      });
      setBusy(false);
    }
  }

  async function handleDownloadExcel() {
    if (!segment) return;
    const res = await fetch("/api/actions/export-excel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filters: segment.filters }),
    });
    if (!res.ok) {
      setMessages((m) => [
        ...m,
        { role: "assistant", text: "دانلود Excel ناموفق بود." },
      ]);
      return;
    }
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "segment.xlsx";
    a.click();
    URL.revokeObjectURL(url);
    setMessages((m) => [
      ...m,
      { role: "assistant", text: "فایل Excel دانلود شد." },
    ]);
  }

  async function handleCreateCampaign() {
    if (!segment) return;
    const res = await fetch("/api/actions/campaign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "کمپین هوشمند",
        summary: segment.summary,
        filters: segment.filters,
        count: segment.count,
      }),
    });
    if (!res.ok) {
      let msg = "ثبت کمپین ناموفق بود.";
      try {
        const j = await res.json();
        if (j?.error) msg += ` (${j.error})`;
      } catch {}
      setMessages((m) => [...m, { role: "assistant", text: msg }]);
      return;
    }
    const data = await res.json();
    setMessages((m) => [
      ...m,
      {
        role: "assistant",
        text: `کمپین با شناسه ${data.campaign?.id} ثبت شد.`,
      },
    ]);
  }

  async function handlePrepareSMS() {
    if (!segment) return;
    const res = await fetch("/api/actions/sms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filters: segment.filters, count: segment.count }),
    });
    if (!res.ok) {
      setMessages((m) => [
        ...m,
        { role: "assistant", text: "آماده‌سازی لیست پیامک ناموفق بود." },
      ]);
      return;
    }
    const data = await res.json();
    setMessages((m) => [
      ...m,
      {
        role: "assistant",
        text: `لیست پیامک با شناسه ${data.listId} آماده شد (${data.estimated} مخاطب).`,
      },
    ]);
  }

  const history: HistoryItem[] = [
    {
      id: "h1",
      title: "مشتریان VIP تهران",
      summary: "۳۰ روز اخیر بدون خرید",
      time: "امروز",
    },
    {
      id: "h2",
      title: "کمپین آخر هفته",
      summary: "ارسال SMS به غیرفعال‌ها",
      time: "دیروز",
    },
    {
      id: "h3",
      title: "بازگشتی‌ها",
      summary: "۹۰ روزه بدون خرید",
      time: "۳ روز قبل",
    },
  ];

  function scrollToBottom() {
    const el = chatScrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <main className="flex h-dvh flex-col overflow-hidden p-4 sm:p-6 text-[14px] sm:text-[15px]">
      <div className="mb-4">
        <h1 className="text-[15px] font-semibold text-gray-700 dark:text-gray-300">
          دستیار بازاریابی
        </h1>
      </div>

      <div className="grid flex-1 min-h-0 gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900 overflow-hidden">
          <div className="mb-3 flex items-center gap-2 text-[13px] text-gray-500 dark:text-gray-400">
            <Clock className="h-4 w-4" />
            تاریخچه گفتگو
          </div>
          <div className="custom-scrollbar h-full overflow-y-auto">
            {history.map((h) => (
              <button
                key={h.id}
                className="group mb-2 w-full rounded-lg border border-gray-200 bg-white p-3 text-right hover:border-sky-500 dark:border-gray-800 dark:bg-gray-950"
              >
                <div className="mb-1 text-[15px] font-semibold text-gray-800 group-hover:text-sky-600 dark:text-gray-200 dark:group-hover:text-sky-300">
                  {h.title}
                </div>
                <div className="flex items-center justify-between text-[13px] text-gray-500 dark:text-gray-400">
                  <span>{h.summary}</span>
                  <span className="text-gray-400">{h.time}</span>
                </div>
              </button>
            ))}
          </div>
        </aside>

        <section className="relative grid min-h-0 grid-rows-[auto_1fr_auto] rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2 text-[13px] text-gray-500 dark:text-gray-400">
              <MessageCircle className="h-4 w-4" />
              گفتگو
            </div>
            {segment && (
              <div className="hidden items-center gap-2 text-[13px] sm:flex">
                <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-emerald-600 dark:text-emerald-400">
                  {segment.count.toLocaleString("fa-IR")} نفر
                </span>
                <span className="rounded-full bg-sky-500/10 px-2 py-1 text-sky-600 dark:text-sky-400">
                  {segment.filters.province?.join("، ")}
                </span>
                {segment.filters.lastPurchaseDays && (
                  <span className="rounded-full bg-amber-500/10 px-2 py-1 text-amber-600 dark:text-amber-400">
                    {segment.filters.lastPurchaseDays} روز
                  </span>
                )}
              </div>
            )}
          </div>

          <div
            ref={chatScrollRef}
            className="custom-scrollbar relative min-h-0 overflow-y-auto px-4 pb-2"
          >
            <div className="min-h-full rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-800 dark:bg-[#0b1220]">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`mb-3 flex ${m.role === "user" ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-xl px-3 py-2 ${
                      m.role === "user"
                        ? "bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-200"
                        : "bg-sky-100 text-sky-900 dark:bg-sky-900/40 dark:text-sky-100"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              <div className="h-6" />
            </div>
          </div>

          {/* Composer + دکمه‌های سمت چپ */}
          <div className="p-4 gap-2 flex items-center justify-center">
            <div className="rounded-lg grow">
              <div className="flex items-center gap-2">
                <button
                  onClick={send}
                  disabled={busy}
                  className="inline-flex h-10 shrink-0 items-center gap-1 rounded-lg bg-sky-600 px-3 py-2 text-[14px] font-semibold text-white hover:bg-sky-700 disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                </button>
                <textarea
                  ref={inputRef}
                  rows={1}
                  dir="rtl"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="بنویس و با Enter ارسال کن (Shift+Enter = سطر جدید)…"
                  className="max-h-40 min-h-[42px] w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-[14px] text-gray-900 outline-none placeholder:text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                aria-label="تماس"
                title="ارسال SMS"
                onClick={handlePrepareSMS}
                disabled={!segment || busy}
                className="flex items-center justify-center size-12 rounded-full border border-gray-300 bg-white text-gray-800 shadow-lg hover:bg-gray-50 hover:scale-105 transition-all duration-200 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
              >
                <Phone className="h-5 w-5" />
              </button>
              <button
                aria-label="اعلان"
                title="ساخت کمپین"
                onClick={handleCreateCampaign}
                disabled={!segment || busy}
                className="flex items-center justify-center size-12 rounded-full border border-gray-300 bg-white text-gray-800 shadow-lg hover:bg-gray-50 hover:scale-105 transition-all duration-200 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
              >
                <Megaphone className="h-5 w-5" />
              </button>
              <button
                aria-label="دانلود"
                title="دانلود Excel"
                onClick={handleDownloadExcel}
                disabled={!segment || busy}
                className="flex items-center justify-center size-12 rounded-full border border-gray-300 bg-white text-gray-800 shadow-lg hover:bg-gray-50 hover:scale-105 transition-all duration-200 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
              >
                <Download className="h-5 w-5" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
