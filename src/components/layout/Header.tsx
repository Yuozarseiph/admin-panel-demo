// components/layout/Header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { Popover, Transition } from "@headlessui/react";
import { Bell, Mail, UserRound, Menu } from "lucide-react";
import { Fragment } from "react";
import { currentUser } from "@/data/user";

type HeaderProps = {
  onMenuToggle?: () => void;
  title?: string;
};

export default function Header({ onMenuToggle, title = "پنل مدیریت" }: HeaderProps) {
  const { name, email, avatar, notificationsCount, inboxCount } = currentUser;

  return (
    <div className="flex w-full max-w-dvw items-center justify-between pl-10">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onMenuToggle}
          aria-label="باز کردن منو"
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 lg:hidden"
        >
          <Menu size={18} />
        </button>
        <h1 className="text-sm font-semibold">{title}</h1>
      </div>

      <div className="flex items-center gap-1.5">
        <Link
          href="/profile/notifications"
          aria-label="اعلان‌ها"
          className="relative rounded-md p-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:hover:bg-gray-800"
        >
          <Bell size={18} className="text-gray-600 dark:text-gray-300" />
          {notificationsCount > 0 && (
            <span className="absolute -right-1 -top-1 inline-flex items-center justify-center rounded-full bg-emerald-600 px-1.5 text-[10px] leading-none text-white">
              {notificationsCount}
            </span>
          )}
        </Link>
        <Link
          href="/profile/inbox"
          aria-label="ایمیل‌ها"
          className="relative rounded-md p-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:hover:bg-gray-800"
        >
          <Mail size={18} className="text-gray-600 dark:text-gray-300" />
          {inboxCount > 0 && (
            <span className="absolute -right-1 -top-1 inline-flex items-center justify-center rounded-full bg-sky-600 px-1.5 text-[10px] leading-none text-white">
              {inboxCount}
            </span>
          )}
        </Link>
        <Popover className="relative">
          <Popover.Button
            aria-label="پروفایل"
            className="inline-flex items-center gap-2 rounded-md p-1.5 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:hover:bg-gray-800"
          >
            <UserRound size={18} className="text-gray-600 dark:text-gray-300" />
            <Image
              src={avatar}
              alt={name}
              width={24}
              height={24}
              className="rounded-full ring-1 ring-gray-200 dark:ring-gray-700"
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
                  <div className="text-sm font-extrabold">{name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{email}</div>
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
              <div className="py-1">
                <Link href="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800">
                  پروفایل من
                </Link>
                <Link href="/profile/settings" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800">
                  تنظیمات حساب
                </Link>
                <Link href="/profile/activity" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800">
                  گزارش فعالیت
                </Link>
              </div>

              <div className="h-px bg-gray-200 dark:bg-gray-800" />
              <div className="p-2">
                <button
                  className="w-full rounded-md px-4 py-2 text-center text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => {
                  }}
                >
                  خروج از حساب
                </button>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      </div>
    </div>
  );
}
