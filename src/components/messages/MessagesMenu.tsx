// components/messages/MessagesMenu.tsx
"use client";

import Link from "next/link";
import { PiCheck } from "react-icons/pi";
import { Avatar, Popover, Text, Title } from "rizzui";
import { messagesData } from "@/data/messages";
import { Mail } from "lucide-react";

type MessagesMenuProps = {
  unreadCount?: number;
};

// sendTime اینجا «تعداد ساعت گذشته» است
function formatRelative(hours: number) {
  if (hours == null) return "—";
  if (hours >= 24) {
    const days = Math.floor(hours / 24);
    return `${days.toLocaleString("fa-IR")} روز پیش`;
  }
  return `${hours.toLocaleString("fa-IR")} ساعت پیش`;
}

export default function MessagesMenu({ unreadCount }: MessagesMenuProps) {
  const computedUnread =
    typeof unreadCount === "number"
      ? unreadCount
      : messagesData.filter((m) => m.unRead).length;

  return (
    <Popover placement="bottom-end">
      <Popover.Trigger>
        <button
          type="button"
          aria-label="پیام‌ها"
          className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 shadow-[0_1px_2px_rgba(15,23,42,0.10)] hover:shadow-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
        >
          <Mail size={18} />
          {computedUnread > 0 && (
            <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-gray-900" />
          )}
        </button>
      </Popover.Trigger>

      <Popover.Content className="z-[9999] border-0 bg-transparent p-0">
        <div className="w-[340px] rounded-2xl bg-white text-left shadow-[0_18px_45px_rgba(15,23,42,0.12)] ring-1 ring-gray-200 rtl:text-right dark:bg-gray-900 dark:ring-gray-800 sm:w-[380px] 2xl:w-[420px]">
          <div className="mb-1 flex items-center justify-between px-5 pb-2 pt-4">
            <Title as="h5" fontWeight="semibold">
              پیام‌ها
            </Title>
            <Link
              href="/support/inbox"
              className="text-xs text-gray-500 hover:underline dark:text-gray-400"
            >
              مشاهده همه
            </Link>
          </div>

          <div className="h-px bg-gray-100 dark:bg-gray-800" />

          <div
            className="custom-scrollbar max-h-[406px] overflow-y-auto scroll-smooth py-1"
            style={{ direction: "ltr" }}
          >
            <div className="grid grid-cols-1 ps-4" dir="rtl">
              {messagesData.map((item) => (
                <div
                  key={item.name + item.id}
                  className="group grid cursor-pointer grid-cols-[auto_minmax(0,1fr)] gap-2.5 px-3 py-2.5 pe-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/60"
                >
                  {/* Avatar و Badge در کنار هم */}
                  <div className="flex items-center gap-2">
                    {/* Badge سمت راست */}
                    <div className="flex-shrink-0">
                      {item.unRead ? (
                        <span className="inline-block h-2.5 w-2.5 rounded-full bg-sky-500" />
                      ) : (
                        <span className="inline-block rounded-full bg-gray-100 p-0.5 dark:bg-gray-700">
                          <PiCheck className="h-auto w-[9px] text-gray-500 dark:text-gray-300" />
                        </span>
                      )}
                    </div>

                    {/* Avatar */}
                    <Avatar
                      src={item.avatar}
                      name={item.name}
                      className="!h-9 !w-9"
                    />
                  </div>

                  {/* محتوای متنی */}
                  <div className="grid grid-cols-[minmax(0,1fr)] items-center">
                    <div className="w-full">
                      <Text className="mb-0.5 w-11/12 truncate text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {item.name}
                      </Text>
                      <div className="flex items-center justify-between">
                        <Text className="w-10/12 truncate pe-2 text-xs text-gray-500 dark:text-gray-300">
                          {item.message}
                        </Text>
                        <Text className="whitespace-nowrap text-xs text-gray-500 dark:text-gray-400">
                          {formatRelative(item.sendTime)}
                        </Text>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Popover.Content>
    </Popover>
  );
}
