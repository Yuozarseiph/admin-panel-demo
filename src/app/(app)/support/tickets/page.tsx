// app/(app)/support/tickets/page.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Plus,
  Send,
  ChevronDown,
  UserCircle2,
  Tag,
  MessageCircle,
  Check,
} from "lucide-react";

type TicketStatus = "باز" | "بسته";
type TicketTab = "همه" | "اختصاص‌داده‌نشده" | "برای من" | "چت";
type Priority = "کم" | "متوسط" | "زیاد" | "فوری";
type SortMode = "جدیدترین" | "قدیمی‌ترین" | "اولویت بالا";

type Ticket = {
  id: string;
  title: string;
  customerName: string;
  customerEmail: string;
  tag: string;
  openedAt: string;
  shortDate: string;
  status: TicketStatus;
  channel: "چت" | "ایمیل";
  snippet: string;
  body: string;
  priority: Priority;
  assignedTo?: string;
  timestamp: number;
};

const agents = ["احمد رضایی", "مریم احمدی", "علی کاظمی", "سارا موسوی"];

const ticketsData: Ticket[] = [
  {
    id: "1",
    title: "مشکل در تکمیل سفارش",
    customerName: "مریم احمدی",
    customerEmail: "maryam@example.com",
    tag: "مشکل سفارش",
    openedAt: "۱۴ خرداد ۱۴۰۳، ۱۲:۳۰",
    shortDate: "خرداد ۱۴۰۳",
    status: "باز",
    channel: "چت",
    snippet: "کاربر می‌گوید در مرحله پرداخت خطا نمایش داده می‌شود...",
    body: "سلام، هنگام پرداخت سفارش شماره ۱۲۳۴۵ در صفحه بانک خطای نامشخص دریافت می‌کنم. چند بار تلاش کردم و نتیجه همان است. لطفاً راهنمایی کنید که مشکل از درگاه است یا حساب من.",
    priority: "فوری",
    assignedTo: "احمد رضایی",
    timestamp: 1685872200000,
  },
  {
    id: "2",
    title: "تأخیر در ارسال کالا",
    customerName: "علی رستگار",
    customerEmail: "ali.r@example.com",
    tag: "پیگیری ارسال",
    openedAt: "۱۰ خرداد ۱۴۰۳، ۰۹:۱۵",
    shortDate: "خرداد ۱۴۰۳",
    status: "باز",
    channel: "ایمیل",
    snippet:
      "سفارش من هنوز ارسال نشده و وضعیت روی «در حال آماده‌سازی» مانده...",
    body: "سلام، سفارش من با شماره ۱۱۲۲۳ از سه روز پیش در وضعیت «در حال آماده‌سازی» است. در توضیحات نوشته بود حداکثر ۲۴ ساعت ارسال می‌شود. لطفاً پیگیری کنید و زمان تقریبی تحویل را بفرمایید.",
    priority: "زیاد",
    assignedTo: "مریم احمدی",
    timestamp: 1685526900000,
  },
  {
    id: "3",
    title: "درخواست لغو و عودت وجه",
    customerName: "سارا موسوی",
    customerEmail: "sara.m@example.com",
    tag: "لغو سفارش",
    openedAt: "۷ خرداد ۱۴۰۳، ۱۷:۴۵",
    shortDate: "خرداد ۱۴۰۳",
    status: "بسته",
    channel: "ایمیل",
    snippet: "سفارش را به اشتباه ثبت کرده‌ام و می‌خواهم لغو شود...",
    body: "سلام، سفارش شماره ۹۸۷۶ را به اشتباه ثبت کرده‌ام و می‌خواهم لغو شود. اگر امکان دارد مبلغ به کیف پول من در سایت برگردانده شود.",
    priority: "متوسط",
    assignedTo: undefined,
    timestamp: 1685268300000,
  },
  {
    id: "4",
    title: "سوال درباره گارانتی محصول",
    customerName: "رضا نوری",
    customerEmail: "reza.n@example.com",
    tag: "پرسش عمومی",
    openedAt: "۱۵ خرداد ۱۴۰۳، ۱۰:۰۰",
    shortDate: "خرداد ۱۴۰۳",
    status: "باز",
    channel: "چت",
    snippet: "آیا گارانتی این محصول شامل تعمیرات هم می‌شود؟",
    body: "سلام، در مورد محصول شماره ۵۵۵، آیا گارانتی این محصول شامل تعمیرات هم می‌شود یا فقط تعویض دارد؟ لطفاً توضیح دهید.",
    priority: "کم",
    assignedTo: "علی کاظمی",
    timestamp: 1685958600000,
  },
];

const toFa = (n: number) => n.toLocaleString("fa-IR");

function Dropdown({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="inline-flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-[13px] text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
      >
        <span>{label}</span>
        <ChevronDown size={14} />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-10 mt-1 min-w-[160px] rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-900">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className="flex w-full items-center justify-between px-3 py-2 text-right text-[13px] text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <span>{opt}</span>
              {value === opt && <Check size={14} className="text-sky-600" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SupportTicketsInboxPage() {
  const [selectedId, setSelectedId] = useState<string>(
    ticketsData[0]?.id ?? ""
  );
  const [statusFilter, setStatusFilter] = useState<TicketStatus | "همه">("همه");
  const [tab, setTab] = useState<TicketTab>("همه");
  const [priorityFilter, setPriorityFilter] = useState<Priority | "همه">("همه");
  const [agentFilter, setAgentFilter] = useState<string>("همه");
  const [sortMode, setSortMode] = useState<SortMode>("جدیدترین");
  const [reply, setReply] = useState("");

  const selected =
    ticketsData.find((t) => t.id === selectedId) ?? ticketsData[0];

  let filtered = ticketsData.filter((t) => {
    const byStatus = statusFilter === "همه" ? true : t.status === statusFilter;
    const byTab =
      tab === "همه"
        ? true
        : tab === "اختصاص‌داده‌نشده"
          ? !t.assignedTo
          : tab === "برای من"
            ? t.assignedTo === "احمد رضایی"
            : t.channel === "چت";
    const byPriority =
      priorityFilter === "همه" ? true : t.priority === priorityFilter;
    const byAgent = agentFilter === "همه" ? true : t.assignedTo === agentFilter;
    return byStatus && byTab && byPriority && byAgent;
  });

  if (sortMode === "جدیدترین") {
    filtered.sort((a, b) => b.timestamp - a.timestamp);
  } else if (sortMode === "قدیمی‌ترین") {
    filtered.sort((a, b) => a.timestamp - b.timestamp);
  } else if (sortMode === "اولویت بالا") {
    const pMap: Record<Priority, number> = {
      فوری: 4,
      زیاد: 3,
      متوسط: 2,
      کم: 1,
    };
    filtered.sort((a, b) => pMap[b.priority] - pMap[a.priority]);
  }

  const sendReply = () => {
    if (!reply.trim()) return;
    alert("پاسخ ارسال شد (دمو)");
    setReply("");
  };

  return (
    <main dir="rtl" className="p-4 sm:p-6 text-[20px]">
      <section className="rounded-xl border border-gray-200 bg-white text-gray-800 shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 px-5 py-3 dark:border-gray-800">
          <h1 className="text-[20px] font-semibold">اینباکس پشتیبانی</h1>
          <Link
            href="/support/new"
            className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-[16px] font-semibold text-white hover:bg-sky-700"
          >
            <Plus size={18} />
            <span>ایجاد تیکت</span>
          </Link>
        </div>

        <div className="flex flex-wrap items-center gap-2 border-b border-gray-100 px-5 py-3 text-[14px] dark:border-gray-800">
          {(
            [
              {
                key: "همه" as TicketTab,
                label: "همه",
                count: ticketsData.length,
              },
              {
                key: "چت" as TicketTab,
                label: "چت",
                count: ticketsData.filter((t) => t.channel === "چت").length,
              },
              {
                key: "برای من" as TicketTab,
                label: "اختصاص داده شده به من",
                count: ticketsData.filter((t) => t.assignedTo === "احمد رضایی")
                  .length,
              },
              {
                key: "اختصاص‌داده‌نشده" as TicketTab,
                label: "تیکت‌های بدون مسئول",
                count: ticketsData.filter((t) => !t.assignedTo).length,
              },
            ] satisfies { key: TicketTab; label: string; count: number }[]
          ).map((item) => (
            <button
              key={item.key}
              onClick={() => setTab(item.key)}
              className={[
                "inline-flex items-center gap-1 rounded-full px-3 py-1",
                tab === item.key
                  ? "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700",
              ].join(" ")}
            >
              <span className="text-[11px] bg-white/80 px-1.5 py-0.5 rounded-full text-gray-800 dark:bg-gray-900 dark:text-gray-100">
                {toFa(item.count)}
              </span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 px-5 py-3 text-[14px] dark:border-gray-800">
          <div className="flex flex-wrap items-center gap-2">
            <Dropdown
              label="اولویت"
              value={priorityFilter}
              options={["همه", "فوری", "زیاد", "متوسط", "کم"]}
              onChange={(v) => setPriorityFilter(v as Priority | "همه")}
            />
            <Dropdown
              label="وضعیت"
              value={statusFilter === "همه" ? "همه" : statusFilter}
              options={["همه", "باز", "بسته"]}
              onChange={(v) => setStatusFilter(v as TicketStatus | "همه")}
            />
            <Dropdown
              label="انتخاب کارشناس"
              value={agentFilter}
              options={["همه", ...agents]}
              onChange={(v) => setAgentFilter(v)}
            />
          </div>
          <Dropdown
            label="مرتب‌سازی"
            value={sortMode}
            options={["جدیدترین", "قدیمی‌ترین", "اولویت بالا"]}
            onChange={(v) => setSortMode(v as SortMode)}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 px-5 py-4 lg:grid-cols-[minmax(0,1fr)_minmax(280px,2fr)]">
          <aside className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
            <header className="flex items-center justify-between border-b border-gray-200 px-4 py-3 text-[13px] text-gray-600 dark:border-gray-800 dark:text-gray-300">
              <span>لیست تیکت‌ها ({toFa(filtered.length)})</span>
            </header>

            <div className="max-h-[520px] overflow-y-auto">
              {filtered.map((t) => {
                const active = t.id === selected.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedId(t.id)}
                    className={[
                      "flex w-full flex-col items-stretch border-b border-gray-100 px-4 py-3 text-right text-[13px] transition-colors last:border-b-0 dark:border-gray-800",
                      active
                        ? "bg-sky-50/80 dark:bg-sky-900/20"
                        : "hover:bg-gray-50 dark:hover:bg-gray-800/60",
                    ].join(" ")}
                  >
                    <div className="flex items-center justify-between gap-2 text-[11px] text-gray-500">
                      <span>{t.shortDate}</span>
                      <span className="inline-flex items-center gap-1 text-[11px] text-gray-400">
                        <MessageCircle size={12} />
                        <span>{t.channel}</span>
                      </span>
                    </div>
                    <div className="mt-1 flex items-center justify-between gap-2">
                      <span className="truncate text-[14px] font-semibold text-gray-800 dark:text-gray-100">
                        {t.title}
                      </span>
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] text-gray-600 dark:bg-gray-800/70 dark:text-gray-300">
                        {t.status}
                      </span>
                    </div>
                    <p className="mt-1 line-clamp-2 text-[12px] leading-5 text-gray-500 dark:text-gray-300">
                      {t.snippet}
                    </p>
                  </button>
                );
              })}
              {filtered.length === 0 && (
                <div className="px-4 py-6 text-center text-[13px] text-gray-500 dark:text-gray-400">
                  تیکتی مطابق فیلتر فعلی پیدا نشد.
                </div>
              )}
            </div>
          </aside>
          <div className="flex min-h-[420px] flex-col rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-start justify-between border-b border-gray-200 px-4 py-3 text-[14px] dark:border-gray-800">
              <div className="flex flex-col gap-1">
                <div className="inline-flex items-center gap-2">
                  <span className="rounded-full bg-rose-50 px-2 py-0.5 text-[11px] text-rose-600 dark:bg-rose-900/30 dark:text-rose-300">
                    {selected.tag}
                  </span>
                  <h2 className="text-[18px] font-semibold">
                    {selected.title}
                  </h2>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-gray-500">
                  <span className="inline-flex items-center gap-1">
                    <UserCircle2 size={14} />
                    <span>{selected.customerName}</span>
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-[12px]">{selected.customerEmail}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-[12px]">{selected.openedAt}</span>
                  <span className="text-gray-400">•</span>
                  <span className="inline-flex items-center gap-1 text-[12px]">
                    <MessageCircle size={13} />
                    <span>{selected.channel}</span>
                  </span>
                </div>
              </div>
              <span
                className={[
                  "rounded-full px-3 py-1 text-[12px]",
                  selected.status === "باز"
                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                    : "bg-gray-100 text-gray-600 dark:bg-gray-800/60 dark:text-gray-300",
                ].join(" ")}
              >
                {selected.status === "باز" ? "باز" : "بسته شده"}
              </span>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5 text-[15px] leading-relaxed text-gray-700 dark:text-gray-200">
              {selected.body}
            </div>

            <div className="border-t border-gray-200 px-4 py-3 dark:border-gray-800">
              <label className="block text-right text-[13px] text-gray-600 dark:text-gray-300">
                پاسخ سریع به این تیکت
                <textarea
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  className="mt-2 min-h-[90px] w-full rounded-lg border border-gray-300 px-3 py-2 text-[14px] leading-relaxed outline-none focus:border-sky-500 dark:border-gray-700 dark:bg-gray-950"
                  placeholder="متن پاسخ را اینجا بنویس..."
                />
              </label>
              <div className="mt-3 flex items-center justify-between">
                <button className="inline-flex items-center gap-1 text-[13px] text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                  <Tag size={14} />
                  <span>افزودن تگ / یادداشت</span>
                </button>
                <button
                  type="button"
                  onClick={sendReply}
                  className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-[14px] font-semibold text-white hover:bg-sky-700"
                >
                  <Send size={16} />
                  <span>ارسال پاسخ</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
