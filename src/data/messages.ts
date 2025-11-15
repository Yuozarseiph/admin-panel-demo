// data/messages.ts
export type MessageItem = {
  id: string;
  name: string;
  avatar: string;
  message: string;
  sendTime: number;
  unRead?: boolean;
};

export const messagesData: MessageItem[] = [
  {
    id: "1",
    name: "وید وارن",
    avatar: "/avatars/1.png",
    message: "دعوت برای همکاری روی طراحی داشبورد جدید ارسال شد…",
    sendTime: 48,
    unRead: true,
  },
  {
    id: "2",
    name: "جین کوپر",
    avatar: "/avatars/1.png",
    message: "نسخه‌ی جدید طراحی داشبورد برای بازبینی آماده است…",
    sendTime: 72,
    unRead: true,
  },
  {
    id: "3",
    name: "لسلی الکساندر",
    avatar: "/avatars/1.png",
    message: "فایل‌های جدید پروژه روی سرور آپلود شد…",
    sendTime: 96,
    unRead: false,
  },
  {
    id: "4",
    name: "جان دو",
    avatar: "/avatars/1.png",
    message: "سؤالاتی درباره جزئیات پیاده‌سازی داشبورد دارد…",
    sendTime: 120,
    unRead: false,
  },
  {
    id: "5",
    name: "طراحی و فرانت‌اند",
    avatar: "/avatars/1.png",
    message: "چند کانسپت جدید برای صفحه اصلی اضافه شد…",
    sendTime: 144,
    unRead: false,
  },
  {
    id: "6",
    name: "لاراول",
    avatar: "/avatars/1.png",
    message: "API سفارش‌ها روی سرور جدید دیپلوی شد…",
    sendTime: 168,
    unRead: false,
  },
  {
    id: "7",
    name: "وردپرس",
    avatar: "/avatars/1.png",
    message: "آپدیت پلاگین‌ها با موفقیت انجام شد…",
    sendTime: 2,
    unRead: false,
  },
];
