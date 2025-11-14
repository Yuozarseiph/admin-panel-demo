// app/(app)/support/new/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Upload, X } from "lucide-react";
import Link from "next/link";

type Priority = "کم" | "متوسط" | "زیاد" | "فوری";
type Category = "مشکل سفارش" | "پیگیری ارسال" | "لغو سفارش" | "پرسش عمومی" | "سایر";

export default function NewTicketPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    category: "پرسش عمومی" as Category,
    priority: "متوسط" as Priority,
    description: "",
    customerName: "",
    customerEmail: "",
  });
  const [attachments, setAttachments] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeFile = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      alert("لطفاً عنوان و توضیحات را وارد کنید");
      return;
    }
    console.log("Submitting ticket:", form, attachments);
    alert("تیکت با موفقیت ثبت شد!");
    router.push("/support/tickets");
  };

  return (
    <main dir="rtl" className="p-4 sm:p-6 text-[20px]">
      <section className="mx-auto max-w-3xl rounded-xl border border-gray-200 bg-white text-gray-800 shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100">
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <Link
              href="/support/tickets"
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ArrowRight size={20} />
            </Link>
            <h1 className="text-[20px] font-semibold">ایجاد تیکت جدید</h1>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5 px-5 py-6">
          <label className="block text-right">
            <span className="mb-2 block text-[14px] font-medium text-gray-700 dark:text-gray-200">
              نام مشتری
            </span>
            <input
              type="text"
              value={form.customerName}
              onChange={(e) => setForm({ ...form, customerName: e.target.value })}
              className="h-10 w-full rounded-lg border border-gray-300 px-3 text-[15px] outline-none focus:border-sky-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
              placeholder="مثال: علی احمدی"
            />
          </label>
          <label className="block text-right">
            <span className="mb-2 block text-[14px] font-medium text-gray-700 dark:text-gray-200">
              ایمیل مشتری
            </span>
            <input
              type="email"
              value={form.customerEmail}
              onChange={(e) => setForm({ ...form, customerEmail: e.target.value })}
              className="h-10 w-full rounded-lg border border-gray-300 px-3 text-[15px] outline-none focus:border-sky-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
              placeholder="example@domain.com"
            />
          </label>
          <label className="block text-right">
            <span className="mb-2 block text-[14px] font-medium text-gray-700 dark:text-gray-200">
              عنوان تیکت <span className="text-rose-600">*</span>
            </span>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="h-10 w-full rounded-lg border border-gray-300 px-3 text-[15px] outline-none focus:border-sky-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
              placeholder="عنوان مختصر مشکل یا درخواست"
              required
            />
          </label>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block text-right">
              <span className="mb-2 block text-[14px] font-medium text-gray-700 dark:text-gray-200">
                دسته‌بندی
              </span>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as Category })}
                className="h-10 w-full rounded-lg border border-gray-300 px-3 text-[15px] outline-none focus:border-sky-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
              >
                <option value="مشکل سفارش">مشکل سفارش</option>
                <option value="پیگیری ارسال">پیگیری ارسال</option>
                <option value="لغو سفارش">لغو سفارش</option>
                <option value="پرسش عمومی">پرسش عمومی</option>
                <option value="سایر">سایر</option>
              </select>
            </label>

            <label className="block text-right">
              <span className="mb-2 block text-[14px] font-medium text-gray-700 dark:text-gray-200">
                اولویت
              </span>
              <select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value as Priority })}
                className="h-10 w-full rounded-lg border border-gray-300 px-3 text-[15px] outline-none focus:border-sky-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
              >
                <option value="کم">کم</option>
                <option value="متوسط">متوسط</option>
                <option value="زیاد">زیاد</option>
                <option value="فوری">فوری</option>
              </select>
            </label>
          </div>
          <label className="block text-right">
            <span className="mb-2 block text-[14px] font-medium text-gray-700 dark:text-gray-200">
              توضیحات کامل <span className="text-rose-600">*</span>
            </span>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="min-h-[140px] w-full rounded-lg border border-gray-300 px-3 py-2 text-[15px] leading-relaxed outline-none focus:border-sky-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
              placeholder="شرح کامل مشکل یا درخواست خود را بنویسید..."
              required
            />
          </label>
          <div className="block text-right">
            <span className="mb-2 block text-[14px] font-medium text-gray-700 dark:text-gray-200">
              پیوست فایل (اختیاری)
            </span>
            <label className="flex h-24 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800/50 dark:hover:bg-gray-800">
              <Upload size={28} className="text-gray-400" />
              <span className="mt-2 text-[13px] text-gray-500">
                کلیک کنید یا فایل را بکشید
              </span>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
                accept="image/*,.pdf,.doc,.docx"
              />
            </label>

            {attachments.length > 0 && (
              <ul className="mt-3 space-y-2">
                {attachments.map((file, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-between rounded-lg border border-gray-200 px-3 py-2 text-[13px] dark:border-gray-700"
                  >
                    <span className="truncate text-gray-700 dark:text-gray-200">
                      {file.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFile(idx)}
                      className="text-rose-600 hover:text-rose-700"
                    >
                      <X size={16} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex items-center justify-between gap-3 pt-4">
            <Link
              href="/support/tickets"
              className="rounded-lg border border-gray-300 px-4 py-2 text-[15px] text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              انصراف
            </Link>
            <button
              type="submit"
              className="rounded-lg bg-sky-600 px-6 py-2 text-[15px] font-semibold text-white hover:bg-sky-700"
            >
              ثبت تیکت
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}