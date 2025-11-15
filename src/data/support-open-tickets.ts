// data/support-open-tickets.ts

export type SupportChannel = "چت" | "ایمیل";

export type Priority = "کم" | "متوسط" | "زیاد" | "فوری";

export type Ticket = {
  id: string;
  title: string;
  customerName: string;
  customerEmail: string;
  tag: string;
  openedAt: string;
  shortDate: string;
  channel: SupportChannel;
  snippet: string;
  body: string;
  priority: Priority;
  assignedTo?: string;
  timestamp: number;
};

export const openTicketsData: Ticket[] = [
  {
    id: "1",
    title: "مشکل در تکمیل سفارش",
    customerName: "مریم احمدی",
    customerEmail: "maryam@example.com",
    tag: "مشکل سفارش",
    openedAt: "۱۴ خرداد ۱۴۰۳، ۱۲:۳۰",
    shortDate: "خرداد ۱۴۰۳",
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
    channel: "ایمیل",
    snippet:
      "سفارش من هنوز ارسال نشده و وضعیت روی «در حال آماده‌سازی» مانده...",
    body: "سلام، سفارش من با شماره ۱۱۲۲۳ از سه روز پیش در وضعیت «در حال آماده‌سازی» است. در توضیحات نوشته بود حداکثر ۲۴ ساعت ارسال می‌شود. لطفاً پیگیری کنید و زمان تقریبی تحویل را بفرمایید.",
    priority: "زیاد",
    assignedTo: "مریم احمدی",
    timestamp: 1685526900000,
  },
  {
    id: "4",
    title: "سوال درباره گارانتی محصول",
    customerName: "رضا نوری",
    customerEmail: "reza.n@example.com",
    tag: "پرسش عمومی",
    openedAt: "۱۵ خرداد ۱۴۰۳، ۱۰:۰۰",
    shortDate: "خرداد ۱۴۰۳",
    channel: "چت",
    snippet: "آیا گارانتی این محصول شامل تعمیرات هم می‌شود؟",
    body: "سلام، در مورد محصول شماره ۵۵۵، آیا گارانتی این محصول شامل تعمیرات هم می‌شود یا فقط تعویض دارد؟ لطفاً توضیح دهید.",
    priority: "کم",
    assignedTo: "علی کاظمی",
    timestamp: 1685958600000,
  },
];
