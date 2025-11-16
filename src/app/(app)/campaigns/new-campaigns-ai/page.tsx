'use client'
import { useEffect, useRef, useState } from "react";
import {
  MessageCircle,
  Send,
  Phone,
  Megaphone,
  Download,
  Clock,
  Sparkles,
  Menu,
  X,
} from "lucide-react";

type Filters = {
  province?: string[];
  lastPurchaseDays?: number;
  tags?: string[];
};

type Message = {
  role: "user" | "assistant";
  text: string;
};

type HistoryItem = {
  id: string;
  title: string;
  summary: string;
  time: string;
};

type Segment = {
  filters: Filters;
  count: number;
  summary?: string;
};

export default function AiActionsPage() {
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "سلام! 👋 به دستیار هوشمند بازاریابی خوش آمدید. پیام بازاریابی خود را بنویسید تا سگمنت مناسب را برای شما آماده کنم.",
    },
  ]);
  const [segment, setSegment] = useState<Segment | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const chatScrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

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
    return (await res.json()) as Segment;
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
            `✨ سگمنت با موفقیت آماده شد!\n\n📊 ${out.summary || "خلاصه موجود نیست"}\n👥 تعداد مخاطبین: ${out.count.toLocaleString("fa-IR")} نفر\n\nحالا می‌توانید یکی از گزینه‌های زیر را انتخاب کنید:`,
        },
      ]);
    } catch (e: any) {
      setSegment(null);
      const hint = e?.message?.includes("422")
        ? "💡 برای ساخت سگمنت، یکی از این موارد را مشخص کنید:\n• استان (مثال: تهران، اصفهان)\n• فاصله از آخرین خرید (مثال: ۳۰ روز)\n• برچسب (مثال: VIP، فعال)"
        : "⚠️ متأسفانه خطایی رخ داد. لطفاً دوباره تلاش کنید.";
      setMessages((m) => [
        ...m,
        { role: "assistant", text: `${hint}\n\nجزئیات خطا: ${e?.message}` },
      ]);
    } finally {
      setBusy(false);
      setTimeout(scrollToBottom, 100);
    }
  }

  async function handleDownloadExcel() {
    if (!segment) return;
    try {
      const res = await fetch("/api/actions/export-excel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filters: segment.filters }),
      });
      if (!res.ok) throw new Error("دانلود ناموفق بود");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "segment.xlsx";
      a.click();
      URL.revokeObjectURL(url);
      setMessages((m) => [
        ...m,
        { role: "assistant", text: "✅ فایل Excel با موفقیت دانلود شد." },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", text: "❌ خطا در دانلود فایل Excel" },
      ]);
    }
  }

  async function handleCreateCampaign() {
    if (!segment) return;
    try {
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
      if (!res.ok) throw new Error("ثبت کمپین ناموفق بود");

      const data = await res.json();
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text: `✅ کمپین با موفقیت ثبت شد!\n🆔 شناسه: ${data.campaign?.id}`,
        },
      ]);
    } catch (e: any) {
      setMessages((m) => [
        ...m,
        { role: "assistant", text: `❌ خطا در ثبت کمپین: ${e?.message}` },
      ]);
    }
  }

  async function handlePrepareSMS() {
    if (!segment) return;
    try {
      const res = await fetch("/api/actions/sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filters: segment.filters, count: segment.count }),
      });
      if (!res.ok) throw new Error("آماده‌سازی ناموفق بود");

      const data = await res.json();
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text: `✅ لیست پیامک آماده شد!\n🆔 شناسه: ${data.listId}\n👥 تعداد مخاطبین: ${data.estimated.toLocaleString("fa-IR")} نفر`,
        },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", text: "❌ خطا در آماده‌سازی لیست پیامک" },
      ]);
    }
  }

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
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="h-screen w-full overflow-hidden bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-slate-900 dark:to-gray-900">
      <div className="flex h-fit">
        <aside
          className={`fixed inset-y-0 right-0 z-50 w-72 transform border-l border-slate-200/50 bg-white/80 backdrop-blur-xl transition-transform duration-300 dark:border-slate-800/50 dark:bg-gray-900/80 lg:relative lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-slate-200/50 p-4 dark:border-slate-800/50">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-blue-600 to-indigo-600">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  دستیار هوشمند
                </span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden rounded-lg p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="h-5 w-5 text-slate-600 dark:text-slate-400" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <div className="mb-3 flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                <Clock className="h-3.5 w-3.5" />
                تاریخچه گفتگوها
              </div>
              <div className="space-y-2">
                {history.map((h) => (
                  <button
                    key={h.id}
                    className="group w-full rounded-xl border border-slate-200/50 bg-white/50 p-3 text-right transition-all hover:border-blue-300 hover:bg-blue-50/50 hover:shadow-sm dark:border-slate-800/50 dark:bg-slate-900/50 dark:hover:border-blue-700 dark:hover:bg-blue-950/30"
                  >
                    <div className="mb-1.5 text-sm font-semibold text-slate-800 group-hover:text-blue-700 dark:text-slate-200 dark:group-hover:text-blue-400">
                      {h.title}
                    </div>
                    <div className="mb-1 text-xs text-slate-600 dark:text-slate-400">
                      {h.summary}
                    </div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-500">
                      {h.time}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-200/50 p-4 dark:border-slate-800/50">
              <div className="rounded-lg bg-linear-to-br from-blue-50 to-indigo-50 p-3 dark:from-blue-950/30 dark:to-indigo-950/30">
                <div className="mb-1 text-xs font-semibold text-blue-900 dark:text-blue-300">
                  💡 نکته
                </div>
                <div className="text-[11px] leading-relaxed text-blue-700 dark:text-blue-400">
                  برای بهترین نتیجه، درخواست خود را واضح و دقیق بیان کنید.
                </div>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex flex-1 flex-col overflow-hidden">
          <header className="border-b border-slate-200/50 bg-white/50 backdrop-blur-xl dark:border-slate-800/50 dark:bg-gray-900/50">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <Menu className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                </button>
                <MessageCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  گفتگو با دستیار
                </span>
              </div>

              {segment && (
                <div className="hidden items-center gap-2 sm:flex">
                  <div className="flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                    {segment.count.toLocaleString("fa-IR")} نفر
                  </div>
                  {segment.filters.province && (
                    <div className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">
                      {segment.filters.province.join("، ")}
                    </div>
                  )}
                  {segment.filters.lastPurchaseDays && (
                    <div className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700 dark:bg-amber-950/50 dark:text-amber-400">
                      {segment.filters.lastPurchaseDays} روز
                    </div>
                  )}
                </div>
              )}
            </div>
          </header>

          <div className="flex flex-1 flex-col overflow-hidden">
            <div
              ref={chatScrollRef}
              className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8"
            >
              <div className="mx-auto max-w-3xl space-y-4">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`flex ${m.role === "user" ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`group relative max-w-[85%] rounded-2xl px-4 py-3 shadow-sm transition-all hover:shadow-md sm:max-w-[75%] ${
                        m.role === "user"
                          ? "bg-white text-slate-800 dark:bg-slate-800 dark:text-slate-100"
                          : "bg-linear-to-br from-blue-600 to-indigo-600 text-white"
                      }`}
                    >
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">
                        {m.text}
                      </div>
                    </div>
                  </div>
                ))}

                {busy && (
                  <div className="flex justify-end">
                    <div className="max-w-[85%] rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 px-4 py-3 sm:max-w-[75%]">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          <span className="h-2 w-2 animate-bounce rounded-full bg-white [animation-delay:-0.3s]"></span>
                          <span className="h-2 w-2 animate-bounce rounded-full bg-white [animation-delay:-0.15s]"></span>
                          <span className="h-2 w-2 animate-bounce rounded-full bg-white"></span>
                        </div>
                        <span className="text-xs text-white/80">در حال پردازش...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-slate-200/50 bg-white/50 backdrop-blur-xl dark:border-slate-800/50 dark:bg-gray-900/50">
              <div className="mx-auto max-w-3xl p-4">
                {segment && (
                  <div className="mb-4 flex items-center justify-center gap-3">
                    <button
                      onClick={handlePrepareSMS}
                      disabled={busy}
                      title="ارسال پیامک"
                      className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:hover:scale-100"
                    >
                      <Phone className="h-5 w-5" />
                      <span className="absolute -bottom-8 whitespace-nowrap rounded-lg bg-slate-900 px-2 py-1 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100">
                        ارسال پیامک
                      </span>
                    </button>

                    <button
                      onClick={handleCreateCampaign}
                      disabled={busy}
                      title="ساخت کمپین"
                      className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:hover:scale-100"
                    >
                      <Megaphone className="h-5 w-5" />
                      <span className="absolute -bottom-8 whitespace-nowrap rounded-lg bg-slate-900 px-2 py-1 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100">
                        ساخت کمپین
                      </span>
                    </button>

                    <button
                      onClick={handleDownloadExcel}
                      disabled={busy}
                      title="دانلود Excel"
                      className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:hover:scale-100"
                    >
                      <Download className="h-5 w-5" />
                      <span className="absolute -bottom-8 whitespace-nowrap rounded-lg bg-slate-900 px-2 py-1 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100">
                        دانلود Excel
                      </span>
                    </button>
                  </div>
                )}

                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <textarea
                      ref={inputRef}
                      rows={1}
                      dir="rtl"
                      value={input}
                      onChange={(e) => {
                        setInput(e.target.value);
                        e.target.style.height = "auto";
                        e.target.style.height = e.target.scrollHeight + "px";
                      }}
                      onKeyDown={onKeyDown}
                      placeholder="پیام خود را بنویسید... (Enter برای ارسال، Shift+Enter برای خط جدید)"
                      className="max-h-40 w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-blue-600 dark:focus:ring-blue-950/50"
                      style={{ minHeight: "48px" }}
                    />
                  </div>
                  <button
                    onClick={send}
                    disabled={busy || !input.trim()}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:hover:scale-100"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-2 text-center text-[10px] text-slate-400 dark:text-slate-500">
                  دستیار هوشمند بازاریابی می‌تواند اشتباه کند. لطفاً اطلاعات مهم را بررسی کنید.
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
        />
      )}
    </div>
  );
}
