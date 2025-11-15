// data/notifications.ts
import {
  FiMail,
  FiShoppingBag,
  FiBell,
  FiFileText,
  FiBox,
} from "react-icons/fi";

export type NotificationItem = {
  id: string;
  name: string;
  // آیکن React؛ در فایل کامپوننت با <item.icon /> رندر می‌شود
  icon: React.ComponentType<{ className?: string }>;
  // زمان ارسال؛ می‌تونی Date یا string بدهی
  sendTime: string | number | Date;
  unRead?: boolean;
};

export const notificationsData: NotificationItem[] = [
  {
    id: "1",
    name: "دعوت برای طراحی داشبورد جدید",
    icon: FiMail,
    sendTime: "2022-01-01T10:00:00Z",
    unRead: true,
  },
  {
    id: "2",
    name: "طراحی داشبورد ایزومورفیک",
    icon: FiBox,
    sendTime: "2022-02-15T14:30:00Z",
    unRead: true,
  },
  {
    id: "3",
    name: "فایل‌های جدید پروژه دریافت شد",
    icon: FiFileText,
    sendTime: "2022-03-10T09:15:00Z",
    unRead: false,
  },
  {
    id: "4",
    name: "خرید جدید برای پلن ایزومورفیک",
    icon: FiShoppingBag,
    sendTime: "2022-04-05T18:20:00Z",
    unRead: false,
  },
  {
    id: "5",
    name: "سه کانسپت جدید طراحی اضافه شد",
    icon: FiBell,
    sendTime: "2022-05-12T11:45:00Z",
    unRead: true,
  },
  {
    id: "6",
    name: "سفارش شما با موفقیت ثبت شد",
    icon: FiShoppingBag,
    sendTime: "2022-06-20T16:10:00Z",
    unRead: false,
  },
];
