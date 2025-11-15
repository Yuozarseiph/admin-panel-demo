// components/customers/CustomerKPIs.tsx
import { customerKPI } from "@/data/customers";

export default function CustomerKPIs() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {customerKPI.map((c) => {
        const badge =
          c.ok
            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200"
            : "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-200";
        return (
          <div key={c.title} className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
            <span className={`inline-block rounded-full px-2 py-0.5 text-xs ${badge}`}>{c.delta}</span>
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">{c.title}</div>
            <div className="mt-1 text-2xl font-bold">{c.value}</div>
            <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">{c.note}</div>
          </div>
        );
      })}
    </div>
  );
}
