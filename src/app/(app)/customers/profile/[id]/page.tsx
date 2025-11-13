// app/(app)/customers/profile/[id]/page.tsx
import { notFound } from "next/navigation";
import ActionBar from "./ActionBar";
import { customerProfiles } from "@/data/customers-list";

const toFa = (n: number) => n.toLocaleString("fa-IR");
const fmtDate = (iso?: string) => (iso ? new Date(iso).toLocaleDateString("fa-IR") : "—");

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const row = customerProfiles.find((c) => c.id === id);
  if (!row) return notFound();

  return (
    <main className="p-4 sm:p-6 text-[20px]">
      <ActionBar data={row} />
      <section className="rounded-xl border border-gray-200 bg-white text-gray-800 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100">
        <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-5">
          <div>
            <div className="text-[14px] text-gray-500 dark:text-gray-400">پروفایل مشتری</div>
            <div className="text-[24px] font-semibold leading-tight">{row.fullName}</div>
          </div>
          <div className="text-right text-[16px] leading-snug text-gray-600 dark:text-gray-400">
            <div>کد عضویت: <span className="text-gray-900 dark:text-gray-100">{row.customerCode}</span></div>
            <div>آخرین خرید: <span className="text-gray-900 dark:text-gray-100">{fmtDate(row.lastPurchaseAt)}</span></div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 border-t border-gray-200 px-5 py-5 text-[14px] text-gray-600 dark:border-gray-800 dark:text-gray-400 sm:grid-cols-3">
          <div className="flex items-center justify-between sm:block"><div>تاریخ ثبت‌نام</div><div className="font-medium text-gray-900 dark:text-gray-100">{fmtDate(row.createdAt)}</div></div>
          <div className="flex items-center justify-between sm:block"><div>سطح عضویت</div><div className="font-medium text-gray-900 dark:text-gray-100">{row.level}</div></div>
          <div className="flex items-center justify-between sm:block"><div>وضعیت امتیاز</div><div className="font-medium text-gray-900 dark:text-gray-100">{toFa(row.usablePoints)} از {toFa(row.totalPoints)}</div></div>
        </div>
      </section>
      <section className="mt-5 rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <header className="border-b border-gray-200 bg-gray-50 px-5 py-3 text-[14px] text-gray-600 dark:border-gray-800 dark:bg-gray-800/60 dark:text-gray-300">اطلاعات پایه</header>
        <div className="grid grid-cols-1 gap-4 px-5 py-5 text-[18px] sm:grid-cols-2 lg:grid-cols-3">
          <div><span className="text-gray-500">نام:</span> <span>{row.fullName}</span></div>
          <div><span className="text-gray-500">کد ملی:</span> <span>{row.nationalId ?? "—"}</span></div>
          <div><span className="text-gray-500">تاریخ تولد:</span> <span>{fmtDate(row.birthDate)}</span></div>
          <div><span className="text-gray-500">جنسیت:</span> <span>{row.gender ?? "—"}</span></div>
          <div><span className="text-gray-500">موبایل:</span> <a className="text-sky-700 hover:underline dark:text-sky-300" href={`tel:${row.mobile}`}>{row.mobile ?? "—"}</a></div>
          <div><span className="text-gray-500">ایمیل:</span> <a className="text-sky-700 hover:underline dark:text-sky-300" href={`mailto:${row.email}`}>{row.email ?? "—"}</a></div>
          <div className="sm:col-span-2 lg:col-span-3"><span className="text-gray-500">آدرس:</span> <span>{row.address ?? "—"}</span></div>
        </div>
      </section>
      <section className="mt-5 rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <header className="border-b border-gray-200 bg-gray-50 px-5 py-3 text-[14px] text-gray-600 dark:border-gray-800 dark:bg-gray-800/60 dark:text-gray-300">امتیاز و ولت</header>
        <div className="grid grid-cols-1 gap-5 px-5 py-5 sm:grid-cols-3">
          <div className="rounded-lg border border-gray-200 p-5 dark:border-gray-800"><div className="mb-1 text-[14px] text-gray-500">امتیاز کل</div><div className="text-[20px] font-semibold">{toFa(row.totalPoints)}</div></div>
          <div className="rounded-lg border border-gray-200 p-5 dark:border-gray-800"><div className="mb-1 text-[14px] text-gray-500">قابل استفاده</div><div className="text-[20px] font-semibold">{toFa(row.usablePoints)}</div></div>
          <div className="rounded-lg border border-gray-200 p-5 dark:border-gray-800"><div className="mb-1 text-[14px] text-gray-500">سطح عضویت</div><div className="text-[20px] font-semibold">{row.level}</div></div>
        </div>
      </section>
      <section className="mt-5 rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <header className="border-b border-gray-200 bg-gray-50 px-5 py-3 text-[14px] text-gray-600 dark:border-gray-800 dark:bg-gray-800/60 dark:text-gray-300">تاریخچه خرید</header>
        <div className="overflow-x-auto">
          <table className="min-w-full text-[18px]">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-[16px] text-gray-700 dark:border-gray-800 dark:bg-gray-800/60 dark:text-gray-200">
                <th className="px-5 py-4 text-right">تاریخ</th><th className="px-5 py-4 text-right">کانال</th><th className="px-5 py-4 text-right">مبلغ</th><th className="px-5 py-4 text-right">امتیاز</th><th className="px-5 py-4 text-right">فاکتور</th>
              </tr>
            </thead>
            <tbody>
              {row.purchases.map((p) => (
                <tr key={p.id} className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-5 py-4">{fmtDate(p.date)}</td>
                  <td className="px-5 py-4">{p.channel}</td>
                  <td className="px-5 py-4">{toFa(p.amount)} تومان</td>
                  <td className="px-5 py-4">{toFa(p.earnedPoints)}</td>
                  <td className="px-5 py-4">{p.invoiceNo}</td>
                </tr>
              ))}
              {row.purchases.length === 0 && (<tr><td colSpan={5} className="px-5 py-6 text-center text-[16px] text-gray-500">خریدی ثبت نشده است</td></tr>)}
            </tbody>
          </table>
        </div>
      </section>
      <section className="mt-5 rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <header className="border-b border-gray-200 bg-gray-50 px-5 py-3 text-[14px] text-gray-600 dark:border-gray-800 dark:bg-gray-800/60 dark:text-gray-300">کوپن‌ها / پاداش‌ها</header>
        <div className="grid grid-cols-1 gap-4 px-5 py-5 md:grid-cols-2">
          {row.vouchers.map((v) => (
            <div key={v.id} className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3 dark:border-gray-800">
              <div className="text-[18px]">{v.title}</div>
              <div className={["rounded-full px-3 py-1 text-[14px]",
                v.status === "فعال" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" :
                v.status === "استفاده‌شده" ? "bg-sky-500/10 text-sky-600 dark:text-sky-300" :
                "bg-rose-500/10 text-rose-600 dark:text-rose-300"].join(" ")}>
                {v.status}
              </div>
            </div>
          ))}
          {row.vouchers.length === 0 && <div className="px-4 py-2 text-[16px] text-gray-500">موردی نیست</div>}
        </div>
      </section>
      <section className="mt-5 rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <header className="border-b border-gray-200 bg-gray-50 px-5 py-3 text-[14px] text-gray-600 dark:border-gray-800 dark:bg-gray-800/60 dark:text-gray-300">ارتباطات</header>
        <div className="overflow-x-auto">
          <table className="min-w-full text-[18px]">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-[16px] text-gray-700 dark:border-gray-800 dark:bg-gray-800/60 dark:text-gray-200">
                <th className="px-5 py-4 text-right">رسانه</th><th className="px-5 py-4 text-right">تاریخ</th><th className="px-5 py-4 text-right">موضوع</th><th className="px-5 py-4 text-right">وضعیت پاسخ</th>
              </tr>
            </thead>
            <tbody>
              {row.messages.map((m) => (
                <tr key={m.id} className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-5 py-4">{m.via}</td>
                  <td className="px-5 py-4">{fmtDate(m.date)}</td>
                  <td className="px-5 py-4">{m.subject}</td>
                  <td className="px-5 py-4">
                    <span className={["rounded-full px-3 py-1 text-[14px]", m.answered ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-amber-500/10 text-amber-600 dark:text-amber-400"].join(" ")}>
                      {m.answered ? "پاسخ داده شد" : "در انتظار"}
                    </span>
                  </td>
                </tr>
              ))}
              {row.messages.length === 0 && (<tr><td colSpan={4} className="px-5 py-6 text-center text-[16px] text-gray-500">موردی نیست</td></tr>)}
            </tbody>
          </table>
        </div>
      </section>
      <section className="mt-5 rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <header className="border-b border-gray-200 bg-gray-50 px-5 py-3 text-[14px] text-gray-600 dark:border-gray-800 dark:bg-gray-800/60 dark:text-gray-300">معرفی دوستان</header>
        <div className="grid grid-cols-1 gap-4 px-5 py-5 md:grid-cols-2">
          {row.friends.map((f) => (
            <div key={f.id} className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3 dark:border-gray-800">
              <div className="text-[18px]">{f.name}</div>
              <div className="text-[14px] text-gray-500 dark:text-gray-400">{f.code}</div>
            </div>
          ))}
          {row.friends.length === 0 && <div className="px-4 py-2 text-[16px] text-gray-500">موردی نیست</div>}
        </div>
      </section>
      <section className="mt-5 rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <header className="border-b border-gray-200 bg-gray-50 px-5 py-3 text-[14px] text-gray-600 dark:border-gray-800 dark:bg-gray-800/60 dark:text-gray-300">یادداشت‌های داخلی</header>
        <ul className="divide-y divide-gray-200 px-5 text-[18px] dark:divide-gray-800">
          {row.notes.map((n) => (
            <li key={n.id} className="py-4">
              <div>{n.text}</div>
              <div className="text-[14px] text-gray-500">{n.author} — {fmtDate(n.createdAt)}</div>
            </li>
          ))}
          {row.notes.length === 0 && <li className="py-4 text-[16px] text-gray-500">یادداشتی ثبت نشده است</li>}
        </ul>
      </section>
      <section className="mt-5 rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 mb-10">
        <header className="border-b border-gray-200 bg-gray-50 px-5 py-3 text-[14px] text-gray-600 dark:border-gray-800 dark:bg-gray-800/60 dark:text-gray-300">لاگ فعالیت</header>
        <div className="overflow-x-auto">
          <table className="min-w-full text-[18px]">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-[16px] text-gray-700 dark:border-gray-800 dark:bg-gray-800/60 dark:text-gray-200">
                <th className="px-5 py-4 text-right">زمان</th><th className="px-5 py-4 text-right">نوع</th><th className="px-5 py-4 text-right">جزئیات</th>
              </tr>
            </thead>
            <tbody>
              {row.activities.map((a) => (
                <tr key={a.id} className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-5 py-4">{a.when}</td>
                  <td className="px-5 py-4">{a.type}</td>
                  <td className="px-5 py-4">{a.detail}</td>
                </tr>
              ))}
              {row.activities.length === 0 && (<tr><td colSpan={3} className="px-5 py-6 text-center text-[16px] text-gray-500">موردی نیست</td></tr>)}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
