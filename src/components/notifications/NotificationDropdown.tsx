// components/notifications/NotificationDropdown.tsx
"use client";

import { notificationsData } from "@/data/notifications";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { ReactElement, RefObject, useEffect, useState } from "react";
import { PiCheck } from "react-icons/pi";
import { Checkbox, Popover, Text, Title } from "rizzui";

dayjs.extend(relativeTime);

type NotificationDropdownProps = {
  children: ReactElement & { ref?: RefObject<any> };
};

function useMedia(query: string, initialState = false) {
  const [matches, setMatches] = useState(initialState);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(query);
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);

    setMatches(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

function formatRelative(date: string | number | Date) {
  try {
    return `${dayjs(date).fromNow(true)} پیش`;
  } catch {
    return "لحظاتی پیش";
  }
}

function NotificationsList({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="w-[340px] text-left sm:w-[380px] 2xl:w-[420px] rtl:text-right">
      <div className="mb-2 flex items-center justify-between ps-6 pe-5 pt-3">
        <Checkbox
          size="sm"
          label="علامت‌گذاری همه به‌عنوان خوانده‌شده"
          labelWeight="normal"
          labelClassName="text-xs sm:text-sm text-gray-600"
        />
        <Title as="h5" fontWeight="semibold">
          اعلان‌ها
        </Title>
      </div>

      <div className="h-px w-full bg-gray-100 dark:bg-gray-800" />
      <div className="custom-scrollbar max-h-[420px] overflow-y-auto scroll-smooth py-1">
        <div className="relative grid cursor-pointer grid-cols-1 gap-1 ps-6">
          {notificationsData.map((item) => (
            <div
              key={item.name + item.id}
              className="group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-md px-2 py-2 pe-4 transition-colors hover:bg-gray-100/80 dark:hover:bg-gray-800/60"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded bg-gray-100/80 p-1 text-gray-600 dark:bg-gray-100/10 dark:text-gray-200 [&>svg]:h-5 [&>svg]:w-5">
                <item.icon />
              </div>
              <div className="flex min-w-0 flex-col gap-0.5">
                <Text className="truncate text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {item.name}
                </Text>
                <Text className="text-xs text-gray-500 dark:text-gray-400">
                  {formatRelative(item.sendTime)}
                </Text>
              </div>
              <div className="flex h-full items-center justify-center">
                {item.unRead ? (
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-sky-500" />
                ) : (
                  <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                    <PiCheck className="h-[9px] w-[9px] text-gray-500 dark:text-gray-300" />
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-px w-full bg-gray-100 dark:bg-gray-800" />
      <Link
        href="/notifications"
        onClick={() => setIsOpen(false)}
        className="block px-6 pb-2 pt-2.5 text-center text-xs font-medium text-gray-600 hover:underline dark:text-gray-300"
      >
        مشاهده همه فعالیت‌ها
      </Link>
    </div>
  );
}

export default function NotificationDropdown({
  children,
}: NotificationDropdownProps) {
  const isMobile = useMedia("(max-width: 480px)", false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      placement={isMobile ? "bottom" : "bottom-end"}
    >
      <Popover.Trigger>{children}</Popover.Trigger>
      <Popover.Content className="z-[9999] border-0 bg-transparent p-0 [&>svg]:hidden [&>svg]:dark:fill-gray-900 sm:[&>svg]:inline-flex">
        <div className="rounded-2xl bg-white shadow-[0_18px_45px_rgba(15,23,42,0.12)] ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-800">
          <NotificationsList setIsOpen={setIsOpen} />
        </div>
      </Popover.Content>
    </Popover>
  );
}
