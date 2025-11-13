import Link from "next/link";

// app/not-found.tsx
export default function NotFound() {
  return (
    <main className="flex h-dvh items-center justify-center p-4 text-center">
      <div className="flex flex-col gap-2">
        <h1 className="mb-2 text-2xl font-bold">صفحه پیدا نشد</h1>
        <p className="text-sm text-gray-500">لینک ممکن است جابه‌جا شده باشد.</p>
        <Link href="/" className="px-2 py-3 bg-blue-500 text-white dark:text-black dark:bg-blue-200 rounded-full">بازگشت به داشبورد</Link>
      </div>
    </main>
  );
}
