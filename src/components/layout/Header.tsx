// components/layout/Header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { Popover, Transition } from "@headlessui/react";
import { Bell, Mail, Menu, Settings } from "lucide-react";
import { Fragment } from "react";
import { currentUser } from "@/data/user";
import MessagesMenu from "@/components/messages/MessagesMenu";
import NotificationDropdown from "@/components/notifications/NotificationDropdown";

type HeaderProps = {
  onMenuToggle?: () => void;
  title?: string;
};

export default function Header({
  onMenuToggle,
  title = "پنل مدیریت",
}: HeaderProps) {
  const { name, email, avatar, notificationsCount, inboxCount } = currentUser;

  return (
    <div className="flex w-full max-w-dvw items-center justify-between pl-4 sm:pl-10">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onMenuToggle}
          aria-label="باز کردن منو"
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 lg:hidden"
        >
          <Menu size={18} />
        </button>
        <h1 className="text-[13px] sm:text-[14px] font-semibold">
          {title}
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <Popover className="relative">
          <Popover.Button
            aria-label="پروفایل"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-gray-200 hover:ring-emerald-500/70 focus:outline-none dark:bg-gray-900 dark:ring-gray-700"
          >
            <Image
              src={avatar}
              alt={name}
              width={32}
              height={32}
              className="h-8 w-8 rounded-full"
            />
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition duration-150 ease-out"
            enterFrom="opacity-0 translate-y-1 scale-95"
            enterTo="opacity-100 translate-y-0 scale-100"
            leave="transition duration-100 ease-in"
            leaveFrom="opacity-100 translate-y-0 scale-100"
            leaveTo="opacity-0 translate-y-1 scale-95"
          >
            <Popover.Panel className="absolute end-0 z-50 mt-2 w-72 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-900">
              <div className="flex items-center justify-between p-3">
                <div className="text-end">
                  <div className="text-[13px] font-extrabold">
                    {name}
                  </div>
                  <div className="text-[11px] text-gray-500 dark:text-gray-400">
                    {email}
                  </div>
                </div>
                <Image
                  src={avatar}
                  alt={name}
                  width={36}
                  height={36}
                  className="rounded-full ring-1 ring-gray-200 dark:ring-gray-700"
                />
              </div>

              <div className="h-px bg-gray-200 dark:bg-gray-800" />

              <div className="py-1 text-[13px]">
                <Link
                  href="/profile"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  پروفایل من
                </Link>
                <Link
                  href="/profile/settings"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  تنظیمات حساب
                </Link>
                <Link
                  href="/profile/activity"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  گزارش فعالیت
                </Link>
              </div>

              <div className="h-px bg-gray-200 dark:bg-gray-800" />

              <div className="p-2">
                <button
                  className="w-full rounded-md px-4 py-2 text-center text-[13px] hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => {}}
                >
                  خروج از حساب
                </button>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
        <div className="flex items-center gap-2">
          <MessagesMenu unreadCount={inboxCount} />
          <NotificationDropdown>
            <button
              type="button"
              aria-label="اعلان‌ها"
              className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 shadow-[0_1px_2px_rgba(15,23,42,0.08)] hover:shadow-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
            >
              <Bell size={18} />
              {notificationsCount > 0 && (
                <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-amber-400 ring-2 ring-white dark:ring-gray-900" />
              )}
            </button>
          </NotificationDropdown>
        </div>
      </div>
    </div>
  );
}
